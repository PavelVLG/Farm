import { state } from 'scripts/util/global';
import Pointer from '../field/Point';
import Character, { ConfigAnimate } from './Character';
import { SKIN } from './interface';

export default class Wheat extends Character {
    constructor(scene: Phaser.Scene, config: ConfigAnimate, point: Pointer) {
        super(scene, config, point);

        this.name = SKIN.WHEAT;
        this.start();
    }

    protected message(): void {
        super.message();

        if (this.status !== 'complete') return;

        this.status = 'wait';
        state.value_wheat.value += state.wheat.value_sum;

        this.tween();
        this.start();
    }
}
