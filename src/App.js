import logo from './logo.svg';
import './App.css';
import "bootstrap/dist/css/bootstrap.css"
import SearchBar from './components/SearchBar';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <span className="badge bg-info">Github User Crawler</span>
      </header>
      <SearchBar />
    </div>
  );
}

export default App;
