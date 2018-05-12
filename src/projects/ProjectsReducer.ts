import { ProjectAction } from '../domain/actions'
import { StoreState } from '../domain/stores'
import { Project, ProjectItem } from '../domain/entities'
import * as constants from '../domain/constants'

export function ProjectsReducer(state: StoreState, action: ProjectAction): StoreState {
  switch (action.type) {
    case constants.ADD_PROJECT: {
      const newProjects: Project[] = [...state.projects, action.project]
      console.log(newProjects)
      return { ...state, projects: newProjects };
    }
    case constants.ADD_PROJECT_ITEM: {
      const targetProject = findProject(state.projects, action.project.id)
      if (targetProject === null) {
        console.log(`No such project '${action.project.id}' found.`)
        return state
      }
      console.log(`target is ${targetProject.id}`)
      const newItems = action.parentItem === undefined
        ? [...targetProject.items, action.item]
        : deepCopyInsert(targetProject.items, action.parentItem, action.item)
      const newProject: Project = { ...targetProject, items: newItems }
      const newProjects: Project[] = []
      state.projects.forEach((project) => {
        if (project.id === action.project.id) {
          newProjects.push(newProject)
        } else {
          newProjects.push(project)
        }
      })
      return { ...state, projects: newProjects }
    }
    case constants.REMOVE_PROJECT: {
      const newProjects = state.projects.filter((project) => {
        return project.id !== action.project.id
      })
      return { ...state, projects: newProjects }
    }
    case constants.REMOVE_PROJECT_ITEM: {
      const newItems = deepCopyExclude(action.project.items, action.item)
      const newProjects = state.projects.map((project) => {
        if (project.id !== action.project.id) {
          return project
        } else {
          return { ...project, items: newItems }
        }
      })
      return { ...state, projects: newProjects }
    }
    case constants.EDIT_PROJECT:
      console.log('EDIT_PROJECT')
      const newProjects = state.projects.map((project) => {
        if (project.id !== action.project.id) {
          return project
        } else {
          return {
            ...project,
            name: action.project.name
          }
        }
      })
      return { ...state, projects: newProjects }
  }
  return state
}

function findProject(projects: Project[], id: string): Project | null {
  return projects.filter((project) => {
    return project.id === id
  })[0]
}

function deepCopyExclude(items: ProjectItem[], excludeItem: ProjectItem): ProjectItem[] {
  const list: ProjectItem[] = []
  items.forEach((item) => {
    if (item.id !== excludeItem.id) {
      const newChildren = deepCopyExclude(item.children, excludeItem)
      const newItem = { ...item, children: newChildren }
      list.push(newItem)
    }
  })
  return list
}

function deepCopyInsert(items: ProjectItem[], parentItem: ProjectItem, insertItem: ProjectItem): ProjectItem[] {
  const list: ProjectItem[] = []
  items.forEach((item) => {
    const newChildren = deepCopyInsert(item.children, parentItem, insertItem)
    if (item.id === parentItem.id) {
      newChildren.push(insertItem)
    }
    const newItem = { ...item, children: newChildren }
    list.push(newItem)
  })
  return list
}