class Frog {

    constructor(scene) {
        Frog.scene = this.scene = scene;
        this.itemsCount = 30;
        this.tongueBodiesList = [];
    }

    create() {
        this.addTongue(canDrag);
        this.addFrog();
    }

    addTongue() {
        for (var i=0; i<this.itemsCount; i++) {
            this.tongueBodiesList.push(Frog.scene.matter.add.image(300, 100 + 50*i, 'tongue', null , this.getTongueOptions()));

            if (i>0) {
                this.scene.matter.add.constraint(this.tongueBodiesList[i], this.tongueBodiesList[i-1], 5, 1, {
                    pointA: { x: 0, y: -5 },
                    pointB: { x: 0, y: 5 }
                });

                var catTongue =  this.scene.matter.world.nextCategory();
                this.tongueBodiesList[i].setCollisionCategory(catTongue);
                this.tongueBodiesList[i].setCollidesWith([catTongue, generalCategory]);
            }
        }

        this.tongueBodiesList[0].setCollisionGroup(canDragGroup);
        this.tongueBodiesList[this.itemsCount-1].setStatic(true);
        this.tongueBodiesList[this.itemsCount-1].y = 750;
        this.tongueBodiesList[this.itemsCount-1].x = 300;
    }

    addFrog() {
        var frog = this.scene.add.image(300, 700, 'frog');
        frog.scaleX = frog.scaleY = 0.35;
        this.scene.matter.add.rectangle(230, 790, 80, 380, this.getHiddenOptions() );
        this.scene.matter.add.rectangle(370, 790, 80, 380, this.getHiddenOptions() );
        this.scene.matter.add.rectangle(300, 970, 80, 380, this.getHiddenOptions() );
    }

    tongueHide() {
        for (var i=0; i<this.itemsCount; i++) {
        }
    }


    getTongueOptions() {
        return {
            chamfer: 5,
            density: 0.005,
            frictionAir: 0.05
        }
    }

    getHiddenOptions() {
        return {
            isStatic: true,
            chamfer: { radius: 20 },
            collisionFilter: {category: generalCategory}
        }
    }

}