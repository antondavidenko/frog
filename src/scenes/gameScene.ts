import "phaser";
import {Level} from "./../sceneobjects/level";
import {Frog} from "./../sceneobjects/frog";
import {toLoadList} from "./../model/data";

export class GameScene extends Phaser.Scene {

    canDragGroup: number;
    generalCategory: number;

    constructor() {
        super({key: "GameScene"});
    }

    preload(): void {
        for(let i in toLoadList) {
            this.load.image(toLoadList[i]);
        }
    }

    create(): void {
        this.matter.world.setBounds();
        this.canDragGroup = this.matter.world.nextGroup(false);
        this.generalCategory =  this.matter.world.nextCategory();

        let frog = new Frog(this);
        frog.create(this.canDragGroup, this.generalCategory);
        //frog.tongueHide();

        let level = new Level(this);
        level.create(this.generalCategory);

        this.matter.add.mouseSpring({ length: 1, stiffness: 0, collisionFilter: { group: this.canDragGroup }});
    }

    update(time: number): void {
        console.log("update");
    }

}