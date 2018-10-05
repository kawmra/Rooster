import * as React from 'react'
import { Project, ProjectItem } from '../domain/entities'
import Items from '../items/Items'
import ItemEditor from '../items/ItemEditor'
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
    onMoveForwardProject?: (project: Project) => void,
    onMoveBackwardProject?: (project: Project) => void,
}

interface Props extends StateProps, DispatchProps {
}

interface State {
    creatingItem: ProjectItem | undefined
}

export default class extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props)
        this.state = {
            creatingItem: undefined
        }
    }

    handleAddProjectItem(e: MouseEvent) {
        const id = UUID()
        const newItem = new ProjectItem(id, '')
        this.setState({
            creatingItem: newItem
        })
    }

    handleSaveCreatingItem(item: ProjectItem) {
        const { project } = this.props
        this.props.onAddProjectItem(project, item, undefined)
        this.setState({
            creatingItem: undefined
        })
    }

    handleCancelCreatingItem(item: ProjectItem) {
        this.setState({
            creatingItem: undefined
        })
    }

    delegateAddSubItem(parent: ProjectItem, item: ProjectItem) {
        const { project } = this.props
        this.props.onAddProjectItem(project, item, parent)
    }

    handleRemoveProject(e: MouseEvent) {
        const { project } = this.props
        if (!confirm(`プロジェクト "${project.name}" を削除してもよろしいですか？\nこの操作は取り消せません。`)) {
            return
        }
        this.props.onRemoveProject(project)
    }

    delegateRemoveItem(item: ProjectItem) {
        const { project } = this.props
        if (item.children.length > 0 && !confirm(`タスク "${item.name}" を削除するとその全てのサブタスクも削除されます。よろしいですか？\nこの操作は取り消せません。`)) {
            return
        }
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

    handleMoveForwardProject(e: MouseEvent) {
        const { project } = this.props
        this.props.onMoveForwardProject && this.props.onMoveForwardProject(project)
    }

    handleMoveBackwardProject(e: MouseEvent) {
        const { project } = this.props
        this.props.onMoveBackwardProject && this.props.onMoveBackwardProject(project)
    }

    render() {
        const { name, honeyCode, items } = this.props.project
        console.log(`render project! name: ${name}, items count: ${items.length}`)
        const title = honeyCode ? `【${honeyCode}】${name}` : name
        const { creatingItem } = this.state
        const createItemEditor = creatingItem !== undefined
            ? <ItemEditor
                item={creatingItem}
                onCancel={this.handleCancelCreatingItem.bind(this)}
                onSave={this.handleSaveCreatingItem.bind(this)}
            /> : undefined
        return (
            <section>
                <header>
                    <h1>
                        {title}
                        <button onClick={this.handleAddProjectItem.bind(this)}>+</button>
                        <button onClick={this.handleRemoveProject.bind(this)}>-</button>
                        <button onClick={this.handleEditProject.bind(this)}>Edit</button>
                        {this.props.onMoveForwardProject && <button onClick={this.handleMoveForwardProject.bind(this)}>↑</button>}
                        {this.props.onMoveBackwardProject && <button onClick={this.handleMoveBackwardProject.bind(this)}>↓</button>}
                    </h1>
                </header>
                <Items
                    items={items}
                    onAddSubItem={this.delegateAddSubItem.bind(this)}
                    onRemoveItem={this.delegateRemoveItem.bind(this)}
                    onUpdateItem={this.delegateUpdateItem.bind(this)}
                    onCheckedChanged={this.delegateCheckedChanged.bind(this)}
                />
                {createItemEditor}
            </section>
        )
    }
}
