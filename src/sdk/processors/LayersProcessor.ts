import AbstractEntity from "../entities/AbstractEntity"
import Layer from "../utils/Layer"
import LayersMap from "../utils/LayersMap"

export default class LayersProcessor {
    public readonly layersMap: LayersMap

    constructor (private readonly context: CanvasRenderingContext2D, private render: () => void) {
        this.layersMap = new LayersMap(this.render)
    }

    public addLayer (index?: number, replace = false) {
        const layer = new Layer(this.context, this.render)

        this.layersMap.addLayer(layer, index, replace)

        return layer
    }

    public addEntity (layer: Layer, entity: AbstractEntity) {
        layer.entitiesMap.add(entity)

        return this
    }

    public findEntityLayer (entity: AbstractEntity) {
        if (!entity.entityIndex) return false

        for (const [ index, layer ] of this.layersMap.layers) {
            if (layer.entitiesMap.get(entity.entityIndex)) return index
        }

        return false
    }

    public deleteEntity (entity: AbstractEntity) {
        if (!entity.entityIndex) return false

        const entityLayer = this.findEntityLayer(entity)

        if (entityLayer === false) return false

        return this.layersMap.getLayer(entityLayer)?.entitiesMap.delete(entity.entityIndex)
    }
}
