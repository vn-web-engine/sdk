export default class AnimationFunctions {
    public static easeInSine(x: number): number {
        return 1 - Math.cos((x * Math.PI) / 2);
    }

    public static easeOutSine(x: number): number {
        return Math.sin((x * Math.PI) / 2);
    }

    public static easeInOutSine(x: number): number {
        return -(Math.cos(Math.PI * x) - 1) / 2;
    }

    public static easeInCubic(x: number): number {
        return x * x * x;
    }

    public static easeOutCubic(x: number): number {
        return 1 - Math.pow(1 - x, 3);
    }

    public static easeInOutCubic(x: number): number {
        return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
    }

    public static easeInQuint(x: number): number {
        return x * x * x * x * x;
    }

    public static easeOutQuint(x: number): number {
        return 1 - Math.pow(1 - x, 5);
    }

    public static easeInOutQuint(x: number): number {
        return x < 0.5 ? 16 * x * x * x * x * x : 1 - Math.pow(-2 * x + 2, 5) / 2;
    }
}
