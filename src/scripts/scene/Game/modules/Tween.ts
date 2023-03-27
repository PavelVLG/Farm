import Cell, { ConfigAnimate } from '../character/Cell';
import Phaser from 'phaser';
export default class AnimCell {
    private scene: Phaser.Scene;
    private target: Cell;
    private animations: ConfigAnimate;
    constructor(scene: Phaser.Scene, target: Cell) {
        this.scene = scene;
        this.target = target;
        this.animations = target.animations;
        this.init();
    }

    private init() {
        const position = this.target.getCenter();
        const { x, y } = position;
    }

    public setFrame(value: 'start' | 'end') {
        const { target, animations } = this;

        const anim = value === 'start' ? animations.start : animations.end;

        target.setFrame(animations.prefix + anim);
    }

    public async process() {
        const { target, animations } = this;

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
}
