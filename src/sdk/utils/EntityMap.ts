import { Random } from "@knownout/lib"
import Entity from "../entities/Entity"
import EntityIndex from "./EntityIndex"

export default class EntityMap {
    readonly #map: Map<string, Entity> = new Map<string, Entity>()

    private readonly render: () => void

    private readonly random = new Random()

    private getIdentifier () {
        return String([ ...this.random.uniqueValues(1, this.random.string.bind(undefined, 16)) ][0])
    }

    constructor (render: () => void) {
        this.render = render
    }

    public add (entity: Entity) {
        const identifier = this.getIdentifier()

        entity.setEntityIndex(new EntityIndex(identifier))
            .setRenderer(this.render)

        this.#map.set(identifier, entity)

        return new EntityIndex(identifier)
    }

    public get (id: EntityIndex) {
        return this.#map.get(id.index)
    }

    public delete (id: EntityIndex) {
        const result = this.#map.delete(id.index)

        this.render()

        return result
    }

    public get entities () {
        return [ ...this.#map.values() ]
    }
}
