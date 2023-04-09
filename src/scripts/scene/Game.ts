import { SCENES } from '../util/global';
import { BorderCircle } from './modules/border/BorderCircle';
import Field from './Game/field/Field';
import Phaser from 'phaser';
import FactoryCell from './Game/character/FactoryCell';
import FactorySource from './Game/field/plates/FactorySourcePlate';
import ResourcePlate from './Game/field/plates/ResourcePlate';
import BasePopUp from './modules/popups.ts/BasePopUp';
export default class Game extends Phaser.Scene {
    private field: Field;
    private cursor: Phaser.Input.Pointer[];
    constructor() {
        super(SCENES.GAME);
    }

    public init() {
        this.game.scene.stop(SCENES.BOOT);
        this.cursor = this.input.addPointer();
    }

    public async create() {
        this.createCell();
        this.addPlates();
        this.createPopUp();
    }

    private addPlates() {
        const { width, height } = this.scale;
        new FactorySource(this);

        const moneyPlate = new ResourcePlate(this, 'value_money')
            .setPosition(width * 0.9, height * 0.1)
            .setTitleText('Money')
            .setSubtitleText('0');

        const borderCircle = new BorderCircle(this, moneyPlate);

        moneyPlate.add(borderCircle.border);
    }

    private createCell() {
        const { width } = this.scale;
        const x = width * 0.9;

        this.field = new Field(this);

        new FactoryCell(this, this.field.points);
    }

    private createPopUp() {
        const popup = new BasePopUp(this, 'PopUp');
        popup.open();
    }
}
