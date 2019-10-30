import {Level} from "./../sceneobjects/level";
import {toLoadList} from "./../model/Data";
import {EditorPanel} from "../sceneobjects/editor/EditorPanel";
import {Utils} from "../Utils";
import {FrogGame} from "../app";

export class EditorScene extends Phaser.Scene {

    private level: Level;
    private levelItemId: string = "fly";
    private levelData: string[] = [];

    constructor() {
        super({key: "EditorScene"});
    }

    preload(): void {
        for (let i of toLoadList) {
            this.load.image(i);
        }
    }

    init(params: any): void {
        this.levelData = FrogGame.getModel().levelsList[params.levelId];
    }

    create(): void {
        this.add.image(300, 400, 'bg');

        this.level = new Level(this);
        this.level.renderLevelData(this.levelData);

        let panel = new EditorPanel(this, this.onMenuClick, this.onToolClick);
        panel.create();

        this.input.on('pointerdown', this.onFieldClick, this);
    }

    onFieldClick = (pointer) => {
        let x = Utils.positionToIndex(pointer.x) - 1;
        let y = Utils.positionToIndex(pointer.y) - 1;
        if (x >= 0 && x <= 8 && y >= 0 && y <= 7) {
            this.levelData[y] = Utils.replaceAt(this.levelData[y], x, Utils.getIdByType(this.levelItemId));
            this.level.renderLevelData(this.levelData);
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