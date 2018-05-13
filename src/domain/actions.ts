import * as constants from './constants'
import { Project, ProjectItem } from './entities'

export interface AddProjectAction {
    project: Project
    type: constants.ADD_PROJECT
}

export interface AddProjectItemAction {
    parentItem: ProjectItem | undefined
    item: ProjectItem
    project: Project
    type: constants.ADD_PROJECT_ITEM
}

export interface RemoveProjectAction {
    project: Project
    type: constants.REMOVE_PROJECT
}

export interface RemoveProjectItemAction {
    item: ProjectItem
    project: Project
    type: constants.REMOVE_PROJECT_ITEM
}

export interface EditProjectAction {
    project: Project
    type: constants.EDIT_PROJECT
}

export interface UpdateProjectItemAction {
    project: Project
    newItem: ProjectItem
    type: constants.UPDATE_PROJECT_ITEM
}

export type ProjectAction = AddProjectAction
    | AddProjectItemAction
    | RemoveProjectAction
    | RemoveProjectItemAction
    | EditProjectAction
    | UpdateProjectItemAction

export function addProject(project: Project): AddProjectAction {
    return {
        project,
        type: constants.ADD_PROJECT,
    }
}

export function addProjectItem(project: Project, item: ProjectItem, parent: ProjectItem | undefined): AddProjectItemAction {
    return {
        parentItem: parent,
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

export function removeProjectItem(project: Project, item: ProjectItem): RemoveProjectItemAction {
    return {
        project,
        item,
        type: constants.REMOVE_PROJECT_ITEM
    }
}

export function editProject(project: Project): EditProjectAction {
    return {
        project,
        type: constants.EDIT_PROJECT
    }
}

export function updateProjectItem(project: Project, newItem: ProjectItem): UpdateProjectItemAction {
    return {
        project,
        newItem,
        type: constants.UPDATE_PROJECT_ITEM
    }
}