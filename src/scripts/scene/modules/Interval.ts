import Phaser from 'phaser';

export default class Interval {
    public scene: Phaser.Scene;

    private configEvent: Phaser.Types.Time.TimerEventConfig;

    private interval: Phaser.Time.TimerEvent;

    constructor(scene: Phaser.Scene, duration: number) {
        this.scene = scene;

        this.configEvent = {
            delay: 1000,
            repeat: duration - 1,
            callbackScope: this,
            callback: this.update,
            loop: false,
        };
    }

    public start() {
        this.interval = this.scene.time.addEvent(this.configEvent);
    }

    protected update(): number {
        const percent = this.interval.getOverallProgress();

        if (percent === 1) this.complete();

        return percent;
    }

    public pause(paused: boolean) {
        this.interval.paused = paused;
    }

    protected complete() {
        this.interval.destroy();
    }
}
