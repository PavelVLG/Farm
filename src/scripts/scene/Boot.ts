import Png from 'assets/png.json';
import Spine from 'assets/spine.json';
import Sprite from 'assets/atlas.json';
import { SCENES } from '../util/global';
import LoadingProgress from './Boot/LoadingProgress';
import { Scenes } from './type';

export default class Boot extends Phaser.Scene {
    public loader: LoadingProgress;
    constructor() {
        super(SCENES.BOOT);
    }

    public init() {
        this.loader = new LoadingProgress(this);
    }

    public preload() {
        this.loadAtlas();
        this.loadPng();
        this.loadSpine();
        this.load.on('progress', (value: number) => this.loadProgress(value));

        this.load.on('complete', () => this.changeScene(SCENES.GAME));
    }

    private loadSpine() {
        Spine.forEach(({ key, json, atlas }) => {
            this.load.spine(key, json, atlas);
        });
    }
    private loadPng() {
        Png.forEach(({ key, path }) => {
            this.load.image(key, path);
        });
    }

    private loadAtlas() {
        Sprite.forEach(({ key, json, png }) => {
            this.load.atlas(key, png, json);
        });
    }

    private loadProgress(value: number) {
        this.loader.updateProgress(value);
    }

    private changeScene(scene: Scenes) {
        this.time.delayedCall(1000, () => this.game.scene.start(scene));
    }
}
