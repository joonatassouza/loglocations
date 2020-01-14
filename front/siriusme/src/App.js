import React, { useState, useEffect } from 'react';
import io from "socket.io-client";

import { Container } from './styles';

function App() {
  const [locations, setLocations] = useState([]);
  const [url, setUrl] = useState(localStorage.getItem('siriusme_locations'));
  const [logUrl, setLogUrl] = useState(localStorage.getItem('siriusme_locations'));

  useEffect(() => {
    async function loadLocations() {
      try {
        const response = await fetch(logUrl + '/allLogs', { method: 'GET' });

        const data = await response.json();

        setLocations(data);
      } catch (err) {
        console.error(err.message);
      }

      registerToSocket();
    }

    if (logUrl) {
      loadLocations();
    }
  }, [logUrl]);

  function registerToSocket() {
    const socket = io(logUrl);

    socket.on('location', newLocation =>
      setLocations(prevLocations => [newLocation, ...prevLocations])
    );

    socket.on('clearlocation', () =>
      setLocations([])
    );
  };

  return (
    <Container>
      <h3>Localizações</h3>
      <div>
        <input type="text" value={url} onChange={({ target }) => setUrl(target.value)} />
        <button type="button" onClick={() => {
          localStorage.setItem('siriusme_locations', url);
          setLogUrl(url);
        }}>Salvar</button>
      </div>
      <ul>
        <li>
          <strong>Data</strong>
          <strong>Altitude</strong>
          <strong>Longitude</strong>
          <strong>Latitude</strong>
          <strong>Speed</strong>
          <strong>Accuracy</strong>
        </li>
        {locations.map(item => (<li key={String(item.timestamp)}>
          <span>{item.when}</span>
          <span>{item.altitude}</span>
          <span>{item.longitude}</span>
          <span>{item.latitude}</span>
          <span>{item.speed}</span>
          <span>{item.accuracy}</span>
        </li>))}
      </ul>
    </Container>
  );
}

export default App;
