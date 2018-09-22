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
        if (item.isDailyTask) {
            // 自身が今日のタスクである場合は全てのサブタスクも今日のタスクとみなす
            list.push(item)
        } else {
            const filteredChildren = filterDailyTask(item.children)
            if (filteredChildren.length > 0) {
                // サブタスクが一つ以上今日のタスクであれば自身も表示する（階層構造が壊れるから）
                list.push({ ...item, children: filteredChildren })
            }
        }
    })
    return list
}