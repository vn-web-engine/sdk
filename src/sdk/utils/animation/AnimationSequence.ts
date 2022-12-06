import Animation from "./Animation"

type TNumberObject = { [key: number]: number }

export default class AnimationSequence {
    #animations: Animation[] = []

    #animationPauses: TNumberObject = {}

    #animationCustomTime: TNumberObject = {}

    #animationReversePoints: number[] = []

    #stopFlag: boolean = false

    constructor (...animations: Animation[]) {
        this.addAnimation(...animations)
    }

    public addAnimation (...animations: Animation[]): AnimationSequence {
        this.#animations.push(...animations)

        return this
    }

    public deleteAnimation (animation: Animation): AnimationSequence {
        this.#animations = this.#animations.filter(item => item != animation)

        return this
    }

    public getAnimations (): Animation[] { return [ ...this.#animations ] }

    public async start (time: number, from?: number, to?: number): Promise<void> {
        const animationSequence = this.#animations.slice(from, to).entries()

        for await (const [ index, animation ] of animationSequence) {
            if (this.#stopFlag) {
                this.#stopFlag = false

                return
            }

            if (this.#animationReversePoints.includes(index)) animation.reverse()

            await animation.start(this.#animationCustomTime[index] ?? time)

            if (this.#animationReversePoints.includes(index)) animation.reverse()
            if (this.#animationPauses[index])
                await new Promise<void>(r => setTimeout(r, this.#animationPauses[index]))
        }
    }


    public addAnimationPause (index: number, pause: number): AnimationSequence {
        this.#animationPauses[index] = pause

        return this
    }

    public setAllAnimationsPause (pause: number): AnimationSequence {
        this.#animationPauses = new Array(this.#animations.length).fill(pause)

        return this
    }

    public clearAnimationPauses (): AnimationSequence {
        this.#animationPauses = []

        return this
    }

    public get animationPauses (): TNumberObject { return this.#animationPauses }


    public addAnimationReversePoints (...reverseAtIndex: number[]): AnimationSequence {
        this.#animationReversePoints.push(...reverseAtIndex)

        return this
    }

    public clearAnimationReversePoints (): AnimationSequence {
        this.#animationReversePoints = []

        return this
    }

    public get animationReversePoints (): number[] { return this.#animationReversePoints }

    public stop (): AnimationSequence {
        this.#animations.forEach(animation => animation.stop())

        this.#stopFlag = true

        return this
    }

    public setAnimationCustomTime (index: number, time: number): AnimationSequence {
        this.#animationCustomTime[index] = time

        return this
    }

    public clearAnimationCustomTime (): AnimationSequence {
        this.#animationCustomTime = {}

        return this
    }

}
