import Cell from '../character/Cell';
import Hand from './Hand';

type Positions = [x: number, y: number][];
type AnimationName = 'wheat' | 'cow' | 'chicken';
type StatusHint = 'able' | 'disable';
export default class Hints {
    public scene: Phaser.Scene;
    private point: Hand;
    private objects: Phaser.GameObjects.GameObject[] = [];
    private status: StatusHint;

    constructor(scene: Phaser.Scene) {
        this.scene = scene;
        this.point = new Hand(scene);
    }

    private getCells(): Cell[] {
        const { list } = this.scene.children;
        let cells: Cell[] = [];

        list.forEach((object) => {
            const isCell =
                object instanceof Phaser.GameObjects.Layer && object.list.at(0) instanceof Cell;

            if (isCell) cells.push(object.list.at(0) as Cell);
        });
        return cells;
    }

    private setQueue(cells: Cell[]) {
        const wheat = this.getCellByName(cells, 'wheat');
        const chicken = this.getCellByName(cells, 'chicken');

        this.objects.push(wheat, chicken);
    }

    private getCellByName(cells: Cell[], name: AnimationName): Cell {
        let value: Cell;

        for (let i = 0; i < cells.length; i++) {
            const cell = cells[i];

            if (cell.animations.prefix === name) {
                value = cell;
                break;
            }
        }

        return value;
    }

    public async startHint() {
        if (this.status === 'disable') return;

        const cells = this.getCells();

        this.setQueue(cells);

        this.startHint();

        const { objects } = this;

        const coordinates: Positions = objects.map((cell: Cell) => [cell.x, cell.y]);

        await this.point.indicate(...coordinates[0]);

        await this.point.indicate(...coordinates[1]);
    }

    public changeStatus(status: StatusHint) {
        this.status = status;
    }
}
