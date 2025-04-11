import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';
import '../style/style.css';

const CityCardComponent = ({ city }) => {
  const navigate = useNavigate();
  const [weatherData, setWeatherData] = useState(null);
  const [imageData, setImageData] = useState(null);
  const [error, setError] = useState(null);

  const weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=183ac8aac88d6a36a75eede2e74649e0`;
  const pexelsURL = `https://api.pexels.com/v1/search?query=${city}&per_page=1`;

  useEffect(() => {
    fetch(weatherURL)
      .then(response => {
        if (!response.ok) {
          throw new Error('Errore nel recupero dei dati meteo');
        }
        return response.json();
      })
      .then(data => {
        setWeatherData(data);
      })
      .catch(error => {
        console.error('Errore:', error);
        setError(error.message);
      });

    fetch(pexelsURL, {
      headers: {
        Authorization: 'zzrNmOeCU1D9qEcZKctKkA6GHJ713PhGezM10xG9I1uNpM9gcCaysZOL',
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Errore nel recupero dell\'immagine');
        }
        return response.json();
      })
      .then(data => {
        setImageData(data.photos[0]);
      })
      .catch(error => {
        console.error('Errore:', error);
        setError(error.message);
      });

  }, [city]);

  if (error) {
    return <p>Errore: {error}</p>;
  }

  if (!weatherData || !imageData) {
    return <p>Caricamento...</p>;
  }

  const { main, weather, wind } = weatherData;
  const temperature = (main.temp - 273.15).toFixed(1);

  const handleDetailsClick = () => {
    navigate(`/weather/${city}`);
  };

  return (
    <Card className='mx-3 w-100 shadow bg-m-white my-3'>
      <Card.Body className='d-flex flex-column align-items-center justify-content-center'>
        <Card.Img variant="top" src={imageData.src.landscape} alt={city} onClick={handleDetailsClick} className='cityImg shadow'/> 
        <Card.Title className=''>{city}</Card.Title>
        <Card.Text>
          <strong>Temperatura:</strong> {temperature}°C
        </Card.Text>
        <Card.Text>
          <strong>Condizione:</strong> {weather[0].description}
        </Card.Text>
        <Card.Text>
          <strong>Umidità:</strong> {main.humidity}%
        </Card.Text>
        <Card.Text>
          <strong>Vento:</strong> {wind.speed} m/s
        </Card.Text>
        <Button onClick={handleDetailsClick} className='bg-m-secondary'>Dettagli Sul Meteo</Button>
      </Card.Body>
    </Card>
  );
};

export default CityCardComponent;
