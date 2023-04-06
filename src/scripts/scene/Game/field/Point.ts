import Phaser, { RIGHT } from 'phaser';
import { COLORS } from 'scripts/scene/styles';
type GameObject = Phaser.GameObjects.Sprite;
type Pointer = Phaser.Input.Pointer;

export default class Point extends Phaser.Geom.Point {
    private __filled: boolean;
    public scene: Phaser.Scene;

    constructor(scene: Phaser.Scene, x: number, y: number, id: number) {
        super(x, y);

        this.__filled = false;
        this.scene = scene;

        scene.add.circle(x, y, 55, COLORS.WHITE);
    }

    get filled() {
        return this.__filled;
    }

    set filled(value: boolean) {
        this.__filled = value;
    }
}
