require([
    'js/frog.js',
    'js/level.js',
    'js/config.js'
], function() {
    game = new Phaser.Game(phaserGameConfig);
});

var game;
var canDrag
var frog;
var generalCategory;

function preload() {
    for(var i in toLoadList) {
        this.load.image(toLoadList[i]);
    }
}

function create() {
    this.matter.world.setBounds();
    canDragGroup = this.matter.world.nextGroup();
    generalCategory =  this.matter.world.nextCategory();

    frog = new Frog(this);
    frog.create(canDrag);
    frog.tongueHide();

    level = new Level(this);
    level.create(levelGameConfig);

    this.matter.add.mouseSpring({ length: 1, stiffness: 0, collisionFilter: { group: canDragGroup }});
}

function update() {}