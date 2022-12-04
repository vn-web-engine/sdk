export default class Exception {
    public readonly title: string;

    public readonly message: string

    constructor (code: number, title: string, ...message: string[]) {
        if (String(code)[1] !== "x") throw new Error("Invalid exception code format")

        this.title = title.trim()
        this.message = message.join(" ").trim()
    }
}
