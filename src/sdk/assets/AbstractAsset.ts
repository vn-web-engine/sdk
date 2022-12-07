import AssetNotFoundException from "../exceptions/AssetNotFoundException"

export default abstract class AbstractAsset<T = unknown> {
    protected assetContent?: T

    protected constructor (public assetURL: string) {}

    public abstract loadAssetContent (): Promise<boolean>

    public getContent () {
        if (!this.assetContent) throw new AssetNotFoundException(this.assetURL)

        return this.assetContent
    }
}
