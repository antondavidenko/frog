import { Level } from "../sceneobjects/Level";
import { BaseScene } from "./BaseScene";
import { TongueTypes } from "../sceneobjects/game/tongue/TongueTypes";
import { Frog } from "../sceneobjects/game/Frog";
import { GamePanel } from "../sceneobjects/game/GamePanel";
import { LevelDataHelper, LevelObjectTypes } from "../LevelDataHelper";

const levelEndPopupShowDelay: number = 2000;

export class GameScene extends BaseScene {

  private frog!: Frog;
  private levelId!: number;
  private generalCategory!: number;
  private tongueCategory!: number;
  private panel!: GamePanel;

  constructor() {
    super("GameScene");
  }

  preload(): void {
    super.preload();
  }

  init(params: any): void {
    this.levelId = params.levelId;
  }

  create(): void {
    super.create();
    this.onButtonClick = this.onButtonClick.bind(this);

    this.generalCategory = this.generalCategory == undefined ? this.matter.world.nextCategory() : this.generalCategory;
    this.tongueCategory = this.tongueCategory == undefined ? this.matter.world.nextCategory() : this.tongueCategory;

    this.matter.world.setBounds();

    let level = new Level(this);
    level.create(this.getLevelsList()[this.levelId], this.generalCategory);

    this.frog = new Frog(this);
    this.frog.create(this.generalCategory, this.tongueCategory, TongueTypes.ElasticTongue);

    this.matter.world.on('collisionstart', (event: any) => {
      this.processingBody(event.pairs[0].bodyA);
      this.processingBody(event.pairs[0].bodyB);
    });

    this.panel = new GamePanel(
      this,
      this.onButtonClick,
      this.onLevelEnd,
      this.getFlyCount(this.getLevelsList()[this.levelId]));
    this.panel.create()
  }

  private onLevelEnd = () => {
    setTimeout(() => {
      this.add.popup(100, 250, "  GREAT! YOU ARE WIN!  \n  THIS LEVEL IS CLEAR!  ", this.onButtonClick);
    }, levelEndPopupShowDelay);
  };

  public getFlyCount(levelData: string[]): number {
    let flyCount = 0;
    for (let y in levelData) {
      for (let x in levelData[y].split("")) {
        let type = LevelDataHelper.getTypeById(levelData[y].charAt(parseInt(x)));
        if (type == LevelObjectTypes.FLY) {
          flyCount++;
        }
      }
    }
    return flyCount;
  }

  processingBody(body: any) {
    switch (body.label) {
      case LevelObjectTypes.FLY:
        this.frogEatFlyEventProcessing(body);
        break;
      case LevelObjectTypes.CACTUS:
        this.frog.tongueHide();
        break;
    }
  }

  frogEatFlyEventProcessing(flyBody: any) {
    const fly = this.add.image(flyBody.position.x, flyBody.position.y, LevelObjectTypes.FLY);
    flyBody.gameObject.destroy();
    const path = this.frog.getTonquePath();
    let pathSegmentId = 0;
    const flyInterval = window.setInterval(() => {
      if (pathSegmentId < path.length) {
        fly.setPosition(path[pathSegmentId].x, path[pathSegmentId].y);
        pathSegmentId++;
      } else{
        fly.destroy();
        window.clearInterval(flyInterval);
      }
    }, 25);
    this.panel.updateFlyCount();
  }

  update(time: number): void {
    this.frog.update();
    super.update(time);
  }

  onButtonClick() {
    this.scene.stop('GameScene');
    this.matter.world.destroy();
    this.frog.destroy();
    this.scene.start("MenuScene");
  };
}
