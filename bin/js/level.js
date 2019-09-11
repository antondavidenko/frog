class Level {

    constructor(scene) {
        this.scene = scene;
    }

    create(config) {
        for(var i in config) {
            var gameObj = this.scene.matter.add.image(config[i].x, config[i].y, config[i].type);
            gameObj.scaleX = gameObj.scaleY = config[i].scale;
            gameObj.setStatic(true);
            gameObj.setCollisionCategory(generalCategory);
        }
    }

}