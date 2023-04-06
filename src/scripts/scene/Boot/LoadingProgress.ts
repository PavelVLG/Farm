import { COLORS, coordinates, text_style, TINTS } from '../styles';

type Rectangle = Phaser.GameObjects.Rectangle;
export default class LoadingProgress extends Phaser.GameObjects.Container {
    public scene: Phaser.Scene;

    private render_texture: Phaser.GameObjects.RenderTexture;
    private texture_background: Rectangle;
    private bar: Rectangle;

    constructor(scene: Phaser.Scene) {
        super(scene, scene.scale.width / 2, scene.scale.height / 2);

        this.scene = scene;

        this.init();

        scene.add.existing(this);
    }

    public init() {
        this.addTitle();
        this.addBar();
    }

    private addBar() {
        const { loading_texture } = coordinates;
        const { x, y, width, height } = loading_texture;

        const rt = this.scene.add.renderTexture(x, y, width, height).setOrigin(0.5);

        const background = this.scene.add
            .rectangle(x, y, width * 2, height, COLORS.WHITE, 1)
            .setVisible(false);

        const bar = this.scene.add.rectangle(x, y, 0, height, COLORS.PURPLE, 1).setVisible(false);

        this.render_texture = rt;
        this.texture_background = background;
        this.bar = bar;

        this.add(rt);
    }

    private addTitle() {
        const { text, style } = text_style.loading_title;
        const { x, y } = coordinates.loading_title;

        const title = this.scene.add.text(x, y, text, style);

        title.setOrigin(0.5).setTint(...TINTS[1]);

        this.add(title);
    }

    public updateProgress(progress: number) {
        const { render_texture } = this;

        const width = this.render_texture.width * progress;

        this.bar.width = width;

        render_texture.clear();

        render_texture.draw(this.texture_background, 0, 0);

        render_texture.draw(this.bar, 0, 0);
    }
}
