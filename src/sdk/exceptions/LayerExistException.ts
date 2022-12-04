import Exception from "./Exception"

export default class LayerExistException extends Exception {
    constructor (index: number) {
        super(0x2, "Layer already exist at index", String(index))
    }
}
