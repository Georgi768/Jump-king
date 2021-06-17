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

    addAnimations() {
        let animations = []
        this.MainLevelScene.anims.create({
            key: 'left',
            frames: this.MainLevelScene.anims.generateFrameNumbers('player', {start: 1, end: 2}),
            frameRate: 10,
            repeat: -1
        })
        this.MainLevelScene.anims.create({
            key: 'right',
            frames: this.MainLevelScene.anims.generateFrameNumbers('player', {start: 4, end: 5}),
            frameRate: 10,
            repeat: -1
        })
        this.MainLevelScene.anims.create({
            key: 'turn',
            frames: [{key: 'player', frame: 3}],
            frameRate: 20
        });
        this.MainLevelScene.anims.create({
            key: 'jumpLeft',
            frames: [{key: 'player', frame: 0}],
            frameRate: 10
        });
        this.MainLevelScene.anims.create({
            key: 'jumpRight',
            frames: [{key: 'player', frame: 6}],
            frameRate: 10
        });
        animations.push('left');
        animations.push('right');
        animations.push('turn');
        animations.push('jumpLeft');
        animations.push('jumpRight');
        return animations;

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
        this.setTint(696969);
        MainLevelScene.add.existing(this);
        MainLevelScene.physics.add.existing(this);
        this.body.velocity.x = 80;
        MainLevelScene.physics.add.overlap(this, player, this.printConsole);
        MainLevelScene.physics.add.collider(this, platform.group, this.patrolMovement, null, this);
        MainLevelScene.time.addEvent({delay: 5000, callback: this.changeVar, callbacksScope: this, loop: true});
    }

    printConsole(body) {
        if (body.body.touching.up && player.body.velocity.y >= 210) {
            body.destroy();
            player.setVelocityY(-20);
            if (player.health < 3) {
                player.health += 0.5;
            }
            player.healthStatus.setText("Health: " + player.health);
        } else {
            if (!player.vulnerable) {
                player.setTint(0xff0000);
                player.health--
                player.healthStatus.setText("Health: " + player.health);
                console.log('hello');
                player.vulnerable = true;
                if (player.health === 0) {
                    player.addGameOverScene();
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
            if (this.body.velocity.x > 0) {
                enemy.anims.play(this.addAnimations()[1]);
            } else {
                enemy.anims.play(this.addAnimations()[0]);
            }
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
        this.setBounce(0.3);
        this.canJump = true;
        this.power = 0;
        this.facing = 0;
        this._health = 3;
        this._kills = 0;
        this._healthStatus = MainLevelScene.add.text(16, 16, 'Health: ' + this._health, {fill: '#ffffff'}).setScrollFactor(0).setFontSize("20px");
        this._vulnerable = false;
    }

    get kills() {
        return this._kills;
    }

    set kills(value) {
        this._kills = value;
    }

    get healthStatus() {
        return this._healthStatus;
    }

    addGameOverScene() {
        this.disableBody(true, true);
        this.MainLevelScene.add.text(300, 400, "You did not make it...", {fill: '#FFFFFF'}).setScrollFactor(0).setOrigin(0.5).setFontSize("40px");
        let restartButton = this.MainLevelScene.add.text(300, 450, "Try again ?", {fill: '#FFFFFF'}).setScrollFactor(0).setOrigin(0.5).setFontSize("30px").setInteractive();
        restartButton.on("pointerup", () => {
            this.MainLevelScene.scene.start("MainLevelScene");
        });
    }

    set healthStatus(value) {
        this._healthStatus = value;
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
        this.MainLevelScene.physics.add.overlap(this, heart.group, this.collectHeart, null, this);
    }

    collectHeart(player, heart) {
        if (this.health >= 3) {
            this.health = 3;
            console.log(this.health);
        } else {
            heart.disableBody(true, true);
            this.health++;
            if (this.health >= 3) {
                this.health = 3;
            }
            player.healthStatus.setText("Health: " + player.health);
        }
        return heart;
    }

    moveCharacter() {

        if (cursor.left.isDown && this.power === 0 && this.body.touching.down) {
            this.anims.play(this.addAnimations()[0], true);
            this.setMovementSpeedX(-100);
            this.facing = -1;
        }
        if (cursor.right.isDown && this.power === 0 && this.body.touching.down) {
            this.anims.play(this.addAnimations()[1], true);
            this.setMovementSpeedX(100);
            this.facing = 1;
        }
        if (cursor.right.isUp && cursor.left.isUp && cursor.space.isUp && this.body.touching.down) {
            this.anims.play(this.addAnimations()[2]);
            this.setMovementSpeedX(0);
            this.facing = 0;
        }
        if (cursor.space.isDown && this.body.touching.down && this.canJump) {
            this.anims.play(this.addAnimations()[2]);
            this.setMovementSpeedX(0);
            this.power += .2;
        } else if (cursor.space.isUp && this.body.touching.down && this.power > 0) {
            this.setSpeedOnDirection();
            let tempX = this.body.velocity.x
            let tempY = this.power;
            this.body.setVelocity(tempX, -tempY * 25);
            this.canJump = true;
        } else {
            this.power = 0;
            this.canJump = true;
        }
        if (this.power >= 20 && this.body.touching.down) {
            this.setSpeedOnDirection();
            let tempX = this.body.velocity.x;
            let tempY = this.power;
            this.body.setVelocity(tempX, -tempY * 27);
            console.log(this.body.velocity.y);
        }

    }

    setSpeedOnDirection() {
        if (this.facing === -1) {
            this.anims.play(this.addAnimations()[3]);
            this.setMovementSpeedX(-225);
        } else if (this.facing === 1) {
            this.anims.play(this.addAnimations()[4]);
            this.setMovementSpeedX(225);
        } else {
            this.setMovementSpeedX(0);
        }
    }
}

class Queen extends Character {

    constructor(MainLevelScene, x, y) {
        super(MainLevelScene, x, y);
        this.setTexture('queen');
        MainLevelScene.add.existing(this);
        MainLevelScene.physics.add.existing(this);
    }
}