console.log('Im working!');

const weather = (() => {
  const get = async (city) => {
    try {
      const response = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=e290d15f65b895567dadbd2eb6fd873f`
      );
      const data = await response.json();

      let weatherData = {
        name: data.name,
        temp: data.main.temp,
        country: data.sys.country,
        weather: data.weather[0].description,
      };

      return weatherData;
    } catch (err) {
      console.log(err.name);
    }
  };

  const show = async (city) => {
    if (city === '') {
      return;
    }
    console.log(await get(city));
  };

  return {
    show,
  };
})();

const display = (() => {
  const cityName = document.querySelector('#cityName');
  const button = document.querySelector('#getButton');

  const load = async () => {
    button.addEventListener('click', async () => {
      weather.show(cityName.value);
    });
  };

  return {
    load,
  };
})();

(() => {
  display.load();
  weather.show('mandaluyong');
})();
