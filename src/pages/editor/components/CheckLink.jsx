import axios from 'axios'
import React, { useCallback, useEffect, useState } from 'react'
import Config from '../../../Config'

 
const CheckLink = ({link,onExists=null}) => {

    if(!link) return

    const [linkExists,setLinkExists]=useState("")
    const [checking,setChecking]=useState(false)
    useEffect(()=>{
        optimizedFnCheckUrl(link)
    },
    [link])


    const check_url=(link)=>{
        if(link.trim()==""){setLinkExists("");setChecking(false);return}
        if(link.length==0){ setLinkExists("");setChecking(false);return}

        setChecking(true)
        const formData = new FormData();
        formData.append("url", link);
        axios.post(Config.API_BASE_URL+"/link_exists", {url:link})
        .then(result => {
    
           
            const status_code= result.data.message
            if(status_code!=404){
                setLinkExists("Link already exist on server :")
                if(onExists)onExists(link);
            }else{
                setLinkExists(false)
            }
                // setLinkExists( result.data.message)
                setChecking(false)
        }).catch(err => {
            console.log(err, "ERROR");
            setLinkExists(err)
            setChecking(false)
        })
    }

    
  const debounce = (func) => {
    let timer;
    return function (...args) {
      const context = this;
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        func.apply(context, args);
      }, 800);
    };
  };

  const optimizedFnCheckUrl = useCallback(debounce((url)=> check_url(url) ), []);




  return (
<div>{!checking ? <div style={{fontSize: "12px"}}>{linkExists ? <p style={{fontSize: "12px", color: "red"}}>{linkExists} <a href={`${link}`} target="_BLANK" rel="noopener noreferrer">click here to view</a></p> : <p style={{fontSize: "12px", color: "green"}}> Valid Link   </p>}</div> : <>Checking...</>}</div>
  )
}

export default CheckLink