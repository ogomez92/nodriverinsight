export const debug = false
import { ScrollingText } from './scrollingText'
import { utils } from './utilities'
import { SoundHandler } from './soundHandler'
import { strings } from './strings'
import { so } from './soundObject'
export let _
export let content = {
	numberOfVehicles: 7,
	bonusTypes: 3,
	shopItems: {
		hyperjump: 500,
		bombs: 250,
		galleryMembership: 75,
		shortfuse: 450,

	}
}
export var gameID = "road";
export let parsedCars = []
parsedCars.push({})
import { speech } from './tts'
import { LanguageSelector } from './languageSelector'
import { Game } from './game';
export var version = "1.0";
export let data = {
	coins: 0,
	jumps: 0,
	unlocks: {
		hyperjump: false,
	},
}
export var version2 = "";

export var lang = 0;
export var ttsVoice;
export var ttsRate = 1;
import $ from 'jquery';
import { Menu } from './menu';
import { AudioItem, MenuItem, MenuTypes } from './menuItem'
document.addEventListener('DOMContentLoaded', setup);
async function setup() {
	document.getElementById("app").focus();
	if (localStorage.getItem("string_data") != null) {
		data = JSON.parse(localStorage.getItem("string_data"))
	}
	let langs = new LanguageSelector("langSelect", async (result) => {
		lang = result;
		speech.setLanguage(lang);
		_ = strings.get
		speech.setRate(3)
		//await strings.check(2)
		mainMenu();
	})
}
export async function mainMenu() {
	let music = so.create("music/menu")
	music.volume = 0.6
	music.loop = true;
	music.play()
	speech.ducker = music
	let items = []
	items.push(new MenuItem(0, strings.get("mStart")))
	let menu = new Menu(strings.get("mainMenu"), items)
	let selection = await menu.runSync()
	await music.fade(0)
	music.destroy()
	switch (selection) {
		case 0:
			let game = new Game()
			game.start()
			break;
		default: break;
	}
}

export function save() {
	localStorage.setItem("string_data", JSON.stringify(data))
}
export function getUnlock(v) {
	if (typeof data.unlocks === "undefined") data.unlocks = {}
	if (typeof data.unlocks[v] === "undefined") data.unlocks[v] = false;
	return data.unlocks[v]
}
export function setUnlock(v, value = true) {
	console.log(v)
	if (typeof data.unlocks === "undefined") data.unlocks = {}
	if (typeof data.unlocks[v] === "undefined") data.unlocks[v] = false;
	data.unlocks[v] = value
	save()
	return value;

}
export function increase(v, value = 1) {
	if (typeof data[v] === "undefined") {
		data[v] = value
	} else {
		data[v] += value;
	}
	save()
	return value;

}
export function decrease(v, value = 1) {
	if (typeof data[v] === "undefined") {
		data[v] = 0 - value
	} else {
		data[v] -= value;
	}
	save()
	return value;

}

export function setData(v, value) {
	if (typeof data[v] === "undefined") data[v] = value
	data[v] = value
	save()
	return value;

}
export function getData(v) {
	if (typeof data[v] === "undefined") data[v] = 0
	return data[v]
}
async function shop() {
	let shopAmbience = so.create("shop_ambience")
	shopAmbience.volume = 0.6
	shopAmbience.loop = true
	shopAmbience.play()
	let menu;
	let result;
	let buy = so.create("purchase_item")
	let nobuy = so.create("no_cash")
	data.coins = 100000
	speech.speak(strings.get("mShopIntro"))
	while (result != 0) {
		await utils.sleep(5)
		let items = []
		items.push(new MenuItem(0, strings.get("mShopBack", [data.coins])))
		for (var k in content.shopItems) {
			if (!getUnlock(k)) {
				items.push(new MenuItem(k, strings.get("shop" + k) + ": " + content.shopItems[k] + " " + strings.get("coins")))
			}
		}
		menu = new Menu(" ", items)
		menu.silent = true
		result = await menu.runSync()
		if (result != 0) {
			if (data.coins >= content.shopItems[result]) {
				data.coins -= content.shopItems[result]
				setUnlock(result)
				buy.replay();
			} else {
				nobuy.replay();
			}
		}
	}

	menu.destroy()
	shopAmbience.destroy()
	nobuy.destroy()
	buy.destroy()
	await mainMenu()
	return;
}