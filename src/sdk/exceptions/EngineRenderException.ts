import Exception from "./Exception"

export default class EngineRenderException extends Exception {
    constructor () {
        super(0x5, "Engine returned error while rendering next frame")
    }
}
