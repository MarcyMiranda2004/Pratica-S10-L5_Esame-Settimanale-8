import './App.css'
import './style/style.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NavbarComponent from './components/NavbarComponent'
import HomeComponent from './components/HomeComponent'
import WeatherDetailPage from './components/WeatherDetailPage';
import FooterComponent from './components/FooterComponent';

function App() {
  return (
      <BrowserRouter>
        <header className='bg-m-secondary vw-100'>
          <NavbarComponent />
        </header>
        
        <main>
          <Routes>
            <Route path='/' element={<HomeComponent />} /> 
            <Route path="/weather/:city" element={<WeatherDetailPage />} />
          </Routes>
        </main>

        <footer className='bg-m-secondary vw-100'>
          <FooterComponent />
        </footer>
      </BrowserRouter>
  )
}

export default App
