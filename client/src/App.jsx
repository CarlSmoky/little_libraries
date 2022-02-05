import './App.css';
// import useApplicationData from './hooks/useApplicationData';
import Home from './components/Home';
import TopNav from './components/TopNav';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function App() {
  
  return (<div className="App" >
    <TopNav />
    <Home />
  </div >
  );
}
