import AllContacts from './pages/allContacts';

import './styles/allContacts.scss'

import { BrowserRouter, Routes, Route } from "react-router-dom"


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route index element={<AllContacts/>}></Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
