export type TextConfig = {
    x: number;
    y: number;
    text: string | string[];
};

export type TextStile = Phaser.Types.GameObjects.Text.TextStyle;

type Text = Phaser.GameObjects.Text;

export interface TextGUI {
    text: string;
    style: TextStile;
}

export class Basket extends Phaser.GameObjects.Container {
    public scene: Phaser.Scene;

    constructor(
        scene: Phaser.Scene,
        x: number,
        y: number,
        titleConfig: TextGUI,
        subtitleConfig: TextGUI
    ) {
        super(scene, x, y);
        this.addText(titleConfig, 0, -30);
        this.addText(subtitleConfig, 0, 30);

        this.scene = scene;
        scene.add.existing(this);
    }

    public setSubtitle(text: string) {
        const subtitle = this.getAll().at(1) as Text;

        subtitle.setText(text);
    }

    private addText(description: TextGUI, x: number, y: number) {
        const { text, style } = description;

        const children = this.scene.add.text(x, y, text, style).setOrigin(0.5);

        this.add(children);
    }
}
