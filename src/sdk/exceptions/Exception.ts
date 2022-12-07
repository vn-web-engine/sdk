export default class Exception {
    public readonly title: string;

    public readonly message: string

    constructor (public readonly code: number, title: string, ...message: string[]) {
        this.title = title.trim()
        this.message = message.join(" ").trim()
    }
}
