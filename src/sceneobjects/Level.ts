import {Utils} from "../Utils";
import {LevelObjectTypes} from "../LevelObjectTypes";

export class Level {

    private levelContainer: Phaser.GameObjects.Container;

    constructor(private scene: Phaser.Scene) {
        this.levelContainer = this.scene.add.container(0, 0);
    }

    public create(levelData: string[], generalCategory: number): void {
        for (let y in levelData) {
            for (let x in levelData[y].split("")) {
                let type = Utils.getTypeById(levelData[y].charAt(parseInt(x)));
                if (type != LevelObjectTypes.NONE) {
                    this.createElement(
                        this.getSettings({x:parseInt(x)+1, y:parseInt(y)+1, type:type}),
                        generalCategory);
                }
            }
        }
    }

    private createElement(settings:LevelObjectSettings, generalCategory: number):void {
        this.addHolderIfRequired(settings);

        let gameObj = this.scene.matter.add.image(settings.x, settings.y, settings.type);
        this.setupBody(gameObj, generalCategory);

        gameObj.body['label'] = settings.type;
        gameObj.body['gameObject'] = gameObj;
    }

    public renderLevelData(levelData: string[]): void {
        this.levelContainer.removeAll(true);
        for (let y in levelData) {
            for (let x in levelData[y].split("")) {
                let type = Utils.getTypeById(levelData[y].charAt(parseInt(x)));
                if (type != LevelObjectTypes.NONE) {
                    this.renderElement(this.getSettings({x:parseInt(x)+1, y:parseInt(y)+1, type:type}));
                }
            }
        }
    }

    private renderElement(settings:LevelObjectSettings):void {
        this.addHolderIfRequired(settings, true);
        this.levelContainer.add(this.scene.add.image(settings.x, settings.y, settings.type));
    }

    private addHolderIfRequired(settings: LevelObjectSettings, toLevelContainer:boolean = false) {
        if (settings.type == LevelObjectTypes.FLY) {
            if (toLevelContainer) {
                this.levelContainer.add(this.scene.add.image(settings.x, settings.y, "holder"));
            } else {
                this.scene.add.image(settings.x, settings.y, "holder");
            }
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

interface LevelObjectSettings {
    x: number;
    y: number;
    type: string;
}