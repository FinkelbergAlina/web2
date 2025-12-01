export default class UIComponent {
  constructor(config = {}) {
    this.id = config.id || `comp-${Date.now()}-${Math.random().toString(16).slice(2)}`;
    this.title = config.title || 'Виджет';
    this.container = null;
    this.body = null;
    this.onDestroy = config.onDestroy || null;
  }

  render() {
    const wrapper = document.createElement('section');
    wrapper.classList.add('widget');
    wrapper.dataset.id = this.id;

    const header = document.createElement('header');
    header.classList.add('widget__header');

    const titleEl = document.createElement('h2');
    titleEl.classList.add('widget__title');
    titleEl.textContent = this.title;

    const controls = document.createElement('div');
    controls.classList.add('widget__controls');

    const minimizeBtn = document.createElement('button');
    minimizeBtn.classList.add('widget__btn', 'widget__btn--minimize');
    minimizeBtn.textContent = '–';

    const closeBtn = document.createElement('button');
    closeBtn.classList.add('widget__btn', 'widget__btn--close');
    closeBtn.textContent = '×';

    controls.appendChild(minimizeBtn);
    controls.appendChild(closeBtn);
    header.appendChild(titleEl);
    header.appendChild(controls);

    const body = document.createElement('div');
    body.classList.add('widget__body');

    minimizeBtn.addEventListener('click', () => {
      body.classList.toggle('widget__body--hidden');
    });

    closeBtn.addEventListener('click', () => {
      this.destroy();
    });

    wrapper.appendChild(header);
    wrapper.appendChild(body);

    this.container = wrapper;
    this.body = body;

    return wrapper;
  }

  destroy() {
    this.removeListeners();
    if (this.container && this.container.parentNode) {
      this.container.parentNode.removeChild(this.container);
    }
    if (typeof this.onDestroy === 'function') {
      this.onDestroy(this.id);
    }
  }

  removeListeners() {
    // для переопределения в наследниках
  }
}
