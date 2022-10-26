import {useState, useEffect} from 'react'
import axios from 'axios'

const Country = ({theCountry}) => {
  const [weather, setWeather] = useState({})
  const api_key = process.env.REACT_APP_API_KEY

  useEffect(() => {
    axios
    .get(`http://api.openweathermap.org/geo/1.0/direct?q=${theCountry.capital}&appid=${api_key}`)
    .then(response => {
      weatherAPI(response.data[0].lat, response.data[0].lon)
    })
  },[])

  
  const weatherAPI = (lat, lon) => {
    axios
    .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`)
    .then(response => {
      setWeather(response.data)
    })
  }

  if (Object.getOwnPropertyNames(weather).length !== 0) {
    return (
      <div>
        <h2>{theCountry.name.common}</h2>
        <p>capital: {theCountry.capital}</p>
        <p>area: {theCountry.area}</p>
        <h3>languages: </h3>
        <ul>
          {Object.values(theCountry.languages).map(language => <li key={language}>{language}</li>)}
        </ul>
        <img src={theCountry.flags.svg} alt="flag not found"/>
        <h3>Weather in {theCountry.capital}</h3>
        <p>temperature: {weather.main.temp} Celcius</p>
        <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="icon not found" />
        <p>wind: {weather.wind.speed} m/s</p>
      </div>
    )
  } else {
    return (
      <div>
        <h2>{theCountry.name.common}</h2>
        <p>capital: {theCountry.capital}</p>
        <p>area: {theCountry.area}</p>
        <h3>languages: </h3>
        <ul>
          {Object.values(theCountry.languages).map(language => <li key={language}>{language}</li>)}
        </ul>
        <img src={theCountry.flags.svg} alt="flag not found"/>
        <h3>Weather in {theCountry.capital}</h3>
      </div>
    )
  }
}

const App = () =>{ 
  const [countries, setCountries] = useState([])
  const [pattern, setPattern] = useState('')

  useEffect(() => {
    console.log('effect');
    axios
    .get('https://restcountries.com/v3.1/all')
    .then(response => {
      console.log('promise fulfilled')
      setCountries(response.data)
    })
  },[])
  // console.log('render', countries.length, 'countries')

  const countriesToShow = countries.filter(country => country.name.common.toLowerCase().startsWith(pattern.toLowerCase()))

  const handleChange = (e) => {
    setPattern(e.target.value)
  }
  
  if (countriesToShow.length === 1) {
    const theCountry = countriesToShow[0]
    return (
      <div>
        find countries: <input onChange={handleChange} value={pattern} /> 
        <Country theCountry={theCountry} />
      </div>
    )
  } else {
      return (
        <div>
          find countries: <input onChange={handleChange} value={pattern} /> 
          <ul>
            {countriesToShow.map((country, i) => 
            <li key={country.name.common}>
              {country.name.common} 
              <button onClick={() => setPattern(country.name.common.toLowerCase())}>show</button>
            </li>)}
          </ul>
        </div>
      );
    }
}

export default App