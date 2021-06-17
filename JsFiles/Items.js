class Items extends Phaser.Physics.Arcade.Image {
    constructor(scene,group) {
        super(scene);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setCollideWorldBounds(true);
        this._group = scene.physics.add.group();
        scene.physics.add.collider(this._group,group);
        if (this.target === Items) {
            throw new TypeError("Cannot construct Abstract instances directly");
        }
        this._scene = scene;
    }

    get group() {
        return this._group;
    }

    set group(value) {
        this._group = value;
    }

    get scene() {
        return this._scene;
    }

    set scene(value) {
        this._scene = value;
    }

    addItem(x, y, texture) {
        this.group.create(x, y, texture);
    }

}

class Heart extends Items {

    constructor(scene,group) {
        super(scene,group);
    }
}

class Door extends Items {

    constructor(scene, x, y,group) {
        super(scene,group);
        this.setTexture("door");
        this._scene = scene;
        this._x = x;
        this._y = y;
        scene.physics.add.collider(this,group);
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

    setLevelTransitionDestination(scene) {
        return this.scene.scene.start(scene)
    }
}