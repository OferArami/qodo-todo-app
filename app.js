const form = document.getElementById('todo-form');
const input = document.getElementById('task-input');
const list = document.getElementById('todo-list');
const errorMessage = document.getElementById('error-message');

function normalizeTaskText(text) {
  return text.trim().toLowerCase();
}

function getTasksFromStorage() {
  const data = localStorage.getItem('todo-list');
  return data ? JSON.parse(data) : [];
}

function saveTasksToStorage(tasks) {
  localStorage.setItem('todo-list', JSON.stringify(tasks));
}

function taskExists(taskText) {
  const normalized = normalizeTaskText(taskText);
  const tasks = document.querySelectorAll('.task-text');
  for (let task of tasks) {
    if (normalizeTaskText(task.textContent) === normalized) {
      return true;
    }
  }
  return false;
}

function createTaskElement(taskText, completed = false) {
  const li = document.createElement('li');
  const span = document.createElement('span');
  span.className = 'task-text';
  span.textContent = taskText;
  if (completed) {
    span.classList.add('completed');
  }

  const actions = document.createElement('div');
  actions.className = 'actions';

  const completeBtn = document.createElement('button');
  completeBtn.textContent = 'Complete';
  completeBtn.className = 'complete';
  completeBtn.onclick = function () {
    span.classList.toggle('completed');
    updateStorageFromDOM();
  };

  const removeBtn = document.createElement('button');
  removeBtn.textContent = 'Remove';
  removeBtn.className = 'remove';
  removeBtn.onclick = function () {
    li.remove();
    updateStorageFromDOM();
  };

  actions.appendChild(completeBtn);
  actions.appendChild(removeBtn);
  li.appendChild(span);
  li.appendChild(actions);
  return li;
}

function updateStorageFromDOM() {
  const tasks = [];
  document.querySelectorAll('#todo-list li').forEach((li) => {
    const text = li.querySelector('.task-text').textContent;
    const completed = li
      .querySelector('.task-text')
      .classList.contains('completed');
    tasks.push({ text, completed });
  });
  saveTasksToStorage(tasks);
}

function loadTasks() {
  const tasks = getTasksFromStorage();
  list.innerHTML = '';
  tasks.forEach((task) => {
    const taskEl = createTaskElement(task.text, task.completed);
    list.appendChild(taskEl);
  });
}

form.onsubmit = function (e) {
  e.preventDefault();
  errorMessage.textContent = '';
  const taskText = input.value.trim();
  if (!taskText) {
    errorMessage.textContent = 'Task cannot be empty.';
    return;
  }
  if (taskExists(taskText)) {
    errorMessage.textContent = 'This task already exists!';
    return;
  }
  const taskEl = createTaskElement(taskText, false);
  list.appendChild(taskEl);
  updateStorageFromDOM();
  input.value = '';
  input.focus();
};

window.addEventListener('DOMContentLoaded', loadTasks);