export const toLoadList: { key: string, url: string }[] = [
    {key: 'frog', url: 'assets/frog.png'},
    {key: 'tongue', url: 'assets/tongue.png'},
    {key: 'fly', url: 'assets/fly.png'},
    {key: 'box', url: 'assets/box.jpg'}
];

export interface levelObjectSettings {
    x: number;
    y: number;
    type:string;
    scale:number;
}

export const levelGameConfig: levelObjectSettings[] = [
    {x: 100, y:100, type:'fly', scale:0.5},
    {x: 400, y:500, type:'box', scale:0.5}
];