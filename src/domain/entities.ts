export class Project {

    readonly id: string
    readonly name: string
    readonly honeyCode: string | null
    readonly items: ProjectItem[]

    constructor(id: string, name: string, honeyCode: string | null = null, items: ProjectItem[] = []) {
        this.id = id
        this.name = name
        this.honeyCode = honeyCode
        this.items = items
    }
}

export interface ProjectItem {

    readonly id: string
    readonly name: string
    readonly children: ProjectItem[]
}

export class Task implements ProjectItem {

    readonly id: string
    readonly name: string
    readonly completed: boolean
    readonly children: ProjectItem[]

    constructor(id: string, name: string, completed: boolean = false, children: ProjectItem[] = []) {
        this.id = id
        this.name = name
        this.children = children
    }
}

export class Note implements ProjectItem {

    readonly id: string
    readonly name: string
    readonly children: ProjectItem[]

    constructor(id: string, name: string, children: ProjectItem[] = []) {
        this.id = id
        this.name = name
        this.children = children
    }
}