import GameModePanel from "../sceneobjects/menu/GameModePanel";
import LevelSelectPanel from "../sceneobjects/menu/LevelSelectPanel";
import { BaseScene } from "./BaseScene";

export class MenuScene extends BaseScene {

  private modeId: string = "PLAY";

  constructor() {
    super("MenuScene");
  }

  preload(): void {
    super.preload();
    let nocache: string = "?nocache=" + (new Date(Date.now()).getTime());
    this.load.json('gameConfig', 'configs/levels.json' + nocache);
  }

  create(): void {
    super.create();
    this.setLevelsList(this.cache.json.get('gameConfig').levelsList);
    new LevelSelectPanel(this, 52, 272, this.onLevelClick);
    new GameModePanel(this, 0, 720, this.onModeClick);
    this.add.image(300, 120, 'logo');
  }

  onLevelClick = (pointer: Phaser.Input.Pointer, gameObject: Phaser.GameObjects.GameObject, label: string) => {
    let levelId: number = parseInt(label) - 1;
    this.scene.stop('MenuScene');
    if (this.modeId == "PLAY") {
      this.scene.start("GameScene", { levelId: levelId });
    } else {
      this.scene.start("EditorScene", { levelId: levelId });
    }
  };

  onModeClick = (pointer: Phaser.Input.Pointer, gameObject: Phaser.GameObjects.GameObject, mode: string) => {
    this.modeId = mode;
  };
}
