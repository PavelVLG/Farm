import { SCENES, SKIN } from 'scripts/util/global';
import { PrimalSubject } from './state/observer';
import { State } from './state/State';

export type ValueOf<T> = T[keyof T];

export type Scenes = ValueOf<typeof SCENES>;

export type Skins = ValueOf<typeof SKIN>;

export type StatePrimal = State[keyof State] & PrimalSubject;

export type PrimalSubjectKeys<T> = {
    [K in keyof T]: T[K] extends PrimalSubject ? K : never;
}[keyof T];

export type PrimalSubjectStateKey = PrimalSubjectKeys<State>;
export interface DataCell {
    value_name: string;
    value_sum: number;
    speed: number;
    need_source?: string;
    time_source?: number;
    need?: number;
    price?: number;
}

export type TextConfig = {
    x: number;
    y: number;
    text: string | string[];
};

export type TextStile = Phaser.Types.GameObjects.Text.TextStyle;
