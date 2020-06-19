console.log('Im working!');

const weather = (() => {
  const get = async (city) => {
    // if city name is blank return
    if (city === '') {
      return;
    }
    // get weather JSON rom openweather API
    try {
      const response = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=e290d15f65b895567dadbd2eb6fd873f`
      );
      const data = await response.json();

      // only return the required fields
      let weatherData = {
        name: data.name,
        temp: data.main.temp,
        country: data.sys.country,
        weather: data.weather[0].description,
      };

      return weatherData;
    } catch (err) {
      // if theres an error / display an error
      display.showError();
    }
  };

  return {
    get,
  };
})();

const display = (() => {
  const cityName = document.querySelector('#cityName');
  const button = document.querySelector('#getButton');

  const results = document.querySelector('.results');
  const city = document.querySelector('.city');
  const country = document.querySelector('.country');
  const temp = document.querySelector('.temp');
  const desc = document.querySelector('.description');

  // edit elements' innerHTML to display weather
  const show = async () => {
    // get weather from weather module passing input value
    let weatherData = await weather.get(cityName.value);
    console.log(weatherData);

    city.innerHTML = weatherData.name;
    country.innerHTML = weatherData.country;
    temp.innerHTML = weatherData.temp + '° C';

    // uppercase first letter
    let tempDesc =
      weatherData.weather.charAt(0).toUpperCase() +
      weatherData.weather.slice(1);

    desc.innerHTML = tempDesc;

    results.classList.remove('hide');
  };

  // shows an error
  const showError = () => {
    let img = document.createElement('img');
    img.src = './sad.png';
    // placeholder
    city.appendChild(img);
    desc.innerHTML = 'Error! Double check city name.';
    results.classList.remove('hide');
  };

  // load events
  const render = async () => {
    button.addEventListener('click', show);
  };

  return {
    render,
    showError,
  };
})();

(() => {
  display.render();
})();
