import axios from 'axios';

const api = axios.create({
  baseURL: 'https://coding-polaris-api.herokuapp.com/', 
  //Se for testar utilizando emulador, inicie o ngrok na api e troque o link acima pelo do ngrok
});

export default api;