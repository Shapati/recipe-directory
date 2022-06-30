import './Home.css'
import { projectFirestore } from '../../firebase/config'
import { useState } from 'react'
import { RecipeList } from '../../Components/RecipeList'
import img from '../../Components/preloader.gif'
import { useEffect } from 'react'
export const Home = ()=>{
  const [data,setData] = useState(null)
  const [error,setError] = useState(false)
  const [pending,setPending] = useState(false)
 
  useEffect(()=>{
    setPending(true)
    const unsub=projectFirestore.collection('shapati').onSnapshot((snapshot)=>{
      if(snapshot.empty){
        setError('couldnt load data')
        setPending(false)
      }else{
        console.log('conneted to firestore databse')
        let result = []
        snapshot.docs.forEach((doc)=>{
          result.push({id:doc.id,...doc.data()})
        })
        setData(result)
        setPending(false)
      }
    },(err)=>{
      setError(err.message)
      setPending(false)
    })

    return ()=> unsub()
    
  },[])

  
  

  return(
    <div className='home'>
      {pending && <p>loading...</p> }
   
      {error && (<div><p className='error'>{error}</p> <img src={img} alt="" /> </div> ) }
      
      {data && <RecipeList recipes={data} /> }
    </div>
  )
}