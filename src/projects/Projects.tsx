import * as React from 'react'
import { Project, ProjectItem } from '../domain/entities'
import ProjectComponent from '../project/Project'
import ProjectEditor from '../project/ProjectEditor'
import * as UUID from 'uuid/v4'

export interface StateProps {
    projects: Project[]
}

export interface DispatchProps {
    onAddProject: (project: Project) => void
    onAddProjectItem: (project: Project, item: ProjectItem, parent: ProjectItem | undefined) => void,
    onRemoveProject: (project: Project) => void,
    onRemoveProjectItem: (project: Project, item: ProjectItem) => void,
}

interface Props extends StateProps, DispatchProps {
}

interface State {
    editingProject: Project | undefined
}

export class Projects extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props)
        this.state = {
            editingProject: undefined
        }
    }

    handleAddProject(e: MouseEvent) {
        const id = UUID()
        const name = prompt("what's name?") || `No Name ${id}`
        this.props.onAddProject(new Project(
            id,
            name
        ))
    }

    handleAddProjectItem(project: Project, item: ProjectItem, parent: ProjectItem | undefined) {
        console.log("create child!")
        this.props.onAddProjectItem(project, item, parent)
    }

    handleRemoveProject(project: Project) {
        this.props.onRemoveProject(project)
    }

    handleRemoveProjectItem(project: Project, item: ProjectItem) {
        this.props.onRemoveProjectItem(project, item)
    }

    handleEditProject(project: Project) {
        console.log('handleEditProject')
        this.setState({
            editingProject: project
        })
    }

    handleWriteDailyReport(e: MouseEvent) {

    }

    render() {
        const { projects } = this.props
        const projectsTag = projects.map((project: Project) => {
            return (
                <ProjectComponent
                    project={project}
                    key={project.id}
                    onAddProjectItem={this.handleAddProjectItem.bind(this)}
                    onRemoveProject={this.handleRemoveProject.bind(this)}
                    onRemoveProjectItem={this.handleRemoveProjectItem.bind(this)}
                    onEditProject={this.handleEditProject.bind(this)}
                />
            )
        })
        return (
            <div>
                <section>
                    <header>
                        <h1>Projects</h1>
                        <p>Project count: {projects.length}</p>
                        <button onClick={this.handleAddProject.bind(this)}>Add Project…</button>
                    </header>
                    {projectsTag}
                    <footer>
                        <button onClick={this.handleWriteDailyReport.bind(this)}>日報を書く</button>
                    </footer>
                </section>
                <ProjectEditor
                    project={this.state.editingProject}
                    onCompleteEdit={(project) => {
                        console.log(`onCompleteEdit: ${project.name}`)
                    }}
                />
            </div>
        )
    }
}