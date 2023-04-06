import { SCENES } from 'scripts/util/global';
import { SKIN } from './Game/character/interface';
import { PrimalSubject } from './state/observer';
import { State } from './state/State';

export type ValueOf<T> = T[keyof T];

export type Scenes = ValueOf<typeof SCENES>;

export type Skins = ValueOf<typeof SKIN>;

export type StatePrimal = State[keyof State] & PrimalSubject;
