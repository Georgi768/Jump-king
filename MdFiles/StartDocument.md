# Jump king

## Description
Jump king is a 2d platform game that revolves around the main character whose goal is to jump from one platform to another until he reaches the top. The player puts himself in the boots of a king whose motivation is safe, something that belongs to him. At the highest point is where a "Smoking hot babe" is, and the goal of the king is to search for her while struggling to go upwards. The special mechanic of the game is that the character can only jump in the direction that he is facing, and the user cannot control the character while he is in mid-air. Тhe jump must be carefully thought out because one mistake could lead to a long fall back down. The game controls are simple.

The player can move the character left, right and jump. The jump can have various heights depending on how long the player has held the jump button. The direction of the jump is based on the direction he is faced. The game character does not have fall damage. The challenge of the game is to climb upwards, avoiding falling down as much as possible. The character might even fall at the bottom, which is the beginning level of the game, if there are no platforms where he can land.

The unique selling points are as follows:

* Achievements: achievements will be included to provide the player with a sense of progression.
* Enemies and character health bar: Enemies will be moving left and right on the platform that they are currently on. If the character collides with the enemy, he will lose one hearth, and if there are no hearths left, he will have to start from the beginning. The enemy can be killed if the character jumps at the top of them.
* Moving platforms: Since the original game does not provide any moving platforms, this version will include additional platform movements to make it more challenging for the player.

## Phaser JS

For the project, framework such as Phaser Js will be used. This framework is fast and lightweight and is suitable for 2d games,making it perfect for the development of this game.It has support for both WebGL and Canvas.It allows for fast rendering,because both WebGL and Canvas are being rendered internally and can switch between them depending on the browser.

## Input
This section describes the inputs that will be included in the game.
#### Player
|     Case       |            Type        |    Condition  |
|----------------|------------------------|---------------|
|mainLevelScene  |       Scene            | not empty     |
|X               |       int              | not empty     |
|Y               |       int              | not empty     |
|group           |Phaser.GameObjects.Group| not empty     |

#### Enemy
|     Case       |            Type        |    Condition  |
|----------------|------------------------|---------------|
|mainLevelScene  |       Scene            | not empty     |
|X               |       int              | not empty     |
|Y               |       int              | not empty     |

#### Queen
|     Case       |            Type        |    Condition  |
|----------------|------------------------|---------------|
|mainLevelScene  |       Scene            | not empty     |
|X               |       int              | not empty     |
|Y               |       int              | not empty     |
|group           |Phaser.GameObjects.Group| not empty     |

#### Heart
|     Case       |       Type        |    Condition  |
|----------------|-------------------|---------------|
|scene           |       Scene       | not empty     |
|group           |       int         | not Empty     |

#### Door
|     Case       |            Type        |Condition |
|----------------|------------------------|----------|
|scene           |       Scene            | not empty|
|X               |       int              | not empty|
|Y               |       int              | not empty|
|group           |Phaser.GameObjects.Group| not empty|

#### GameCanvas
|     Case       |       Type        |    Condition  |
|----------------|-------------------|---------------|
|config          |   array           |not empty      |

#### Platform
|     Case       |       Type        |    Condition  |
|----------------|-------------------|---------------|
|Scene           |   Scene           | not empty     |

## Output
This section describes the overall outputs of the game.

|              Case                         |       Type        |
|-------------------------------------------|-------------------|
|The item,which the character picks up      |       Items       |
|adding animations method                   |       Array       |
|The number of hearts left                  |       int         |

## Class diagram
This section illustrates the uml class diagram

![umlDiagram](../images/JumpKing.png)

## Test plan
This section describes the test plan

#### GameCanvas

|  objectName    |     object type   |
|----------------|-------------------|
|gameCanvas      |   GameCanvas      |

#### SceneLevel
|     Case       |   object type     |
|----------------|-------------------|
|sceneLevel      |      SceneLevel   |

#### Player
|  objectName    |     object type   |    Scene      |         x     |     y    |   group  |
|----------------|-------------------|---------------|---------------|----------|----------|
|player          |   Player          |  scene        |      300      | 1400     |platform  |

#### Enemy

|  objectName    |     object type   |    Scene      |         x     |     y    |   group  |
|----------------|-------------------|---------------|---------------|----------|----------|
|   enemy        |      Enemy        |  scene        |     700       | 400      |platform  |

#### Items

|  objectName    |     object type   |  scene  |         x     |     y    |   group  |
|----------------|-------------------|---------|---------------|----------|----------|
|    heart       |      Heart        | scene   |     700       | 400      |platform  |

#### Platform

|  objectName    |     object type   |  Scene    |
|----------------|-------------------|-----------|
|    platform    |      Platform     |FirstLevel |


## Test cases

### pickUpItem

This section will describe `onCollisionEnter()` if it's working correctly

#### onCollisionEnterIfHealthBarNumberIsLessThanThree


|#   |Player         |       Action             |         Expected output          |
|---:|---------------|---------------------------|---------------------------------|
| 1  | player        |`onCollisionEnter()`      |heart(HealthBar increments by one)|

#### onCollisionEnterIfHealthBarNumberIsThree


|#   |Player          |       Action              |              Expected output        |
|---:|----------------|---------------------------|-------------------------------------|
| 1  | player king    |`onCollisionEnter()`       |heart(HealthBar stays the same number|

### onCollisionEnter

This case provides information about `onCollisionEnter()` .

#### onCollisionEnterWithEnemy

|#   |Enemy           |       Action              |             Expected output        |
|---:|----------------|---------------------------|------------------------------------|
| 1  | enemy          |   `onCollisionEnter()`    |PlayerHealth decrements by one(3-1=2)|


### addPlatform()

This test section describes how `addPlatform()` works .

#### addPlatform


|#   |   Platform     |                    Action                  |             Expected output             |
|---:|----------------|--------------------------------------------|-----------------------------------------|
| 1  | platform       |`addPlatform(200,400,'smallPlatform')`      |       Phaser.GameObjects                |

### addMovingPlatforms


|#   |   Platform   |                             Action                  | Expected output   |
|---:|--------------|-----------------------------------------------------|-------------------|
| 1  | platform     |`addMovingPlatforms(player,300,1300,'smallPlatform')`|      Phaser.Image |   

### setLevelTransitionDestination

This test tests if `setLevelTransitionDestination()` works .

|#   |   Door   |              Action                  |   Expected output   |
|---:|---------|--------------------------------------|---------------------|
| 1  | door    |`setLevelTransitionDestination(scene)`|new Level transition | 

## Setting up the game
To set up the game the user needs a local server.
The user must place the files on the local server.

## Reference

Jump King. Nexile. (n.d.). https://nexile.se/jump-king/. 