import {Button} from "../sceneobjects/Button";
import {toLoadList} from "../model/Data";
import {GameModePanel} from "../sceneobjects/menu/GameModePanel";
import {FrogGame} from "../app";

export class MenuScene extends Phaser.Scene {

    private modeId: string;

    constructor() {
        super({key: "MenuScene"});
    }

    preload(): void {
        for (let i of toLoadList) {
            this.load.image(i);
        }

        let nocache:string = "?nocache="+(new Date(Date.now()).getTime());
        this.load.json('gameConfig', 'configs/levels.json'+nocache);
    }

    create(): void {
        this.modeId = "PLAY";
        FrogGame.getModel().levelsList = this.cache.json.get('gameConfig').levelsList;
        this.add.image(300, 400, 'bg');
        this.createLevelsList();
        let panel = new GameModePanel(this, this.onModeClick);
        panel.create();
    }

    createLevelsList(): void {
        let button = new Button(this);
        let paddingX: number = 32;
        let gapX: number = 120;
        let paddingY: number = 32;
        let gapY: number = 120;

        for (let y = 0; y < 5; y++) {
            for (let x = 0; x < 5; x++) {
                let label: string = (x + y * 5 + 1).toString();
                label = parseInt(label) > 9 ? label : " " + label + " ";
                let posX: number = paddingX + gapX * x;
                let posY: number = paddingY + gapY * y;
                button.createButton(label, posX, posY, this.onButtonClick);
            }
        }
    }

    onButtonClick = (pointer, gameObject, label) => {
        let levelId: number = parseInt(label) - 1;
        this.scene.stop('MenuScene');
        if (this.modeId == "PLAY") {
            this.scene.start("GameScene", {levelId: levelId});
        } else {
            this.scene.start("EditorScene", {levelId: levelId});
        }
    };

    onModeClick = (pointer, gameObject, mode) => {
        this.modeId = mode;
    };

}