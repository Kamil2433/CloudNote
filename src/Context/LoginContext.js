import React, { useState } from 'react'
import { useContext } from 'react'
import useLocalStoragehook from '../hooks/useLocalstorage';
import Notescontext from './NotesContext';
// import useAlertenvokefunction from '../hooks/useAlertenvoke';

const LogContext = React.createContext();





export function useLogin() {
    return useContext(LogContext);
  }

export default function LoginContext({children}) {


  
    
    async function loginauser(inputid,inputpassword){

      // const {setalert,setmessage}=Notescontext()

      try {
     const response=await fetch('https://cloudnote-backend-etc8.onrender.com/api/auth/',{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
        'Access-Control-Allow-Origin':'*'
      
      },
      body:JSON.stringify({id:inputid,password:inputpassword})
      
    });
  const res=await response.json()
  
  
    if(response.status!==400){

      setauth(res);
      getname(inputid,inputpassword,res);

     return setsucess(true);
      // useAlertenvokefunction("Login Successful")

      // setalert(true)
      // setmessage('Login Successful')
    }
      // console.log(res);
      //   console.log(r);
  
      // return response;

  } catch (error) {
        console.log(error)

  }

  }


  const getname=async(givenid,givenpassword,resp)=>{

      // console.log(auth)
            setauth(resp);

    const response=await fetch("https://cloudnote-backend-etc8.onrender.com/api/auth/getuser",{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
        'Access-Control-Allow-Origin':'*',
        'auth-token':resp,
      },
      body:JSON.stringify({id:givenid,password:givenpassword})
      
    });

      const res=await response.json()
        // console.log(res);
        setname(res.name);

        // fetchnotes()


  }



  async function reggisterauser(inputid,inputpassword,inputname){
    // const {setalert,setmessage}=Notescontext()


    try {
      
      var formdata={id:inputid,password:inputpassword,name:inputname}
  
      console.log(JSON.stringify(formdata))
  
      const response=await fetch("https://cloudnote-backend-etc8.onrender.com/api/auth/reg",{
       method:'POST',
       headers:{
         'Content-Type':'application/json',
         'Access-Control-Allow-Origin':'*'
       },
       body:JSON.stringify(formdata)
       
     });
   const res=await response.json()
  
  
  if(response.status!==400){
    // setalert(true)
    // setmessage('User Registered Succesfully')
    // Alertenvoke("Login Successful")
    // return response;
    const set=await setsucess(true);
  
  }else{
    // setalert(true)
    // // setmessage(res)
    // // Alertenvoke(res)
    // return response;
   const aw=await setsucess(false)
  
  }
  
  
   
       console.log(res);
    } catch (error) {
      
      console.log(error)

    }

   }


    const [loginid,setid]=useLocalStoragehook("id",' ');
    const [auth,setauth]=useLocalStoragehook("auth",' ');
    const [name,setname]=useLocalStoragehook("name",' ');
    const [success,setsucess]=useState(false);


  return (
    <LogContext.Provider
    value={{
         setid,loginid,loginauser,reggisterauser,auth,setauth,name,setname,success,setsucess
    }}
  >
    {children}
  </LogContext.Provider>
  )
}
