import Phaser from "phaser";

class GameScene extends Phaser.Scene {
  constructor() {
    super("GameScene");
  }

  create() {
    this.background = this.add.image(0, 0, "background").setOrigin(0, 0);

    // Incluimos 'pet' y otros ítems
    this.keys = ["apple", "candy", "rubber_duck", "arrow", "bar", "pet"];
    this.items = [];
    this.spawnTimer = 0;
    this.spawnInterval = 100;

    // Animación simple para 'pet' (si el spritesheet tiene al menos 2 frames)
    if (!this.anims.get("pet_idle")) {
      this.anims.create({
        key: "pet_idle",
        frames: this.anims.generateFrameNumbers("pet", { start: 0, end: 1 }),
        frameRate: 4,
        repeat: -1
      });
    }
  }

  update() {
    this.spawnTimer++;
    if (this.spawnTimer >= this.spawnInterval) {
      this.spawnRandomItem();
      this.spawnTimer = 0;
    }

    this.items.forEach((item) => {
      item.x += item.dx;
      item.y += item.dy;

      const W = this.sys.game.config.width;
      const H = this.sys.game.config.height;
      const iw = item.displayWidth ?? item.width;
      const ih = item.displayHeight ?? item.height;

      if (item.x <= 0 || item.x >= W - iw) item.dx *= -1;
      if (item.y <= 0 || item.y >= H - ih) item.dy *= -1;
    });
  }

  spawnRandomItem() {
    const index = this.getRandomInt(0, this.keys.length - 1);
    const randomKey = this.keys[index];

    const x = this.getRandomInt(50, this.sys.game.config.width - 50);
    const y = this.getRandomInt(50, this.sys.game.config.height - 50);

    let item;
    if (randomKey === "pet") {
      item = this.add.sprite(x, y, "pet");
      // Si existe la animación, la reproducimos
      if (this.anims.get("pet_idle")) item.play("pet_idle");
    } else {
      item = this.add.image(x, y, randomKey);
    }

    // velocidad aleatoria -1 o 1
    item.dx = this.getRandomInt(0, 1) === 0 ? -1 : 1;
    item.dy = this.getRandomInt(0, 1) === 0 ? -1 : 1;

    item.setInteractive();
    item.on("pointerdown", () => {
      item.destroy();
      this.items = this.items.filter((i) => i !== item);
    });

    this.items.push(item);
  }

  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}

export default GameScene;