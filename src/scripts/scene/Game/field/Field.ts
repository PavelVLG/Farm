import Phaser from 'phaser';
import Point from './Point';
const sum_point = { x: 8, y: 8 };

const SIZE_FIELD = {
    width: 800,
    height: 800,
};

type Points = Phaser.Geom.Point[];
type GameObject = Phaser.GameObjects.Sprite;
type Pointer = Phaser.Input.Pointer;
const radius = 60;
export default class Field {
    private scene: Phaser.Scene;
    private _points: Point[] = [];
    private pointDragStart: Point | undefined;

    constructor(scene: Phaser.Scene) {
        this.scene = scene;
        this.createPoints();

        this.scene.input.on('dragstart', (pointer: Pointer, target: GameObject) => {
            this.dragStart(target);
        });

        this.scene.input.on('dragend', (pointer: Pointer, target: GameObject) => {
            this.dragEnd(target);
        });
    }

    get points() {
        return this._points;
    }

    private createPoints() {
        const scene = this.scene;
        const { width, height } = scene.scale;

        const widthField = SIZE_FIELD.width;
        const heightField = SIZE_FIELD.height;

        const rectangle = this.scene.add.rectangle(
            width * 0.5,
            height * 0.5,
            widthField * 0.9,
            heightField * 0.9
        );

        const { left, top, right, bottom } = rectangle.getBounds();

        const points = this.getPoints({ left, right, top, bottom });

        points.forEach(({ x, y }, index) => {
            this._points.push(new Point(this.scene, x, y, index));
        });
    }

    private getPoints(position: {
        left: number;
        right: number;
        top: number;
        bottom: number;
    }): Points {
        const { left, right, top, bottom } = position;
        const { width, height } = this.scene.scale;
        const lines = new Phaser.Geom.Line(left, top, right, top);

        const lineX = Phaser.Geom.Line.GetEasedPoints(lines, '', sum_point.x);

        const points: Points = [];

        lineX.map(({ x }) => {
            const line = new Phaser.Geom.Line(x, top, x, bottom);
            const arrPoint = Phaser.Geom.Line.GetEasedPoints(line, '', sum_point.y);
            points.push(...arrPoint);
        });

        return points;
    }

    private dragStart(target: GameObject) {
        this.pointDragStart = this.checkPointDrag(target);
    }

    private dragEnd(target: GameObject) {
        const pointer: Point | undefined = this.checkPointDrag(target);

        if (pointer && !pointer.filled) {
            this.pointDragStart.filled = false;
            pointer.filled = true;
            const { x, y } = pointer;
            target.setPosition(x, y);
            return;
        }

        const { x, y } = this.pointDragStart;
        target.setPosition(x, y);

        return;
    }

    private checkPointDrag(target: GameObject): Point | undefined {
        let value: Point | undefined = undefined;

        for (let i = 0; i < this.points.length; i++) {
            const { x, y } = this.points.at(i);
            const distance = Phaser.Math.Distance.Between(x, y, target.x, target.y);

            if (distance < radius) {
                value = this.points.at(i);
                break;
            }
        }

        return value;
    }
}
