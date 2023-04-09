import Phaser from 'phaser';
import { EMIT } from 'scripts/util/global';
import { COLORS } from '../../styles';
export default class PopUp extends Phaser.GameObjects.Container {
    public scene: Phaser.Scene;

    private _background: Phaser.GameObjects.Rectangle;

    constructor(scene: Phaser.Scene) {
        super(scene, scene.scale.width / 2, scene.scale.height / 2);

        this.setVisible(false);

        this.scene = scene;

        this.addBackground();

        scene.add.existing(this);
    }

    public open() {
        this.scene.events.emit(EMIT.POPUP_OPEN);
        this.setVisible(true);
    }

    public close() {
        this.scene.events.emit(EMIT.POPUP_CLOSE);
        this.setVisible(false);
    }

    protected addContainer(container: Phaser.GameObjects.Container) {
        this.add(container);
    }

    private addBackground() {
        const { width, height } = this.scene.scale;

        this._background = this.scene.add
            .rectangle(0, 0, width * 1.1, height * 1.1, COLORS.WHITE, 0)
            .setOrigin(0.5)
            .setInteractive();

        this.add(this._background);
    }
}
