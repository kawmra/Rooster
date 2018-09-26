import { Project } from './entities'

export interface StoreState {
    projects: Project[]
    template: string
}