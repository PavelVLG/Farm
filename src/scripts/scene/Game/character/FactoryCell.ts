import { ELEMENTS, FRAMES, state } from 'scripts/util/global';
import Point from '../field/Point';
import Cell from './Cell';
import { SKIN } from './interface';

export default class FactoryCell {
    private scene: Phaser.Scene;

    constructor(scene: Phaser.Scene, points: Point[]) {
        this.scene = scene;
        //@todo: дублирование
        ELEMENTS.chicken.forEach((id) => {
            const point = points.at(id);
            point.filled = true;
            this.createSprit(SKIN.CHICKEN, point);
        });

        ELEMENTS.cow.forEach((id) => {
            const point = points.at(id);
            point.filled = true;
            this.createSprit(SKIN.COW, point);
        });

        ELEMENTS.wheat.forEach((id) => {
            const point = points.at(id);
            point.filled = true;
            this.createSprit(SKIN.WHEAT, point);
        });
    }

    private createSprit(name: SKIN, point: Point): Cell {
        if (name === 'chicken') {
            const config = {
                ...FRAMES.chicken,
                speed: state.chicken.speed,
            };

            return new Cell(this.scene, config, point, state.chicken);
        }

        if (name === 'wheat') {
            const config = {
                ...FRAMES.wheat,
                speed: state.wheat.speed,
            };

            return new Cell(this.scene, config, point, state.wheat);
        }

        if (name === 'cow') {
            const config = {
                ...FRAMES.cow,
                speed: state.cow.speed,
            };

            return new Cell(this.scene, config, point, state.cow);
        }
    }
}
