import PreloadScene from "./scenes/PreloadScene.js";
import MenuScene from "./scenes/MenuScene.js";
import GameScene from "./scenes/GameScene.js";

let config = {
    width: 360,
    height: 460,
    type: Phaser.AUTO,
    scene: [PreloadScene, MenuScene, GameScene]
};

let game = new Phaser.Game(config);