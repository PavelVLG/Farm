import Button from 'scripts/scene/modules/Button';
import { btn_frames, text_style } from 'scripts/scene/styles';
import { PrimalSubjectStateKey } from 'scripts/scene/type';
import { state } from 'scripts/util/global';
import Phaser from 'phaser';
type Text = Phaser.GameObjects.Text;

export default class ResourcePlate extends Phaser.GameObjects.Container {
    public scene: Phaser.Scene;

    private text_title: Text;
    private text_subtitle: Text;

    constructor(scene: Phaser.Scene, key: PrimalSubjectStateKey) {
        super(scene);

        this.scene = scene;

        this.init();
        this.addObserver(key);
        this.setVisible(false);

        scene.add.existing(this);
    }

    private init() {
        this.text_title = this.scene.add.text(0, 0, '', text_style.basket).setOrigin(0.5);

        this.text_subtitle = this.scene.add.text(0, 50, '', text_style.basket).setOrigin(0.5);

        this.add([this.text_title, this.text_subtitle]);
    }

    public setTitleXY(x: number, y: number): ResourcePlate {
        this.text_title.setPosition(x, y);
        return this;
    }

    public setSubtitleXY(x: number, y: number): ResourcePlate {
        this.text_subtitle.setPosition(x, y);
        return this;
    }

    private addObserver(key: PrimalSubjectStateKey) {
        const source = state[key];

        const setText = this.setSubtitleText.bind(this);
        const visible = this.setVisible.bind(this);

        source.add_observer({
            on_state_update({ value }) {
                visible(true);
                setText(`${value}`);
            },
        });
    }

    public setSubtitleText(value: string): ResourcePlate {
        this.text_subtitle.setText(value);
        return this;
    }

    public setTitleText(value: string): ResourcePlate {
        this.text_title.setText(value);
        return this;
    }
}
