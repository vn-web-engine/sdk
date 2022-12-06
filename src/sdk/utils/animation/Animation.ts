interface IAnimationOptions {
    from: number;

    to: number;

    update (current: number, percents: number): void;

    transform (x: number): number
}

export default class Animation {
    private stopFlag = false

    private reverseFlag = false

    constructor (private readonly options: IAnimationOptions) {}

    public async start (time: number) {
        this.stopFlag = false

        const startTime = performance.now()
        return new Promise<Animation>(resolve => {
            const updateFrame = () => {
                const passTime = performance.now() - startTime

                let percentsPass = Number.parseInt(String((100 * passTime) / time))
                percentsPass = percentsPass > 100 ? 100 : percentsPass

                const percentsFloat = Number.parseFloat((percentsPass / 100).toFixed(2))

                const transformResult = this.reverseFlag
                    ? 1 - this.options.transform(percentsFloat)
                    : this.options.transform(percentsFloat)

                const resultFloat = Number
                    .parseFloat(((this.options.to - this.options.from) * transformResult)
                        .toFixed(8))

                this.options.update(resultFloat + this.options.from, percentsPass)

                if (percentsPass >= 100 || this.stopFlag) {
                    resolve(this)
                    return
                }

                window.requestAnimationFrame(updateFrame)
            }

            window.requestAnimationFrame(updateFrame)
        })
    }

    public stop () { this.stopFlag = true; return this }

    public reverse () { this.reverseFlag = !this.reverseFlag; return this }
}
