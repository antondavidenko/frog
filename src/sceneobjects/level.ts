import "phaser";
import {GameModel, levelGameConfig} from "./../model/data";

export class Level {

    scene: Phaser.Scene;

    constructor(scene) {
        this.scene = scene;
    }

    create(model: GameModel, levelId: number) {
        for (let i in levelGameConfig[levelId]) {
            let gameObj = this.scene.matter.add.image(
                (levelGameConfig[levelId][i].x - 1) * 64 + 32 + 12,
                (levelGameConfig[levelId][i].y - 1) * 64 + 32 + 12,
                levelGameConfig[levelId][i].type
            );
            gameObj.setStatic(true);
            gameObj.setCollisionCategory(model.generalCategory);
            (<any>gameObj.body).label = levelGameConfig[levelId][i].type;
            (<any>gameObj.body).gameObject = gameObj;
        }
    }

}