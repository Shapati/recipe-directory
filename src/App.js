import { BrowserRouter as Router } from 'react-router-dom';
import { Route,Routes } from 'react-router-dom';
import './App.css';
import { Navbar } from './Components/Navbar';
import ThemeSelector from './Components/ThemeSelector';
import { useTheme } from './hooks/useTheme';
import { Create } from './pages/create/Create';
import { Home } from './pages/home/Home';
import { Recipe } from './pages/recipe/Recipe';
import { Search } from './pages/search/Search';

function App() {
  const {mode} = useTheme()
  return (
    <div className={`App ${mode}`}>
     <Router>
       <Navbar />
       <ThemeSelector />
       <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path='/create' element={<Create />} />
          <Route path='/search' element={<Search />} />
          <Route path='/recipe/:id' element={<Recipe />} />
       </Routes>
     </Router>
    </div>
  );
}

export default App;
