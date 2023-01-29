const { NODE_ENV } = process.env;

export let serverUrl;

if(NODE_ENV === 'development') {
  serverUrl = 'http://localhost:4000' // адрес сервера на локалке
} else {
  serverUrl = 'https://app.onrender.com'; // адрес сервера после выгрузки
}