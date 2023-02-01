import {Routes, Route} from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import BibliotecLoscal from './pages/bibliotecaLocal/BibliotecLoscal';
import Home from './pages/Home/Home';
import Likes from './pages/likes/Likes';

function App() {

  return (
    <div>
      <NavBar />
    <Routes>
      <Route path='/' element={<Home />}/>
      <Route path='/local' element={<BibliotecLoscal />}/>
      <Route path='/like' element={<Likes />}/>
    </Routes>
    </ div>
  )
}

export default App
