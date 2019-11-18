import {ButtonsFactory} from "../sceneobjects/ButtonsFactory";
import {GameModePanel} from "../sceneobjects/menu/GameModePanel";
import {BaseScene} from "./BaseScene";
import {LabelsFactory} from "../sceneobjects/LabelsFactory";

export class MenuScene extends BaseScene {

    private modeId: string;

    constructor() {
        super("MenuScene");
    }

    preload(): void {
        super.preload();
        let nocache:string = "?nocache="+(new Date(Date.now()).getTime());
        this.load.json('gameConfig', 'configs/levels.json'+nocache);
    }

    create(): void {
        super.create();
        this.modeId = "PLAY";
        this.setLevelsList(this.cache.json.get('gameConfig').levelsList);
        this.createLevelsList();
        let panel = new GameModePanel(this, this.onModeClick);
        panel.create(680);
        this.createHeader();
    }

    createHeader(): void {
        let header = new LabelsFactory(this).createGeneralLabel("FROG GAME MENU", 0,0);
        header.x = parseInt(((this.cameras.main.width - header.width)/2).toFixed());
    }

    createLevelsList(): void {
        let button = new ButtonsFactory(this);
        let paddingX: number = 32;
        let gapX: number = 120;
        let paddingY: number = 40 + 32;
        let gapY: number = 120;

        for (let y = 0; y < 5; y++) {
            for (let x = 0; x < 5; x++) {
                let label: string = (x + y * 5 + 1).toString();
                label = parseInt(label) > 9 ? label : " " + label + " ";
                let posX: number = paddingX + gapX * x;
                let posY: number = paddingY + gapY * y;
                button.createTextButton(label, posX, posY, this.onButtonClick);
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