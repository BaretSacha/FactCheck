import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Home from './Home';
import About from './About';

function App() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [error, setError] = useState('');
    const [currentPage, setCurrentPage] = useState('home');
    const [searchHistory, setSearchHistory] = useState([]);

    useEffect(() => {
        const storedHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
        setSearchHistory(storedHistory);
    }, []);

    const handleSearch = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const response = await axios.get(`http://localhost:5000/fact-check?query=${query}`);
            console.log(response.data);
            setResults(response.data.claims || []);
            saveSearchHistory(query, response.data.claims || []);
        } catch (error) {
            console.error('Error fetching data', error);
            setError('Une erreur est survenue lors de la récupération des données.');
        }
    };

    const saveSearchHistory = (query, results) => {
        const newEntry = { query, results, date: new Date().toLocaleString() };
        const updatedHistory = [newEntry, ...searchHistory];
        setSearchHistory(updatedHistory);
        localStorage.setItem('searchHistory', JSON.stringify(updatedHistory));
    };

    const resetSearchHistory = () => {
      setSearchHistory([]);
      localStorage.removeItem('searchHistory');
  };



    const renderPage = () => {
        switch (currentPage) {
            case 'home':
                return (
                    <>
                        <Home />
                        <form onSubmit={handleSearch} className="search-form">
                            <input
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Enter a query"
                                className="search-input"
                            />
                            <button type="submit" className="search-button">Search</button>
                        </form>
                        {error && <p className="error-message">{error}</p>}
                        <div className="results-container">
                            <ul className="results-list">
                                {results.map((result, index) => (
                                    <li key={index} className="result-item">
                                        <h3>{result.text}</h3>
                                        {result.imageUrl && <img src={result.imageUrl} alt="Fact Check" className="result-image" />}
                                        <p className="rating">{result.claimReview[0].textualRating}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="history-container">
                            <h2>Search History</h2>
                            <table className="history-table">
                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Query</th>
                                        <th>Link</th>
                                        <th>Type of Source</th>
                                        <th>False or True</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {searchHistory.map((entry, index) => (
                                        <tr key={index}>
                                            <td>{entry.date}</td>
                                            <td>{entry.query}</td>
                                            <td>
                                                {entry.results[0]?.claimReview[0]?.url ? (
                                                    <a href={entry.results[0].claimReview[0].url} target="_blank" rel="noopener noreferrer">
                                                        link
                                                    </a>
                                                ) : 'N/A'}
                                            </td>
                                            <td>{entry.results[0]?.claimReview[0]?.publisher?.name || 'N/A'}</td>
                                            <td>{entry.results[0]?.claimReview[0]?.textualRating || 'N/A'}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </>
                );
            case 'about':
                return <About />;
            default:
                return <Home />;
        }
    };

    return (
        <div className="App">
            <header>
                <h1>CheckMate News</h1>
                <label className="dropdown">
                    <div className="dd-button">
                        Menu
                    </div>
                    <input type="checkbox" className="dd-input" id="test" />
                    <ul className="dd-menu">
                        <li onClick={() => setCurrentPage('home')}>Home</li>
                        <li onClick={() => setCurrentPage('about')}>About</li>
                    </ul>
                </label>
            </header>
            {renderPage()}
        </div>
    );
}

export default App;