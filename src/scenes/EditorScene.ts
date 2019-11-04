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

        let panel = new EditorPanel(this, this.onMenuClick, this.onToolClick, this.onSaveClick);
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

    onSaveClick = (pointer, gameObject, label) => {
        let serverURL:string = "http://antondavidenko.com/games/frog_tst/php/save.php";
        let saveDataJSON = {"levelsList":FrogGame.getModel().levelsList};
        let saveData = 'file_data='+JSON.stringify(saveDataJSON);
        Utils.httpCall("POST", serverURL, saveData, this.onDataSaved);
    };

    onDataSaved = (params:any) => {
        console.log(params); //todo: correct processing server respond
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