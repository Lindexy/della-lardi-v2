const puppeteer = require("puppeteer");
const fs = require("fs").promises;

const LAUNCH_PUPPETEER_OPTS = {
	headless: true,
	defaultViewport: null,
	args: ["--no-sandbox"],
};

// Використувується для :
// -відкрити пошук, получити всі закази
// -відкрити відмічені, получити всі закази
async function getPageContent(url, ids) {
	try {
		const browser = await puppeteer.launch(LAUNCH_PUPPETEER_OPTS);
		const page = await browser.newPage();
		page.setDefaultNavigationTimeout(90000);

		const cookies = [
			{
				name: "_ga",
				value: "GA1.3.330184310.1634985374",
				domain: ".della.com.ua",
				path: "/",
				size: 29,
				httpOnly: false,
				secure: false,
				session: false,
				sameParty: false,
				sourceScheme: "Secure",
				sourcePort: 443,
			},
			{
				name: "_ga_RDFYM13DNV",
				value: "GS1.1.1643107786.2.1.1643107806.0",
				domain: ".della.com.ua",
				path: "/",
				size: 47,
				httpOnly: false,
				secure: false,
				session: false,
				sameParty: false,
				sourceScheme: "Secure",
				sourcePort: 443,
			},
			{
				name: "mySRClassic",
				value: "9221312153642559334",
				domain: ".della.com.ua",
				path: "/",
				size: 30,
				httpOnly: false,
				secure: false,
				session: true,
				sameParty: false,
				sourceScheme: "Secure",
				sourcePort: 443,
			},
			{
				name: "mpsf",
				value:
					"YToxOntzOjM6ImFkdiI7YTo2OntpOjE7czoxNzI6ImNmPTIwNHx8fHx8fHwmY3Q9MjA0fHx8fHx8fCZyZj18fHx8fHx8JnJ0PXx8fHx8fHwmY2lmPXx8fHx8fHwmY2l0PXx8fHx8fHwmdD0wfHwmdz18JmM9fCZkPXwmejE9MSZ6Mj0xJnozPSZ6ND0mejU9MSZ6Nj0wJno3PSZ6OD0mejk9JnkxPSZ5Mj0meTM9Jm89Jm49MSZ1PTIwMjEtMTAtMjMgMTM6NDM6MjMiO2k6MjtOO2k6MztOO2k6NDtOO2k6NTtOO2k6NjtOO319",
				domain: ".della.com.ua",
				path: "/",
				size: 320,
				httpOnly: false,
				secure: false,
				session: true,
				sameParty: false,
				sourceScheme: "Secure",
				sourcePort: 443,
			},
			{
				name: "dasc",
				value:
					"YTo3OntzOjc6InVzZXJfaWQiO3M6MTc6IjIyMDE4MTgxNzM0MzAyNzIyIjtzOjU6ImxvZ2luIjtzOjI4OiJuYXRhbGthc3RlbG1hc2NodWtAZ21haWwuY29tIjtzOjM6InB3ZCI7czozMjoiYWJhYzg1ZTRmNWE5YzkyOGI1NDgyZjUwOTUyNTFlYjIiO3M6MTU6ImRhdGVfdmlzaXRfbGFzdCI7czoxOToiMjAyMi0wMS0yNSAxMjo1MDowNyI7czoxNjoibGFzdF9vbmxpbmVfdGltZSI7aToxNjQzMTA3ODA3O3M6MTM6ImlzX2Jsb2NrX3VzZXIiO3M6MToiMCI7czozOiJvY2MiO3M6MToiMCI7fQ%3D%3D",
				domain: ".della.com.ua",
				path: "/",
				size: 380,
				httpOnly: false,
				secure: false,
				session: false,
				sameParty: false,
				sourceScheme: "Secure",
				sourcePort: 443,
			},
			{
				name: "_gid",
				value: "GA1.3.1889202676.1634985374",
				domain: ".della.com.ua",
				path: "/",
				size: 31,
				httpOnly: false,
				secure: false,
				session: false,
				sameParty: false,
				sourceScheme: "Secure",
				sourcePort: 443,
			},
			{
				name: "PHPSESSID",
				value: "2kfb4hu079s8eial517gu1ite3",
				domain: "della.com.ua",
				path: "/",
				size: 35,
				httpOnly: false,
				secure: false,
				session: true,
				sameParty: false,
				sourceScheme: "Secure",
				sourcePort: 443,
			},
			{
				name: "_pk_ses.3.744f",
				value: "1",
				domain: "della.com.ua",
				path: "/",
				size: 15,
				httpOnly: false,
				secure: false,
				session: false,
				sameSite: "Lax",
				sameParty: false,
				sourceScheme: "Secure",
				sourcePort: 443,
			},
			{
				name: "_pk_id.3.744f",
				value: "8a53caf4cad0e72e.1634985374.",
				domain: "della.com.ua",
				path: "/",
				size: 41,
				httpOnly: false,
				secure: false,
				session: false,
				sameSite: "Lax",
				sameParty: false,
				sourceScheme: "Secure",
				sourcePort: 443,
			},
			{
				name: "della_request_v2",
				value:
					"YToxOntzOjM6IkNJRCI7czoxOToiMjEyOTUxMzM2MTQ0NjM0MzkyOSI7fQ%3D%3D",
				domain: ".della.com.ua",
				path: "/",
				expires: -1,
				size: 80,
				httpOnly: false,
				secure: false,
				session: true,
				sameParty: false,
				sourceScheme: "Secure",
				sourcePort: 443,
			},
			{
				name: "rcop",
				value: "czoxOiIyIjs%3D",
				domain: ".della.com.ua",
				path: "/",
				expires: -1,
				size: 18,
				httpOnly: false,
				secure: false,
				session: true,
				sameParty: false,
				sourceScheme: "Secure",
				sourcePort: 443,
			},
		];
		// Фукція допису ІД
		cookies.push({
			name: "mySRClassic",
			value: ids.join("-"),
			domain: ".della.com.ua",
			path: "/",
			size: 28,
			httpOnly: false,
			secure: false,
			session: false,
			sameParty: false,
			sourceScheme: "Secure",
			sourcePort: 443,
		});

		//console.log(cookies);
		await page.setCookie(...cookies);
		await page.goto(url);

		//await sleep(60000)

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
				fraht.dateFrom = "2023-" + dateFrom1 + "-" + dateFrom2;

				let dateTo1 = targetCard
					.querySelector(".date_add")
					.innerHTML.substring(10, 12);
				let dateTo2 = targetCard
					.querySelector(".date_add")
					.innerHTML.substring(7, 9);
				if (dateTo1 > 0) {
					fraht.dateTo = "2023-" + dateTo1 + "-" + dateTo2;
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
		//let cookiesToSave = await page.cookies();
		//await fs.writeFile('./cookies.json', JSON.stringify(cookiesToSave, null, 2));

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
