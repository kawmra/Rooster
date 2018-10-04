import { ProjectAction } from '../domain/actions'
import { StoreState } from '../domain/stores'
import { Project, ProjectItem } from '../domain/entities'
import * as constants from '../domain/constants'

export function ProjectsReducer(state: StoreState, action: ProjectAction): StoreState {
  console.log(`ProjectReducer, action type: ${action.type}`)
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
      const newProjects = state.projects.map((project) => {
        if (project.id !== action.project.id) {
          return project
        } else {
          const newItems = deepCopyExclude(project.items, action.item)
          return { ...project, items: newItems }
        }
      })
      return { ...state, projects: newProjects }
    }
    case constants.UPDATE_PROJECT: {
      console.log('UPDATE_PROJECT')
      const newProjects = state.projects.map((project) => {
        if (project.id !== action.project.id) {
          return project
        } else {
          return action.project
        }
      })
      return { ...state, projects: newProjects }
    }
    case constants.UPDATE_PROJECT_ITEM: {
      console.log('UPDATE_PROJECT_ITEM')
      const newProjects = state.projects.map((project) => {
        if (project.id === action.project.id) {
          const newItems = deepCopyUpdate(project.items, action.newItem)
          return { ...project, items: newItems }
        } else {
          return project
        }
      })
      return { ...state, projects: newProjects }
    }
    case constants.EDIT_TEMPLATE: {
      return { ...state, template: action.newTemplate }
    }
    case constants.IMPORT_STORE: {
      return { ...state, ...action.store }
    }
    case constants.MOVE_FORWARD_PROJECT: {
      const sortedPorjects = sortProject(state.projects, action.project.id, SortType.up)
      return { ...state, projects: sortedPorjects }
    }
    case constants.MOVE_BACKWARD_PROJECT: {
      console.log(state.projects)
      const sortedPorjects = sortProject(state.projects, action.project.id, SortType.down)
      return { ...state, projects: sortedPorjects }
    }
  }
  return state
}

enum SortType {
  up = 'up',
  down = 'down'
}

function sortProject(projects: Project[], id: string, type: SortType): Project[] {
  const index = projects.findIndex(project => {
    return project.id === id
  })
  if (type === SortType.up && 0 < index) {
    projects.splice(index - 1, 2, projects[index], projects[index - 1])
  }
  if (type === SortType.down && index < projects.length) {
    projects.splice(index, 2, projects[index + 1], projects[index])
  }
  const srotedProject = projects.filter(v => v) // undefined を projects から削除
  return srotedProject
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

function deepCopyUpdate(items: ProjectItem[], updatedItem: ProjectItem): ProjectItem[] {
  const list: ProjectItem[] = []
  items.forEach((item) => {
    if (item.id === updatedItem.id) {
      // children は更新しない
      list.push({ ...updatedItem, children: item.children })
    } else {
      const newChildren = deepCopyUpdate(item.children, updatedItem)
      const newItem = { ...item, children: newChildren }
      list.push(newItem)
    }
  })
  return list
}
