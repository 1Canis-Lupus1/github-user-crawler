import logo from './logo.svg';
import './App.css';
import "bootstrap/dist/css/bootstrap.css";
 import 'react-toastify/dist/ReactToastify.css';
import SearchBar from './components/SearchBar';
import DisplayTable from './components/DisplayTable';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <span className="badge bg-info">Github User Crawler</span>
      </header>
      <SearchBar />
      <hr/>
      <DisplayTable/>
    </div>
  );
}

export default App;
