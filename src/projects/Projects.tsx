import * as React from 'react'
import { Project, ProjectItem } from '../domain/entities'
import ProjectComponent from '../project/Project'
import ProjectEditor from '../project/ProjectEditor'
import ReportGenerator from '../ReportGenerator'
import TemplateEditor from '../TemplateEditor'
import * as UUID from 'uuid/v4'
import * as utils from '../utils'

export interface StateProps {
    projects: Project[]
    template: string
}

export interface DispatchProps {
    onAddProject: (project: Project) => void
    onAddProjectItem: (project: Project, item: ProjectItem, parent: ProjectItem | undefined) => void,
    onRemoveProject: (project: Project) => void,
    onRemoveProjectItem: (project: Project, item: ProjectItem) => void,
    onEditProject: (project: Project) => void,
    onUpdateProjectItem: (project: Project, newItem: ProjectItem) => void,
    onTemplateEdit: (newTemplate: string) => void
}

interface Props extends StateProps, DispatchProps {
}

interface State {
    editingProject: Project | undefined
    creatingProject: Project | undefined
    generatedReport: string | undefined
    templateEditing: boolean
}

export class Projects extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props)
        this.state = {
            editingProject: undefined,
            creatingProject: undefined,
            generatedReport: undefined,
            templateEditing: false
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

    handleReportGenerated(markdown: string) {
        this.setState({
            generatedReport: markdown
        })
    }

    handleCloseGeneratedReport() {
        this.setState({
            generatedReport: undefined
        })
    }

    handleOnTemplateEdit(newTemplate: string) {
        this.props.onTemplateEdit(newTemplate)
        this.setState({
            templateEditing: false
        })
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
        const dailyProjectsTag = utils.filterDailyProject(projects).map((project) => {
            return <ProjectComponent
                project={project}
                key={project.id}
                onAddProjectItem={this.handleAddProjectItem.bind(this)}
                onRemoveProject={this.handleRemoveProject.bind(this)}
                onRemoveProjectItem={this.handleRemoveProjectItem.bind(this)}
                onEditProject={this.handleEditProject.bind(this)}
                onUpdateProjectItem={this.handleUpdateItem.bind(this)}
            />
        })
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
                    <ReportGenerator
                        projects={projects}
                        template={this.props.template}
                        onGenerated={this.handleReportGenerated.bind(this)}
                    />
                </footer>
                {projectEditor}
                {this.state.generatedReport && (
                    <div className="modal-container" onClick={this.handleCloseGeneratedReport.bind(this)}>
                        <textarea
                            onClick={(e) => { e.stopPropagation() }}
                            style={{ width: '80%', height: '80%' }}
                            value={this.state.generatedReport}
                            readOnly={true}
                        />
                    </div>
                )}
                <button onClick={(e) => { this.setState({ templateEditing: true }) }}>テンプレートを編集</button>
                {this.state.templateEditing &&
                    <TemplateEditor
                        template={this.props.template}
                        onEdit={this.handleOnTemplateEdit.bind(this)}
                        onCancel={() => { this.setState({ templateEditing: false }) }}
                    />
                }
            </div>
        )
    }
}
