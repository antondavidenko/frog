import {Level} from "../sceneobjects/Level";
import {BaseScene} from "./BaseScene";
import {TongueTypes} from "../sceneobjects/game/tongue/TongueTypes";
import {Frog} from "../sceneobjects/game/Frog";
import {GamePanel} from "../sceneobjects/game/GamePanel";
import {LevelObjectTypes} from "../LevelObjectTypes";
import {Utils} from "../Utils";
import {PopupsFactory} from "../sceneobjects/PopupsFactory";

const levelEndPopupShowDelay: number = 3000;

export class GameScene extends BaseScene {

    private frog: Frog;
    private levelId: number;
    private generalCategory: number;
    private tongueCategory: number;
    private panel: GamePanel;

    constructor() {
        super("GameScene");
    }

    preload(): void {
        super.preload();
    }

    init(params: any): void {
        this.levelId = params.levelId;
    }

    create(): void {
        super.create();

        this.generalCategory = this.generalCategory == undefined ? this.matter.world.nextCategory() : this.generalCategory;
        this.tongueCategory = this.tongueCategory == undefined ? this.matter.world.nextCategory() : this.tongueCategory;

        this.matter.world.setBounds();

        let level = new Level(this);
        level.create(this.getLevelsList()[this.levelId], this.generalCategory);

        this.frog = new Frog(this);
        this.frog.create(this.generalCategory, this.tongueCategory, TongueTypes.ElasticTongue);

        this.matter.world.on('collisionstart', function (event) {
            this.scene.processingBody(event.pairs[0].bodyA);
            this.scene.processingBody(event.pairs[0].bodyB);
        });

        this.panel = new GamePanel(
            this,
            this.onButtonClick,
            this.onLevelEnd,
            this.getFlyCount(this.getLevelsList()[this.levelId]));
        this.panel.create()
    }

    private onLevelEnd = () => {
        setTimeout(() => {
            new PopupsFactory(this).crateLevelWinPopup(this.onButtonClick);
        }, levelEndPopupShowDelay);
    };

    public getFlyCount(levelData: string[]): number {
        let flyCount = 0;
        for (let y in levelData) {
            for (let x in levelData[y].split("")) {
                let type = Utils.getTypeById(levelData[y].charAt(parseInt(x)));
                if (type == LevelObjectTypes.FLY) {
                    flyCount++;
                }
            }
        }
        return flyCount;
    }

    processingBody(body: any) {
        if (body.label == LevelObjectTypes.FLY) {
            body.gameObject.destroy();
            this.panel.updateFlyCount();
        }
        if (body.label == LevelObjectTypes.CACTUS) {
            this.frog.tongueHide();
        }
    }

    update(time: number): void {
        this.frog.update();
        super.update(time);
    }

    onButtonClick = () => {
        this.scene.stop('GameScene');
        this.matter.world.destroy();
        this.scene.start("MenuScene");
    };

}