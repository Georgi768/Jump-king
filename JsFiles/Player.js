class Character extends Phaser.Physics.Arcade.Sprite {
    constructor(MainLevelScene, x, y) {
        super(MainLevelScene, x, y);
        this._MainLevelScene = MainLevelScene;
        this._x = x;
        this._y = y;
        if (new.target === Character) {
            throw new TypeError("Cannot construct Abstract instances directly");
        }


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

    moveCharacter() {
        throw new TypeError("Cannot call abstract method.");
    }

    onCollisionEnter() {
        throw new TypeError("Cannot call abstract method.");
    }
}

class Enemy extends Character {

    constructor(MainLevelScene, x, y) {
        super(MainLevelScene, x, y);
        this.setTexture('player');
        MainLevelScene.add.existing(this);
        MainLevelScene.physics.add.existing(this);
        this.body.velocity.x = 80;
        MainLevelScene.physics.add.overlap(this, player, this.printConsole);
        MainLevelScene.physics.add.collider(this, platform.group, this.patrolMovement, null, this);
        MainLevelScene.time.addEvent({delay: 5000, callback: this.changeVar, callbacksScope: this, loop: true});
    }

    printConsole(body) {
        if (body.body.touching.up) {
            body.destroy();
            player.setVelocityY(-20);
            player.health++;
            if (player.health === 3) {
                player.health = 3;
            }
        } else {
            if (!player.vulnerable) {
                player.setTint(0xff0000);
                player.health--
                console.log('hello');
                player.vulnerable = true;
                if (player.health === 0) {
                    console.log('game over');
                }
            }
        }
    }

    changeVar() {
        player.vulnerable = false;
        player.clearTint();
    }

    patrolMovement(enemy, platformGroup) {
        if (enemy.body.velocity.x > 0 && enemy.x > platformGroup.x + platformGroup.width / 2 ||
            enemy.body.velocity.x < 0 && enemy.body.x < platformGroup.x - platformGroup.width / 2) {

            enemy.body.velocity.x *= -1;
        }
    }

    onCollisionEnter() {

    }


}

class Player extends Character {
    constructor(MainLevelScene, x, y) {
        super(MainLevelScene, x, y, cursor);
        this.setTexture('player');
        MainLevelScene.add.existing(this);
        MainLevelScene.physics.add.existing(this);
        this.setCollideWorldBounds(true);
        this.canJump = true;
        this.power = 0;
        this.facing = 0;
        this._health = 3;
        this._vulnerable = false;
    }

    get vulnerable() {
        return this._vulnerable;
    }

    set vulnerable(value) {
        this._vulnerable = value;
    }

    get health() {
        return this._health;
    }

    set health(value) {
        this._health = value;
    }

    setMovementSpeedX(velocity) {
        this.setVelocityX(velocity);
    }

    onCollisionEnter() {
        this.MainLevelScene.physics.add.overlap(this, heart.group, this.collectHeart,null,this);
    }

    collectHeart(player,heart) {
        if (this.health >= 3) {
            this.health = 3;
        } else {
            heart.disableBody(true,true)
            this.health++;
        }
        console.log(this.health);
        return heart;
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