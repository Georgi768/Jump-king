class Platform extends Phaser.Physics.Arcade.Image {
    constructor(scene) {
        super(scene);
        scene.add.existing(this);
        this._group = scene.physics.add.staticGroup();
        this._scene = scene;
    }

    get scene() {
        return this._scene;
    }

    set scene(value) {
        this._scene = value;
    }

    get group() {
        return this._group;
    }

    set group(value) {
        this._group = value;
    }

    addPlatform(x, y, texture) {
        return this._group.create(x, y, texture);
    }

    addMovingPlatform(player, x, y, texture) {
        let movingPlatform = this.scene.physics.add.image(x, y, texture).setImmovable(true);
        movingPlatform.body.setAllowGravity(false);
        this.scene.tweens.timeline({
            targets: movingPlatform.body.velocity,
            loop: -1,
            tweens: [
                {x: 100, y: 0, duration: 2000, ease: "Stepped"},
                {x: -100, y: 0, duration: 2000, ease: "Stepped"}
            ]
        });
        this.scene.physics.add.collider(player, movingPlatform);
        return movingPlatform;
    }

}