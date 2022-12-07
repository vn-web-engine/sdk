import AbstractAsset from "../assets/AbstractAsset"

export default class AssetsProcessor {
    public readonly assetsMap: Map<string, AbstractAsset> = new Map<string, AbstractAsset>()

    public addAsset (name: string, asset: AbstractAsset) {
        this.assetsMap.set(name, asset)

        return this
    }

    public getAssetName (asset: AbstractAsset) {
        return [ ...this.assetsMap.entries() ]
            .find(([ _, item ]) => item === asset)?.[0]
    }

    public removeAsset (asset: string | AbstractAsset) {
        if (typeof asset === "string") return this.assetsMap.delete(asset)

        const foundAsset = this.getAssetName(asset)

        if (!foundAsset) return false
        return this.assetsMap.delete(foundAsset)
    }
}
