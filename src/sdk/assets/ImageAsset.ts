import AbstractAsset from "./AbstractAsset"

export default class ImageAsset extends AbstractAsset<HTMLImageElement> {
    constructor (imageURL: string) { super(imageURL) }

    public loadAssetContent (): Promise<boolean> {
        return new Promise<boolean>(resolve => {
            const image = new Image()
            image.src = this.assetURL

            image.onerror = image.onabort = image.oncancel = () => resolve(false)

            image.onload = () => {
                image.crossOrigin = "*";
                this.assetContent = image
                resolve(true)
            }
        })
    }
}
