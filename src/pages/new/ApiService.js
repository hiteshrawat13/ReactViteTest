import axios from 'axios';
import Config from '../../Config';
axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com';


const instance = axios.create({
    baseURL : Config.API_BASE_URL,
    headers: {
        
      ContentType: "application/json",
      timeout : 1000,
    }, 

  });
  
  export default instance;



 