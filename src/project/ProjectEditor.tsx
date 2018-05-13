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
}

export default class extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props)
        this.state = {
            name: props.project.name
        }
    }

    handleCancel(e: MouseEvent) {
        this.props.onCancel(this.props.project)
    }

    handleSave(e: MouseEvent) {
        const newProject = {
            ...this.props.project,
            name: this.state.name
        }
        this.props.onSave(newProject)
    }

    render() {
        return (
            <div className='modal-container' onClick={this.handleCancel.bind(this)}>
                <div className='modal-edit_project' onClick={(e) => { e.stopPropagation() }}>
                    <input
                        type="text"
                        value={this.state.name}
                        onChange={(e) => { this.setState({ name: e.target.value }) }}
                        autoFocus />
                    <p>
                        <button onClick={this.handleCancel.bind(this)}>キャンセル</button>
                        <button onClick={this.handleSave.bind(this)}>保存</button>
                    </p>
                </div>
            </div>
        )
    }
}
