import Button from 'scripts/scene/modules/Button';
import { btn_frames } from 'scripts/scene/styles';
import { PrimalSubjectStateKey } from 'scripts/scene/type';
import { state } from 'scripts/util/global';
import ResourcePlate from './ResourcePlate';

export default class ResourcePlateSell extends ResourcePlate {
    private button: Button;
    private key: PrimalSubjectStateKey;
    private price: number;

    constructor(scene: Phaser.Scene, key: PrimalSubjectStateKey, price: number) {
        super(scene, key);

        this.button = new Button(
            scene,
            0,
            100,
            'sell',
            'btn',
            btn_frames.basket,
            this.updateSource.bind(this),
            this
        ).setScale(0.3);

        this.key = key;
        this.price = price;
    }

    public updateSource() {
        const { key, price } = this;

        if (state[key].value === 0) return;

        state[key].value -= 1;

        state.value_money.value += price;
    }

    public buttonXY(x: number, y: number) {
        this.button.setPosition(x, y);
    }
}
