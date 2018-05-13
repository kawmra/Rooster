import * as React from 'react'
import { Project } from '../domain/entities'
import '../css/modal.css'

interface Props {
    project: Project
    onSave: (newProject: Project) => void
    onCancel: (project: Project) => void
}

interface State {
    name: string
    honeyCode: string
}

export default class extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props)
        this.state = {
            name: props.project.name,
            honeyCode: props.project.honeyCode || '',
        }
    }

    handleCancel(e: MouseEvent) {
        this.props.onCancel(this.props.project)
    }

    handleSave(e: MouseEvent) {
        const honeyCode = this.state.honeyCode !== '' ? this.state.honeyCode : undefined
        const newProject = {
            ...this.props.project,
            name: this.state.name,
            honeyCode,
        }
        this.props.onSave(newProject)
    }

    render() {
        return (
            <div className='modal-container' onClick={this.handleCancel.bind(this)}>
                <div className='modal-edit_project' onClick={(e) => { e.stopPropagation() }}>
                    <p>
                        <label htmlFor="nameText">名前: </label>
                        <input
                            id="nameText"
                            type="text"
                            value={this.state.name}
                            onChange={(e) => { this.setState({ name: e.target.value }) }}
                            autoFocus
                        />
                    </p>
                    <p>
                        <label htmlFor="honeyCodeText">案件コード: </label>
                        <input
                            id="honeyCodeText"
                            type="text"
                            value={this.state.honeyCode}
                            onChange={(e) => { this.setState({ honeyCode: e.target.value }) }}
                        />
                    </p>
                    <p>
                        <button onClick={this.handleCancel.bind(this)}>キャンセル</button>
                        <button onClick={this.handleSave.bind(this)}>保存</button>
                    </p>
                </div>
            </div>
        )
    }
}
