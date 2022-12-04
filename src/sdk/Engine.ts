import Entity from "./entities/Entity"
import EngineInitException from "./exceptions/EngineInitException"
import Layer from "./utils/Layer"
import LayersMap from "./utils/LayersMap"

export default class Engine {
    private readonly context: CanvasRenderingContext2D

    public readonly layersMap: LayersMap

    constructor () {
        this.render = this.render.bind(this)

        const canvasElement = document.createElement("canvas")

        canvasElement.width = window.innerWidth
        canvasElement.height = window.innerHeight

        const context = canvasElement.getContext("2d")

        if (!context) throw new EngineInitException("Cannot get canvas 2d context")
        this.context = context

        document.body.childNodes.forEach(node => node.remove())
        document.body.append(canvasElement)

        this.layersMap = new LayersMap(this.render)
    }

    public addLayer (index?: number, replace = false) {
        const layer = new Layer(this.context, this.render)

        this.layersMap.addLayer(layer, index, replace)

        return layer
    }

    public addEntity (layer: Layer, entity: Entity) {
        layer.entitiesMap.add(entity)

        return this
    }

    public findEntityLayer (entity: Entity) {
        if (!entity.entityIndex) return false

        for (const [ index, layer ] of this.layersMap.layers) {
            if (layer.entitiesMap.get(entity.entityIndex)) return index
        }

        return false
    }

    public deleteEntity (entity: Entity) {
        if (!entity.entityIndex) return false

        const entityLayer = this.findEntityLayer(entity)

        if (entityLayer === false) return false

        return this.layersMap.getLayer(entityLayer)?.entitiesMap.delete(entity.entityIndex)
    }

    public render () {
        window.requestAnimationFrame(() => {
            this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height)

            this.layersMap.layersOnly.forEach(layer => {
                this.context.beginPath()
                layer.entitiesMap.entities.forEach(entity => entity.draw(this.context))

                this.context.stroke()
            })
        })
    }
}
