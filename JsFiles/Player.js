class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(MainLevelScene, x, y) {
        super(MainLevelScene, x, y,'player', cursor);
        MainLevelScene.add.existing(this);
        MainLevelScene.physics.add.existing(this);
        this.setCollideWorldBounds(true);
        this._MainLevelScene = MainLevelScene;
        this._x = x;
        this._y = y;
        this._isRightPressed = false;
        this._isLeftPressed = false;
        this._isUpPressed = false;
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

    setMovementSpeedX(velocity)
    {
        this.setVelocityX(velocity);
    }
    setJumpSpeedY(velocity)
    {
        this.setVelocityY(velocity);
    }

    set y(value) {
        this._y = value;
    }

    moveCharacter() {
        let power = 0;
        if (cursor.left.isDown) {
            this.setMovementSpeedX(-160);
            this._isLeftPressed = true;
            if(!this.body.touching.down)
            {
                this.setImmovable(false);
            }

        } else if (cursor.right.isDown) {
            this.setMovementSpeedX(160);
            this._isRightPressed = true;
            if(!this.body.touching.down)
            {
                this.setImmovable(false);
            }
        } else {
            this.setMovementSpeedX(0);
            this._isLeftPressed = false;
            this._isRightPressed = false;
        }

        if(cursor.space.isDown && this.body.touching.down)
        {
            this.power+=.1;
            console.log(this.power);
        }else if(cursor.space.isUp && this.power > 0)
        {
            if(this.power <= 10)
            {
                this.setJumpSpeedY(-this.power*50);
                this.power = 0;
            }else
            {
                this.power = 10;
            }
        }else
        {
            this.power = 0;
        }


    }

}