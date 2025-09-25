import Phaser from "phaser";

class MenuScene extends Phaser.Scene {
    constructor() {
        super("MenuScene");
    }

    create() {
        // Fondo
        this.background = this.add.image(0, 0, 'background');
        this.background.setOrigin(0, 0);

        // Texto
        this.title = this.add.text(0, 0, 'BIENVENIDOS', {
            font: '40px Arial',
            fill: '#000000'
        });
        this.title.x = this.sys.game.config.width / 2 - this.title.width / 2;
        this.title.setInteractive();
        this.title.on('pointerdown', () => {
            this.scene.start("GameScene");
        });

        // Logo
        this.logo = this.add.image(0, 0, 'logo');
        this.logo.x = this.sys.game.config.width * 0.5;
        this.logo.y = this.sys.game.config.height * 0.5;
        this.logo.setScale(0.5);
    }
}

export default MenuScene;