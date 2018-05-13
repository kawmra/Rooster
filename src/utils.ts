import { Project, ProjectItem } from './domain/entities'

export function filterDailyProject(projects: Project[]): Project[] {
    return projects.map((project) => {
        const filteredItems = filterDailyTask(project.items)
        if (filteredItems.length > 0) {
            return { ...project, items: filteredItems }
        } else {
            return undefined
        }
    }).filter((project) => { return project !== undefined }) as Project[]
}

export function filterDailyTask(items: ProjectItem[]): ProjectItem[] {
    const list: ProjectItem[] = []
    items.forEach((item) => {
        const filteredChildren = filterDailyTask(item.children)
        if (item.isDailyTask || filteredChildren.length > 0) {
            list.push({ ...item, children: filteredChildren })
        }
    })
    return list
}