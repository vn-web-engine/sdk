import Exception from "./Exception"

export default class LayerNotExistException extends Exception {
    constructor (index: number) {
        super(0x3, `Layer at ${index} index not exist`)
    }
}
