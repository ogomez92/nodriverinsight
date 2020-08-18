import { speech } from './tts';
import { save, increase, decrease, debug, _, content, data } from './main'
import { SoundHandler } from './soundHandler'
import Timer from './timer';
import $ from 'jquery';
import { utils } from './utilities';
import { ScrollingText } from './scrollingText';
import { KeyboardInput } from './input.js';
import { KeyEvent } from './keycodes.js';
import { so } from './soundObject';
import { World } from './world'
class Game {
	constructor() {
		this.canLevel = false
		this.canLevelNotify = false
		this.tick = so.create("tick")
		this.scoreSound = so.create("scoreCounter")
		this.scoreSound.volume = 0.4
		this.input = new KeyboardInput();
		this.pool = new SoundHandler()
		this.frame = 0
		this.input.init();
		this.timer = Timer({
			update: () => this.update(),
			render: () => this.render()
		}, 1 / 40);
		this.score = 0
		this.level = 1
		this.spawnTime = 2500
	}

	start() {
		this.timer.start();
		this.world = new World(this, 80)
	}
	update(dt) {
		if (this.input.isJustPressed(KeyEvent.DOM_VK_X)) {
			speech.speak(this.world.player.nearestRoad + ", " + this.world.player.furthestRoad)
			speech.speak(this.world.player.x)
		}
		if (this.input.isJustPressed(KeyEvent.DOM_VK_L)) {
			speech.speak(strings.get("level") + this.level + " " + strings.get("ws") + this.world.size + " spawn time " + this.world.game.spawnTime)
		}
		if (this.input.isJustPressed(KeyEvent.DOM_VK_H)) {
			speech.speak(this.world.player.hp + " " + strings.get("hp"))
		}
		if (this.input.isJustPressed(KeyEvent.DOM_VK_1) && this.canChangeSpeed) {
			this.canChangeSpeed = false; setTimeout(() => { this.canChangeSpeed = true }, 800)
			this.world.player.slowDown(10)
			this.world.player.speedUp(1)
		}
		if (this.input.isJustPressed(KeyEvent.DOM_VK_2) && this.canChangeSpeed) {
			this.canChangeSpeed = false; setTimeout(() => { this.canChangeSpeed = true }, 800)

			this.world.player.slowDown(10)
			this.world.player.speedUp(2)
		}
		if (this.input.isJustPressed(KeyEvent.DOM_VK_3) && this.canChangeSpeed) {
			this.canChangeSpeed = false; setTimeout(() => { this.canChangeSpeed = true }, 800)

			this.world.player.slowDown(10)
			this.world.player.speedUp(3)
		}
		if (this.input.isJustPressed(KeyEvent.DOM_VK_4) && this.canChangeSpeed) {
			this.canChangeSpeed = false; setTimeout(() => { this.canChangeSpeed = true }, 800)

			this.world.player.slowDown(10)
			this.world.player.speedUp(4)
		}
		if (this.input.isJustPressed(KeyEvent.DOM_VK_5) && this.canChangeSpeed) {
			this.canChangeSpeed = false; setTimeout(() => { this.canChangeSpeed = true }, 800)

			this.world.player.slowDown(10)
			this.world.player.speedUp(5)
		}
		this.world.update()
	}
	render() {
	}

}
export { Game }