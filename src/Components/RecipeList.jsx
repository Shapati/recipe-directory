import './RecipeList.css'
import { Link } from 'react-router-dom'
import { useTheme } from '../hooks/useTheme'
import Delete from '../assets/delete.svg'
import { projectFirestore } from '../firebase/config'
export const RecipeList = ({recipes})=>{
  const {mode} = useTheme()
  if(recipes.length === 0){
    return <div className='error'>No recipes to load, click on create recipe to add a new one </div>
  }
  const handleClick=(id)=>{
    projectFirestore.collection('shapati').doc(id).delete()
  }

  return(
    <div className='recipe-list'>
      {recipes.map((recipe)=>(
        <div className={`card ${mode}`} key={recipe.id} >
          <h3>{recipe.title}</h3>
          <p>{recipe.cookingTime} to make.</p>
          <div>{recipe.method.substring(0,100)}...</div>
          <Link to={`/recipe/${recipe.id}`}>cook This</Link>
          <img 
          className='delete' 
          src={Delete} 
          onClick={()=>handleClick(recipe.id)}
          alt="" />
        </div>
      ))}
    </div>
  )
}