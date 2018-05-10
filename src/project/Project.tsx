import * as React from 'react'
import { Project, ProjectItem, Task } from '../domain/entities'
import * as UUID from 'uuid/v4'

export interface StateProps {
    project: Project
}

export interface DispatchProps {
    onAddProjectItem: (project: Project, item: ProjectItem, parent: ProjectItem | undefined) => void,
    onRemoveProject: (project: Project) => void,
    onRemoveProjectItem: (project: Project, item: ProjectItem) => void,
}

interface Props extends StateProps, DispatchProps {
}

export default class extends React.Component<Props, {}> {

    constructor(props: Props) {
        super(props)
    }

    handleAddProjectItem(e: MouseEvent) {
        const { project } = this.props
        const id = UUID()
        const name = prompt('item name?') || `Item ${id}`
        const item = new Task(id, name)
        this.props.onAddProjectItem(project, item, undefined)
    }

    handleAddProjectSubItem(item: ProjectItem, e: MouseEvent) {
        const { project } = this.props
        const id = UUID()
        const name = prompt('item name?') || `Item ${id}`
        const subItem = new Task(id, name)
        this.props.onAddProjectItem(project, subItem, item)
    }

    handleRemoveProject(e: MouseEvent) {
        const { project } = this.props
        this.props.onRemoveProject(project)
    }

    handleRemoveProjectItem(item: ProjectItem, e: MouseEvent) {
        const { project } = this.props
        this.props.onRemoveProjectItem(project, item)
    }

    createItemsTag(items: ProjectItem[]) {
        if (items.length == 0) {
            return undefined
        }
        const itemsTag = items.map((item: ProjectItem) => {
            const tag: JSX.Element = (
                <li key={item.id}>
                    {item.name}
                    <button onClick={this.handleAddProjectSubItem.bind(this, item)}>+</button>
                    <button onClick={this.handleRemoveProjectItem.bind(this, item)}>-</button>
                    {this.createItemsTag(item.children)}
                </li>
            )
            return tag
        })
        return (
            <ul>
                {itemsTag}
            </ul>
        )
    }

    render() {
        const { name, honeyCode, items } = this.props.project
        console.log(`render project! name: ${name}, items count: ${items.length}`)
        const title = honeyCode ? `【${honeyCode}】${name}` : name
        return (
            <section>
                <header>
                    <h1>
                        {title}
                        <button onClick={this.handleAddProjectItem.bind(this)}>+</button>
                        <button onClick={this.handleRemoveProject.bind(this)}>-</button>
                    </h1>
                </header>
                {this.createItemsTag(items)}
            </section>
        )
    }
}
