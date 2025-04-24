const todoForm = document.getElementById('todo-form');
const taskList = document.getElementById('task-list');
const itemInput = document.getElementById('item-input');
const filterButtons = document.querySelectorAll('.filter-button'); // Select all filter buttons

let todoItems = [];

// Load tasks from localStorage on page load
window.addEventListener('DOMContentLoaded', loadFromLocalStorage);

// Add new item
todoForm.addEventListener('submit', function (event) {
  event.preventDefault();
  const itemText = itemInput.value.trim();
  if (itemText) {
    addTodoItem(itemText);
    itemInput.value = '';
  }
});

// ADdd task to array and localStorage
function addTodoItem(text) {
  const todoItem = {
    text: text.toLowerCase(),
    completed: false
  };
  todoItems.push(todoItem);
  saveToLocalStorage();
  renderTodoItems(todoItems); // Render all tasks by default
}

// Render tasks
function renderTodoItems(items) {
  taskList.innerHTML = '';

  items.forEach((item, index) => {
    const taskDiv = document.createElement('div');
    taskDiv.className = 'task';
    if (item.completed) taskDiv.classList.add('completed');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = item.completed;
    checkbox.addEventListener('change', () => {
      item.completed = !item.completed;
      saveToLocalStorage();
      renderTodoItems(todoItems); // Re-render tasks with updated state
    });

    const taskText = document.createElement('span');
    taskText.textContent = item.text;

    // Edit button
    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.addEventListener('click', () => editTask(index, taskText));

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => {
      todoItems.splice(index, 1);
      saveToLocalStorage();
      renderTodoItems(todoItems);
    });

    taskDiv.appendChild(checkbox);
    taskDiv.appendChild(taskText);
    taskDiv.appendChild(editBtn);
    taskDiv.appendChild(deleteBtn);

    taskList.appendChild(taskDiv);
  });
}

// Edit task function
function editTask(index, taskTextElement) {
  const newText = prompt('Edit your task:', taskTextElement.textContent);
  if (newText && newText.trim()) {
    todoItems[index].text = newText.trim();
    saveToLocalStorage();
    renderTodoItems(todoItems);
  }
}

// Filter buttons event handling
filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    const selectedFilter = button.dataset.filter; // Get filter type (all, active, completed)
    renderFilteredItems(selectedFilter);
  });
});

// Render tasks based on the selected filter
function renderFilteredItems(filter) {
  if (filter === 'all') {
    renderTodoItems(todoItems); // Render all tasks
  } else if (filter === 'active') {
    const activeItems = todoItems.filter(item => !item.completed); // Filter out completed tasks
    renderTodoItems(activeItems); // Render active tasks only
  } else if (filter === 'completed') {
    const completedItems = todoItems.filter(item => item.completed); // Filter only completed tasks
    renderTodoItems(completedItems); // Render completed tasks only
  }
}

// Save to localStorage
function saveToLocalStorage() {
  localStorage.setItem('todoItems', JSON.stringify(todoItems));
}

// Load from localStorage
function loadFromLocalStorage() {
  const data = localStorage.getItem('todoItems');
  if (data) {
    todoItems = JSON.parse(data);
    renderTodoItems(todoItems); // Render tasks after loading
  }
}
