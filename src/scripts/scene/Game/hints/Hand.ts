import { PNG } from 'scripts/util/global';

export default class Hand extends Phaser.GameObjects.Sprite {
    constructor(scene: Phaser.Scene) {
        super(scene, scene.scale.width / 2, scene.scale.height + 100, PNG.HAND);
        const layer = scene.add.layer(this);
        layer.bringToTop(this);
        this.flip();
        this.setVisible(false);
    }

    public flip() {
        this.setFlipY(true);
    }

    public rotate(radian: number) {
        this.setRotation(radian);
    }

    public async indicate(x: number, y: number) {
        this.setVisible(true);

        this.scene.tweens.add({
            targets: this,
            duration: 500,
            x,
            y,
        });

        await new Promise((resolve) => {
            this.scene.tweens.add({
                targets: this,
                delay: 1000,
                duration: 500,
                scaleY: 0.7,
                yoyo: true,
                onComplete: () => {
                    this.setVisible(false);
                    resolve(1);
                },
            });
        });
    }
}
