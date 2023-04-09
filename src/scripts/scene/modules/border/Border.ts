import Phaser from 'phaser';

export type GameObject = Phaser.GameObjects.GameObject;
export type Rectangle = Phaser.GameObjects.Rectangle;
export type Geom = Phaser.Geom.Rectangle;
export type Graphics = Phaser.GameObjects.Graphics;

export default abstract class Border {
    protected geom: Geom;
    protected scene: Phaser.Scene;
    protected graphics: Graphics;

    constructor(scene: Phaser.Scene, gameObject: GameObject) {
        this.getBounds(gameObject);

        this.scene = scene;

        this.addGraphics();
        this.addBorder();
    }

    get border() {
        return this.graphics;
    }

    protected addBorder() {}

    private getBounds(gameObject: GameObject): void {
        this.geom = (gameObject as Rectangle).getBounds();
    }

    private addGraphics() {
        this.graphics = this.scene.add.graphics();
    }
}
