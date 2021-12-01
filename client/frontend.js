import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.14/dist/vue.esm.browser.js'


let myFistCard = {
    bodyTypeId: "26",
    contentName: "торф навалом",
    dateFrom: "2021-11-19",
    dateTo: "2021-11-26",
    idDella: "21306185820766656",
    loadTypes: [],
    note: "",
    paymentCurrencyId: "2",
    paymentMomentId: "4",
    paymentPrice: "23000",
    paymentTypeId: "2",
    sizeMassTo: "19",
    sizeVolumeTo: "32",
    waypointListSource: [
      {areaId: '19', countrySign: 'UA', townName: 'Озеряни'}
    ],
    waypointListTarget: [
      {areaId: '34', countrySign: 'UA', townName: 'Харків'}
    ],
  }


var app4 = new Vue({
    el: '#app-4',
    data: {
      todos: {
        bodyTypeId: "26",
        contentName: "торф навалом",
        dateFrom: "2021-11-19",
        dateTo: "2021-11-26",
        idDella: "21306185820766656",
        loadTypes: [],
        note: "",
        paymentCurrencyId: "2",
        paymentMomentId: "4",
        paymentPrice: "23000",
        paymentTypeId: "2",
        sizeMassTo: "19",
        sizeVolumeTo: "32",
        waypointListSource: [
          {areaId: '19', countrySign: 'UA', townName: 'Озеряни'}
        ],
        waypointListTarget: [
          {areaId: '34', countrySign: 'UA', townName: 'Харків'}
        ],
      }
    }
  })


  async function request(url, method = 'GET', data = null) {
    try {
      const headers = {}
      let body
  
      if (data) {
        headers['Content-Type'] = 'application/json'
        body = JSON.stringify(data)
      }
  
      const response = await fetch(url, {
        method,
        headers,
        body
      })
      return await response.json()
    } catch (e) {
      console.warn('Error:', e.message)
    }
  }