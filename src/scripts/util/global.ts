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

export const COLORS = {
    PURPLE: 0xff00ff,
    BLUE: 0xfff,
    SALAD: 0xff00,
    BLACK: 0x000,
    ELlOW: 0xffff00,
    LITE_BLUE: 0xffff,
    WHITE: 0xffffff,
};

export const FRAMES = {
    chicken: {
        prefix: 'chicken_',
        start: 'start',
        end: 'end',
    },
    wheat: {
        prefix: 'wheat_',
        start: 'start',
        end: 'end',
    },
    cow: {
        prefix: 'cow_',
        start: 'start',
        end: 'end',
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
