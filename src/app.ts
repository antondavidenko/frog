import 'phaser';

import {GameScene} from "./scenes/gameScene";
import {MenuScene} from "./scenes/menuScene";
import {EditorScene} from "./scenes/EditorScene";
import {GameModel} from "./model/Data";
import JSONFile = Phaser.Loader.FileTypes.JSONFile;

const frogGameConfig: any = {
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.FIT,
        parent: 'game',
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 600,
        height: 800
    },
    backgroundColor: '#dddddd',
    physics: {
        default: 'matter',
        matter: {
            gravity: {
                y: 0
            },
            debug: false,
            debugBodyColor: 0x555555
        }
    },
    scene: [MenuScene, GameScene, EditorScene]
};

export class FrogGame extends Phaser.Game {

    private static model: GameModel = new GameModel();

    constructor() {
        super(frogGameConfig);
    }

    public static getModel(): GameModel {
        return this.model;
    }
}

window.onload = () => {
    let game = new FrogGame();
};