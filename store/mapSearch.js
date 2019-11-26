// import { format } from 'path'
import { HTTP, Routes } from '@/components/server/API.js'

// export default {
//   namespaced: true,
//   state: {
//     isIpotekaPrice: false,

//     allDataResidentialComplexes: {},
//     completionYears: [],
//     decorationTypes: [],
//     houseMaterials: [],
//     infrastructures: [],
//     paymentMethods: [],
//     residentials: [],
//     roomsFilter: [],
//     activeFilterRooms: [],
//     minPriceFilter: 800000,
//     maxPriceFilter: 8000000,
//     allRcMinPrice: 0,
//     allRcMaxPrice: 8000000,

//     parkingType: [
//       {
//         key: 0,
//         value: 'На территории'
//       },
//       {
//         key: 1,
//         value: 'Подземная'
//       }
//     ],

//     residential: {},
//     currentResidentialId: null,
//     checkedDate: [],
//     checkedPaymentMethods: [],
//     checkedMaterials: [],
//     checkedDecoration: [],
//     checkedInfrastructures: [],
//     checkedParking: [],

//     filtredRC: [],
//     filtredIdsRC: [],
//     filtredRcByName: [],

//     nameSearch: '',
//     searchableData: {},
//     isOpenSearch: false,
//     isOpenAllFilters: false,
//     accordeonClassFilters: false,
//     isOpenCard: false
//   },
//   actions: {
//     getAllData(context) {
//       console.log(new Date())
//       return new Promise((resolve, reject) => {
//         HTTP.post(Routes.getResidentialsOnMap, {})
//           .then(({ data }) => {
//             context.commit('getAllData', data)

//             resolve(data)
//           })
//           .catch((error) => {
//             console.error(error)
//             reject(error)
//           })
//       })
//     },
//     filter(context) {
//       let filtredRooms
//       if (!context.state.activeFilterRooms.length)
//         filtredRooms = context.state.residentials
//       else {
//         filtredRooms = context.state.residentials.filter((residential) => {
//           for (let i = 0; i < residential.apartments_formatted.length; i++) {
//             if (
//               containsSome(
//                 context.state.activeFilterRooms,
//                 residential.apartments_formatted[i].range
//               )
//             )
//               return true
//           }
//         })
//       }

//       let filtredPrice
//       if (
//         // eslint-disable-next-line eqeqeq
//         context.state.minPriceFilter == context.state.allRcMinPrice &&
//         // eslint-disable-next-line eqeqeq
//         context.state.maxPriceFilter == context.state.allRcMaxPrice
//       )
//         filtredPrice = filtredRooms
//       else {
//         filtredPrice = filtredRooms.filter((residential) => {
//           for (let i = 0; i < residential.apartments_formatted.length; i++) {
//             if (
//               (containsSome(
//                 context.state.activeFilterRooms,
//                 residential.apartments_formatted[i].range
//               ) ||
//                 !context.state.activeFilterRooms.length) &&
//               context.state.minPriceFilter <=
//                 residential.apartments_formatted[i].price_max &&
//               context.state.maxPriceFilter >=
//                 residential.apartments_formatted[i].price_min
//             )
//               return true
//           }
//           return false
//         })
//       }

//       let filtredDate
//       if (!context.state.checkedDate.length) filtredDate = filtredPrice
//       else {
//         filtredDate = filtredPrice.filter((residential) => {
//           if (context.state.checkedDate.includes('Сдан')) {
//             if (residential.completion_deadline_min.value === 'Сдан')
//               return true
//           }
//           if (
//             context.state.checkedDate.includes(
//               `${residential.completion_deadline_min.key}`
//             ) ||
//             context.state.checkedDate.includes(
//               `${residential.completion_deadline_max.key}`
//             ) ||
//             context.state.checkedDate.includes(
//               residential.completion_deadline_min.key
//             ) ||
//             context.state.checkedDate.includes(
//               residential.completion_deadline_max.key
//             )
//           ) {
//             return true
//           }
//         })
//       }

