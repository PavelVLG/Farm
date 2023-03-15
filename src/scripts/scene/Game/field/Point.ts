import { COLORS } from 'scripts/util/global';
import Phaser, { RIGHT } from 'phaser';
type GameObject = Phaser.GameObjects.Sprite;
type Pointer = Phaser.Input.Pointer;

export default class Point extends Phaser.Geom.Point {
    private __filled: boolean;
    public scene: Phaser.Scene;

    constructor(scene: Phaser.Scene, x: number, y: number, id: number) {
        super(x, y);

        this.__filled = false;
        this.scene = scene;

        scene.add.rectangle(x, y, 100, 100, COLORS.WHITE, 0.8);
    }

    get filled() {
        return this.__filled;
    }

    set filled(value: boolean) {
        this.__filled = value;
    }
}
