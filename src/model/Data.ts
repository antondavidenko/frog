export class GameModel {
    generalCategory: number;
    tongueCategory: number;
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

export const levelGameConfig: LevelObjectSettings[][] = [
    [
        {x: 9, y: 3, type: 'fly'},
        {x: 9, y: 4, type: 'box'},
        {x: 8, y: 4, type: 'box'}
    ],[
        {x: 5, y: 3, type: 'fly'},
        {x: 5, y: 4, type: 'box'},
        {x: 4, y: 4, type: 'box'},
        {x: 6, y: 4, type: 'box'},
        {x: 3, y: 4, type: 'cactus'}
    ],[
        {x: 1, y: 1, type: 'fly'},
        {x: 1, y: 2, type: 'box'},
        {x: 2, y: 2, type: 'box'},
        {x: 8, y: 3, type: 'fly'},
        {x: 8, y: 4, type: 'box'}
    ],[
        {x: 5, y: 4, type: 'fly'},
        {x: 4, y: 5, type: 'box'},
        {x: 5, y: 5, type: 'box'},
        {x: 6, y: 5, type: 'box'},

        {x: 4, y: 4, type: 'box'},
        {x: 6, y: 4, type: 'box'},

        {x: 4, y: 3, type: 'box'},
        {x: 6, y: 3, type: 'box'},

        {x: 3, y: 4, type: 'cactus'},
        {x: 7, y: 4, type: 'cactus'},

        {x: 2, y: 5, type: 'box'}
    ],[
        {x: 1, y: 1, type: 'fly'},
        {x: 2, y: 1, type: 'box'},
        {x: 3, y: 1, type: 'cactus'},
        {x: 4, y: 1, type: 'fly'},
        {x: 5, y: 1, type: 'box'},
        {x: 6, y: 1, type: 'cactus'},
        {x: 7, y: 1, type: 'fly'},
        {x: 8, y: 1, type: 'box'},
        {x: 9, y: 1, type: 'cactus'},

        {x: 5, y: 2, type: 'fly'},
        {x: 5, y: 3, type: 'box'},
        {x: 5, y: 4, type: 'cactus'},
        {x: 5, y: 5, type: 'fly'},
        {x: 5, y: 6, type: 'box'},
        {x: 5, y: 7, type: 'cactus'},
        {x: 5, y: 8, type: 'fly'}
    ]
];