import * as React from 'react'
import { Project, ProjectItem } from '../domain/entities'
import ProjectComponent from '../project/Project'
import * as UUID from 'uuid/v4'

export interface StateProps {
    projects: Project[]
}

export interface DispatchProps {
    onAddProject: (project: Project) => void
    onAddProjectItem: (project: Project, item: ProjectItem) => void,
    onRemoveProject: (project: Project) => void,
}

interface Props extends StateProps, DispatchProps {
}

export class Projects extends React.Component<Props, {}> {

    constructor(props: Props) {
        super(props)
    }

    handleAddProject(e: MouseEvent) {
        const id = UUID()
        const name = prompt("what's name?") || `No Name ${id}`
        this.props.onAddProject(new Project(
            id,
            name // `Project (${id})`
        ))
    }

    handleAddProjectItem(project: Project, item: ProjectItem) {
        console.log("create child!")
        this.props.onAddProjectItem(project, item)
    }

    handleRemoveProject(project: Project) {
        this.props.onRemoveProject(project)
    }

    handleWriteDailyReport(e: MouseEvent) {
        
    }

    render() {
        const { projects } = this.props
        const projectsTag = projects.map((project: Project) => {
            return (
                <ProjectComponent
                    project={project}
                    onAddProjectItem={this.handleAddProjectItem.bind(this)}
                    onRemoveProject={this.handleRemoveProject.bind(this)}
                />
            )
        })
        return (
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
        )
    }
}