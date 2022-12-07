import Exception from "./Exception"

export default class AssetNotFoundException extends Exception {
    constructor (url: string) {
        super(0x4, `Asset from URL ${url} not found or not loaded`)
    }
}
