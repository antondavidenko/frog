import {Level} from "./../sceneobjects/level";
import {toLoadList} from "./../model/data";
import {EditorPanel} from "../sceneobjects/EditorPanel";
import {Utils} from "../Utils";

export class EditorScene extends Phaser.Scene {

    private level: Level;
    private levelItemId: string = "fly";
    private levelId;
    private levelData: string[][] = [[],[],[],[],[],[],[],[],[],[]];

    constructor() {
        super({key: "EditorScene"});
    }

    preload(): void {
        for (let i of toLoadList) {
            this.load.image(i);
        }
    }

    init(params: any): void {
        this.levelId = params.levelId;
    }

    create(): void {
        this.add.image(300, 400, 'bg');

        this.level = new Level(this);

        let panel = new EditorPanel(this, this.onMenuClick, this.onToolClick);
        panel.create();

        this.input.on('pointerdown', this.onFieldClick, this);
    }

    onFieldClick = (pointer) => {
        let x = Utils.positionToIndex(pointer.x);
        let y = Utils.positionToIndex(pointer.y);
        if (x >= 1 && x <= 9 && y >= 1 && y <= 8) {
            this.levelData[x][y] = this.levelItemId;
            this.level.renderLevelData(Utils.levelDataConverter(this.levelData));
        }
    };

    onToolClick = (pointer, gameObject, toolId) => {
        this.levelItemId = toolId;
    };

    onMenuClick = (pointer, gameObject, label) => {
        this.scene.stop('GameScene');
        this.matter.world.destroy();
        this.scene.start("MenuScene");
    };

}