import 'phaser';
import { Plugin as NineSlicePlugin } from '@teampanfu/phaser-nineslice';

import { GameScene } from "./scenes/gameScene";
import { MenuScene } from "./scenes/menuScene";
import { EditorScene } from "./scenes/EditorScene";
import { WaterEffect } from "./WaterEffect";

const frogGameConfig: any = {
  type: Phaser.WEBGL,
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
      gravity: { y: 0 },
      debug: false,
      debugBodyColor: 0x555555
    }
  },
  plugins: {
    global: [
      { key: 'NineSlicePlugin', plugin: NineSlicePlugin, start: true }
    ]
  },
  scene: [MenuScene, GameScene, EditorScene]
};

export class FrogGame extends Phaser.Game {
  constructor() {
    super(frogGameConfig);
  }
}

window.onload = () => {
  let game = new FrogGame();
  WaterEffect.setupWaterEffect(game);
};
