import Button from 'scripts/scene/modules/Button';
import { PrimalSubject } from 'scripts/scene/state/observer';
import { State } from 'scripts/scene/state/State';
import { state } from 'scripts/util/global';
import { btn_frames, text_style } from 'scripts/util/viewSettings';
import { Basket, TextGUI } from './Basket';
import { DataCell } from '../../character/interface';
import dataCharacter from '../../character/character.json';

type UpdateState = { key: keyof State; sum: number };
export default class FactoryBasket {
    public scene: Phaser.Scene;

    constructor(scene: Phaser.Scene) {
        this.scene = scene;

        this.addMoney();

        this.createBaskets();
    }

    private createBaskets() {
        const values = Object.values(dataCharacter);

        let startY = 100;

        values.forEach(({ value_name, price, value_sum }: DataCell) => {
            const primalKey = `value_${value_name}` as keyof State;

            const texts = [value_name, this.getValue(primalKey)];

            const configs: TextGUI[] = [];

            texts.forEach((text: string) => {
                configs.push({ text, style: text_style.basket });
            });

            const basket = new Basket(this.scene, 100, (startY += 250), configs[0], configs[1]);

            this.addObserver(primalKey, basket.setSubtitle.bind(basket));

            if (price) {
                const updateConfig: UpdateState[] = [
                    { key: `value_${value_name}` as keyof State, sum: -value_sum },
                    { key: 'value_money', sum: price },
                ];

                this.addButton(basket, updateConfig);
            }
        });
    }

    private addMoney() {
        const { width, height } = this.scene.scale;

        const texts = ['money', state.value_money.value];

        const configs: TextGUI[] = [];

        texts.forEach((text: string) => configs.push({ text, style: text_style.basket }));

        const basket = new Basket(this.scene, width * 0.9, height * 0.1, configs[0], configs[1]);

        this.addObserver('value_money', basket.setSubtitle.bind(basket));
    }

    private addObserver(key: keyof State, call: (arg: string) => void) {
        const source = state[key] as PrimalSubject;

        source.add_observer({
            on_state_update({ value }) {
                call(value);
            },
        });
    }

    private addButton(basket: Basket, update: UpdateState[]) {
        const updateState = this.updateState.bind(this, update);

        new Button(
            this.scene,
            0,
            120,
            'sell',
            'btn',
            btn_frames.basket,
            updateState,
            basket
        ).setScale(0.5);
    }

    private updateState(update: UpdateState[]) {
        const updateValues = Object.values(update);

        for (let i = 0; i < updateValues.length; i++) {
            const options = updateValues.at(i);
            const { key, sum } = options;

            const source = state[key] as PrimalSubject;

            if (source.value <= 0 && key != 'value_money') break;

            source.value += sum;
        }
    }

    private getValue(name: string): string {
        const key = state[name as keyof State] as PrimalSubject;

        return String(key.value);
    }
}
