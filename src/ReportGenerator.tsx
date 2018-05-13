import * as React from 'react'
import { Project, ProjectItem } from './domain/entities'
import * as utils from './utils'
import './css/modal.css'

interface Props {
    projects: Project[],
    onCancel: () => void,
    onGenerated: (markdown: string) => void,
}

interface State {
    startTime: string,
    endTime: string,
    restHours: string,
}

export default class extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props)
        this.state = {
            startTime: '',
            endTime: '',
            restHours: '',
        }
    }

    handleCancel() {
        this.props.onCancel()
    }

    handleGenerate() {
        const { projects } = this.props
        const dailyprojects = generateProjectsMarkdown(utils.filterDailyProject(projects))
        const allprojects = generateProjectsMarkdown(projects)
        const { startTime, endTime, restHours } = this.state
        const actualWorkingHours = sToHm(hmStrToS(endTime) - hmStrToS(startTime) - hmStrToS(restHours))
        const report = reportTemplate
            .replace('[[dailyprojects]]', dailyprojects.join("\n\n"))
            .replace('[[allprojects]]', allprojects.join("\n\n"))
            .replace('[[starttime]]', startTime)
            .replace('[[endtime]]', endTime)
            .replace('[[resthours]]', formatHm(sToHm(hmStrToS(restHours))))
            .replace('[[actualworkinghours]]', formatHm(actualWorkingHours))
        utils
        this.props.onGenerated(report)
    }

    render() {
        return (
            <div className='modal-container' onClick={this.handleCancel.bind(this)}>
                <div className='modal-edit_project' onClick={(e) => { e.stopPropagation() }}>
                    <label>開始時刻: <input type="time" value={this.state.startTime} onChange={(e) => { this.setState({ startTime: e.target.value }) }} /></label>
                    <label>終了時刻: <input type="time" value={this.state.endTime} onChange={(e) => { this.setState({ endTime: e.target.value }) }} /></label>
                    <label>休憩時間: <input type="time" value={this.state.restHours} onChange={(e) => { this.setState({ restHours: e.target.value }) }} /></label>
                    <button onClick={this.handleGenerate.bind(this)}>生成</button>
                </div>
            </div>
        )
    }
}

function generateProjectsMarkdown(projects: Project[]): string[] {
    return projects.map((project) => {
        const { honeyCode, name, items } = project
        const itemsMd = generateItemsMarkdown(items)
        const itemsStr = itemsMd.length > 0
            ? "\n" + itemsMd.join("\n")
            : ''
        return `### 【${honeyCode}】${name}${itemsStr}`
    })
}

function generateItemsMarkdown(items: ProjectItem[], nest: number = 0): string[] {
    return items.map((item) => {
        const { name, completed, children } = item
        const indent = '  '.repeat(nest)
        const checkbox = completed !== undefined
            ? ' [' + (completed ? 'x' : ' ') + ']'
            : ''
        const childrenMd = generateItemsMarkdown(children, nest + 1)
        return `${indent}-${checkbox} ${name || '[No Name]'}${childrenMd.length > 0 ? "\n" + childrenMd.join("\n") : ''}`
    })
}

function hmStrToS(hm: string): number {
    const [h, m] = hm.split(':')
    return Number(h) * 3600 + Number(m) * 60
}

function sToHm(s: number): { h: number, m: number } {
    const h = Math.floor(s / 3600)
    const m = Math.floor(s % 3600 / 60)
    return { h, m }
}

function formatHm(hm: { h: number, m: number }): string {
    return hm.m > 0
        ? `${hm.h}h${hm.m}min`
        : `${hm.h}h`
}

const reportTemplate = `# 本日の作業内容
## 勤務時間
* 勤務時間：[[starttime]] - [[endtime]]
* 休憩：[[resthours]]
* 実働時間：[[actualworkinghours]]

## 本日のタスク
[[dailyprojects]]

## 全てのタスク
[[allprojects]]
`