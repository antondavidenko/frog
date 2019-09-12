import "phaser";
import {levelGameConfig} from "./../model/data";

export class Level {

    scene: Phaser.Scene;

    constructor(scene) {
        this.scene = scene;
    }

    create(generalCategory: number) {
        for(let i in levelGameConfig) {
            let gameObj = this.scene.matter.add.image(levelGameConfig[i].x, levelGameConfig[i].y, levelGameConfig[i].type);
            gameObj.scaleX = gameObj.scaleY = levelGameConfig[i].scale;
            gameObj.setStatic(true);
            gameObj.setCollisionCategory(generalCategory);
        }
    }

}