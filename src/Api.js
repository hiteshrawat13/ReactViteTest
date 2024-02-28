import axios from 'axios'
const BASE_URL=""


const get = () => {

    return new Promise((resolve,reject)=>{
        axios.get("https://api.github.com/users/mapbox")
        .then((res)=>resolve(res))
        .catch((err)=>reject(err))
    })
    
};


const post = () => {

    return new Promise((resolve,reject)=>{
        axios.post("https://api.github.com/users/mapbox")
        .then((res)=>resolve(res))
        .catch((err)=>reject(err))
    })
    
};



export {get,post}