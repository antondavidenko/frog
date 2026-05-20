import TextButton from "../../ui/TextButton";

export default class defaultGameModePanel extends Phaser.GameObjects.Container {

  private play: TextButton;
  private editor: TextButton;

  constructor(scene: Phaser.Scene, x: number, y: number, private onModeClickCallback: Function) {
    super(scene, x, y);
    scene.add.existing(this);

    this.editor = scene.add.textButton(150, 0, "EDITOR", this.onModeClick, 90);
    this.play = scene.add.textButton(350, 0, "PLAY", this.onModeClick, 45);
    this.play.setButtonState('pressed');

    this.add([this.editor, this.play]);
  }

  onModeClick = (pointer: Phaser.Input.Pointer, gameObject: Phaser.GameObjects.GameObject, toolId: string) => {
    this.onModeClickCallback(pointer, gameObject, toolId);
    this.play.setButtonState(toolId === 'PLAY' ? 'pressed' : 'normal');
    this.editor.setButtonState(toolId === 'EDITOR' ? 'pressed' : 'normal');
  }
}
