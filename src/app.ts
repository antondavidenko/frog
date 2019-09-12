import {GameScene} from "./scenes/gameScene";

const frogGameConfig: GameConfig = {
    type: Phaser.AUTO,
    width: 600,
    height: 800,
    backgroundColor: '#dddddd',
    parent: 'root',
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
    scene: [GameScene]
};

export class FrogGame extends Phaser.Game {
    constructor() {
        super(frogGameConfig);
    }
};

window.onload = () => {
    let game = new FrogGame();
};