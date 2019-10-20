import {GameModel, levelGameConfig, LevelObjectSettings} from "./../model/data";

export class Level {

    scene: Phaser.Scene;

    constructor(scene) {
        this.scene = scene;
    }

    create(model: GameModel, levelId: number) {
        for (let i in levelGameConfig[levelId]) {
            let settings:LevelObjectSettings = this.getSettings(levelGameConfig[levelId][i]);

            this.addHolderIfRequired(settings);

            let gameObj = this.scene.matter.add.image(settings.x, settings.y, settings.type);
            this.setupBody(gameObj, model.generalCategory);

            (<any>gameObj.body).label = levelGameConfig[levelId][i].type;
            (<any>gameObj.body).gameObject = gameObj;
        }
    }

    addHolderIfRequired(settings:LevelObjectSettings) {
        if (settings.type == 'fly') {
            this.scene.add.image(settings.x, settings.y,"holder");
        }
    }

    setupBody(gameObj:Phaser.Physics.Matter.Image, category: number) {
        let Bodies = (<any>Phaser.Physics.Matter).Matter.Bodies;
        let circle = Bodies.circle(gameObj.x, gameObj.y, 32);
        gameObj.setExistingBody(circle);
        gameObj.setStatic(true);
        gameObj.setCollisionCategory(category);
    }

    getSettings(input:LevelObjectSettings):LevelObjectSettings {
        return {type: input.type, x: this.indexToPos(input.x), y: this.indexToPos(input.y)};
    }

    indexToPos(index:number):number {
        return (index - 1) * 64 + 32 + 12;
    }

}