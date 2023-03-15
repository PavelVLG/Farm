import { state } from 'scripts/util/global';
import Pointer from '../field/Point';
import Character, { ConfigAnimate } from './Character';
import { SKIN } from './interface';

export default class Cow extends Character {
    constructor(scene: Phaser.Scene, config: ConfigAnimate, point: Pointer) {
        super(scene, config, point);

        this.name = SKIN.COW;
        this.setIdle();
    }

    protected message(): void {
        super.message();

        if (this.status === 'process') return;

        if (this.status === 'complete') {
            this.tween();
            state.value_milk.value += state.cow.value_sum;
            this.setIdle();
            this.status = 'wait';
            return;
        }

        const have = state.value_wheat.value;
        const need = state.cow.need;

        if (have < need) return;

        state.value_wheat.value -= need;
        this.status = 'process';

        this.start();
    }
}
