import AbstractEntity from "./AbstractEntity"

export default class Circle extends AbstractEntity {
    constructor (x: number, y: number, public radius: number) {
        super(x, y)
    }

    public override draw (context: CanvasRenderingContext2D): AbstractEntity {
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2)

        return this
    }
}
