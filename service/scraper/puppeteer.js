const puppeteer = require("puppeteer");
const fs = require("fs").promises;

const LAUNCH_PUPPETEER_OPTS = {
	headless: true,
	defaultViewport:  null,
	//	1976ahsatan
	//	nunya1976
	args: ["--no-sandbox"],
};

// Використувується для :
// -відкрити пошук, получити всі закази
// -відкрити відмічені, получити всі закази
async function getPageContent() {
	try {
		// console.log("getPageContent");
		const browser = await puppeteer.launch(LAUNCH_PUPPETEER_OPTS);
		const page = await browser.newPage();
		page.setDefaultNavigationTimeout(1200000);

		const cookies = [
			{
			  "name": "_pk_ses.3.744f",
			  "value": "1",
			  "domain": "della.com.ua",
			  "path": "/",
			  "expires": 1750161987,
			  "size": 15,
			  "httpOnly": false,
			  "secure": false,
			  "session": false,
			  "sameSite": "Lax",
			  "priority": "Medium",
			  "sameParty": false,
			  "sourceScheme": "Secure"
			},
			{
			  "name": "intercom-session-qcp5tj0k",
			  "value": "Ny9rYmNBRzJsbHp6UGtjVXYrVk9hYU85aUhMd0s0eEorZ0FwMG5vRzd6dlE2MHlzTVJZUGVWMHQ3bzZYUVY5bjRKSWs2WWRXWVVzcnYxaG9yclFkVGg3RnZiZzJ0ODIvZ2F4TGdQOEpzdW89LS14WHFNSjhkalUxUHFwbVRYMEp1NFlBPT0=--a509f55294dc584132ae762febe7cebbe4342340",
			  "domain": ".della.com.ua",
			  "path": "/",
			  "expires": 1750764988,
			  "size": 247,
			  "httpOnly": false,
			  "secure": false,
			  "session": false,
			  "sameSite": "Lax",
			  "priority": "Medium",
			  "sameParty": false,
			  "sourceScheme": "Secure"
			},
			{
			  "name": "_ga_RDFYM13DNV",
			  "value": "GS2.1.s1750160177$o1$g1$t1750160187$j50$l0$h0",
			  "domain": ".della.com.ua",
			  "path": "/",
			  "expires": 1784720187.763346,
			  "size": 59,
			  "httpOnly": false,
			  "secure": false,
			  "session": false,
			  "priority": "Medium",
			  "sameParty": false,
			  "sourceScheme": "Secure"
			},
			{
			  "name": "23038141740381455@2516714361722519053_t",
			  "value": "Gp3O0uMd+XDOBJ5/na/wIuwquZt1rgby20yImcHg0jB0Ub516j5eWuhJOWh1q1THzU5bMYkDZqftYw==",
			  "domain": ".della.com.ua",
			  "path": "/",
			  "expires": 1781696188,
			  "size": 119,
			  "httpOnly": false,
			  "secure": false,
			  "session": false,
			  "sameSite": "Lax",
			  "priority": "Medium",
			  "sameParty": false,
			  "sourceScheme": "Secure"
			},
			{
			  "name": "dasc",
			  "value": "YTo3OntzOjc6InVzZXJfaWQiO3M6MTc6IjIzMDM4MTQxNzQwMzgxNDU1IjtzOjU6ImxvZ2luIjtzOjE5OiIxOTc2bnVueWFAZ21haWwuY29tIjtzOjM6InB3ZCI7czozMjoiYWJhYzg1ZTRmNWE5YzkyOGI1NDgyZjUwOTUyNTFlYjIiO3M6MTU6ImRhdGVfdmlzaXRfbGFzdCI7czoxOToiMjAyNS0wNi0xNyAxNDozNjoyNiI7czoxNjoibGFzdF9vbmxpbmVfdGltZSI7aToxNzUwMTYwMTg2O3M6MTM6ImlzX2Jsb2NrX3VzZXIiO3M6MToiMCI7czozOiJvY2MiO3M6MToiMCI7fQ%3D%3D",
			  "domain": ".della.com.ua",
			  "path": "/",
			  "expires": 1781696186.718871,
			  "size": 368,
			  "httpOnly": false,
			  "secure": false,
			  "session": false,
			  "priority": "Medium",
			  "sameParty": false,
			  "sourceScheme": "Secure"
			},
			{
			  "name": "intercom-device-id-qcp5tj0k",
			  "value": "dbc79cb5-790b-4a9d-be66-71794c80aa10",
			  "domain": ".della.com.ua",
			  "path": "/",
			  "expires": 1773490188,
			  "size": 63,
			  "httpOnly": false,
			  "secure": false,
			  "session": false,
			  "sameSite": "Lax",
			  "priority": "Medium",
			  "sameParty": false,
			  "sourceScheme": "Secure"
			},
			{
			  "name": "intercom-id-qcp5tj0k",
			  "value": "135b36c9-0fc6-48be-86fe-979072b805db",
			  "domain": ".della.com.ua",
			  "path": "/",
			  "expires": 1773490178,
			  "size": 56,
			  "httpOnly": false,
			  "secure": false,
			  "session": false,
			  "sameSite": "Lax",
			  "priority": "Medium",
			  "sameParty": false,
			  "sourceScheme": "Secure"
			},
			{
			  "name": "__eventn_id",
			  "value": "d1a58b5a-fdef-46ac-9f83-203d64147bfc",
			  "domain": ".della.com.ua",
			  "path": "/",
			  "expires": 1784720177.785368,
			  "size": 47,
			  "httpOnly": false,
			  "secure": true,
			  "session": false,
			  "sameSite": "None",
			  "priority": "Medium",
			  "sameParty": false,
			  "sourceScheme": "Secure"
			},
			{
			  "name": "_pk_id.3.744f",
			  "value": "72849f0b22465fd8.1750160178.",
			  "domain": "della.com.ua",
			  "path": "/",
			  "expires": 1784115378,
			  "size": 41,
			  "httpOnly": false,
			  "secure": false,
			  "session": false,
			  "sameSite": "Lax",
			  "priority": "Medium",
			  "sameParty": false,
			  "sourceScheme": "Secure"
			},
			{
			  "name": "della_request_v2",
			  "value": "YToxOntzOjM6IkNJRCI7czoxOToiMjUxNjcxNDM2MTcyMjUxOTA1MyI7fQ%3D%3D",
			  "domain": ".della.com.ua",
			  "path": "/",
			  "expires": 1784720177.202492,
			  "size": 80,
			  "httpOnly": false,
			  "secure": false,
			  "session": false,
			  "priority": "Medium",
			  "sameParty": false,
			  "sourceScheme": "Secure"
			},
			{
			  "name": "_ga",
			  "value": "GA1.1.2144328558.1750160178",
			  "domain": ".della.com.ua",
			  "path": "/",
			  "expires": 1784720177.767129,
			  "size": 30,
			  "httpOnly": false,
			  "secure": false,
			  "session": false,
			  "priority": "Medium",
			  "sameParty": false,
			  "sourceScheme": "Secure"
			},
			{
			  "name": "PHPSESSID",
			  "value": "ldqiolcjf0onhtfuuk7ee016cq",
			  "domain": "della.com.ua",
			  "path": "/",
			  "expires": -1,
			  "size": 35,
			  "httpOnly": false,
			  "secure": false,
			  "session": true,
			  "priority": "Medium",
			  "sameParty": false,
			  "sourceScheme": "Secure"
			}
		  ]

		//console.log(cookies);
		await page.setCookie(...cookies);
		await page.goto("https://della.com.ua/search/selected/");

		// await sleep(60000)

		// await page.screenshot({
		// 	path: 'demo.png',
		//   });

		// Передаємо на сайт код який створить і поверне масив обєктів з всіма данними фрахтів.
		let data = await page.evaluate(() => {
			let data = [];
			allCards = document.querySelectorAll(".request_card");
			for (let i = 0; i < allCards.length; i++) {
				if (allCards.item(i).parentNode.getAttribute("style")) {
					allCards.item(i).parentNode.remove();
				} else {
					let card = extract(allCards.item(i));
					data.push(card);
				}
			}
			function extract(targetCard) {
				let fraht = {};

				if (targetCard.matches(".deleted")) {
					fraht.closed = true;
				}

				fraht.idDella = targetCard.getAttribute("data-request_id");

				fraht.url =
					"https://della.com.ua" +
					targetCard.querySelector(".request_distance").getAttribute("href");

				if (targetCard.querySelector(".distance")) {
					fraht.distance = targetCard.querySelector(".distance").innerHTML;
				}

				let updated = targetCard.querySelector(".time_string").textContent;
				if (
					updated.includes("день") ||
					updated.includes("дні") ||
					updated.includes("тижд")
				) {
					fraht.closed = true;
				} else if (updated.includes("годин")) {
					let updatedAgo = parseInt(updated.replace(/[^\d]/g, ""));
					if (updatedAgo > 8) {
						fraht.closed = true;
					}
				}

				// Дата
				let dateFrom1 = targetCard
					.querySelector(".date_add")
					.innerHTML.substring(4, 6);
				let dateFrom2 = targetCard
					.querySelector(".date_add")
					.innerHTML.substring(1, 3);
				fraht.dateFrom = "2024-" + dateFrom1 + "-" + dateFrom2;

				let dateTo1 = targetCard
					.querySelector(".date_add")
					.innerHTML.substring(10, 12);
				let dateTo2 = targetCard
					.querySelector(".date_add")
					.innerHTML.substring(7, 9);
				if (dateTo1 > 0) {
					fraht.dateTo = "2024-" + dateTo1 + "-" + dateTo2;
				}

				// Назва грузу
				fraht.contentName = targetCard.querySelector(".cargo_type").textContent;

				// Доп. інформація по грузу
				fraht.note = "";
				// температурний режим
				if (targetCard.querySelector(".temperature") !== null) {
					fraht.note +=
						"темп: " +
						targetCard
							.querySelector(".temperature")
							.textContent.replace(" C 0", "") +
						" С ";
				}
				//Кількість палет + Розміри

				let paletSource = targetCard.querySelector(".request_text").childNodes;
				for (let i = 0; i < paletSource.length; i++) {
					if (paletSource[i].textContent.includes("кільк. палет:")) {
						fraht.note += "палет " + paletSource[i + 1].textContent + " ";
					}

					// Розміри

					if (paletSource[i].textContent.includes("дов=")) {
						fraht.sizeLength = paletSource[i + 1].textContent
							.replace(",", ".")
							.replace("м", "");
					}
					if (paletSource[i].textContent.includes("шир=")) {
						fraht.sizeWidth = paletSource[i + 1].textContent
							.replace(",", ".")
							.replace("м", "");
					}
					if (paletSource[i].textContent.includes("вис=")) {
						fraht.sizeHeight = paletSource[i + 1].textContent
							.replace(",", ".")
							.replace("м", "");
					}
				}
				// Тип загрузки\вигрузки

				loadTypesSource = targetCard.querySelector(".request_tags");
				if (loadTypesSource !== null) {
					fraht.loadTypes = "";
					if (loadTypesSource.textContent.includes("Збоку")) {
						fraht.loadTypes += "Збоку ";
					}
					if (loadTypesSource.textContent.includes("Зверху")) {
						fraht.loadTypes += "Зверху ";
					}
					if (loadTypesSource.textContent.includes("Задня")) {
						fraht.loadTypes += "Задня ";
					}
					// Кількість мість погрузки\вигрузки
					if (loadTypesSource.textContent.includes("Місць")) {
						let tags = loadTypesSource.querySelectorAll(".tag");
						for (let i = 0; i < tags.length; i++) {
							if (tags[i].textContent.includes("Місць")) {
								fraht.note += tags[i].textContent.replace("\n", "") + " ";
							}
						}
					}
					if (loadTypesSource.textContent.includes("Довантаження")) {
						fraht.note += "Догруз ";
					}
					if (loadTypesSource.textContent.includes("Можл. дозавантаження")) {
						fraht.note += "Можл. догруз ";
					}
					if (
						loadTypesSource.textContent.includes(
							"Без довантаження (окреме авто)"
						)
					) {
						fraht.note += "Окреме авто ";
					}
					if (loadTypesSource.textContent.includes("Рога (коники)")) {
						fraht.note += "Рога (коники) ";
					}
					if (loadTypesSource.textContent.includes("Санпаспорт")) {
						fraht.note += "Санпаспорт ";
					}
					if (loadTypesSource.textContent.includes("Санитарна книжка")) {
						fraht.note += "Санитарна книжка ";
					}
					if (loadTypesSource.textContent.includes("Пломба")) {
						fraht.note += "Пломба ";
					}
					if (loadTypesSource.textContent.includes("Ремені")) {
						fraht.note += "Ремені ";
					}
					if (loadTypesSource.textContent.includes("На склад")) {
						fraht.note += "На склад ";
					}
					if (loadTypesSource.textContent.includes("Дерев'яна підлога")) {
						fraht.note += "Дерев'яна підлога ";
					}
					if (loadTypesSource.textContent.includes("Розтентування")) {
						fraht.note += "Розтентування ";
					}
					if (loadTypesSource.textContent.includes("Пломба")) {
						fraht.note += "Пломба ";
					}
					if (loadTypesSource.textContent.includes("Гаки")) {
						fraht.note += "Гаки ";
					}
					if (loadTypesSource.textContent.includes("З'ємні стійки")) {
						fraht.note += "З'ємні стійки ";
					}
					if (loadTypesSource.textContent.includes("Гідроборт")) {
						fraht.note += "Гідроборт ";
					}
				}
				fraht.note = fraht.note.substring(0, 40);

				// Габарити грузу
				let volumeSource = targetCard.querySelector(".cube");
				if (volumeSource !== null) {
					if (volumeSource.textContent.includes("-")) {
						minPosition = volumeSource.textContent.indexOf("-");
						fraht.sizeVolumeFrom = volumeSource.textContent
							.slice(0, minPosition)
							.replace(" м³", "")
							.replace(",", ".");
						fraht.sizeVolumeTo = volumeSource.textContent
							.slice(minPosition + 1)
							.replace(" м³", "")
							.replace(",", ".");
					} else {
						fraht.sizeVolumeTo = volumeSource.textContent
							.replace(" м³", "")
							.replace(",", ".");
					}
				}

				// Тип машини

				fraht.bodyTypeId = targetCard.querySelector(".truck_type").textContent;

				// Ціна

				paymentPriceSource = targetCard.querySelector(".price_main");
				if (paymentPriceSource !== null) {
					paymentPriceSource
						.querySelectorAll("div,span")
						.forEach((n) => n.remove());
					fraht.paymentPrice = paymentPriceSource.innerHTML.replace(/\D/g, "");
				} else {
					fraht.paymentPrice = 0;
				}

				// Валюта

				fraht.paymentCurrencyId = "2";

				// Доп. умови оплати

				if (targetCard.querySelector(".price_tags") !== null) {
					fraht.payment = targetCard
						.querySelector(".price_tags")
						.textContent.replace(/\n/g, " ");
				} else {
					fraht.payment = "";
				}

				// Вага

				let sizeMasSource = targetCard.querySelector(".weight");
				if (sizeMasSource !== null) {
					if (sizeMasSource.textContent.includes("–")) {
						minPosition = sizeMasSource.textContent.indexOf("–");
						fraht.sizeMassFrom = sizeMasSource.textContent
							.slice(0, minPosition)
							.replace(",", ".")
							.replace("т", "")
							.replace(" ", "");
						fraht.sizeMassTo = sizeMasSource.textContent
							.slice(minPosition + 1)
							.replace(",", ".")
							.replace("т", "")
							.replace(" ", "");
					} else {
						fraht.sizeMassTo = targetCard
							.querySelector(".weight")
							.innerHTML.replace(",", ".")
							.replace("т", "")
							.replace(" ", "");
					}
				} else {
					fraht.sizeMassFrom = "22";
				}

				// Загрузка - вигрузка

				citiesSource = targetCard.querySelector(".request_distance").childNodes;

				let cityAddTarget = "loadTowns";
				fraht.waypointListSource = [];
				fraht.waypointListTarget = [];
				for (let i = 1; i < citiesSource.length; i++) {
					if (citiesSource[i].textContent.includes(",")) {
					} else if (citiesSource[i].textContent.includes("—")) {
						cityAddTarget = "unLoadTowns";
					} else {
						if (citiesSource[i].hasAttribute("title")) {
							let townNameAdd =
								citiesSource[i].querySelector(".locality").textContent;
							townNameAdd = townNameAdd.slice(0, townNameAdd.length - 1);
							let city = {
								areaId: checkRegion(citiesSource[i].getAttribute("title")),
								countrySign: "UA",
								townName: townNameAdd,
							};
							if (cityAddTarget === "loadTowns") {
								fraht.waypointListSource.push(city);
							} else {
								fraht.waypointListTarget.push(city);
							}
						}
					}
				}
				return fraht;
			}
			function checkRegion(region) {
				let regions = {
					"Вінницька обл.": "15",
					"Волинська обл.": "16",
					"Дніпропетровська обл.": "17",
					"Донецька обл.": "18",
					"Житомирська обл.": "19",
					"Закарпатська обл.": "20",
					"Запорізька обл.": "21",
					"Івано-Франківська обл.": "22",
					"Київська обл.": "23",
					"Кіровоградська обл.": "24",
					"Крим Авт. Респ.": "25",
					"Луганська обл.": "26",
					"Львівська обл.": "27",
					"Миколаївська обл.": "28",
					"Одеська обл.": "29",
					"Полтавська обл.": "30",
					"Рівненська обл.": "31",
					"Сумська обл.": "32",
					"Тернопільська обл.": "33",
					"Харківська обл.": "34",
					"Херсонська обл.": "35",
					"Хмельницька обл.": "36",
					"Черкаська обл.": "37",
					"Чернігівська обл.": "38",
					"Чернівецька обл.": "39",
				};
				let result = "Область не знайдено";
				for (let key in regions) {
					if (region.includes(key)) {
						result = regions[key];
						break;
					}
				}
				return result;
			}
			return data;
		});

		// Костиль для збереження куків
		// let cookiesToSave = await page.cookies();
		// await fs.writeFile('./cookies3.json', JSON.stringify(cookiesToSave, null, 2));
		// console.log(data);
		
		await browser.close();
		return data;
	} catch (error) {
		console.log(error);
	}
}

function sleep(ms) {
	return new Promise((resolve) => {
		setTimeout(resolve, ms);
	});
}
module.exports = getPageContent;
