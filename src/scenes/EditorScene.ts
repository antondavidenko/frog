import {Level} from "./../sceneobjects/level";
import {EditorPanel} from "../sceneobjects/editor/EditorPanel";
import {Utils} from "../Utils";
import {BaseScene} from "./BaseScene";

export class EditorScene extends BaseScene {

    private level: Level;
    private levelData: string[] = [];
    private levelId: number;
    private panel:EditorPanel;

    constructor() {
        super("EditorScene");
    }

    preload(): void {
        super.preload();
    }

    init(params: any): void {
        this.levelId = params.levelId;
        this.levelData = this.getLevelsList()[params.levelId];
    }

    create(): void {
        super.create();

        this.level = new Level(this);
        this.level.renderLevelData(this.levelData);

        this.panel = new EditorPanel(this, this.onMenuClick, this.onSaveClick);
        this.panel.create();

        this.input.on('pointerdown', this.onFieldClick, this);
    }

    onFieldClick = (pointer) => {
        let x = Utils.positionToIndex(pointer.x) - 1;
        let y = Utils.positionToIndex(pointer.y) - 1;
        if (x >= 0 && x <= 8 && y >= 0 && y <= 7) {
            this.levelData[y] = Utils.replaceAt(this.levelData[y], x, Utils.getIdByType(this.panel.getSelectedItem()));
            this.level.renderLevelData(this.levelData);
        }
    };

    onSaveClick = () => {
        let serverURL:string = "./php/save.php";
        this.updateLevelsData();
        let saveDataJSON = {"levelsList":this.getLevelsList()};
        let saveData = 'file_data='+JSON.stringify(saveDataJSON);
        Utils.httpCall("POST", serverURL, saveData, this.onDataSaved);
        this.panel.setSaveButtonVisible(false);
    };

    updateLevelsData(): void {
        let levelsList = this.getLevelsList();
        levelsList[this.levelId] = this.levelData;
        this.setLevelsList(levelsList);
    }

    onDataSaved = (params:any) => {
        this.panel.setSaveButtonVisible(true);
        console.log(params);
    };

    onMenuClick = () => {
        this.scene.stop('GameScene');
        this.matter.world.destroy();
        this.scene.start("MenuScene");
    };

}