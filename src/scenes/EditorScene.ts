import {Level} from "../sceneobjects/level";
import {EditorPanel} from "../sceneobjects/editor/EditorPanel";
import {BaseScene} from "./BaseScene";
import {ServerAPI} from "../ServerAPI";
import {LevelDataHelper} from "../LevelDataHelper";

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
        let x = LevelDataHelper.positionToIndex(pointer.x) - 1;
        let y = LevelDataHelper.positionToIndex(pointer.y) - 1;
        if (x >= 0 && x <= 8 && y >= 0 && y <= 7) {
            let newId:string = LevelDataHelper.getIdByType(this.panel.getSelectedItem());
            this.levelData[y] = EditorScene.replaceAt(this.levelData[y], x, newId);
            this.level.renderLevelData(this.levelData);
        }
    };

    private static replaceAt(string, index, replace) {
        return string.substring(0, index) + replace + string.substring(index + 1);
    }

    onSaveClick = () => {
        this.updateLevelsData();
        ServerAPI.saveLevelsData(this.getLevelsList(), this.onDataSaved);
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