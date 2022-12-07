import LayerExistException from "../exceptions/LayerExistException"
import LayerNotExistException from "../exceptions/LayerNotExistException"
import Layer from "./Layer"

export default class LayersMap {
    readonly #map: Map<number, Layer> = new Map<number, Layer>()

    private readonly render: () => void

    constructor (render: () => void) {
        this.render = render
    }

    public addLayer (layer: Layer, index?: number, replace = false): number {
        if (!replace && typeof index === "number" && this.#map.get(index)) throw new LayerExistException(index)

        if (typeof index === "number") this.#map.set(index, layer)
        else this.#map.set(this.#map.size, layer)

        this.render()

        if (typeof index === "number") return index
        return this.#map.size - 1
    }

    public deleteLayer (index: number, shift = false): boolean {
        let result = this.#map.delete(index)

        if (!shift) return result

        for (let i = index; i < this.#map.size - 1; i++) {
            const next = this.#map.get(i + 1)
            if (!next) continue

            this.#map.set(i, next)
        }

        result = this.#map.delete(this.#map.size - 1)

        this.render()

        return result
    }

    public swapLayers (firstIndex: number, secondIndex: number): boolean {
        const firstLayer = this.#map.get(firstIndex)

        const secondLayer = this.#map.get(secondIndex)

        if (!firstLayer) {
            console.warn(new LayerNotExistException(firstIndex))

            return false
        }
        if (!secondLayer) {
            console.warn(new LayerNotExistException(secondIndex))

            return false
        }

        this.#map.set(firstIndex, secondLayer)
        this.#map.set(secondIndex, firstLayer)

        return true
    }

    public getLayer (index: number) { return this.#map.get(index) }

    public get layersOnly () { return [ ...this.#map.values() ] }

    public get layers () { return [ ...this.#map.entries() ] }
}