//       let filtredPaymentMethods
//       if (!context.state.checkedPaymentMethods.length)
//         filtredPaymentMethods = filtredDate
//       else {
//         filtredPaymentMethods = filtredDate.filter((residential) => {
//           return containsSome(
//             residential.payment_methods,
//             context.state.checkedPaymentMethods
//           )
//         })
//       }

//       let filtredMaterials
//       if (!context.state.checkedMaterials.length)
//         filtredMaterials = filtredPaymentMethods
//       else {
//         filtredMaterials = filtredPaymentMethods.filter((residential) => {
//           return containsSome(
//             residential.material_ids,
//             context.state.checkedMaterials
//           )
//         })
//       }

//       let filtredDecoration
//       if (!context.state.checkedDecoration.length)
//         filtredDecoration = filtredMaterials
//       else {
//         filtredDecoration = filtredMaterials.filter((residential) => {
//           return containsSome(
//             residential.decoration_types,
//             context.state.checkedDecoration
//           )
//         })
//       }

//       let filtredInfrastructures
//       if (!context.state.checkedInfrastructures.length)
//         filtredInfrastructures = filtredDecoration
//       else {
//         filtredInfrastructures = filtredDecoration.filter((residential) => {
//           for (let i = 0; i < residential.infrastructures.length; i++) {
//             if (
//               context.state.checkedInfrastructures.includes(
//                 residential.infrastructures[i].id
//               )
//             ) {
//               return true
//             }
//           }
//           return false
//         })
//       }

//       let filtredParking
//       if (
//         !context.state.checkedParking.length ||
//         context.state.checkedParking.includes(0)
//       )
//         filtredParking = filtredInfrastructures
//       else {
//         filtredParking = filtredInfrastructures.filter((residential) => {
//           return residential.count_underground_parking != null
//         })
//       }

//       context.commit('setFilterRc', filtredParking)
//     }
//   },
//   getters: {
//     getCurrentResidential(state) {
//       return state.residentials.find(
//         (residential) => state.currentResidentialId === residential.id
//       )
//     },
//     getLabelRooms: (state) => (label) => {
//       return state.roomsFilter.find((room) =>
//         room.range.includes(Number(label))
//       ).title
//     },
//     getFilterRc(state) {
//       // поиск по названию
//       if (state.nameSearch) {
//         // const countDev = 0
//         const developerIds = []
//         return state.residentials.filter((residential) => {
//           if (
//             residential.developer.name
//               .toLowerCase()
//               .includes(state.nameSearch) ||
//             residential.title.toLowerCase().includes(state.nameSearch)
//           ) {
//             // условие для уникального вывода застройщика
//             if (
//               residential.developer.name
//                 .toLowerCase()
//                 .includes(state.nameSearch) &&
//               !residential.title.toLowerCase().includes(state.nameSearch)
//             ) {
//               if (developerIds.includes(residential.developer.id)) return false
//               developerIds.push(residential.developer.id)
//             }
//             return true
//           }
//         })
//       }
//       // поиск по фильтрам
//       let filtredRooms
//       if (!state.activeFilterRooms.length) filtredRooms = state.residentials
//       else {
//         filtredRooms = state.residentials.filter((residential) => {
//           for (let i = 0; i < residential.apartments_formatted.length; i++) {
//             if (
//               containsSome(
//                 state.activeFilterRooms,
//                 residential.apartments_formatted[i].range
//               )
//             )
//               return true
//           }
//         })
//       }

//       let filtredPrice
//       if (
//         // eslint-disable-next-line eqeqeq
//         state.minPriceFilter == state.allRcMinPrice &&
//         // eslint-disable-next-line eqeqeq
//         state.maxPriceFilter == state.allRcMaxPrice
//       )
//         filtredPrice = filtredRooms
//       else {
//         filtredPrice = filtredRooms.filter((residential) => {
//           for (let i = 0; i < residential.apartments_formatted.length; i++) {
//             if (
//               (containsSome(
//                 state.activeFilterRooms,
//                 residential.apartments_formatted[i].range
//               ) ||
//                 !state.activeFilterRooms.length) &&
//               state.minPriceFilter <=
//                 residential.apartments_formatted[i].price_max &&
//               state.maxPriceFilter >=
//                 residential.apartments_formatted[i].price_min
//             )
//               return true
//           }
//           return false
//         })
//       }

