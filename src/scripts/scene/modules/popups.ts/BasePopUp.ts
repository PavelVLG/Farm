import Phaser from 'phaser';
import PopUp from 'scripts/scene/modules/popups.ts/PopUp';
import { COLORS, TINTS } from 'scripts/scene/styles';
import { EMIT } from 'scripts/util/global';

type Text = Phaser.GameObjects.Text;
type Container = Phaser.GameObjects.Container;
export default class BasePopUp extends PopUp {
    public scene: Phaser.Scene;
    private parent: Container;
    private title: Text;
    private subtitle: Text;

    constructor(scene: Phaser.Scene, title: string) {
        super(scene);

        this.parent = scene.add.container();
        this.addFirstLayer();
        this.addSecondLayer(title);
        this.add(this.parent);

        scene.events.on(EMIT.POPUP_OPEN, this.animationOpen, this);
    }

    private addSecondLayer(title: string) {
        const config: Phaser.Types.GameObjects.Text.TextStyle = {
            fontFamily: 'fantasy',
            fontSize: '64px',
        };

        this.title = this.scene.add
            .text(0, -64, title, config)
            .setOrigin(0.5)
            .setTint(...TINTS[2]);

        this.subtitle = this.scene.add
            .text(0, 64, '', config)
            .setOrigin(0.5)
            .setTint(...TINTS[2]);

        const description = this.scene.add
            .text(0, 200, 'click here', {
                fontFamily: 'Arial',
                fontSize: '18px',
                color: '0xfff',
            })
            .setOrigin(0.5);

        this.parent.add([this.title, this.subtitle, description]);
    }

    public setSubtitle(text: string) {
        this.subtitle.setText(text);
        return this;
    }

    public addFirstLayer() {
        const rectangle = this.scene.add
            .rectangle(0, 0, 600, 500, COLORS.WHITE, 1)
            .setStrokeStyle(4, 0xefc53f)
            .setInteractive()
            .on('pointerdown', this.animationClose, this);

        this.parent.add(rectangle);
    }

    private animationClose() {
        this.scene.tweens.add({
            targets: [this.parent],
            duration: 500,
            scale: 0.1,
            ease: Phaser.Math.Easing.Back.In,
            onComplete: () => this.close(),
        });
    }

    private animationOpen() {
        this.scene.tweens.add({
            targets: [this.parent],
            duration: 500,
            scale: { from: 0, to: 1 },
            ease: Phaser.Math.Easing.Back.Out,
        });
    }
}
