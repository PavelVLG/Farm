import { State } from 'scripts/scene/state/State';

export const FPS = 10;

export const FIELD_SIZE = { verticalCells: 8, horizontalCells: 8 };

export const HANDLE_EVENT = new Phaser.Events.EventEmitter();

export const ELEMENTS = {
    wheat: [0, 1],
    chicken: [20, 21],
    cow: [16, 17],
};

export const IS_DEBUG = process.env.NODE_ENV === 'development' ? true : false;

export const SCENES = {
    BOOT: 'Boot',
    GAME: 'Game',
} as const;

export const EVENTS = {
    LOADING: 'loading',
    LOADED: 'loaded',
    START_SCENE: 'start_scene',
    TEST: 'test',
} as const;

export const EMIT = {
    DRAG_END: 'drag_end',
} as const;

export const FRAMES = {
    chicken: {
        prefix: 'chicken',
        start: '_start',
        end: '_end',
    },
    wheat: {
        prefix: 'wheat',
        start: '_start',
        end: '_end',
    },
    cow: {
        prefix: 'cow',
        start: '_start',
        end: '_end',
    },
} as const;

export const PNG = {
    HAND: 'hand',
} as const;

export const SKIN = {
    COW: 'cow',
    CHICKEN: 'chicken',
    WHEAT: 'wheat',
} as const;

export const WIDTH = document.documentElement.clientWidth;

export const HEIGHT = (9 / 16) * WIDTH;

export const state = new State();
