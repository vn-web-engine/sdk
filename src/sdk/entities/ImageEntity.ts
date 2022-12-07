import ImageAsset from "../assets/ImageAsset"
import EngineRenderException from "../exceptions/EngineRenderException"
import AbstractEntity from "./AbstractEntity"

export default class ImageEntity extends AbstractEntity {
    public opacity: number = 1

    constructor (x: number, y: number, private imageAsset: ImageAsset, public width?: number, public height?: number) {
        super(x, y)
    }

    public proportionalResizeWidth (width: number) {
        const content = this.imageAsset.getContent()

        const ratio = content.naturalWidth / content.naturalHeight

        this.width = width
        this.height = (this.height ?? content.naturalHeight) * ratio
    }

    public proportionalResizeHeight (height: number) {
        const content = this.imageAsset.getContent()

        const ratio = content.naturalHeight / content.naturalWidth

        this.width = (this.width ?? content.naturalWidth) * ratio
        this.height = height
    }

    public proportionalResize (maxWidth: number, maxHeight: number) {
        const content = this.imageAsset.getContent()

        const ratio = Math.min(maxWidth / content.naturalWidth, maxHeight / content.naturalHeight)

        this.width = content.naturalWidth * ratio
        this.height = content.naturalHeight * ratio
    }

    public override draw (context: CanvasRenderingContext2D): AbstractEntity {
        const content = this.imageAsset.getContent()

        const width = this.width ?? content.naturalWidth
        const height = this.height ?? content.naturalHeight

        // TODO: make shadow context instead of creating new every time
        const tempCanvas = document.createElement("canvas")
        tempCanvas.width = width
        tempCanvas.height = height
        const tempContext = tempCanvas.getContext("2d")

        if (!tempContext) throw new EngineRenderException()

        tempContext.globalAlpha = this.opacity
        tempContext.drawImage(content, this.x, this.y, width, height)

        const imageData = tempContext.getImageData(this.x, this.y, width, height)

        context.putImageData(imageData, this.x, this.y)

        return this
    }
}
