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
    onEditProject: (project: Project) => void,
    onUpdateProjectItem: (project: Project, newItem: ProjectItem) => void,
}

interface Props extends StateProps, DispatchProps {
}

interface State {
    editingProject: Project | undefined
    creatingProject: Project | undefined
}

export class Projects extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props)
        this.state = {
            editingProject: undefined,
            creatingProject: undefined,
        }
    }

    handleAddProject(e: MouseEvent) {
        const id = UUID()
        const newProject = new Project(id, '')
        this.setState({
            creatingProject: newProject
        })
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

    handleCancelEditProject(project: Project) {
        this.setState({
            editingProject: undefined
        })
    }

    handleSaveEditProject(newProject: Project) {
        this.props.onEditProject(newProject)
        this.setState({
            editingProject: undefined
        })
    }

    handleCancelCreatingProject(project: Project) {
        this.setState({
            creatingProject: undefined
        })
    }

    handleSaveCreatingProject(newProject: Project) {
        this.props.onAddProject(newProject)
        this.setState({
            creatingProject: undefined
        })
    }

    handleUpdateItem(project: Project, newItem: ProjectItem) {
        this.props.onUpdateProjectItem(project, newItem)
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
                    onUpdateProjectItem={this.handleUpdateItem.bind(this)}
                />
            )
        })
        const dailyProjectsTag = projects.map((project) => {
            const filteredItems = filterDailyTask(project.items)
            if (filteredItems.length > 0) {
                const filteredProject = { ...project, items: filteredItems }
                return <ProjectComponent
                    project={filteredProject}
                    key={project.id}
                    onAddProjectItem={this.handleAddProjectItem.bind(this)}
                    onRemoveProject={this.handleRemoveProject.bind(this)}
                    onRemoveProjectItem={this.handleRemoveProjectItem.bind(this)}
                    onEditProject={this.handleEditProject.bind(this)}
                    onUpdateProjectItem={this.handleUpdateItem.bind(this)}
                />
            } else {
                return undefined
            }
        }).filter((project) => { return project !== undefined })
        const { editingProject, creatingProject } = this.state
        let projectEditor = undefined
        if (editingProject !== undefined) {
            projectEditor = <ProjectEditor
                project={editingProject}
                onSave={this.handleSaveEditProject.bind(this)}
                onCancel={this.handleCancelEditProject.bind(this)}
            />
        } else if (creatingProject !== undefined) {
            projectEditor = <ProjectEditor
                project={creatingProject}
                onSave={this.handleSaveCreatingProject.bind(this)}
                onCancel={this.handleCancelCreatingProject.bind(this)}
            />
        }
        return (
            <div>
                <section>
                    <header>
                        <h1>今日のタスク ({dailyProjectsTag.length})</h1>
                    </header>
                    {dailyProjectsTag}
                </section>
                <section>
                    <header>
                        <h1>全てのタスク ({projects.length})</h1>
                        <button onClick={this.handleAddProject.bind(this)}>プロジェクトを追加…</button>
                    </header>
                    {projectsTag}
                </section>
                <footer>
                    <button onClick={this.handleWriteDailyReport.bind(this)}>日報を書く</button>
                </footer>
                {projectEditor}
            </div>
        )
    }
}

function filterDailyTask(items: ProjectItem[]): ProjectItem[] {
    const list: ProjectItem[] = []
    items.forEach((item) => {
        const filteredChildren = filterDailyTask(item.children)
        if (item.isDailyTask || filteredChildren.length > 0) {
            list.push({ ...item, children: filteredChildren })
        }
    })
    return list
}
