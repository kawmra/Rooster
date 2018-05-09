import { ProjectAction } from '../domain/actions'
import { StoreState } from '../domain/stores'
import { Project } from '../domain/entities'
import { ADD_PROJECT, ADD_PROJECT_ITEM, REMOVE_PROJECT } from '../domain/constants'

export function ProjectsReducer(state: StoreState, action: ProjectAction): StoreState {
  switch (action.type) {
    case ADD_PROJECT: {
      const newProjects: Project[] = [...state.projects, action.project]
      console.log(newProjects)
      return { ...state, projects: newProjects };
    }
    case ADD_PROJECT_ITEM: {
      const targetProject = findProject(state.projects, action.project.id)
      if (targetProject === null) {
        console.log(`No such project '${action.project.id}' found.`)
        return state
      }
      console.log(`target is ${targetProject.id}`)
      const newProject: Project = { ...targetProject, items: [...targetProject.items, action.item] }
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
    case REMOVE_PROJECT: {
      const newProjects = state.projects.filter((project) => {
        return project.id !== action.project.id
      })
      return { ...state, projects: newProjects }
    }
  }
  return state;
}

function findProject(projects: Project[], id: string): Project | null {
  return projects.filter((project) => {
    return project.id === id
  })[0]
}