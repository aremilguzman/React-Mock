import { BrowserRouter, Routes, Route} from 'react-router-dom';
import "bootstrap/dist/js/bootstrap.bundle.min";
import Navbar from './components/Navbar';
import Client from './components/Client';
import ClientEdit from './components/ClientEdit';
import Products from './components/Products';
import ProductEdit from './components/ProductEdit';
import Profile from './components/Profile';
import ProfileEdit from './components/ProfileEdit';
import Home from './components/Home';

function App() {
  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/clientes' element={<Client/>}></Route>
        <Route path='/client/:id' element={<ClientEdit/>}></Route>
        <Route path='/productos' element={<Products/>}></Route>
        <Route path='/product/:sku' element={<ProductEdit/>}></Route>
        <Route path='/perfiles' element={<Profile/>}></Route>
        <Route path='/profile/:id' element={<ProfileEdit/>}></Route>
      </Routes>
    </BrowserRouter>
        
    
  );
}

export default App;
