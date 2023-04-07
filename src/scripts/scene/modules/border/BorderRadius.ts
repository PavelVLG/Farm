import { COLORS } from 'scripts/scene/styles';
import Border, { GameObject } from './Border';

export class BorderRadius extends Border {
    constructor(scene: Phaser.Scene, gameObject: GameObject) {
        super(scene, gameObject);
    }

    protected addBorder() {
        const { geom, graphics } = this;
        let { centerX, centerY, width, height } = geom;

        graphics.lineStyle(3, COLORS.WHITE, 1);

        const padding = 1.3;

        width *= padding;
        height *= padding;

        const x = centerX - width / 2;
        const y = centerY - height / 3;

        graphics.strokeRoundedRect(x, y, width, height);
    }
}
