var phaserGameConfig = {
    type: Phaser.AUTO,
    width: 600,
    height: 800,
    backgroundColor: '#dddddd',
    parent: 'root',
    physics: {
        default: 'matter',
        matter: {
            gravity: {
                y: 0
            },
            debug: false,
            debugBodyColor: 0x555555
        }
    },
    scene: {
        create: create,
        preload: preload,
        update : update
    }
};

var toLoadList = [
    {key: 'frog', url: 'assets/frog.png'},
    {key: 'tongue', url: 'assets/tongue.png'},
    {key: 'fly', url: 'assets/fly.png'},
    {key: 'box', url: 'assets/box.jpg'}
];

var levelGameConfig = [
    {x: 100, y:100, type:'fly', scale:0.5},
    {x: 400, y:500, type:'box', scale:0.5},
];

