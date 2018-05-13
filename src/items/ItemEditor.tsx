import * as React from 'react'
import { ProjectItem } from '../domain/entities'
import '../css/modal.css'

interface Props {
    item: ProjectItem
    onSave: (newItem: ProjectItem) => void
    onCancel: (item: ProjectItem) => void
}

interface State {
    name: string
    completed: boolean
    completable: boolean
}

export default class extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props)
        this.state = {
            name: props.item.name,
            completed: props.item.completed || false,
            completable: props.item.completed !== undefined,
        }
    }

    handleCancel(e: MouseEvent) {
        const { item } = this.props
        this.props.onCancel(item)
    }

    handleSave(e: MouseEvent) {
        const { item } = this.props
        const { name, completable, completed } = this.state
        const completedOrUndefined = completable ? completed : undefined
        const newItem = {
            ...item,
            name,
            completed: completedOrUndefined,
        }
        this.props.onSave(newItem)
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
                        <input
                            id="completableCheckbox"
                            type="checkbox"
                            checked={this.state.completable}
                            onChange={(e) => { this.setState({ completable: e.target.checked }) }}
                        />
                        <label htmlFor="completableCheckbox">チェックボックスを表示する</label>
                    </p>
                    {
                        this.state.completable ?
                            <p>
                                <input
                                    id="completedCheckbox"
                                    type="checkbox"
                                    checked={this.state.completed}
                                    onChange={(e) => { this.setState({ completed: e.target.checked }) }}
                                />
                                <label htmlFor="completedCheckbox">完了</label>
                            </p> : undefined
                    }
                    <p>
                        <button onClick={this.handleCancel.bind(this)}>キャンセル</button>
                        <button onClick={this.handleSave.bind(this)}>保存</button>
                    </p>
                </div>
            </div>
        )
    }
}
