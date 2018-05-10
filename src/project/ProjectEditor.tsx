import * as React from 'react'
import { Project } from '../domain/entities'

interface Props {
    project: Project | undefined
    onCompleteEdit: (newProject: Project) => void
}

interface State {
    enabled: boolean
    name: string
}

export default class extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props)
        this.state = this.propsToState(props)
    }

    componentWillReceiveProps(props: Props) {
        this.setState(this.propsToState(props))
    }

    propsToState(props: Props): State {
        return {
            enabled: props.project !== undefined,
            name: props.project !== undefined ? props.project.name : '[invalid]',
        }
    }

    handleCancel(e: MouseEvent) {
        this.setState({
            enabled: false
        })
    }

    handleSave(e: MouseEvent) {
        this.setState({
            enabled: false
        })
    }

    render() {
        const wrapperStyle: React.CSSProperties = {
            width: '100vw',
            height: '100vh',
            display: this.state.enabled ? 'block' : 'none',
            position: 'fixed',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            margin: 'auto',
        }
        const contentStyle: React.CSSProperties = {
            position: 'absolute',
            backgroundColor: '#ffffff',
            width: '80vw',
            height: '80vh',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            margin: 'auto',
        }
        return (
            <div style={wrapperStyle}>
                <div style={contentStyle}>
                    <input
                        type="text"
                        value={this.state.name}
                        onChange={(e) => { this.setState({ name: e.target.value }) }} /><br />
                    <p>
                        <button onClick={this.handleCancel.bind(this)}>キャンセル</button>
                        <button onClick={this.handleSave.bind(this)}>保存</button>
                    </p>
                </div>
            </div>
        )
    }
}
