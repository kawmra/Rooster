import { Projects, StateProps, DispatchProps } from './Projects'
import * as actions from '../domain/actions'
import { StoreState } from '../domain/stores'
import { connect, Dispatch } from 'react-redux'
import { Project, ProjectItem } from '../domain/entities'

export function mapStateToProps(state: StoreState): StateProps {
    return {
        projects: state.projects,
        template: state.template,
    }
}

export function mapDispatchToProps(dispatch: Dispatch<actions.ProjectAction>): DispatchProps {
    return {
        onAddProject: (project: Project) => dispatch(actions.addProject(project)),
        onAddProjectItem: (project: Project, item: ProjectItem, parent: ProjectItem | undefined) => dispatch(actions.addProjectItem(project, item, parent)),
        onRemoveProject: (project: Project) => dispatch(actions.removeProject(project)),
        onRemoveProjectItem: (project: Project, item: ProjectItem) => dispatch(actions.removeProjectItem(project, item)),
        onEditProject: (project: Project) => dispatch(actions.editProject(project)),
        onUpdateProjectItem: (project: Project, newItem: ProjectItem) => dispatch(actions.updateProjectItem(project, newItem)),
        onTemplateEdit: (newTemplate: string) => dispatch(actions.editTemplate(newTemplate)),
        onImportStore: (store: StoreState) => dispatch(actions.importStore(store)),
        onMoveForwardProject: (project: Project) => dispatch(actions.moveForwardProject(project)),
        onMoveBackwardProject: (project: Project) => dispatch(actions.moveBackwardProject(project))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Projects)