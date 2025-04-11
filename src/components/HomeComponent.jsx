import React, { useState } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import CityCardComponent from './CityCardComponent';
import '../style/style.css';
import '../style/home.css';

const HomeComponent = () => {
  const [searchCity, setSearchCity] = useState('');
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchCity.trim()) {
      navigate(`/weather/${searchCity.trim()}`);
      setSearchCity('');
    }
  };

  return (
    <div className='d-flex flex-column align-items-center justify-content-between vw-100'>

      <h1 className='text-m-warning mb-3 ms-5 pb-1 ps-3 border-3 border-bottom border-white w-25 text-center mt-4'>
        🌍 In Giro Per il Mondo 🌍
      </h1>

      <Row className="justify-content-center mt-3 mx-5">
        <Col xs={12} sm={6} md={4} lg={2}><CityCardComponent city="Rome" /></Col>
        <Col xs={12} sm={6} md={4} lg={2}><CityCardComponent city="Tokyo" /></Col>
        <Col xs={12} sm={6} md={4} lg={2}><CityCardComponent city="New York" /></Col>
        <Col xs={12} sm={6} md={4} lg={2}><CityCardComponent city="Moscow" /></Col>
        <Col xs={12} sm={6} md={4} lg={2}><CityCardComponent city="Londra" /></Col>
        <Col xs={12} sm={6} md={4} lg={2}><CityCardComponent city="Dubai" /></Col>
      </Row>

      <h2 className='text-m-warning mb-3 ms-5 pb-1 ps-3 border-3 border-bottom border-white w-25 text-center mt-4'>
        🌆 Le Tue Città Preferite 🌆
      </h2>

      <Form onSubmit={handleSearchSubmit} className="mb-5">
        <Row className="justify-content-center">
          <Col xs="auto">
            <Form.Control
              type="text"
              placeholder="Che tempo fa a..."
              value={searchCity}
              onChange={(e) => setSearchCity(e.target.value)}
              className="mr-sm-2 searchCamp"
            />
          </Col>
          <Col xs="auto">
            <Button type="submit" className='bg-m-secondary'>Cerca</Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default HomeComponent;
