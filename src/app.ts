import 'phaser';

import {GameScene} from "./scenes/gameScene";
import {MenuScene} from "./scenes/menuScene";

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
    scene: [MenuScene, GameScene]
};

export class FrogGame extends Phaser.Game {
    constructor() {
        super(frogGameConfig);
    }
};

window.onload = () => {
    let game = new FrogGame();
};