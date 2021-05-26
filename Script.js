class GameCanvas
{
    constructor() {
        this.game = new Phaser.Game(this.config())
    }

    config()
    {
        return {
            type: Phaser.AUTO,
            width: 800,
            height: 600,
            scene: {
                preload: this.preload,
                create: this.create,
                update: this.update
            }
        }
    }

    preload (){

    }
    create ()
    {

    }
    update ()
    {

    }
}

var gameCanvas = new GameCanvas();