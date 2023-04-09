import Phaser from 'phaser';

type Frames = {
    static: string;
    hover: string;
    click: string;
};

export default class Button extends Phaser.GameObjects.Container {
    private title: Phaser.GameObjects.Text;
    private parent_function = new Function();
    private sprite: Phaser.GameObjects.Sprite;
    private frames: Frames;
    tst: '42';

    constructor(
        scene: Phaser.Scene,
        x: number,
        y: number,
        title: string,
        texture_name: string,
        frames: Frames,
        parent_function: () => any,
        parent?: Phaser.GameObjects.Container
    ) {
        super(scene, x, y);

        this.parent_function = parent_function;

        this.frames = frames;

        const sprite = scene.add.sprite(0, 0, texture_name, frames.static);

        sprite.setInteractive({ cursor: 'pointer' });

        sprite.on('pointerdown', () => this.on_click());

        sprite.on('pointerover', () => this.on_over());

        sprite.on('pointerout', () => this.on_out());

        this.sprite = sprite;

        this.title = scene.add
            .text(0, 0, title, {
                fontFamily: 'fantasy',
                fontSize: '64px',
                color: 'rgb(255, 255, 255)',
            })
            .setOrigin(0.5);

        this.add([sprite, this.title]);

        if (parent) parent.add(this);
    }

    private on_click() {
        this.sprite.setFrame(this.frames.click);
        this.parent_function();
    }

    private on_over() {
        this.sprite.setFrame(this.frames.hover);
    }

    private on_out() {
        this.sprite.setFrame(this.frames.static);
    }
}
