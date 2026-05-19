import { Background } from "../sceneobjects/Background";
import ThreeSlice from "../ui/ThreeSlice";
import ImageButton from "../ui/ImageButton";
import TextButton from "../ui/TextButton";
import Popup from "../ui/Popup";
import { LevelObjectTypes } from "../LevelDataHelper";

export class BaseScene extends Phaser.Scene {

  private background = new Background(this);

  private toLoadList: { key: string, url: string }[] = [
    {key: 'button_left', url: 'assets/ui/button_left.png'},
    {key: 'button_center', url: 'assets/ui/button_center.png'},
    {key: 'button_right', url: 'assets/ui/button_right.png'},
    {key: 'button_pressed_left', url: 'assets/ui/button_pressed_left.png'},
    {key: 'button_pressed_center', url: 'assets/ui/button_pressed_center.png'},
    {key: 'button_pressed_right', url: 'assets/ui/button_pressed_right.png'},
    {key: 'popup9', url: 'assets/ui/popup9.png'},

    {key: 'logo', url: 'assets/logo.png'},

    {key: 'frog', url: 'assets/frog.png'},
    {key: 'frog_holder', url: 'assets/frog_holder.png'},
    {key: 'holder', url: 'assets/holder.png'},
    {key: 'tongue', url: 'assets/tongue.png'},
    {key: LevelObjectTypes.FLY, url: 'assets/fly.png'},
    {key: LevelObjectTypes.BOX, url: 'assets/box.png'},
    {key: LevelObjectTypes.CACTUS, url: 'assets/cactus.png'},
    {key: 'tongue_target', url: 'assets/tongue_target.png'},
    {key: 'bg_tile', url: 'assets/bg_tile.png'}
  ];

  constructor(key: string) {
    super({ key });
    ThreeSlice.register();
    ImageButton.register();
    TextButton.register();
    Popup.register();
  }

  preload(): void {
    for (let i of this.toLoadList) {
      this.load.image(i);
    }
  }

  getLevelsList(): string[][] {
    return this.registry.get("levelsList");
  }

  setLevelsList(levelsList: string[][]): void {
    this.registry.set("levelsList", levelsList);
  }

  create(): void {
    this.background.create();
  }

  update(time: number): void {
    this.background.update(time);
  }
}
