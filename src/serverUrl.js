const { NODE_ENV } = process.env;

export let serverUrl;

if(NODE_ENV === 'development') {
  serverUrl = 'http://localhost:5000' // адрес сервера на локалке
} else {
  serverUrl = 'https://test-news-site.onrender.com'; // адрес сервера после выгрузки
}