//       // var filtredRoomsPrice =  state.residentials.filter(residential => {
//       //   for (let i = 0; i < residential.apartments_formatted.length; i++) {
//       //     if (containsSome(state.activeFilterRooms, residential.apartments_formatted[i].range) || !state.activeFilterRooms.length) {
//       //       if (state.minPriceFilter <= residential.apartments_formatted[i].price_max && state.maxPriceFilter >= residential.apartments_formatted[i].price_min
//       //       ) {
//       //         return true
//       //       }
//       //     }
//       //   }
//       //   return false
//       // })

//       let filtredDate
//       if (!state.checkedDate.length) filtredDate = filtredPrice
//       else {
//         filtredDate = filtredPrice.filter((residential) => {
//           if (state.checkedDate.includes('Сдан')) {
//             if (residential.completion_deadline_min.value === 'Сдан')
//               return true
//           }
//           if (
//             state.checkedDate.includes(
//               `${residential.completion_deadline_min.key}`
//             ) ||
//             state.checkedDate.includes(
//               `${residential.completion_deadline_max.key}`
//             ) ||
//             state.checkedDate.includes(
//               residential.completion_deadline_min.key
//             ) ||
//             state.checkedDate.includes(residential.completion_deadline_max.key)
//           ) {
//             return true
//           }
//         })
//       }

//       let filtredPaymentMethods
//       if (!state.checkedPaymentMethods.length)
//         filtredPaymentMethods = filtredDate
//       else {
//         filtredPaymentMethods = filtredDate.filter((residential) => {
//           return containsSome(
//             residential.payment_methods,
//             state.checkedPaymentMethods
//           )
//         })
//       }

//       let filtredMaterials
//       if (!state.checkedMaterials.length)
//         filtredMaterials = filtredPaymentMethods
//       else {
//         filtredMaterials = filtredPaymentMethods.filter((residential) => {
//           return containsSome(residential.material_ids, state.checkedMaterials)
//         })
//       }

//       let filtredDecoration
//       if (!state.checkedDecoration.length) filtredDecoration = filtredMaterials
//       else {
//         filtredDecoration = filtredMaterials.filter((residential) => {
//           return containsSome(
//             residential.decoration_types,
//             state.checkedDecoration
//           )
//         })
//       }

//       let filtredInfrastructures
//       if (!state.checkedInfrastructures.length)
//         filtredInfrastructures = filtredDecoration
//       else {
//         filtredInfrastructures = filtredDecoration.filter((residential) => {
//           for (let i = 0; i < residential.infrastructures.length; i++) {
//             if (
//               state.checkedInfrastructures.includes(
//                 residential.infrastructures[i].id
//               )
//             ) {
//               return true
//             }
//           }
//           return false
//         })
//       }

//       let filtredParking
//       if (!state.checkedParking.length || state.checkedParking.includes(0))
//         filtredParking = filtredInfrastructures
//       else {
//         filtredParking = filtredInfrastructures.filter((residential) => {
//           return residential.count_underground_parking != null
//         })
//       }

//       return filtredParking
//     },
//     getFiltredByName(state) {
//       return state.residentials.filter((residential) => {
//         return (
//           residential.developer.name.toLowerCase().includes(state.nameSearch) ||
//           residential.title.toLowerCase().includes(state.nameSearch)
//         )
//       })
//     }
//   },
//   mutations: {
//     getAllData(state, data) {
//       state.allDataResidentialComplexes = data
//       state.completionYears = data.completionYears
//       state.decorationTypes = data.decorationTypes
//       state.houseMaterials = data.houseMaterials
//       state.infrastructures = data.infrastructures
//       state.paymentMethods = data.paymentMethods
//       state.roomsFilter = data.roomsFilter
//       state.residentials = data.residentials

//       // установка min max для всех жк
//       let min = +data.residentials[0].price_min
//       let max = +data.residentials[0].price_max
//       data.residentials.forEach((rc) => {
//         if (min > +rc.price_min) {
//           min = +rc.price_min
//         }
//         if (max < +rc.price_max) {
//           max = +rc.price_max
//         }
//       })

