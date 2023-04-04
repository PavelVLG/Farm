import { SCENES } from '../util/global';
import Field from './Game/field/Field';
import Phaser from 'phaser';
import FactoryCell from './Game/character/FactoryCell';
import FactoryBasket from './Game/field/basket/FactoryBasket';
export default class Game extends Phaser.Scene {
    private field: Field;
    constructor() {
        super(SCENES.GAME);
    }

    public init() {
        this.game.scene.stop(SCENES.BOOT);
    }

    public create() {
        this.createCell();
        new FactoryBasket(this);
    }

    private createCell() {
        const { width } = this.scale;
        const x = width * 0.9;

        this.field = new Field(this);

        new FactoryCell(this, this.field.points);
    }
}
