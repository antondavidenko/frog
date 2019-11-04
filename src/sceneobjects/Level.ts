import {LevelObjectSettings} from "./../model/Data";
import {Utils} from "../Utils";
import {FrogGame} from "../app";

export class Level {

    private levelContainer: Phaser.GameObjects.Container;

    constructor(private scene: Phaser.Scene) {
        this.levelContainer = this.scene.add.container(0, 0);
    }

    public create(levelData: string[]): void {
        for (let y in levelData) {
            for (let x in levelData[y].split("")) {
                let type = Utils.getTypeById(levelData[y].charAt(parseInt(x)));
                if (type != "NONE") {
                    this.createElement(this.getSettings({x:parseInt(x)+1, y:parseInt(y)+1, type:type}));
                }
            }
        }
    }

    private createElement(settings:LevelObjectSettings):void {
        this.addHolderIfRequired(settings);

        let gameObj = this.scene.matter.add.image(settings.x, settings.y, settings.type);
        this.setupBody(gameObj, FrogGame.getModel().generalCategory);

        gameObj.body['label'] = settings.type;
        gameObj.body['gameObject'] = gameObj;
    }

    public renderLevelData(levelData: string[]): void {
        this.levelContainer.removeAll(true);
        for (let y in levelData) {
            for (let x in levelData[y].split("")) {
                let type = Utils.getTypeById(levelData[y].charAt(parseInt(x)));
                if (type != "NONE") {
                    this.renderElement(this.getSettings({x:parseInt(x)+1, y:parseInt(y)+1, type:type}));
                }
            }
        }
    }

    private renderElement(settings:LevelObjectSettings):void {
        if (settings.type == 'fly') { // todo: use levelContainer for game also. in order to have the same flow
            this.levelContainer.add(this.scene.add.image(settings.x, settings.y, "holder"));
        }
        this.levelContainer.add(this.scene.add.image(settings.x, settings.y, settings.type));
    }

    private addHolderIfRequired(settings: LevelObjectSettings) {
        if (settings.type == 'fly') {
            this.scene.add.image(settings.x, settings.y, "holder");
        }
    }

    private setupBody(gameObj: Phaser.Physics.Matter.Image, category: number) {
        let Bodies = (<any>Phaser.Physics.Matter).Matter.Bodies;
        let circle = Bodies.circle(gameObj.x, gameObj.y, 32 + 5); //todo: move magic number to dedicated place in code
        gameObj.setExistingBody(circle);
        gameObj.setStatic(true);
        gameObj.setCollisionCategory(category);
    }

    private getSettings(input: LevelObjectSettings): LevelObjectSettings {
        return {type: input.type, x: Utils.indexToPosition(input.x), y: Utils.indexToPosition(input.y)};
    }

}