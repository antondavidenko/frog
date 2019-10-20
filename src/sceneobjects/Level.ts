import {GameModel, levelGameConfig} from "./../model/data";

export class Level {

    scene: Phaser.Scene;

    constructor(scene) {
        this.scene = scene;
    }

    create(model: GameModel, levelId: number) {
        for (let i in levelGameConfig[levelId]) {
            if (levelGameConfig[levelId][i].type == 'fly') {
                this.scene.add.image(
                    this.indexToPos(levelGameConfig[levelId][i].x),
                    this.indexToPos(levelGameConfig[levelId][i].y),
                    "holder");
            }

            let gameObj = this.scene.matter.add.image(
                this.indexToPos(levelGameConfig[levelId][i].x),
                this.indexToPos(levelGameConfig[levelId][i].y),
                levelGameConfig[levelId][i].type
            );
            gameObj.setStatic(true);
            gameObj.setCollisionCategory(model.generalCategory);
            (<any>gameObj.body).label = levelGameConfig[levelId][i].type;
            (<any>gameObj.body).gameObject = gameObj;
        }
    }

    indexToPos(index:number):number {
        return (index - 1) * 64 + 32 + 12
    }

}