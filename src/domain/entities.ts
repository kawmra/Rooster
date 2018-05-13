export class Project {

    readonly id: string
    readonly name: string
    readonly honeyCode: string | undefined
    readonly items: ProjectItem[]

    constructor(id: string, name: string, honeyCode: string | undefined = undefined, items: ProjectItem[] = []) {
        this.id = id
        this.name = name
        this.honeyCode = honeyCode
        this.items = items
    }
}

export class ProjectItem {

    readonly id: string
    readonly name: string
    readonly completed: boolean | undefined
    readonly children: ProjectItem[]
    readonly isDailyTask: boolean

    constructor(id: string, name: string, completed: boolean | undefined = undefined, children: ProjectItem[] = []) {
        this.id = id
        this.name = name
        this.completed = completed
        this.children = children
        this.isDailyTask = false
    }
}