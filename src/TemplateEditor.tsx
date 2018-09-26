import * as React from 'react'
import './css/modal.css'

interface Props {
    template: string
    onEdit: (newTemplate: string) => void
    onCancel: () => void
}

interface State {
    template: string
}

export default class extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props)
        this.state = {
            template: props.template
        }
    }

    render() {
        return (
            <div className="modal-container" onClick={() => { this.props.onCancel() }}>
                <textarea
                    onClick={(e) => { e.stopPropagation() }}
                    style={{ width: '80%', height: '80%' }}
                    onChange={(e) => { this.setState({ template: e.target.value }) }}
                    value={this.state.template} />
                <button onClick={(e) => { this.props.onEdit(this.state.template) }}>保存</button>
            </div>
        )
    }
}