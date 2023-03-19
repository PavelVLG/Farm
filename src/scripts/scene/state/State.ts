//@todo observer?
import dataCharacter from '../Game/character/character.json';
import { DataCell, SKIN } from '../Game/character/interface';
import { PrimalSubject } from './observer';
const { chicken, wheat, cow } = dataCharacter;

export type CellName = keyof typeof SKIN;
export class State {
    public readonly value_wheat: PrimalSubject;
    public readonly value_money: PrimalSubject;
    public readonly value_milk: PrimalSubject;
    public readonly value_egg: PrimalSubject;
    public readonly chicken: DataCell;
    public readonly wheat: DataCell;
    public readonly cow: DataCell;
    constructor() {
        this.chicken = chicken;
        this.cow = cow;
        this.wheat = wheat;
        this.value_milk = new PrimalSubject(1);
        this.value_money = new PrimalSubject(0);
        this.value_wheat = new PrimalSubject(1);
        this.value_egg = new PrimalSubject(1);
    }
}
