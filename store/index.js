// import Vue from 'vue'
// import Vuex from 'vuex'
// import mapSearch from './mapSearch'
import { HTTP, Routes } from '@/components/server/API.js'

// Vue.use(Vuex)

// export const modules = {
//   mapSearch
// }

export const state = () => ({
  menuList: null,

  minPriceState: null,

  currentPrice: null,
  currentPriceState: null,

  currentSum: null,
  currentSumState: null,

  countJK: null,

  currentUnitSumm: null,

  idRooms: null,

  currentJK: null,

  dataStateJK: {
    address: null,
    apartments_price_min: null,
    completion_date_full: null,
    count_parking: null,
    count_underground_parking: null,
    description: null,
    discount_finish: null,
    discount_start: null,
    discount_title: null,
    features: null,
    floor_max: null,
    id: null,
    images: null,
    infrastructures: null,
    installment: null,
    latitude: null,
    longitude: null,
    materials: null,
    metro_station: null,
    minutes_to_metro: null,
    ranges_formatted: null,
    title: null,
    trade_in: null
  }
})

export const actions = {
  getMenuList(context) {
    return new Promise((resolve, reject) => {
      HTTP.post(Routes.getMenuList, {})
        .then(({ data }) => {
          context.commit('setMenuList', data)
          resolve(data)
        })
        .catch((error) => {
          console.log('error: ', error)
          // eslint-disable-next-line prefer-promise-reject-errors
          reject()
        })
    })
  }
}

export const mutations = {
  setMenuList(state, menu) {
    state.menuList = menu
  },
  addStateDate(state, dataStateJK) {
    state.dataStateJK = dataStateJK
  },
  addCurrentPrice(state, currentPrice) {
    state.currentPrice = currentPrice
  },

  setMinPriceState(state, minPriceState) {
    state.minPriceState = minPriceState
  },

  setCurrentPriceState(state, currentPriceState) {
    state.currentPriceState = currentPriceState
  },

  setCurrentSum(state, currentSum) {
    state.currentSum = currentSum
  },

  setCurrentSumState(state, currentSumState) {
    state.currentSumState = currentSumState
  },

  setCountJK(state, countJK) {
    state.countJK = countJK
  },

  setcurrentUnitSumm(state, currentUnitSumm) {
    state.currentUnitSumm = currentUnitSumm
  },

  setIdRooms(state, idRooms) {
    state.idRooms = idRooms
  },
  setCurrentJk(state, currentJK) {
    state.currentJK = currentJK
  }
}
// const store = () =>
//   new Vuex.Store({
//     modules: {
//       mapSearch
//     },
//     state: {
//       menuList: null,

//       minPriceState: null,

//       currentPrice: null,
//       currentPriceState: null,

//       currentSum: null,
//       currentSumState: null,

//       countJK: null,

//       currentUnitSumm: null,

//       idRooms: null,

//       currentJK: null,

//       dataStateJK: {
//         address: null,
//         apartments_price_min: null,
//         completion_date_full: null,
//         count_parking: null,
//         count_underground_parking: null,
//         description: null,
//         discount_finish: null,
//         discount_start: null,
//         discount_title: null,
//         features: null,
//         floor_max: null,
//         id: null,
//         images: null,
//         infrastructures: null,
//         installment: null,
//         latitude: null,
//         longitude: null,
//         materials: null,
//         metro_station: null,
//         minutes_to_metro: null,
//         ranges_formatted: null,
//         title: null,
//         trade_in: null
//       }
//     },
//     actions: {
//       getMenuList(context) {
//         return new Promise((resolve, reject) => {
//           HTTP.post(Routes.getMenuList, {})
//             .then(({ data }) => {
//               context.commit('setMenuList', data)
//               resolve(data)
//             })
//             .catch((error) => {
//               console.log('error: ', error)
//               // eslint-disable-next-line prefer-promise-reject-errors
//               reject()
//             })
//         })
//       }
//     },
//     mutations: {
//       setMenuList(state, menu) {
//         state.menuList = menu
//       },
//       addStateDate(state, dataStateJK) {
//         state.dataStateJK = dataStateJK
//       },
//       addCurrentPrice(state, currentPrice) {
//         state.currentPrice = currentPrice
//       },

//       setMinPriceState(state, minPriceState) {
//         state.minPriceState = minPriceState
//       },

//       setCurrentPriceState(state, currentPriceState) {
//         state.currentPriceState = currentPriceState
//       },

//       setCurrentSum(state, currentSum) {
//         state.currentSum = currentSum
//       },

//       setCurrentSumState(state, currentSumState) {
//         state.currentSumState = currentSumState
//       },

//       setCountJK(state, countJK) {
//         state.countJK = countJK
//       },

//       setcurrentUnitSumm(state, currentUnitSumm) {
//         state.currentUnitSumm = currentUnitSumm
//       },

//       setIdRooms(state, idRooms) {
//         state.idRooms = idRooms
//       },
//       setCurrentJk(state, currentJK) {
//         state.currentJK = currentJK
//       }
//     }
//   })
// export default store
