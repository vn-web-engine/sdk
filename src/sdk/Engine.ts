import AbstractAsset from "./assets/AbstractAsset"
import AssetNotFoundException from "./exceptions/AssetNotFoundException"
import EngineInitException from "./exceptions/EngineInitException"
import AssetsProcessor from "./processors/AssetsProcessor"
import LayersProcessor from "./processors/LayersProcessor"

type TAssetsLoadingUpdateCallback = (assetData: { asset: AbstractAsset, name: string }, loadingData: {
    current: number, total: number, percentsLoaded: number
}) => void

export default class Engine {
    public readonly context: CanvasRenderingContext2D

    public readonly layers: LayersProcessor

    public readonly assets: AssetsProcessor

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

        this.layers = new LayersProcessor(context, this.render)
        this.assets = new AssetsProcessor()
    }

    public async loadAssets (updateCallback?: TAssetsLoadingUpdateCallback): Promise<void> {
        let currentIndex = 0

        for await (const [ name, asset ] of this.assets.assetsMap) {
            currentIndex++

            updateCallback?.({ asset, name }, {
                current: currentIndex,
                total: this.assets.assetsMap.size,
                percentsLoaded: this.assets.assetsMap.size / currentIndex
            })

            const result = await asset.loadAssetContent()

            if (!result) throw new AssetNotFoundException(asset.assetURL)
        }
    }

    public render () {
        window.requestAnimationFrame(() => {
            this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height)

            this.layers.layersMap.layersOnly.forEach(layer => {
                this.context.beginPath()
                layer.entitiesMap.entities.forEach(entity => entity.draw(this.context))

                this.context.stroke()
            })
        })
    }
}
