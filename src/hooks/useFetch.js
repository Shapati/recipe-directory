import {useState, useEffect} from 'react'

export const  useFetch = (url, method='GET') =>{

  const [data,setData] = useState(null)
  const [error,setError] = useState(null)
  const [pending,setPending] = useState(null)
  const [option,setOption] = useState(null)
  
 


  const postData = (postData) =>{
    
    setOption({
      method:"POST",
      headers:{"Content-Type" : "application/json"},
      body: JSON.stringify(postData)
    })

  }
  useEffect(()=>{
    const controller = new AbortController()
    const getData = async (dataoptions) =>{
      setPending(true)
      try{
        const endpoint= await fetch(url,{...dataoptions,signal:controller.signal})
        if(!endpoint.ok){
          throw new Error (endpoint.statusText)
        }
        const response= await endpoint.json()
       
       

        setPending(false)
        setData(response)
        setError(null)
      }
      catch(err){
        if(err.name === 'AbortError'){
          console.log('this request was aborted')
        }
        else{
          setPending(false)
          setError('couldnt fetch data')
        }
      }
    }  

    if(method === 'GET'){
      getData() 
    }
    if(method === 'POST' && option){
      getData(option)
    }
  
    return ()=>{
      controller.abort()
    }

   


  },[url,method,option])

  


  return {data,error,pending,postData}
}



































// export const useFetch = ( url,method='GET' ) =>{

//   const [data,setData] = useState(null)
//   const [error,setError] = useState(null)
//   const [pending,setPending]=useState(null)
//   const [options,setOptions] = useState(null)

//   const postData=(postData)=>{
//      setOptions({
//        method:'POST',
//        headers:{
//          "content-type":"application/json"
//        },
//        body: JSON.stringify(postData)
//      })
//   }

//   useEffect(()=>{
//     const controller = new AbortController()

//     const getData =  async (fetchOptions) =>{

//       setPending(true)
//       try{
        
//         const res = await fetch(url, {...fetchOptions,signal: controller.signal})
//         if(!res.ok){
//           throw new Error(res.statusText)
//         }
//         const endpoint  = await res.json()

//         setPending(false)
//         setData(endpoint)
//         setError(null)
//       } catch(err){
//         if(err.name === "AbortError"){
//           console.log('the fetch was aborted')
//         }else{
//           setPending(false)
//           setError('could not fetch the data')
//           console.log(err.message)
//         }
        
//       }
      
//     }

   

//     if(method === "GET"){
//       getData()
//     }
//     if(method === "POST" && options ){
//       getData(options)
//     }

//     return ()=>{
//       controller.abort()
//     }

//   },[url,method,options])

//   return{data, pending , error,postData}
// }