//       // eslint-disable-next-line no-unused-vars
//       const res = state.residentials.find((rc) => rc.price_max === 395322102)

//       if (!isInteger(+min / 100000)) {
//         min = Math.ceil(+min / 100000) * 100000
//       }
//       if (!isInteger(+max / 100000)) {
//         max = Math.ceil(+max / 100000) * 100000
//       }
//       state.allRcMinPrice = min
//       state.allRcMaxPrice = max
//     },
//     getSelectedResidential(state, residential) {
//       state.residential = residential
//     },
//     setResidentialId(state, id) {
//       state.currentResidentialId = id
//     },
//     setActiveFilterRooms(state, rooms) {
//       state.activeFilterRooms = rooms
//     },
//     setMinPriceFilter(state, min) {
//       state.minPriceFilter = min
//     },
//     setMaxPriceFilter(state, max) {
//       state.maxPriceFilter = max
//     },
//     setCheckedDate(state, arrPoints) {
//       state.checkedDate = arrPoints
//     },
//     setCheckedPaymentMethods(state, arrPoints) {
//       state.checkedPaymentMethods = arrPoints
//     },
//     setCheckedMaterials(state, arrPoints) {
//       state.checkedMaterials = arrPoints
//     },
//     setCheckedDecoration(state, arrPoints) {
//       state.checkedDecoration = arrPoints
//     },
//     setCheckedInfrastructures(state, arrPoints) {
//       state.checkedInfrastructures = arrPoints
//     },
//     setСheckedParking(state, arrPoints) {
//       state.checkedParking = arrPoints
//     },
//     setFilterRc(state, residentials) {
//       state.filtredRC = residentials
//       state.filtredIdsRC = residentials.map((rc) => rc.id)
//     },
//     setNameSearch(state, value) {
//       state.nameSearch = value
//     },
//     setIsOpenSearch(state, value) {
//       state.isOpenSearch = value
//     },
//     setIsOpenAllFilters(state, value) {
//       state.isOpenAllFilters = value
//     },
//     setAccordeonClassFilters(state, value) {
//       state.accordeonClassFilters = value
//     },
//     setIsOpenCard(state, value) {
//       state.isOpenCard = value
//     },
//     getFiltredRcByName(state, value) {
//       if (value.type === 'rc') {
//         const residential = state.residentials.find((rc) => rc.id === value.id)
//         state.filtredRC = [residential]
//       } else {
//         state.filtredRC = state.residentials.filter(
//           (residential) => residential.developer.id === value.id
//         )
//       }
//     },
//     getSearchableData(state, data) {
//       state.searchableData = data
//     },
//     setIsIpotekaPrice(state, data) {
//       state.isIpotekaPrice = data
//     },
//     setActualRangePriceByRooms(state) {
//       console.log('sss')
//       let min = 90000000
//       let max = 0

//       if (!state.activeFilterRooms.length) {
//         state.residentials.forEach((rc) => {
//           if (min > +rc.price_min) {
//             min = +rc.price_min
//           }
//           if (max < +rc.price_max) {
//             max = +rc.price_max
//           }
//         })

//         if (!isInteger(+min / 100000)) {
//           min = Math.ceil(+min / 100000) * 100000
//         }
//         if (!isInteger(+max / 100000)) {
//           max = Math.ceil(+max / 100000) * 100000
//         }
//         // aroundRange(min,max)
//         state.allRcMinPrice = min
//         state.allRcMaxPrice = max
//         console.log('max: ', max)
//         console.log('min: ', min)
//         return
//       }

//       const choosenRc = state.residentials.filter((residential) => {
//         for (let i = 0; i < residential.apartments_formatted.length; i++) {
//           if (
//             containsSome(
//               state.activeFilterRooms,
//               residential.apartments_formatted[i].range
//             )
//           )
//             return true
//         }
//       })
//       console.log(choosenRc.length)
//       choosenRc.forEach((rc) => {
//         rc.apartments_formatted.forEach((format) => {
//           if (containsSome(state.activeFilterRooms, format.range)) {
//             if (min > format.price_min) min = format.price_min
//             if (max < format.price_min) max = format.price_max
//           }
//         })
//       })
//       if (!isInteger(+min / 100000)) {
//         min = Math.ceil(+min / 100000) * 100000
//       }
//       if (!isInteger(+max / 100000)) {
//         max = Math.ceil(+max / 100000) * 100000
//       }

