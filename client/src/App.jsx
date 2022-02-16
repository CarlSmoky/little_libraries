import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import useApplicationData from './hooks/useApplicationData';
import Home from './components/Home';
import TopNav from './components/TopNav';
import 'bootstrap/dist/css/bootstrap.min.css';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Map from './components/Map';
import ImageLoadTest from './components/ImageLoadTest';

export default function App() {

  return (<div className="App" >
    <BrowserRouter>
      <TopNav />
      <Home />
      {/* <SignUp /> */}
      {/* <Login /> */}
      <Routes>
        <Route path ="/" element={<Map />}/>
        <Route path ="/signup" element={<SignUp />}/>
        <Route path ="/test" element={<ImageLoadTest />}/>
      </Routes>
    </BrowserRouter>
  </div >
  );
}
