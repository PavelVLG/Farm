import { ELEMENTS, FRAMES, state } from 'scripts/util/global';
import Point from '../field/Point';
import Chicken from './Chicken';
import Cow from './Cow';
import { SKIN } from './interface';
import Wheat from './Wheat';

export type TCharacter = Chicken | Cow | Wheat;

export default class FactoryCharacter {
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

    private createSprit(name: SKIN, point: Point): TCharacter {
        if (name === 'chicken') {
            const config = {
                ...FRAMES.chicken,
                speed: state.chicken.speed,
            };

            return new Chicken(this.scene, config, point);
        }

        if (name === 'wheat') {
            const config = {
                ...FRAMES.wheat,
                speed: state.wheat.speed,
            };
            return new Wheat(this.scene, config, point);
        }

        if (name === 'cow') {
            const config = {
                ...FRAMES.cow,
                speed: state.cow.speed,
            };

            return new Cow(this.scene, config, point);
        }
    }
}
