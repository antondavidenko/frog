import {Background} from "../sceneobjects/Background";

export class BaseScene extends Phaser.Scene {

    private toLoadList: { key: string, url: string }[] = [
        {key: 'frog', url: 'assets/frog.png'},
        {key: 'frog_holder', url: 'assets/frog_holder.png'},
        {key: 'holder', url: 'assets/holder.png'},
        {key: 'tongue', url: 'assets/tongue.png'},
        {key: 'fly', url: 'assets/fly.png'},
        {key: 'box', url: 'assets/box.png'},
        {key: 'cactus', url: 'assets/cactus.png'},
        {key: 'tonque_target', url: 'assets/tonque_target.png'},
        {key: 'bg', url: 'assets/bg.png'}
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
        new Background(this);
    }

}