//       // state.minPriceFilter = min
//       // state.maxPriceFilter = max

//       state.allRcMinPrice = min
//       state.allRcMaxPrice = max

//       console.log('max: ', max)
//       console.log('min: ', min)
//     }
//   }
// }

// Utils

// eslint-disable-next-line no-unused-vars
function containsAll(needles, haystack) {
  for (let i = 0; i < needles.length; i++) {
    if (haystack.includes(needles[i]) === false) return false
  }
  return true
}

function containsSome(needles, haystack) {
  for (let i = 0; i < needles.length; i++) {
    if (haystack.includes(needles[i])) return true
  }
  return false
}

function isInteger(num) {
  return (+num ^ 0) === +num
}

// eslint-disable-next-line no-unused-vars
function aroundRange(min, max) {
  if (!isInteger(+min / 100000)) {
    min = Math.ceil(+min / 100000) * 100000
  }
  if (!isInteger(+max / 100000)) {
    max = Math.ceil(+max / 100000) * 100000
  }
}

export const state = () => ({
  isIpotekaPrice: false,
  allDataResidentialComplexes: {},
  completionYears: [],
  decorationTypes: [],
  houseMaterials: [],
  infrastructures: [],
  paymentMethods: [],
  residentials: [],
  roomsFilter: [],
  activeFilterRooms: [],
  minPriceFilter: 800000,
  maxPriceFilter: 8000000,
  allRcMinPrice: 0,
  allRcMaxPrice: 8000000,

  parkingType: [
    {
      key: 0,
      value: 'На территории'
    },
    {
      key: 1,
      value: 'Подземная'
    }
  ],

  residential: {},
  currentResidentialId: null,
  checkedDate: [],
  checkedPaymentMethods: [],
  checkedMaterials: [],
  checkedDecoration: [],
  checkedInfrastructures: [],
  checkedParking: [],

  filtredRC: [],
  filtredIdsRC: [],
  filtredRcByName: [],

  nameSearch: '',
  searchableData: {},
  isOpenSearch: false,
  isOpenAllFilters: false,
  accordeonClassFilters: false,
  isOpenCard: false
})
export const actions = {
  getAllData(context) {
    console.log(new Date())
    return new Promise((resolve, reject) => {
      HTTP.post(Routes.getResidentialsOnMap, {})
        .then(({ data }) => {
          context.commit('getAllData', data)

          resolve(data)
        })
        .catch((error) => {
          console.error(error)
          reject(error)
        })
    })
  },
  filter(context) {
    let filtredRooms
    if (!context.state.activeFilterRooms.length)
      filtredRooms = context.state.residentials
    else {
      filtredRooms = context.state.residentials.filter((residential) => {
        for (let i = 0; i < residential.apartments_formatted.length; i++) {
          if (
            containsSome(
              context.state.activeFilterRooms,
              residential.apartments_formatted[i].range
            )
          )
            return true
        }
      })
    }

    let filtredPrice
    if (
      // eslint-disable-next-line eqeqeq
      context.state.minPriceFilter == context.state.allRcMinPrice &&
      // eslint-disable-next-line eqeqeq
      context.state.maxPriceFilter == context.state.allRcMaxPrice
    )
      filtredPrice = filtredRooms
    else {
      filtredPrice = filtredRooms.filter((residential) => {
        for (let i = 0; i < residential.apartments_formatted.length; i++) {
          if (
            (containsSome(
              context.state.activeFilterRooms,
              residential.apartments_formatted[i].range
            ) ||
              !context.state.activeFilterRooms.length) &&
            context.state.minPriceFilter <=
              residential.apartments_formatted[i].price_max &&
            context.state.maxPriceFilter >=
              residential.apartments_formatted[i].price_min
          )
            return true
        }
        return false
      })
    }

    let filtredDate
    if (!context.state.checkedDate.length) filtredDate = filtredPrice
    else {
      filtredDate = filtredPrice.filter((residential) => {
        if (context.state.checkedDate.includes('Сдан')) {
          if (residential.completion_deadline_min.value === 'Сдан') return true
        }
        if (
          context.state.checkedDate.includes(
            `${residential.completion_deadline_min.key}`
          ) ||
          context.state.checkedDate.includes(
            `${residential.completion_deadline_max.key}`
          ) ||
          context.state.checkedDate.includes(
            residential.completion_deadline_min.key
          ) ||
          context.state.checkedDate.includes(
            residential.completion_deadline_max.key
          )
        ) {
          return true
        }
      })
    }

    let filtredPaymentMethods
    if (!context.state.checkedPaymentMethods.length)
      filtredPaymentMethods = filtredDate
    else {
      filtredPaymentMethods = filtredDate.filter((residential) => {
        return containsSome(
          residential.payment_methods,
          context.state.checkedPaymentMethods
        )
      })
    }

    let filtredMaterials
    if (!context.state.checkedMaterials.length)
      filtredMaterials = filtredPaymentMethods
    else {
      filtredMaterials = filtredPaymentMethods.filter((residential) => {
        return containsSome(
          residential.material_ids,
          context.state.checkedMaterials
        )
      })
    }

    let filtredDecoration
    if (!context.state.checkedDecoration.length)
      filtredDecoration = filtredMaterials
    else {
      filtredDecoration = filtredMaterials.filter((residential) => {
        return containsSome(
          residential.decoration_types,
          context.state.checkedDecoration
        )
      })
    }

    let filtredInfrastructures
    if (!context.state.checkedInfrastructures.length)
      filtredInfrastructures = filtredDecoration
    else {
      filtredInfrastructures = filtredDecoration.filter((residential) => {
        for (let i = 0; i < residential.infrastructures.length; i++) {
          if (
            context.state.checkedInfrastructures.includes(
              residential.infrastructures[i].id
            )
          ) {
            return true
          }
        }
        return false
      })
    }

    let filtredParking
    if (
      !context.state.checkedParking.length ||
      context.state.checkedParking.includes(0)
    )
      filtredParking = filtredInfrastructures
    else {
      filtredParking = filtredInfrastructures.filter((residential) => {
        return residential.count_underground_parking != null
      })
    }

    context.commit('setFilterRc', filtredParking)
  }
}

