import UIComponent from './UIComponent.js';

export default class QuoteWidget extends UIComponent {
  constructor(config = {}) {
    super({ ...config, title: 'Случайная цитата' });

    // локальный запас на случай, если API отвалится
    this.fallbackQuotes = [
      { content: 'Жизнь — это 10% того, что с нами происходит, и 90% того, как мы на это реагируем.', author: 'Ч. Суиндолл' },
      { content: 'Не обязательно быть великим, чтобы начать, но нужно начать, чтобы стать великим.', author: 'З. Зиглар' },
      { content: 'Сегодняшние усилия — завтрашний результат.', author: 'Неизвестный автор' },
      { content: 'Лучшее время посадить дерево было 20 лет назад. Следующее лучшее время — сейчас.', author: 'Китайская пословица' }
    ];

    this.isLoading = false;
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  render() {
    const wrapper = super.render();
    const body = this.body;

    this.textEl = document.createElement('p');
    this.textEl.classList.add('quote__text');

    this.authorEl = document.createElement('p');
    this.authorEl.classList.add('quote__author');

    this.btn = document.createElement('button');
    this.btn.textContent = 'Обновить цитату';
    this.btn.classList.add('secondary-btn');

    body.appendChild(this.textEl);
    body.appendChild(this.authorEl);
    body.appendChild(this.btn);

    this.btn.addEventListener('click', this.handleUpdate);
    this.handleUpdate();

    return wrapper;
  }

  async handleUpdate() {
    if (this.isLoading) return;
    this.isLoading = true;
    this.btn.disabled = true;
    this.btn.textContent = 'Загрузка...';

    try {
      const res = await fetch('https://api.quotable.io/random');
      if (!res.ok) {
        throw new Error('Bad status: ' + res.status);
      }
      const data = await res.json();

      this.textEl.textContent = `“${data.content}”`;
      this.authorEl.textContent = data.author ? `— ${data.author}` : '';
    } catch (e) {
      // если API не сработало — берём локальную цитату
      const q = this.fallbackQuotes[
        Math.floor(Math.random() * this.fallbackQuotes.length)
      ];
      this.textEl.textContent = `“${q.content}”`;
      this.authorEl.textContent = q.author ? `— ${q.author}` : '';
    } finally {
      this.isLoading = false;
      this.btn.disabled = false;
      this.btn.textContent = 'Обновить цитату';
    }
  }

  removeListeners() {
    if (this.btn) {
      this.btn.removeEventListener('click', this.handleUpdate);
    }
  }
}
