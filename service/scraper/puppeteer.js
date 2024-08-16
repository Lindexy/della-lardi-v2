const puppeteer = require("puppeteer");
const fs = require("fs").promises;

const LAUNCH_PUPPETEER_OPTS = {
	// headless: false,
	// defaultViewport:  null,
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
		page.setDefaultNavigationTimeout(90000);

		const cookies = [
			{
			  "name": "ph_phc_o6INYGy022Ci8EvkOICZ3NggKWOnskhvpI1ZowGRcr0_posthog",
			  "value": "%7B%22distinct_id%22%3A%222414103163020509129%22%2C%22%24sesid%22%3A%5B1723790255629%2C%22019159e7-baf0-74ae-b9a9-92733eb268e3%22%2C1723790244592%5D%2C%22%24epp%22%3Atrue%7D",
			  "domain": ".della.com.ua",
			  "path": "/",
			  "expires": 1755326255,
			  "size": 231,
			  "httpOnly": false,
			  "secure": true,
			  "session": false,
			  "sameSite": "Lax",
			  "priority": "Medium",
			  "sameParty": false,
			  "sourceScheme": "Secure"
			},
			{
			  "name": "2414103163020509129@2422809372407037971_t",
			  "value": "HbQWtxnAnXMKNUSCnzAv8idzi9b8ewYLEclBnyd5LALayn+WHn8EYzGmMAl9jfihaRLMVkOhs1wLjxQuAVOO2MzMZwRXdELq+U0qBgszNGLpfQ==",
			  "domain": ".della.com.ua",
			  "path": "/",
			  "expires": 1755326256,
			  "size": 153,
			  "httpOnly": false,
			  "secure": false,
			  "session": false,
			  "sameSite": "Lax",
			  "priority": "Medium",
			  "sameParty": false,
			  "sourceScheme": "Secure"
			},
			{
			  "name": "_ga",
			  "value": "GA1.1.655217434.1723790245",
			  "domain": ".della.com.ua",
			  "path": "/",
			  "expires": 1758350244.562714,
			  "size": 29,
			  "httpOnly": false,
			  "secure": false,
			  "session": false,
			  "priority": "Medium",
			  "sameParty": false,
			  "sourceScheme": "Secure"
			},
			{
			  "name": "sessionid",
			  "value": "wp8y4isd4bcz93q8ik2rxfz5jzt9rzwx",
			  "domain": "della.com.ua",
			  "path": "/",
			  "expires": 1724999855.604341,
			  "size": 41,
			  "httpOnly": true,
			  "secure": true,
			  "session": false,
			  "sameSite": "Lax",
			  "priority": "Medium",
			  "sameParty": false,
			  "sourceScheme": "Secure"
			},
			{
			  "name": "_ga_RDFYM13DNV",
			  "value": "GS1.1.1723790244.1.1.1723790255.0.0.0",
			  "domain": ".della.com.ua",
			  "path": "/",
			  "expires": 1758350255.54265,
			  "size": 51,
			  "httpOnly": false,
			  "secure": false,
			  "session": false,
			  "priority": "Medium",
			  "sameParty": false,
			  "sourceScheme": "Secure"
			},
			{
			  "name": "dasc",
			  "value": "YTo3OntzOjc6InVzZXJfaWQiO3M6MTk6IjI0MTQxMDMxNjMwMjA1MDkxMjkiO3M6NToibG9naW4iO3M6MTE6IjE5NzZhaHNhdGFuIjtzOjM6InB3ZCI7czozMjoiYWJhYzg1ZTRmNWE5YzkyOGI1NDgyZjUwOTUyNTFlYjIiO3M6MTU6ImRhdGVfdmlzaXRfbGFzdCI7czoxOToiMjAyNC0wOC0xNiAwOTozNzozNSI7czoxNjoibGFzdF9vbmxpbmVfdGltZSI7aToxNzIzNzkwMjU1O3M6MTM6ImlzX2Jsb2NrX3VzZXIiO3M6MToiMCI7czozOiJvY2MiO3M6MToiMCI7fQ%3D%3D",
			  "domain": ".della.com.ua",
			  "path": "/",
			  "expires": 1755326255.226616,
			  "size": 360,
			  "httpOnly": false,
			  "secure": false,
			  "session": false,
			  "priority": "Medium",
			  "sameParty": false,
			  "sourceScheme": "Secure"
			},
			{
			  "name": "intercom-device-id-qcp5tj0k",
			  "value": "3bff635e-7f63-43d1-b208-474f27752eec",
			  "domain": ".della.com.ua",
			  "path": "/",
			  "expires": 1747120256,
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
			  "value": "3cdcfd62-e582-481f-b56b-cf2f65aabe47",
			  "domain": ".della.com.ua",
			  "path": "/",
			  "expires": 1747120245,
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
			  "name": "_pk_id.3.744f",
			  "value": "beb49f1d298ade47.1723790245.",
			  "domain": "della.com.ua",
			  "path": "/",
			  "expires": 1757745445,
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
			  "value": "YToxOntzOjM6IkNJRCI7czoxOToiMjQyMjgwOTM3MjQwNzAzNzk3MSI7fQ%3D%3D",
			  "domain": ".della.com.ua",
			  "path": "/",
			  "expires": 1758350244.081158,
			  "size": 80,
			  "httpOnly": false,
			  "secure": false,
			  "session": false,
			  "priority": "Medium",
			  "sameParty": false,
			  "sourceScheme": "Secure"
			},
			{
			  "name": "intercom-session-qcp5tj0k",
			  "value": "cHZVeWxGN0paVXEzbVFtdVpVcGZucGFTbnlDYkFlRFhpS05tdmtRUTE3VXVPcW4wQ1pOeVJzNnE3RHYyMVJZVS0tY01ic1hjR1pUcm1ITElsUzh2ZnZkUT09--51aa1b2c603993f75a97d9a67a26ce594de63b2a",
			  "domain": ".della.com.ua",
			  "path": "/",
			  "expires": 1724395056,
			  "size": 187,
			  "httpOnly": false,
			  "secure": false,
			  "session": false,
			  "sameSite": "Lax",
			  "priority": "Medium",
			  "sameParty": false,
			  "sourceScheme": "Secure"
			},
			{
			  "name": "_pk_ses.3.744f",
			  "value": "1",
			  "domain": "della.com.ua",
			  "path": "/",
			  "expires": 1723792055,
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
			  "name": "PHPSESSID",
			  "value": "r3v5djmvkc0a3budhd4npmd6u7",
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
		// await fs.writeFile('./cookies.json', JSON.stringify(cookiesToSave, null, 2));
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