export const getters = {
  getCurrentResidential(state) {
    return state.residentials.find(
      (residential) => state.currentResidentialId === residential.id
    )
  },
  getLabelRooms: (state) => (label) => {
    return state.roomsFilter.find((room) => room.range.includes(Number(label)))
      .title
  },
  getFilterRc(state) {
    // поиск по названию
    if (state.nameSearch) {
      // const countDev = 0
      const developerIds = []
      return state.residentials.filter((residential) => {
        if (
          residential.developer.name.toLowerCase().includes(state.nameSearch) ||
          residential.title.toLowerCase().includes(state.nameSearch)
        ) {
          // условие для уникального вывода застройщика
          if (
            residential.developer.name
              .toLowerCase()
              .includes(state.nameSearch) &&
            !residential.title.toLowerCase().includes(state.nameSearch)
          ) {
            if (developerIds.includes(residential.developer.id)) return false
            developerIds.push(residential.developer.id)
          }
          return true
        }
      })
    }
    // поиск по фильтрам
    let filtredRooms
    if (!state.activeFilterRooms.length) filtredRooms = state.residentials
    else {
      filtredRooms = state.residentials.filter((residential) => {
        for (let i = 0; i < residential.apartments_formatted.length; i++) {
          if (
            containsSome(
              state.activeFilterRooms,
              residential.apartments_formatted[i].range
            )
          )
            return true
        }
      })
    }

    let filtredPrice
    if (
      // eslint-disable-next-line eqeqeq
      state.minPriceFilter == state.allRcMinPrice &&
      // eslint-disable-next-line eqeqeq
      state.maxPriceFilter == state.allRcMaxPrice
    )
      filtredPrice = filtredRooms
    else {
      filtredPrice = filtredRooms.filter((residential) => {
        for (let i = 0; i < residential.apartments_formatted.length; i++) {
          if (
            (containsSome(
              state.activeFilterRooms,
              residential.apartments_formatted[i].range
            ) ||
              !state.activeFilterRooms.length) &&
            state.minPriceFilter <=
              residential.apartments_formatted[i].price_max &&
            state.maxPriceFilter >=
              residential.apartments_formatted[i].price_min
          )
            return true
        }
        return false
      })
    }

    // var filtredRoomsPrice =  state.residentials.filter(residential => {
    //   for (let i = 0; i < residential.apartments_formatted.length; i++) {
    //     if (containsSome(state.activeFilterRooms, residential.apartments_formatted[i].range) || !state.activeFilterRooms.length) {
    //       if (state.minPriceFilter <= residential.apartments_formatted[i].price_max && state.maxPriceFilter >= residential.apartments_formatted[i].price_min
    //       ) {
    //         return true
    //       }
    //     }
    //   }
    //   return false
    // })

    let filtredDate
    if (!state.checkedDate.length) filtredDate = filtredPrice
    else {
      filtredDate = filtredPrice.filter((residential) => {
        if (state.checkedDate.includes('Сдан')) {
          if (residential.completion_deadline_min.value === 'Сдан') return true
        }
        if (
          state.checkedDate.includes(
            `${residential.completion_deadline_min.key}`
          ) ||
          state.checkedDate.includes(
            `${residential.completion_deadline_max.key}`
          ) ||
          state.checkedDate.includes(residential.completion_deadline_min.key) ||
          state.checkedDate.includes(residential.completion_deadline_max.key)
        ) {
          return true
        }
      })
    }

    let filtredPaymentMethods
    if (!state.checkedPaymentMethods.length) filtredPaymentMethods = filtredDate
    else {
      filtredPaymentMethods = filtredDate.filter((residential) => {
        return containsSome(
          residential.payment_methods,
          state.checkedPaymentMethods
        )
      })
    }

    let filtredMaterials
    if (!state.checkedMaterials.length) filtredMaterials = filtredPaymentMethods
    else {
      filtredMaterials = filtredPaymentMethods.filter((residential) => {
        return containsSome(residential.material_ids, state.checkedMaterials)
      })
    }

    let filtredDecoration
    if (!state.checkedDecoration.length) filtredDecoration = filtredMaterials
    else {
      filtredDecoration = filtredMaterials.filter((residential) => {
        return containsSome(
          residential.decoration_types,
          state.checkedDecoration
        )
      })
    }

    let filtredInfrastructures
    if (!state.checkedInfrastructures.length)
      filtredInfrastructures = filtredDecoration
    else {
      filtredInfrastructures = filtredDecoration.filter((residential) => {
        for (let i = 0; i < residential.infrastructures.length; i++) {
          if (
            state.checkedInfrastructures.includes(
              residential.infrastructures[i].id
            )
          ) {
            return true
          }
        }
        return false
      })
    }

    let filtredParking
    if (!state.checkedParking.length || state.checkedParking.includes(0))
      filtredParking = filtredInfrastructures
    else {
      filtredParking = filtredInfrastructures.filter((residential) => {
        return residential.count_underground_parking != null
      })
    }

    return filtredParking
  },
  getFiltredByName(state) {
    return state.residentials.filter((residential) => {
      return (
        residential.developer.name.toLowerCase().includes(state.nameSearch) ||
        residential.title.toLowerCase().includes(state.nameSearch)
      )
    })
  }
}

