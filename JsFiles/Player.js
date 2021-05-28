class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(MainLevelScene, x, y) {
        super(MainLevelScene, x, y,'player', cursor);
        MainLevelScene.add.existing(this);
        MainLevelScene.physics.add.existing(this);
        this.setCollideWorldBounds(true);
        this._MainLevelScene = MainLevelScene;
        this._x = x;
        this._y = y;
    }

    get MainLevelScene() {
        return this._MainLevelScene;
    }

    set MainLevelScene(value) {
        this._MainLevelScene = value;
    }

    get x() {
        return this._x;
    }

    set x(value) {
        this._x = value;
    }

    get y() {
        return this._y;
    }

    set y(value) {
        this._y = value;
    }

    movePlayer() {
        if (cursor.left.isDown) {
            this.setVelocityX(-160);
        } else if (cursor.right.isDown) {
            this.setVelocityX(160);
        } else {
            this.setVelocityX(0);
        }
    }

}