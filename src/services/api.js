import axios from 'axios';

const api = axios.create({
  baseURL: 'http://4930-131-72-131-62.ngrok.io/tracking-api/v1/', 
  //Se for testar utilizando emulador, inicie o ngrok na api e troque o link acima pelo do ngrok
});

export default api;