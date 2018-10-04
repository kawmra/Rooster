import * as constants from './constants'
import { Project, ProjectItem } from './entities'
import { StoreState } from './stores';

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
    type: constants.UPDATE_PROJECT
}

export interface UpdateProjectItemAction {
    project: Project
    newItem: ProjectItem
    type: constants.UPDATE_PROJECT_ITEM
}

export interface TemplateEditAction {
    newTemplate: string
    type: constants.EDIT_TEMPLATE
}

export interface ImportStoreAction {
    store: StoreState
    type: constants.IMPORT_STORE
}

export interface MoveForwardProjectAction {
    project: Project
    type: constants.MOVE_FORWARD_PROJECT
}

export interface MoveBackwardProjectAction {
    project: Project
    type: constants.MOVE_BACKWARD_PROJECT
}

export type ProjectAction = AddProjectAction
    | AddProjectItemAction
    | RemoveProjectAction
    | RemoveProjectItemAction
    | EditProjectAction
    | UpdateProjectItemAction
    | TemplateEditAction
    | ImportStoreAction
    | MoveForwardProjectAction
    | MoveBackwardProjectAction

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
        type: constants.UPDATE_PROJECT
    }
}

export function updateProjectItem(project: Project, newItem: ProjectItem): UpdateProjectItemAction {
    return {
        project,
        newItem,
        type: constants.UPDATE_PROJECT_ITEM
    }
}

export function editTemplate(newTemplate: string): TemplateEditAction {
    return {
        newTemplate,
        type: constants.EDIT_TEMPLATE
    }
}

export function importStore(store: StoreState): ImportStoreAction {
    return {
        store,
        type: constants.IMPORT_STORE
    }
}

export function moveForwardProject(project: Project): MoveForwardProjectAction {
    return {
        project,
        type: constants.MOVE_FORWARD_PROJECT,
    }
}

export function moveBackwardProject(project: Project): MoveBackwardProjectAction {
    return {
        project,
        type: constants.MOVE_BACKWARD_PROJECT,
    }
}