import axios from 'axios'
const base = 'http://127.0.0.1:8000'
// Настройки по умолчанию для всех запросов
// var base = 'http://new-okna/' + window.location.pathname.split('/')[1]
export const HTTP = axios.create({
  baseURL: base,
  // baseURL: 'http://new-okna',
  // baseUrl: `https://okna/` + `${window.location.pathname.split('/')[1]}`,
  // window.location.origin
  // baseURL:
  //   window.location.origin + '/' + window.location.pathname.split('/')[1],
  headers: {
    'X-Requested-With': 'XMLHttpRequest'
    // 'Retry-After': 1000,
  },
  timeout: 15000
  // crossDomain: true
  // withCredentials: true
})

// Список путей для общения с сервером через POST
export const Routes = {
  getMenuList: '/get-menu', // получить список меню

  getAvailableActions: '/sale-actions/get-available-actions', // Получить доступные действия
  getParamsIpoteka: '/residential-complex/mortgage-params', // получить соответствия заголовков комнат и их айдишников (Студия, 1-ком и т.д.) и мин.Сумму кв
  getHandlerRooms: '/residential-complex/get-count', // роут получить соответствия заголовков комнат и их айдишников (Студия, 1-ком и т.д.)
  postPhone: '/requests',

  getResidentialsOnMap: '/residential-complex/index'
}

// console.log(window.location.origin + '/' + window.location.pathname.split('/')[1] + '/' + window.location.pathname.split('/')[2]);
