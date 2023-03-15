import Point from '../field/Point';

type Status = 'wait' | 'process' | 'complete';

type Pointer = Phaser.Input.Pointer;
export type ConfigAnimate = {
    speed: number;
    prefix: string;
    frames: number;
    idle: string;
};

export default class Character extends Phaser.GameObjects.Sprite {
    private config: ConfigAnimate;
    private _status: Status;

    constructor(scene: Phaser.Scene, configAnim: ConfigAnimate, point: Point) {
        super(scene, point.x, point.y, 'game');

        this.setScale(0.35);
        this.config = configAnim;
        this.init();
        this.setEvents();
        const layer = this.scene.add.layer(this);
        this.status = 'wait';
    }

    private init() {
        const { prefix, speed, frames } = this.config;

        this.anims.create({
            key: 'start',
            frames: this.anims.generateFrameNames('game', {
                prefix,
                start: 0,
                end: frames - 1,
            }),
            repeat: 0,
            duration: speed * 1000,
        });

        this.on('animationcomplete', this.completeAnimation, this);
    }

    protected completeAnimation() {
        this.setFrame(`${this.config.prefix}${this.config.frames}`);

        this.status = 'complete';
    }

    private setEvents() {
        this.setInteractive();
        this.scene.input.setDraggable(this);
        this.scene.input.dragTimeThreshold = 100;

        this.on('pointerdown', this.message, this);
        this.on('drag', this.drag, this);
    }

    private drag(pointer: Pointer) {
        this.y = pointer.y;
        this.x = pointer.x;
    }

    get status() {
        return this._status;
    }

    set status(status: Status) {
        this._status = status;
    }

    public start() {
        this.scene.anims.play('start', this);
        const { scale } = this;
        const { speed } = this.config;

        const repeat = (speed * 1000) / 800;

        this.scene.tweens.add({
            targets: this,
            scale: { from: scale, to: scale * 0.9 },
            yoyo: true,
            duration: 400,
            repeat,
        });
    }

    protected setIdle() {
        this.setFrame(this.config.idle);
    }

    protected message() {
        if (this.status === 'process') return;
        return;
    }

    protected tween() {
        const { width } = this.scene.scale;

        this.scene.tweens.add({
            targets: this,
            x: { from: this.x, to: width },
            duration: 500,
            scale: { from: this.scale, to: 0 },
            yoyo: true,
        });
    }
}
