import Phaser from 'phaser';
export default class Draggable {
    private sprite: Phaser.GameObjects.Sprite;
    private scene: Phaser.Scene;
    constructor(scene: Phaser.Scene, sprite: Phaser.GameObjects.Sprite) {
        this.sprite = sprite;
        this.scene = scene;
        this.init();
    }

    public init() {
        this.sprite.setInteractive();

        this.scene.input.dragTimeThreshold = 200;

        this.scene.input.setDraggable(this.sprite);

        this.sprite.on('drag', this.drag, this);
    }

    private drag(pointer: Phaser.Input.Pointer) {
        const { x, y } = pointer;

        this.sprite.y = y;
        this.sprite.x = x;
    }
}
