import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [dogData, setDogData] = useState(null);
  const [banList, setBanList] = useState([]);
  const [history, setHistory] = useState([]);
  const [message, setMessage] = useState('');

  const fetchDogData = async () => {
    const response = await fetch('https://api.thedogapi.com/v1/images/search', {
      headers: {
        'x-api-key': 'live_eQEs3Roko72fS0e9pTYcMnRDuBjignSdRgY1KvlSskZQNJB5WVCMCciFi2t7DSQi',
      },
    });
    const data = await response.json();
    const newDog = data[0];

    if (!banList.includes(newDog.breeds[0]?.name)) {
      setDogData(newDog);
      setHistory([...history, newDog]);
      setMessage('');
    } else {
      fetchDogData();
    }
  };

  const handleBanList = (breed) => {
    if (!banList.includes(breed)) {
      setBanList([...banList, breed]);
      setMessage(`Banned: ${breed}`);
    }
  };

  useEffect(() => {
    fetchDogData();
  }, []);

  return (
    <div className="container">
      <div className="sidebar">
        <h2>Ban List</h2>
        <ul>
          {banList.map((breed, index) => (
            <li key={index}>{breed}</li>
          ))}
        </ul>
        <h2>History</h2>
        <ul>
          {history.map((dog, index) => (
            <li key={index}>{dog.breeds[0]?.name || 'Unknown'}</li>
          ))}
        </ul>
      </div>
      <div className="main-content">
        <h1>Discover Dogs!</h1>
        {dogData && (
          <div className="dog-info">
            <img src={dogData.url} alt="Dog" />
            <p>Breed: {dogData.breeds[0]?.name || 'Unknown'}</p>
            <p>Height: {dogData.breeds[0]?.height?.metric} cm</p>
            <p>Weight: {dogData.breeds[0]?.weight?.metric} kg</p>
            <button onClick={() => handleBanList(dogData.breeds[0]?.name)}>Ban this breed</button>
            <button onClick={fetchDogData}>Get New Dog</button>
          </div>
        )}
        {message && <p>{message}</p>}
      </div>
    </div>
  );
}

export default App;
