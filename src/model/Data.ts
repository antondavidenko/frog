export class GameModel {
    public generalCategory: number;
    public tongueCategory: number;
    public levelsList: string[][];
}

export const toLoadList: { key: string, url: string }[] = [
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

export interface LevelObjectSettings {
    x: number;
    y: number;
    type: string;
}