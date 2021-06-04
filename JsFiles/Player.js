class Character extends Phaser.Physics.Arcade.Sprite {
    constructor(MainLevelScene, x, y) {
        super(MainLevelScene, x, y);
        if (new.target === Character) {
            throw new TypeError("Cannot construct Abstract instances directly");
        }
    }

    moveCharacter() {
        throw new TypeError("Cannot call abstract method.");
    }
}

class Enemy extends Character {

    constructor(MainLevelScene, x, y) {
        super(MainLevelScene, x, y);
    }

    moveCharacter() {

    }

}

class Player extends Character {
    constructor(MainLevelScene, x, y) {
        super(MainLevelScene, x, y, cursor);
        this.setTexture('player');
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
        this.power = 0;
        this.facing = 0;
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
        if (cursor.left.isDown && this.power === 0 && this.body.touching.down) {
            this.setMovementSpeedX(-160);
            this.facing = -1;
        }
        if (cursor.right.isDown && this.power === 0 && this.body.touching.down) {
            this.setMovementSpeedX(160);
            this.facing = 1;
        }
        if (cursor.right.isUp && cursor.left.isUp && cursor.space.isUp) {
            this.setMovementSpeedX(0);
            this.facing = 0;
        }
        if (cursor.space.isDown && this.body.touching.down && this.canJump) {
            this.setMovementSpeedX(0);
        }
        if (cursor.space.isDown && this.body.touching.down && this.canJump) {
            this.power += .2;
            console.log(this.power);
        } else if (cursor.space.isUp && this.body.touching.down && this.power > 0) {
            this.setSpeedOnDirection();
            let tempX = this.body.velocity.x
            let tempY = this.power;
            this.body.setVelocity(tempX, -tempY * 20);
            this.canJump = true;
        } else {
            this.power = 0;
            this.canJump = true;
        }
        if (this.power >= 20 && this.body.touching.down) {
            this.setSpeedOnDirection();
            let tempX = this.body.velocity.x;
            let tempY = this.power;
            this.body.setVelocity(tempX, -tempY * 20);
        }

    }

    setSpeedOnDirection() {
        if (this.facing === -1) {
            this.setMovementSpeedX(-160);
        } else if (this.facing === 1) {
            this.setMovementSpeedX(160);
        } else {
            this.setMovementSpeedX(0);
        }
    }


}