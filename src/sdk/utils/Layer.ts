import EntityMap from "./EntityMap"

export default class Layer {
    private readonly context: CanvasRenderingContext2D

    public readonly entitiesMap: EntityMap

    constructor (context: CanvasRenderingContext2D, render: () => void) {
        this.context = context

        this.entitiesMap = new EntityMap(render)
    }
}
