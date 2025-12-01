import UIComponent from './UIComponent.js';

export default class WeatherWidget extends UIComponent {
  constructor(config = {}) {
    super({ ...config, title: 'Погода (API)' });
    this.handleSearch = this.handleSearch.bind(this);
  }

  render() {
    const wrapper = super.render();
    const body = this.body;

    const form = document.createElement('div');
    form.classList.add('weather__form');

    this.input = document.createElement('input');
    this.input.type = 'text';
    this.input.placeholder = 'Введите город (например, Moscow)';
    this.input.classList.add('weather__input');

    this.btn = document.createElement('button');
    this.btn.textContent = 'Показать погоду';
    this.btn.classList.add('primary-btn');

    form.appendChild(this.input);
    form.appendChild(this.btn);

    this.result = document.createElement('div');
    this.result.classList.add('weather__result');

    body.appendChild(form);
    body.appendChild(this.result);

    this.btn.addEventListener('click', this.handleSearch);
    this.input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') this.handleSearch();
    });

    return wrapper;
  }

  async handleSearch() {
    const city = this.input.value.trim();
    if (!city) return;

    this.result.textContent = 'Загрузка...';

    try {
      // Публичное API Open-Meteo (без ключа)
      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=ru&format=json`
      );
      const geoData = await geoRes.json();
      if (!geoData.results || !geoData.results.length) {
        this.result.textContent = 'Город не найден.';
        return;
      }

      const { latitude, longitude, name, country } = geoData.results[0];

      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&timezone=auto`
      );
      const weatherData = await weatherRes.json();

      const w = weatherData.current_weather;
      this.result.innerHTML = `
        <div class="weather__city">${name}, ${country}</div>
        <div class="weather__temp">${w.temperature} °C</div>
        <div class="weather__meta">Ветер: ${w.windspeed} км/ч</div>
      `;
    } catch (e) {
      this.result.textContent = 'Ошибка загрузки данных о погоде.';
    }
  }

  removeListeners() {
    if (this.btn) {
      this.btn.removeEventListener('click', this.handleSearch);
    }
  }
}
