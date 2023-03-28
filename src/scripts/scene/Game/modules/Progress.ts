import Interval from 'scripts/scene/modules/Interval';
import { COLORS, EMIT } from 'scripts/util/global';
import Phaser, { RIGHT } from 'phaser';

type Parent = Phaser.GameObjects.Sprite;
export default class ProgressCell extends Interval {
    private parent: Parent;
    private circle: Phaser.GameObjects.Graphics;

    //@todo: replace
    private pos: {
        centerX: number;
        centerY: number;
        radius: number;
    };

    constructor(scene: Phaser.Scene, parent: Parent, duration: number) {
        super(scene, duration);

        this.parent = parent;
        this.createElements();
        this.parent.on(EMIT.DRAG_END, this.updatePos, this);
    }

    private createElements() {
        this.circle = this.scene.add.graphics();
        this.circle.beginPath();
        this.updatePos();
    }

    private updatePos() {
        const { centerX, centerY } = this.parent.getBounds();
        this.pos = {
            centerX,
            centerY,
            radius: 50,
        };
    }

    public start(): void {
        super.start();
    }

    protected update() {
        const percent = super.update();

        this.upgrade(percent);

        return percent;
    }

    public clear() {
        this.circle.clear();
    }

    private upgrade(percent: number) {
        const { centerX, centerY, radius } = this.pos;

        this.circle.clear();
        this.circle.lineStyle(4, COLORS.PURPLE, 1);

        const step = 360 * percent - 1;

        this.circle.arc(
            centerX,
            centerY,
            radius,
            Phaser.Math.DegToRad(step),
            Phaser.Math.DegToRad(360),
            true
        );

        this.circle.strokePath();
    }
}
