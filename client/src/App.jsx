import './App.css';
import { BrowserRouter } from 'react-router-dom';
// import useApplicationData from './hooks/useApplicationData';
import Home from './components/Home';
import TopNav from './components/TopNav';
import 'bootstrap/dist/css/bootstrap.min.css';
// import SignUp from './components/SignUp';
// import Login from './components/Login';
import Map from './components/Map';

export default function App() {
  
  return (<div className="App" >
    <TopNav />
    <Home />
    {/* <SignUp /> */}
    {/* <Login /> */}
    <Map />
  </div >
  );
}
