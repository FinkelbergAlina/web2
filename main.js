import Dashboard from './js/Dashboard.js';

const dashboard = new Dashboard('#dashboard');

const addTodoBtn = document.getElementById('addTodoBtn');
const addQuoteBtn = document.getElementById('addQuoteBtn');
const addWeatherBtn = document.getElementById('addWeatherBtn');

addTodoBtn.addEventListener('click', () => {
  dashboard.addWidget('todo');
});

addQuoteBtn.addEventListener('click', () => {
  dashboard.addWidget('quote');
});

addWeatherBtn.addEventListener('click', () => {
  dashboard.addWidget('weather');
});

// стартовые виджеты
dashboard.addWidget('todo');
dashboard.addWidget('quote');
dashboard.addWidget('weather');
