import ImageAsset from "./sdk/assets/ImageAsset"
import Engine from "./sdk/Engine"
import ImageEntity from "./sdk/entities/ImageEntity"
import "./Main.scss"
import Animation from "./sdk/utils/animation/Animation"
import AnimationFunctions from "./sdk/utils/animation/AnimationFunctions"

async function Main () {
    const engine = new Engine()

    const laylaAsset = new ImageAsset("https://storage.fuori.org/public/ccf0ebfa3dc36e4cb98d8e07766ffc76_69714934629811874.png")

    engine.assets.addAsset("layla", laylaAsset)

    await engine.loadAssets()

    // FIXME: Sometimes throw errors
    const laylaImage = new ImageEntity(10, 10, laylaAsset)

    const layer1 = engine.layers.addLayer()

    engine.layers.addEntity(layer1, laylaImage)

    laylaAsset.getContent()

    const fadeInAnimation = new Animation({
        from: 0,
        to: 1,
        transform: AnimationFunctions.easeInCubic,
        update (current: number) {
            laylaImage.opacity = current
        }
    })

    const moveAnimation = new Animation({
        from: -10,
        to: 10,
        transform: AnimationFunctions.easeInCubic,
        update (current: number) {
            laylaImage.x = current
        }
    })

    fadeInAnimation.start(1500)
    moveAnimation.start(1500)

    // const layer2 = engine.layers.addLayer()
    //
    // const circle1 = new Circle(30, 30, 20)
    //
    // const circle2 = new Circle(40, 40, 20)
    //
    // engine.layers.addEntity(layer1, circle1)
    //     .addEntity(layer2, circle2)
    //
    // const moveAnim = new Animation({
    //     from: 20,
    //     to: 400,
    //     update (current: number) {
    //         circle1.radius = Number.parseInt(String(current))
    //     },
    //     transform: AnimationFunctions.easeInOutCubic
    // })
    //
    // const sequence = new AnimationSequence()
    //
    // sequence.addAnimation(moveAnim, moveAnim, moveAnim)
    //     .addAnimationReversePoints(1)
    //     .setAnimationCustomTime(2, 1000)
    //
    // sequence.start(3000)
    //
    // setTimeout(() => sequence.stop(), 1000)
}

Main()
