import './Search.css'
import { useLocation } from 'react-router-dom'
import { useFetch } from '../../hooks/useFetch'
import { RecipeList } from '../../Components/RecipeList'
export const Search = ()=>{
  const string = useLocation().search
  const paramas = new URLSearchParams(string)
  const query = paramas.get('q')  
  const url = 'http://localhost:3000/recipes?q='+ query
  const {data,error,pending} = useFetch(url)
  return(
    <div>
      
      <h2 className="page-title">Recipes including "{query}"</h2>
      {pending && <p className='loading'>loading...</p> }
      {error && <p className='error'>{error}</p>}
      {data && <RecipeList recipes={data}/>}
    </div>
  )
}