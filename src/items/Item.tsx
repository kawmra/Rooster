import * as React from 'react'
import { ProjectItem } from '../domain/entities'
import Items from './Items'
import ItemEditor from './ItemEditor'
import * as UUID from 'uuid/v4'
import '../css/item.css'

interface Props {
    item: ProjectItem
    onAddSubItem: (parent: ProjectItem, item: ProjectItem) => void,
    onRemoveItem: (item: ProjectItem) => void,
    onUpdateItem: (updatedItem: ProjectItem) => void,
    onCheckedChanged: (item: ProjectItem, completed: boolean) => void
}

interface State {
    completed: boolean | undefined
    editingItem: ProjectItem | undefined
    creatingItem: ProjectItem | undefined
    hovered: boolean
}

export default class extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props)
        this.state = {
            completed: props.item.completed,
            editingItem: undefined,
            creatingItem: undefined,
            hovered: false,
        }
    }

    componentWillReceiveProps(props: Props) {
        this.setState({
            completed: props.item.completed
        })
    }

    handleAddSubItem(e: MouseEvent) {
        const id = UUID()
        const newItem = new ProjectItem(id, '')
        this.setState({
            creatingItem: newItem
        })
    }

    handleRemoveItem(e: MouseEvent) {
        const { item } = this.props
        this.props.onRemoveItem(item)
    }

    handleEditItem(e: MouseEvent) {
        const { item } = this.props
        this.setState({
            editingItem: item
        })
    }

    handleOnCheckChanged(e: React.ChangeEvent<HTMLInputElement>) {
        const { item } = this.props
        const completed = e.target.checked
        this.props.onCheckedChanged(item, completed)
        this.setState({
            completed
        })
    }

    handleCancelEditing(item: ProjectItem) {
        this.setState({
            editingItem: undefined
        })
    }

    handleSaveEditing(item: ProjectItem) {
        this.props.onUpdateItem(item)
        this.setState({
            editingItem: undefined
        })
    }

    handleCancelCreating(item: ProjectItem) {
        this.setState({
            creatingItem: undefined
        })
    }

    handleSaveCreating(newItem: ProjectItem) {
        const { item } = this.props
        this.props.onAddSubItem(item, newItem)
        this.setState({
            creatingItem: undefined
        })
    }

    delegateAddSubItem(parent: ProjectItem, item: ProjectItem) {
        this.props.onAddSubItem(parent, item)
    }

    delegateRemoveItem(item: ProjectItem) {
        this.props.onRemoveItem(item)
    }

    delegateUpdateItem(item: ProjectItem) {
        this.props.onUpdateItem(item)
    }

    delegateCheckedChanged(item: ProjectItem, checked: boolean) {
        this.props.onCheckedChanged(item, checked)
    }

    render() {
        const { item } = this.props
        console.log(typeof item)
        const checkbox = item.completed !== undefined
            ? <input
                type="checkbox"
                checked={this.state.completed}
                onChange={this.handleOnCheckChanged.bind(this)}
                style={{ margin: '0 .6em 0 -1.7em' }}
            /> : undefined
        const { editingItem, creatingItem } = this.state
        let itemEditor = undefined
        if (editingItem !== undefined) {
            itemEditor = <ItemEditor
                item={editingItem}
                onCancel={this.handleCancelEditing.bind(this)}
                onSave={this.handleSaveEditing.bind(this)}
            />
        } else if (creatingItem !== undefined) {
            itemEditor = <ItemEditor
                item={creatingItem}
                onCancel={this.handleCancelCreating.bind(this)}
                onSave={this.handleSaveCreating.bind(this)}
            />
        }
        const style = item.completed !== undefined
            ? { listStyle: 'none' }
            : undefined
        const controllerStyle = {
            display: this.state.hovered ? 'inline' : 'none'
        }
        return (
            <li className="item" style={style}>
                <p onMouseEnter={() => { this.setState({ hovered: true }) }}
                    onMouseLeave={() => { this.setState({ hovered: false }) }}>
                    {checkbox}
                    {item.name || "[No Name]"}
                    <span style={controllerStyle}>
                        <button onClick={this.handleAddSubItem.bind(this)}>+</button>
                        <button onClick={this.handleRemoveItem.bind(this)}>-</button>
                        <button onClick={this.handleEditItem.bind(this)}>Edit</button>
                    </span>
                </p>
                <Items
                    items={item.children}
                    onAddSubItem={this.delegateAddSubItem.bind(this)}
                    onRemoveItem={this.delegateRemoveItem.bind(this)}
                    onUpdateItem={this.delegateUpdateItem.bind(this)}
                    onCheckedChanged={this.delegateCheckedChanged.bind(this)}
                />
                {itemEditor}
            </li>
        )
    }
}
