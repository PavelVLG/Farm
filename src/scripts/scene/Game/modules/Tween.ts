import { COLORS } from 'scripts/util/global';
import Cell, { ConfigAnimate } from '../character/Cell';
import Phaser from 'phaser';
type Status = 'complete' | 'await' | 'process';
export default class AnimCell {
    private scene: Phaser.Scene;
    private target: Cell;
    private animations: ConfigAnimate;
    private stroke: Phaser.GameObjects.Graphics;
    constructor(scene: Phaser.Scene, target: Cell) {
        this.scene = scene;
        this.target = target;
        this.animations = target.animations;
        this.init();
    }

    private init() {
        const position = this.target.getCenter();
        const { x, y } = position;
        this.stroke = this.scene.add.graphics();

        this.stroke.lineStyle(4, 0xff00ff, 1);
    }

    public setFrame(value: 'start' | 'end') {
        const { target, animations } = this;

        const anim = value === 'start' ? animations.start : animations.end;

        target.setFrame(animations.prefix + anim);
    }

    public async process() {
        const { target, animations } = this;
        this.updateStroke();
        return new Promise((resolve) => {
            this.scene.tweens.add({
                targets: target,
                scale: { from: 0.05, to: 0.2 },
                duration: animations.speed,
                onComplete: () => {
                    resolve(1);
                },
            });
        });
    }

    private updateStroke() {
        return;
        const position = this.target.getCenter();
        const { x, y } = position;
        this.stroke.clear;
        this.stroke.beginPath();

        this.stroke.arc(x, y, 50, Phaser.Math.DegToRad(90), Phaser.Math.DegToRad(180), true);
        this.stroke.strokePath();
        this.stroke.clear;
    }
}
