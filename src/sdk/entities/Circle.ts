import Entity from "./Entity"

export default class Circle extends Entity {
    constructor (x: number, y: number, public radius: number) {
        super(x, y)

        this.radius = radius
    }

    public override draw (context: CanvasRenderingContext2D): Entity {
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2)

        return this
    }
}
