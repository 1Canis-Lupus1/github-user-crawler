import './App.css';
import "bootstrap/dist/css/bootstrap.css";
import 'font-awesome/css/font-awesome.min.css';
 import 'react-toastify/dist/ReactToastify.css';
import SearchBar from './components/SearchBar';
import DisplayTable from './components/DisplayTable';
import Copyright from './components/Copyright';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <span className="badge bg-info">Github User Crawler</span>
      </header>
      <SearchBar />
      <hr/>
      <DisplayTable/>
      <hr />
      <Copyright />
    </div>
  );
}

export default App;