export const mutations = {
  getAllData(state, data) {
    state.allDataResidentialComplexes = data
    state.completionYears = data.completionYears
    state.decorationTypes = data.decorationTypes
    state.houseMaterials = data.houseMaterials
    state.infrastructures = data.infrastructures
    state.paymentMethods = data.paymentMethods
    state.roomsFilter = data.roomsFilter
    state.residentials = data.residentials

    // установка min max для всех жк
    let min = +data.residentials[0].price_min
    let max = +data.residentials[0].price_max
    data.residentials.forEach((rc) => {
      if (min > +rc.price_min) {
        min = +rc.price_min
      }
      if (max < +rc.price_max) {
        max = +rc.price_max
      }
    })

    // eslint-disable-next-line no-unused-vars
    const res = state.residentials.find((rc) => rc.price_max === 395322102)

    if (!isInteger(+min / 100000)) {
      min = Math.ceil(+min / 100000) * 100000
    }
    if (!isInteger(+max / 100000)) {
      max = Math.ceil(+max / 100000) * 100000
    }
    state.allRcMinPrice = min
    state.allRcMaxPrice = max
  },
  getSelectedResidential(state, residential) {
    state.residential = residential
  },
  setResidentialId(state, id) {
    state.currentResidentialId = id
  },
  setActiveFilterRooms(state, rooms) {
    state.activeFilterRooms = rooms
  },
  setMinPriceFilter(state, min) {
    state.minPriceFilter = min
  },
  setMaxPriceFilter(state, max) {
    state.maxPriceFilter = max
  },
  setCheckedDate(state, arrPoints) {
    state.checkedDate = arrPoints
  },
  setCheckedPaymentMethods(state, arrPoints) {
    state.checkedPaymentMethods = arrPoints
  },
  setCheckedMaterials(state, arrPoints) {
    state.checkedMaterials = arrPoints
  },
  setCheckedDecoration(state, arrPoints) {
    state.checkedDecoration = arrPoints
  },
  setCheckedInfrastructures(state, arrPoints) {
    state.checkedInfrastructures = arrPoints
  },
  setСheckedParking(state, arrPoints) {
    state.checkedParking = arrPoints
  },
  setFilterRc(state, residentials) {
    state.filtredRC = residentials
    state.filtredIdsRC = residentials.map((rc) => rc.id)
  },
  setNameSearch(state, value) {
    state.nameSearch = value
  },
  setIsOpenSearch(state, value) {
    state.isOpenSearch = value
  },
  setIsOpenAllFilters(state, value) {
    state.isOpenAllFilters = value
  },
  setAccordeonClassFilters(state, value) {
    state.accordeonClassFilters = value
  },
  setIsOpenCard(state, value) {
    state.isOpenCard = value
  },
  getFiltredRcByName(state, value) {
    if (value.type === 'rc') {
      const residential = state.residentials.find((rc) => rc.id === value.id)
      state.filtredRC = [residential]
    } else {
      state.filtredRC = state.residentials.filter(
        (residential) => residential.developer.id === value.id
      )
    }
  },
  getSearchableData(state, data) {
    state.searchableData = data
  },
  setIsIpotekaPrice(state, data) {
    state.isIpotekaPrice = data
  },
  setActualRangePriceByRooms(state) {
    console.log('sss')
    let min = 90000000
    let max = 0

    if (!state.activeFilterRooms.length) {
      state.residentials.forEach((rc) => {
        if (min > +rc.price_min) {
          min = +rc.price_min
        }
        if (max < +rc.price_max) {
          max = +rc.price_max
        }
      })

      if (!isInteger(+min / 100000)) {
        min = Math.ceil(+min / 100000) * 100000
      }
      if (!isInteger(+max / 100000)) {
        max = Math.ceil(+max / 100000) * 100000
      }
      // aroundRange(min,max)
      state.allRcMinPrice = min
      state.allRcMaxPrice = max
      console.log('max: ', max)
      console.log('min: ', min)
      return
    }

    const choosenRc = state.residentials.filter((residential) => {
      for (let i = 0; i < residential.apartments_formatted.length; i++) {
        if (
          containsSome(
            state.activeFilterRooms,
            residential.apartments_formatted[i].range
          )
        )
          return true
      }
    })
    console.log(choosenRc.length)
    choosenRc.forEach((rc) => {
      rc.apartments_formatted.forEach((format) => {
        if (containsSome(state.activeFilterRooms, format.range)) {
          if (min > format.price_min) min = format.price_min
          if (max < format.price_min) max = format.price_max
        }
      })
    })
    if (!isInteger(+min / 100000)) {
      min = Math.ceil(+min / 100000) * 100000
    }
    if (!isInteger(+max / 100000)) {
      max = Math.ceil(+max / 100000) * 100000
    }

    // state.minPriceFilter = min
    // state.maxPriceFilter = max

    state.allRcMinPrice = min
    state.allRcMaxPrice = max

    console.log('max: ', max)
    console.log('min: ', min)
  }
}
