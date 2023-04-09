import dataCharacter from '../../character/character.json';
import { DataCell, PrimalSubjectStateKey } from 'scripts/scene/type';
import ResourcePlate from './ResourcePlate';
import ResourcePlateSell from './ResourcePlateSell';

export default class FactorySource {
    public scene: Phaser.Scene;

    private plates: ResourcePlate[];

    constructor(scene: Phaser.Scene) {
        this.scene = scene;

        this.optionsOverView();
    }

    private optionsOverView() {
        const values = Object.values(dataCharacter);

        let startY = 0;

        this.plates = [];

        values.forEach(({ value_name, price }: DataCell, index) => {
            const key = `value_${value_name}` as PrimalSubjectStateKey;

            const y = (startY += 50);

            const plate = price
                ? this.addResourcePlateSell(key, price)
                : this.addResourcePlate(key);

            plate.setTitleText(value_name);

            plate.setPosition(100, (startY += 150));
            this.plates.push(plate);
        });
    }

    private addResourcePlate(key: PrimalSubjectStateKey): ResourcePlate {
        return new ResourcePlate(this.scene, key);
    }

    private addResourcePlateSell(key: PrimalSubjectStateKey, price: number): ResourcePlateSell {
        return new ResourcePlateSell(this.scene, key, price);
    }
}
