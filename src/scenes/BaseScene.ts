import {Background} from "../sceneobjects/Background";
import {LevelObjectTypes} from "../LevelDataHelper";

export class BaseScene extends Phaser.Scene {

    private background = new Background(this);

    private toLoadList: { key: string, url: string }[] = [
        {key: 'frog', url: 'assets/frog.png'},
        {key: 'frog_holder', url: 'assets/frog_holder.png'},
        {key: 'holder', url: 'assets/holder.png'},
        {key: 'tongue', url: 'assets/tongue.png'},
        {key: LevelObjectTypes.FLY, url: 'assets/fly.png'},
        {key: LevelObjectTypes.BOX, url: 'assets/box.png'},
        {key: LevelObjectTypes.CACTUS, url: 'assets/cactus.png'},
        {key: 'tonque_target', url: 'assets/tonque_target.png'},
        {key: 'bg_tile', url: 'assets/bg_tile.png'}
    ];

    constructor(key) {
        super({key: key});
    }

    preload(): void {
        for (let i of this.toLoadList) {
            this.load.image(i);
        }
    }

    getLevelsList(): string[][] {
        return this.registry.get("levelsList");
    }

    setLevelsList(levelsList:string[][]): void  {
        this.registry.set("levelsList", levelsList);
    }

    create(): void {
        this.background.create();
    }

    update(time: number): void {
        this.background.update(time);
    }

}