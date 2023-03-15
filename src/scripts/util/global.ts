import { State } from 'scripts/scene/state/State';

export const FPS = 10;

export const FIELD_SIZE = { verticalCells: 8, horizontalCells: 8 };

export const HANDLE_EVENT = new Phaser.Events.EventEmitter();

export const ELEMENTS = {
    wheat: [0, 10],
    chicken: [8, 1],
    cow: [6, 2],
};

export const IS_DEBUG = process.env.NODE_ENV === 'development' ? true : false;

export enum SCENES {
    BOOT = 'Boot',
    GAME = 'Game',
}

export enum EVENTS {
    LOADING = 'loading',
    LOADED = 'loaded',
    START_SCENE = 'start_scene',
    TEST = 'test',
}

export enum COLORS {
    BLUE = 0xfff,
    SALAD = 0xff00,
    BLACK = 0x000,
    ELlOW = 0xffff00,
    LITE_BLUE = 0xffff,
    WHITE = 0xffffff,
}

export const FRAMES = {
    chicken: {
        idle: 'chicken_idle',
        prefix: 'chicken_',
        frames: 3,
    },
    wheat: {
        idle: 'wheat_0',
        prefix: 'wheat_',
        frames: 2,
    },
    cow: {
        idle: 'cow_idle',
        prefix: 'cow_',
        frames: 4,
    },
} as const;

export const WIDTH = 1920;
export const HEIGHT = 1080;
export const CENTER_X = WIDTH / 2;
export const CENTER_Y = HEIGHT / 2;

export const state = new State();
