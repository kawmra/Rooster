import * as React from 'react'
import { ProjectItem } from '../domain/entities'
import Items from './Items'

interface Props {
    item: ProjectItem
    onAddSubItem: (parent: ProjectItem) => void,
    onRemoveItem: (item: ProjectItem) => void,
    onCheckedChanged: (item: ProjectItem, completed: boolean) => void
}

interface State {
    completed: boolean | undefined
}

export default class extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props)
        this.state = {
            completed: props.item.completed
        }
    }

    handleAddSubItem(e: MouseEvent) {
        const { item } = this.props
        this.props.onAddSubItem(item)
    }

    handleRemoveItem(e: MouseEvent) {
        const { item } = this.props
        this.props.onRemoveItem(item)
    }

    handleOnCheckChanged(e: React.ChangeEvent<HTMLInputElement>) {
        const { item } = this.props
        const completed = e.target.checked
        this.props.onCheckedChanged(item, completed)
        this.setState({
            completed
        })
    }

    delegateAddSubItem(parent: ProjectItem) {
        this.props.onAddSubItem(parent)
    }

    delegateRemoveItem(item: ProjectItem) {
        this.props.onRemoveItem(item)
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
            /> : undefined
        return (
            <li key={item.id}>
                {checkbox}
                {item.name}
                <button onClick={this.handleAddSubItem.bind(this, item)}>+</button>
                <button onClick={this.handleRemoveItem.bind(this, item)}>-</button>
                <Items
                    items={item.children}
                    onAddSubItem={this.delegateAddSubItem.bind(this)}
                    onRemoveItem={this.delegateRemoveItem.bind(this)}
                    onCheckedChanged={this.delegateCheckedChanged.bind(this)}
                />
            </li>
        )
    }
}
