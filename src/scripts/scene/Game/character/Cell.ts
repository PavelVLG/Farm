import { state } from 'scripts/util/global';
import { State } from 'scripts/scene/state/State';
import { PrimalSubject } from 'scripts/scene/state/observer';
import { DataCell, StatePrimal } from 'scripts/scene/type';
import Point from '../field/Point';
import Phaser from 'phaser';
import Draggable from '../modules/Draggable';
import AnimCell from './AnimationCell';
import ProgressCell from './ProgressCell';

type Status = 'wait' | 'process' | 'complete';

export type ConfigAnimate = {
    speed: number;
    prefix: string;
    start: string;
    end: string;
};

export default class Cell extends Phaser.GameObjects.Sprite {
    public scene: Phaser.Scene;
    private _anims: ConfigAnimate;
    private _dataCell: DataCell;
    private _status: Status;
    private animation: AnimCell;
    private progress: ProgressCell;
    constructor(scene: Phaser.Scene, configAnim: ConfigAnimate, point: Point, dataCell: DataCell) {
        super(scene, point.x, point.y, 'game');

        this.setScale(0.2);

        this.scene = scene;
        this._anims = configAnim;
        this._dataCell = dataCell;
        this._status = 'wait';

        this.scene.add.layer(this);

        this.progress = new ProgressCell(scene, this, configAnim.speed / 1000);

        this.init();

        this.on('pointerdown', this.updateStatus, this);
    }

    set status(status: Status) {
        this._status = status;
    }

    get status() {
        return this._status;
    }

    private init() {
        new Draggable(this.scene, this);
        this.animation = new AnimCell(this.scene, this);
        this.animation.setFrame('start');
    }

    get dataCell() {
        return this._dataCell;
    }

    get animations() {
        return this._anims;
    }

    private async updateStatus() {
        switch (this.status) {
            case 'process':
                return;

            case 'complete':
                this.updateSource();

                this.animation.setFrame('start');
                this.progress.clear();
                this.status = 'wait';
                return;

            case 'wait':
                if (!this.checkSource()) return;

                this.status = 'process';

                this.progress.start();

                await this.animation.process();

                this.animation.setFrame('end');

                this.status = 'complete';
                return;

            default:
                console.warn('status not found');
        }
    }

    private checkSource(): boolean {
        const { dataCell } = this;
        const { need, need_source } = dataCell;

        const source = this.getPrimalSubject(need_source);

        if (!source) return true;

        if (source.value < need) return false;

        source.value -= need;

        return true;
    }

    private updateSource() {
        const { dataCell } = this;
        const { value_name, value_sum } = dataCell;

        const source = this.getPrimalSubject(value_name);

        if (!source) return;

        source.value += value_sum;
    }

    private getPrimalSubject(name: string): StatePrimal | undefined {
        const source = `value_${name}`;

        const key = state[source as keyof State];
        const checkInstance = key instanceof PrimalSubject;

        if (!key || !checkInstance) return undefined;

        return key;
    }
}
