import './Recipe.css'
import { useParams } from 'react-router-dom'
import { projectFirestore } from '../../firebase/config'
import { useTheme } from '../../hooks/useTheme'
import { useState } from 'react'
import { useEffect } from 'react'
export const Recipe = ()=>{
  const {id} = useParams()
  const {mode}= useTheme()
  const [data,setData] = useState(null)
  const [error,setError] = useState(false)
  const [pending,setPending] = useState(false)

  useEffect(()=>{
    setPending(true)
    const unsub=projectFirestore.collection('shapati').doc(id).onSnapshot((doc)=>{
      if(doc.exists){
        setData(doc.data())
        setPending(false)
      }else{
        setError('couldnt get recipe')
        setPending(false)
      }
    })

    return ()=> unsub()
  },[id])

  const handleClick = ()=>{
    projectFirestore.collection('shapati').doc(id).update({
        title:'something'
    })
  }


  return(

    <div className={`recipe ${mode}`} >
      {pending && <p className='loading'>loading...</p>}
      {error && <p className='error'>error</p>}
      {data && (
        <div key={id}>
          <h2 className="page-title">{data.title}</h2>
          <p>Takes {data.cookingTime} to cook</p>
          <ul>
            {data.ingredients.map((ing)=>(
              <li key={ing} >{ing}</li>
            ))}
          </ul>
          <p className='method'>{data.method}</p>
          <button onClick={handleClick}>Update me</button>
        </div>
      )}
    </div>
  )
}