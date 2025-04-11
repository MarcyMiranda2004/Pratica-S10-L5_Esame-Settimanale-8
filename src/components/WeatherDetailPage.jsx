import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Row, Col, Spinner } from 'react-bootstrap';
import '../style/style.css';
import '../style/details.css';

const WeatherDetailPage = () => {
  const { city } = useParams();
  const [forecastData, setForecastData] = useState(null);
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);

  const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=183ac8aac88d6a36a75eede2e74649e0`;
  const pexelsURL = `https://api.pexels.com/v1/search?query=${city}&per_page=15`;

  useEffect(() => {
    fetch(forecastURL)
      .then(res => {
        if (!res.ok) throw new Error('Errore nel recupero delle previsioni meteo');
        return res.json();
      })
      .then(data => {
        setForecastData(data);
        return fetch(pexelsURL, {
          headers: {
            Authorization: 'zzrNmOeCU1D9qEcZKctKkA6GHJ713PhGezM10xG9I1uNpM9gcCaysZOL',
          },
        });
      })
      .then(res => {
        if (!res.ok) throw new Error('Errore nel recupero delle immagini');
        return res.json();
      })
      .then(data => {
        setImages(data.photos.map(photo => photo.src.landscape));
      })
      .catch(err => {
        setError(err.message);
      });
  }, [city]);

  if (error) return <p>Errore: {error}</p>;
  if (!forecastData) return <div className="text-center mt-5"><Spinner animation="border" variant="primary" /></div>;

  return (
    <div className="mt-4 carouselContainer d-flex flex-column justify-content-center">
          <h1 className='text-m-warning mb-3 ms-5 pb-1 ps-3 border-3 border-bottom border-white w-25'>Il Meteo di { city }</h1>
      <Row>
        {forecastData.list.slice(0, 15).map((item, idx) => (
          <Col key={idx} xs={12} sm={6} md={4} lg={3} className="mb-4">
            <div
              className="weather-card text-white d-flex flex-column justify-content-end p-3 rounded shadow"
              style={{ backgroundImage: `url(${images[idx] || ''})` }}>
              <div className="card-overlay p-2">
                <div className='d-flex justify-content-between align-items-center'>
                  <div>
                    <h6><strong className='text-m-info'>{new Date(item.dt * 1000).toLocaleString()}</strong></h6>
                    <p className='text-m-white'><strong className='text-m-white'>Temp Media:</strong> {(item.main.temp - 273.15).toFixed(1)}°C</p>
                    <p className='text-m-white'><strong className='text-m-white'>Condizioni:</strong> {item.weather[0].description}</p>
                    <p className='text-m-white'><strong className='text-m-white'>Vento:</strong> {item.wind.speed} m/s</p>
                    <p className='text-m-white'><strong className='text-m-white'>Umidità:</strong> {item.main.humidity}%</p>
                  </div>
                  <div>
                    <img
                      src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                      alt={item.weather[0].description}
                      className="weather-icon" />
                  </div>
                </div>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default WeatherDetailPage;
