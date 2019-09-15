import "phaser";
import {Level} from "./../sceneobjects/level";
import {Frog} from "./../sceneobjects/frog";
import {GameModel, toLoadList} from "./../model/data";

export class GameScene extends Phaser.Scene {

    model: GameModel;
    frog: Frog;

    constructor() {
        super({key: "GameScene"});
        this.model = new GameModel();
    }

    preload(): void {
        for (let i in toLoadList) {
            this.load.image(toLoadList[i]);
        }
    }

    create(): void {
        this.matter.world.setBounds();
        this.model.canDragGroup = this.matter.world.nextGroup(false);
        this.model.noDragGroup = this.matter.world.nextGroup(true);
        this.model.generalCategory = this.matter.world.nextCategory();

        this.frog = new Frog(this);
        this.frog.create(this.model);

        let level = new Level(this);
        level.create(this.model);
    }

    update(time: number): void {
        this.frog.update();
    }

}