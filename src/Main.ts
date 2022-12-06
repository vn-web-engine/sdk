import Engine from "./sdk/Engine"
import Circle from "./sdk/entities/Circle"
import Animation from "./sdk/utils/animation/Animation"
import AnimationFunctions from "./sdk/utils/animation/AnimationFunctions"

import "./Main.scss"
import AnimationSequence from "./sdk/utils/animation/AnimationSequence"

function Main () {
    const engine = new Engine()

    const layer1 = engine.addLayer()
    const layer2 = engine.addLayer()

    const circle1 = new Circle(30, 30, 20)

    const circle2 = new Circle(40, 40, 20)

    engine.addEntity(layer1, circle1)
        .addEntity(layer2, circle2)

    const moveAnim = new Animation({
        from: 20,
        to: 400,
        update (current: number) {
            circle1.radius = Number.parseInt(String(current))
        },
        transform: AnimationFunctions.easeInOutCubic
    })

    const sequence = new AnimationSequence()

    sequence.addAnimation(moveAnim, moveAnim, moveAnim)
        .addAnimationReversePoints(1)
        .setAnimationCustomTime(2, 1000)

    sequence.start(3000)

    setTimeout(() => sequence.stop(), 1000)
}

Main()
