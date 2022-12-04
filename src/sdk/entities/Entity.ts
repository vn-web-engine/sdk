import EntityIndex from "../utils/EntityIndex"

abstract class Entity {
    private index?: EntityIndex

    protected render?: () => void

    protected constructor (public x: number, public y: number) {
        return new Proxy(this, {
            get: (target: Entity, key: keyof Entity) => target[key],
            set: (target: Entity, key: keyof Entity, value: any, receiver: any) => {
                this.render?.()

                return Reflect.set(target, key, value, receiver)
            }
        })
    }

    public setRenderer (renderer: () => void): Entity {
        this.render = renderer

        return this
    }

    public setEntityIndex (index: EntityIndex): Entity {
        this.index = index

        return this
    }

    public get entityIndex () { return this.index }

    public abstract draw (context: CanvasRenderingContext2D): Entity
}

export default Entity
