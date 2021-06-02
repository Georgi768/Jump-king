class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(MainLevelScene, x, y) {
        super(MainLevelScene, x, y, 'player', cursor);
        MainLevelScene.add.existing(this);
        MainLevelScene.physics.add.existing(this);
        this.setCollideWorldBounds(true);
        this._MainLevelScene = MainLevelScene;
        this._x = x;
        this._y = y;
        this._isRightPressed = false;
        this._isLeftPressed = false;
        this._isUpPressed = false;
        this.canJump = true;
    }

    get isRightPressed() {
        return this._isRightPressed;
    }

    set isRightPressed(value) {
        this._isRightPressed = value;
    }

    get isLeftPressed() {
        return this._isLeftPressed;
    }

    set isLeftPressed(value) {
        this._isLeftPressed = value;
    }

    get isUpPressed() {
        return this._isUpPressed;
    }

    set isUpPressed(value) {
        this._isUpPressed = value;
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

    setMovementSpeedX(velocity) {
        this.setVelocityX(velocity);
    }

    setJumpSpeedY(velocity) {
        this.setVelocityY(velocity);
    }

    set y(value) {
        this._y = value;
    }

    moveCharacter() {
        this.facing = 0;
        //movement
        if (cursor.left.isDown && this.power === 0 && this.body.touching.down) {
            this.setMovementSpeedX(-160);
            this._isLeftPressed = true;
            this.facing = -1;

        } else if (cursor.right.isDown && this.power === 0 && this.body.touching.down) {
            this.setMovementSpeedX(160);
            this._isRightPressed = true;
            this.facing = 1;
        } else {
            this.setMovementSpeedX(0);
            this._isLeftPressed = false;
            this._isRightPressed = false;
        }
        //Jumping
        if (cursor.space.isDown && this.body.touching.down && this.canJump ) {
            this.power += .3;
            console.log(this.power);
        } else if (cursor.space.isUp && this.power > 0) {
            if (this.power <= 10) {
                //try to push him
                let tempx = this.facing * this.body.velocity.x
                let tempy = this.body.velocity.y;
                this.body.velocity = new Phaser.Math.Vector2(tempx,tempy);
                this.power = 0;
            } else {
                this.power = 10;
            }
        } else {
            this.power = 0;
        }
    }

}