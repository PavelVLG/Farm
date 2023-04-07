import { COLORS } from 'scripts/scene/styles';
import Border, { GameObject } from './Border';

export class BorderCircle extends Border {
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

        graphics.strokeCircle(centerX, centerY, width / 2);
    }
}

export class BorderTest extends Border {
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

        graphics.strokeCircle(centerX, centerY, width / 2);
    }
}
