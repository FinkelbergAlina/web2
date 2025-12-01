import UIComponent from './UIComponent.js';

export default class ToDoWidget extends UIComponent {
  constructor(config = {}) {
    super({ ...config, title: 'Список дел' });
    this.tasks = [];
    this.handleAdd = this.handleAdd.bind(this);
  }

  render() {
    const wrapper = super.render();
    const body = this.body;

    const form = document.createElement('div');
    form.classList.add('todo__form');

    this.input = document.createElement('input');
    this.input.type = 'text';
    this.input.placeholder = 'Новая задача...';
    this.input.classList.add('todo__input');

    this.addBtn = document.createElement('button');
    this.addBtn.textContent = 'Добавить';
    this.addBtn.classList.add('primary-btn');

    form.appendChild(this.input);
    form.appendChild(this.addBtn);

    this.list = document.createElement('ul');
    this.list.classList.add('todo__list');

    body.appendChild(form);
    body.appendChild(this.list);

    this.addBtn.addEventListener('click', this.handleAdd);
    this.input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') this.handleAdd();
    });

    return wrapper;
  }

  handleAdd() {
    const text = this.input.value.trim();
    if (!text) return;

    const task = { id: Date.now(), text, done: false };
    this.tasks.push(task);
    this.input.value = '';
    this.renderTasks();
  }

  toggleTask(id) {
    const task = this.tasks.find(t => t.id === id);
    if (task) {
      task.done = !task.done;
      this.renderTasks();
    }
  }

  deleteTask(id) {
    this.tasks = this.tasks.filter(t => t.id !== id);
    this.renderTasks();
  }

  renderTasks() {
    this.list.innerHTML = '';
    this.tasks.forEach(task => {
      const li = document.createElement('li');
      li.classList.add('todo__item');
      if (task.done) li.classList.add('todo__item--done');

      const label = document.createElement('span');
      label.textContent = task.text;
      label.addEventListener('click', () => this.toggleTask(task.id));

      const delBtn = document.createElement('button');
      delBtn.textContent = '×';
      delBtn.classList.add('todo__delete');
      delBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.deleteTask(task.id);
      });

      li.appendChild(label);
      li.appendChild(delBtn);
      this.list.appendChild(li);
    });
  }

  removeListeners() {
    if (this.addBtn) {
      this.addBtn.removeEventListener('click', this.handleAdd);
    }
  }
}
