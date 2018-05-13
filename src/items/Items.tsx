import * as React from 'react'
import { ProjectItem } from '../domain/entities'
import Item from './Item'

interface Props {
    items: ProjectItem[]
    onAddSubItem: (parent: ProjectItem) => void,
    onRemoveItem: (item: ProjectItem) => void,
    onCheckedChanged: (item: ProjectItem, completed: boolean) => void,
}

export default class extends React.Component<Props, {}> {

    constructor(props: Props) {
        super(props)
    }

    delegateAddSubItem(parent: ProjectItem) {
        this.props.onAddSubItem(parent)
    }

    delegateRemoveItem(item: ProjectItem) {
        this.props.onRemoveItem(item)
    }

    delegateCheckedChanged(item: ProjectItem, completed: boolean) {
        this.props.onCheckedChanged(item, completed)
    }

    createItemsTag(items: ProjectItem[]) {
        if (items.length == 0) {
            return undefined
        }
        const itemsTag = items.map((item: ProjectItem) => {
            const tag: JSX.Element = (
                <Item
                    key={item.id}
                    item={item}
                    onAddSubItem={this.delegateAddSubItem.bind(this)}
                    onRemoveItem={this.delegateRemoveItem.bind(this)}
                    onCheckedChanged={this.delegateCheckedChanged.bind(this)}
                />
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
        const { items } = this.props
        return (
            <div>
                {this.createItemsTag(items)}
            </div>
        )
    }
}
