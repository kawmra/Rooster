import * as constants from './constants'
import { Project, ProjectItem } from './entities'

export interface AddProjectAction {
    project: Project
    type: constants.ADD_PROJECT
}

export interface AddProjectItemAction {
    item: ProjectItem
    project: Project
    type: constants.ADD_PROJECT_ITEM
}

export interface RemoveProjectAction {
    project: Project
    type: constants.REMOVE_PROJECT
}

export type ProjectAction = AddProjectAction | AddProjectItemAction | RemoveProjectAction

export function addProject(project: Project): AddProjectAction {
    return {
        project,
        type: constants.ADD_PROJECT,
    }
}

export function addProjectItem(project: Project, item: ProjectItem): AddProjectItemAction {
    return {
        item,
        project,
        type: constants.ADD_PROJECT_ITEM,
    }
}

export function removeProject(project: Project): RemoveProjectAction {
    return {
        project,
        type: constants.REMOVE_PROJECT
    }
}