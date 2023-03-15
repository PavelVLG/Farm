import { SCENES } from '../util/global';
import BasketEgg from './Game/field/BasketEgg';
import BasketMilk from './Game/field/BasketMilk';
import BasketMoney from './Game/field/BasketMoney';
import BasketWheat from './Game/field/BasketWheat';
import Field from './Game/field/Field';
import Phaser from 'phaser';
import FactoryCharacter from './Game/character/FactoryCharacter';
export default class Game extends Phaser.Scene {
    private field: Field;
    constructor() {
        super(SCENES.GAME);
    }

    public init() {
        this.game.scene.stop(SCENES.BOOT);
    }

    public preload() {}

    public create() {
        const { width } = this.scale;
        const x = width * 0.9;

        new BasketMoney(this, x, 150);
        new BasketEgg(this, x, 400);
        new BasketWheat(this, x, 650);
        new BasketMilk(this, x, 900);

        this.field = new Field(this);

        new FactoryCharacter(this, this.field.points);
    }
}
