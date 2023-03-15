import { state } from 'scripts/util/global';
import Pointer from '../field/Point';
import Character, { ConfigAnimate } from './Character';
import { SKIN } from './interface';

export default class Chicken extends Character {
    constructor(scene: Phaser.Scene, config: ConfigAnimate, point: Pointer) {
        super(scene, config, point);
        this.name = SKIN.CHICKEN;
        this.status = 'wait';
        this.setIdle();
    }

    protected message(): void {
        super.message();

        if (this.status === 'process') return;

        if (this.status === 'complete') {
            this.tween();
            state.value_egg.value += state.chicken.value_sum;
            this.setIdle();
            this.status = 'wait';
            return;
        }

        const have = state.value_wheat.value;
        const need = state.chicken.need;

        if (have < need) return;

        state.value_wheat.value -= need;
        this.status = 'process';

        this.start();
    }
}
