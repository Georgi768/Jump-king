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

    // checkKillsNumber() {
    //     if (this._kills === 2) {
    //         achievements.achievements.EnemyKills.Unlocked = true;
    //         if(achievementsCollection.getItem("kills") === "false")
    //         {
    //             achievementsCollection.setItem('kills', achievements.achievements.EnemyKills.Unlocked = "True");
    //             this.MainLevelScene.add.text(300, 400, "AchievementComplete", {fill: '#FFFFFF'}).setScrollFactor(0).setOrigin(0.5).setFontSize("40px");
    //         }else
    //         {
    //             console.log('already is killed');
    //         }
    //     }
    //
    // }

    addGameOverScene() {
        //const color = new Phaser.Display.Color('#000000');
        //this.MainLevelScene.setFillStyle(color.color);
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
            if(this.health >= 3)
            {
                this.health = 3;
            }
            player.healthStatus.setText("Health: " + player.health);
        }
        return heart;
    }

    moveCharacter() {

        if (cursor.left.isDown && this.power === 0 && this.body.touching.down) {
            this.setMovementSpeedX(-100);
            this.facing = -1;
        }
        if (cursor.right.isDown && this.power === 0 && this.body.touching.down) {
            this.setMovementSpeedX(100);
            this.facing = 1;
        }
        if (cursor.right.isUp && cursor.left.isUp && cursor.space.isUp && this.body.touching.down) {
            this.setMovementSpeedX(0);
            this.facing = 0;
        }
        if (cursor.space.isDown && this.body.touching.down && this.canJump) {
            this.setMovementSpeedX(0);
            this.power += .2;
        } else if (cursor.space.isUp && this.body.touching.down && this.power > 0) {
            this.setSpeedOnDirection();
            let tempX = this.body.velocity.x
            let tempY = this.power;
            this.body.setVelocity(tempX, -tempY * 25);
            this.canJump = true;
            console.log(this.body.velocity.y);
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
            this.setMovementSpeedX(-225);
        } else if (this.facing === 1) {
            this.setMovementSpeedX(225);
        } else {
            this.setMovementSpeedX(0);
        }
    }
}

class Queen extends Character {

    constructor(MainLevelScene, x, y) {
        super(MainLevelScene, x, y);
        this.setTexture('player');
        MainLevelScene.add.existing(this);
        MainLevelScene.physics.add.existing(this);
    }
}