import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/', 
  //Se for testar utilizando emulador, inicie o ngrok na api e troque o link acima pelo do ngrok
});

export default api;