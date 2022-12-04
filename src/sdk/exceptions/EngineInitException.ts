import Exception from "./Exception"

export default class EngineInitException extends Exception {
    constructor (...message: string[]) {
        super(0x1, "Exception while initializing engine", ...message)
    }
}
