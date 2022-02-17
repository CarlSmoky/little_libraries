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
import ImageDownloadTest from './components/ImageDownloadTest';

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
        <Route path ="/login" element={<Login />}/>
        <Route path ="/test" element={<ImageLoadTest />}/>
        <Route path ="/download" element={<ImageDownloadTest />}/>
      </Routes>
    </BrowserRouter>
  </div >
  );
}
