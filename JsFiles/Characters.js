class Character extends Phaser.Physics.Arcade.Sprite {
    constructor(MainLevelScene, x, y, group) {
        super(MainLevelScene, x, y);
        this._MainLevelScene = MainLevelScene;
        this._x = x;
        this._y = y;
        if (new.target === Character) {
            throw new TypeError("Cannot construct Abstract instances directly");
        }
        MainLevelScene.physics.add.collider(this, group);
        this._group = group;

    }

    get group() {
        return this._group;
    }

    set group(value) {
        this._group = value;
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
    constructor(MainLevelScene, x, y, group) {
        super(MainLevelScene, x, y, group);
        this.setTexture('player');
        this.setTint(696969);
        MainLevelScene.add.existing(this);
        MainLevelScene.physics.add.existing(this);
        this.body.velocity.x = 80;
        MainLevelScene.physics.add.overlap(this, player, this.onCollisionEnter);
        MainLevelScene.physics.add.collider(this, platform.group, this.moveCharacter, null, this);
        MainLevelScene.time.addEvent({
            delay: 5000,
            callback: player.activateVulnerability,
            callbacksScope: this,
            loop: true
        });
    }


    moveCharacter(enemy, platformGroup) {
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

    onCollisionEnter(body) {
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
                player.vulnerable = true;
                if (player.health <= 0) {
                    player.addGameOverScene();
                }
            }
        }
    }

}

class Player extends Character {
    constructor(MainLevelScene, x, y, group) {
        super(MainLevelScene, x, y, group);
        this.setTexture('player');
        MainLevelScene.add.existing(this);
        MainLevelScene.physics.add.existing(this);
        this.setCollideWorldBounds(true);
        this.setBounce(0.3);
        this._power = 0;
        this._facing = 0;
        this._health = 3;
        this._healthStatus = MainLevelScene.add.text(16, 16, 'Health: ' + this._health, {fill: '#ffffff'}).setScrollFactor(0).setFontSize("20px");
        this._vulnerable = false;
        this._cursor = MainLevelScene.input.keyboard.createCursorKeys();
        this._group = group;
    }

    get power() {
        return this._power;
    }

    set power(value) {
        this._power = value;
    }

    get facing() {
        return this._facing;
    }

    set facing(value) {
        this._facing = value;
    }

    get cursor() {
        return this._cursor;
    }

    set cursor(value) {
        this._cursor = value;
    }

    get healthStatus() {
        return this._healthStatus;
    }

    addGameOverScene() {
        this.disableBody(true, true);
        this.MainLevelScene.add.text(300, 400, "You did not make it...", {fill: '#FFFFFF'}).setScrollFactor(0).setOrigin(0.5).setFontSize("40px");
        let restartButton = this.MainLevelScene.add.text(300, 450, "Try again ?", {fill: '#FFFFFF'}).setScrollFactor(0).setOrigin(0.5).setFontSize("30px").setInteractive();
        restartButton.on("pointerup", () => {
            this.MainLevelScene.scene.start("firstLevel");
        });
    }
    activateVulnerability() {
        player.vulnerable = false;
        player.clearTint();
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

        if (this.cursor.left.isDown && this._power === 0 && this.body.touching.down) {
            this.anims.play(this.addAnimations()[0], true);
            this.setMovementSpeedX(-100);
            this._facing = -1;
        }
        if (this.cursor.right.isDown && this._power === 0 && this.body.touching.down) {
            this.anims.play(this.addAnimations()[1], true);
            this.setMovementSpeedX(100);
            this._facing = 1;
        }
        if (this.cursor.right.isUp && this.cursor.left.isUp && this.cursor.space.isUp && this.body.touching.down) {
            this.anims.play(this.addAnimations()[2]);
            this.setMovementSpeedX(0);
            this._facing = 0;
        }
        if (this.cursor.space.isDown && this.body.touching.down && this._canJump) {
            this.anims.play(this.addAnimations()[2]);
            this.setMovementSpeedX(0);
            this._power += .2;
        } else if (this.cursor.space.isUp && this.body.touching.down && this._power > 0) {
            this.setSpeedOnDirection();
            let tempX = this.body.velocity.x
            let tempY = this._power;
            this.body.setVelocity(tempX, -tempY * 25);
            this._canJump = true;
        } else {
            this._power = 0;
            this._canJump = true;
        }
        if (this._power >= 20 && this.body.touching.down) {
            this.setSpeedOnDirection();
            let tempX = this.body.velocity.x;
            let tempY = this._power;
            this.body.setVelocity(tempX, -tempY * 27);
        }

    }

    setSpeedOnDirection() {
        if (this._facing === -1) {
            this.anims.play(this.addAnimations()[3]);
            this.setMovementSpeedX(-225);
        } else if (this._facing === 1) {
            this.anims.play(this.addAnimations()[4]);
            this.setMovementSpeedX(225);
        } else {
            this.setMovementSpeedX(0);
        }
    }
}

class Queen extends Character {

    constructor(MainLevelScene, x, y, group) {
        super(MainLevelScene, x, y, group);
        this.setTexture('queen');
        MainLevelScene.add.existing(this);
        MainLevelScene.physics.add.existing(this);
    }
}