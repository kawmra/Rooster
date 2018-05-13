import * as React from 'react'
import { Project, ProjectItem } from '../domain/entities'
import Items from '../items/Items'
import * as UUID from 'uuid/v4'

export interface StateProps {
    project: Project
}

export interface DispatchProps {
    onAddProjectItem: (project: Project, item: ProjectItem, parent: ProjectItem | undefined) => void,
    onRemoveProject: (project: Project) => void,
    onRemoveProjectItem: (project: Project, item: ProjectItem) => void,
    onEditProject: (project: Project) => void,
    onUpdateProjectItem: (project: Project, newItem: ProjectItem) => void,
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
        const item = new ProjectItem(id, name)
        this.props.onAddProjectItem(project, item, undefined)
    }

    delegateAddSubItem(parent: ProjectItem, item: ProjectItem) {
        const { project } = this.props
        this.props.onAddProjectItem(project, item, parent)
    }

    handleRemoveProject(e: MouseEvent) {
        const { project } = this.props
        this.props.onRemoveProject(project)
    }

    delegateRemoveItem(item: ProjectItem) {
        const { project } = this.props
        this.props.onRemoveProjectItem(project, item)
    }

    delegateUpdateItem(item: ProjectItem) {
        const { project } = this.props
        this.props.onUpdateProjectItem(project, item)
    }

    delegateCheckedChanged(item: ProjectItem, completed: boolean) {
        const { project } = this.props
        const newItem = { ...item, completed }
        this.props.onUpdateProjectItem(project, newItem)
    }

    handleEditProject(e: MouseEvent) {
        const { project } = this.props
        this.props.onEditProject(project)
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
                        <button onClick={this.handleEditProject.bind(this)}>Edit</button>
                    </h1>
                </header>
                <Items
                    items={items}
                    onAddSubItem={this.delegateAddSubItem.bind(this)}
                    onRemoveItem={this.delegateRemoveItem.bind(this)}
                    onUpdateItem={this.delegateUpdateItem.bind(this)}
                    onCheckedChanged={this.delegateCheckedChanged.bind(this)}
                />
            </section>
        )
    }
}
