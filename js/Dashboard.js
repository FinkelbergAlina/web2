import ToDoWidget from './ToDoWidget.js';
import QuoteWidget from './QuoteWidget.js';
import WeatherWidget from './WeatherWidget.js';

export default class Dashboard {
  constructor(containerSelector) {
    this.container = document.querySelector(containerSelector);
    this.widgets = new Map();
  }

  addWidget(type) {
    const baseConfig = {
      id: `${type}-${Date.now()}-${Math.random().toString(16).slice(2)}`,
      onDestroy: (id) => this.removeWidget(id)
    };

    let widget;
    if (type === 'todo') {
      widget = new ToDoWidget(baseConfig);
    } else if (type === 'quote') {
      widget = new QuoteWidget(baseConfig);
    } else if (type === 'weather') {
      widget = new WeatherWidget(baseConfig);
    } else {
      console.warn('Неизвестный тип виджета', type);
      return;
    }

    this.widgets.set(widget.id, widget);
    const dom = widget.render();
    this.container.appendChild(dom);
  }

  removeWidget(id) {
    this.widgets.delete(id);
  }
}

