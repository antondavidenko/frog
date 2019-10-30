import {GameModel, levelGameConfig, LevelObjectSettings} from "./../model/data";
import {Utils} from "../Utils";

export class Level {

    private levelContainer: Phaser.GameObjects.Container;

    constructor(private scene: Phaser.Scene) {
        this.levelContainer = this.scene.add.container(0, 0);
    }

    public create(model: GameModel, levelId: number): void {
        for (let i in levelGameConfig[levelId]) {
            let settings: LevelObjectSettings = this.getSettings(levelGameConfig[levelId][i]);

            this.addHolderIfRequired(settings);

            let gameObj = this.scene.matter.add.image(settings.x, settings.y, settings.type);
            this.setupBody(gameObj, model.generalCategory);

            gameObj.body['label'] = levelGameConfig[levelId][i].type;
            gameObj.body['gameObject'] = gameObj;
        }
    }

    public renderLevelData(levelGameConfig: LevelObjectSettings[]): void {
        this.levelContainer.removeAll(true);
        for (let i in levelGameConfig) {
            let settings: LevelObjectSettings = this.getSettings(levelGameConfig[i])
            //this.addHolderIfRequired(settings);
            this.levelContainer.add(
                this.scene.add.image(settings.x, settings.y, settings.type)
            );
        }
    }

    addHolderIfRequired(settings: LevelObjectSettings) {
        if (settings.type == 'fly') {
            this.scene.add.image(settings.x, settings.y, "holder");
        }
    }

    setupBody(gameObj: Phaser.Physics.Matter.Image, category: number) {
        let Bodies = (<any>Phaser.Physics.Matter).Matter.Bodies;
        let circle = Bodies.circle(gameObj.x, gameObj.y, 32);
        gameObj.setExistingBody(circle);
        gameObj.setStatic(true);
        gameObj.setCollisionCategory(category);
    }

    getSettings(input: LevelObjectSettings): LevelObjectSettings {
        return {type: input.type, x: Utils.indexToPosition(input.x), y: Utils.indexToPosition(input.y)};
    }

}