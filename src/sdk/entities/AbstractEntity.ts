import EntityIndex from "../utils/EntityIndex"

abstract class AbstractEntity {
    private index?: EntityIndex

    protected render?: () => void

    protected constructor (public x: number, public y: number) {
        return new Proxy(this, {
            get: (target: AbstractEntity, key: keyof AbstractEntity) => target[key],
            set: (target: AbstractEntity, key: keyof AbstractEntity, value: any, receiver: any) => {
                this.render?.()

                return Reflect.set(target, key, value, receiver)
            }
        })
    }

    public setRenderer (renderer: () => void): AbstractEntity {
        this.render = renderer

        return this
    }

    public setEntityIndex (index: EntityIndex): AbstractEntity {
        this.index = index

        return this
    }

    public get entityIndex () { return this.index }

    public abstract draw (context: CanvasRenderingContext2D): AbstractEntity
}

export default AbstractEntity
