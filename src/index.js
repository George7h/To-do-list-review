import './style.css';
// eslint-disable-next-line
import { setupClearButton, setupTaskList } from './modules/checkbox.js';
// eslint-disable-next-line
let tasks = [];

// Function to update the indexes of tasks in the list to macth position
function updateTaskIndexes() {
  tasks.forEach((task, index) => {
    task.index = index + 1;
  });
}

// Function to save the tasks to local storage
function saveTasksToLocalStorage() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to delete a task from the list
function deleteTask(index) {
  tasks.splice(index, 1);
  updateTaskIndexes();
  saveTasksToLocalStorage();
  // eslint-disable-next-line
  populateList();
}

// Event handler for handling 'Enter' key press while editing task description
function handleDescriptionKeydown(event) {
  if (event.key === 'Enter') {
    event.preventDefault();
    event.target.blur();
  }
}

// Function to edit the description of a task
function editTaskDescription(index, newDescription) {
  tasks[index].description = newDescription;
  saveTasksToLocalStorage();
  // eslint-disable-next-line
  populateList();
}

// Event handler for handling blur event after editing task description
function handleDescriptionBlur(event) {
  const span = event.target;
  const index = span.getAttribute('data-index');
  const newDescription = span.textContent.trim();
  const currentDescription = tasks[index].description;

  if (newDescription !== currentDescription) {
    editTaskDescription(index, newDescription);
  }
}

function populateList() {
  const taskList = document.querySelector('#task-list');
  taskList.innerHTML = '';

  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <div class="containitem">
        <div class="item">
          <input type="checkbox" ${task.completed ? 'checked' : ''}>
          <span class="description" data-index="${index}" contenteditable>${task.description}</span>
        </div>
        <div class="iconsend">
        <i class="fa-regular fa-trash-can fa-bounce" style="color: #fe8801;" data-index="${index}"></i>
        <i class="fa-solid fa-ellipsis-vertical"></i>
        </div>
      </div>`;

    taskList.appendChild(li);

    const trashCanIcon = li.querySelector('.fa-trash-can');
    trashCanIcon.addEventListener('click', (event) => {
      const index = event.target.getAttribute('data-index');
      deleteTask(index);
    });

    const descriptionElement = li.querySelector('.description');
    descriptionElement.addEventListener('keydown', handleDescriptionKeydown);
    descriptionElement.addEventListener('blur', handleDescriptionBlur);
  });
}

// Function to add a new task to the list
function addTask(description) {
  const newTask = {
    description,
    completed: false,
    index: tasks.length + 1,
  };
  tasks.push(newTask);
  saveTasksToLocalStorage();
  populateList();
}

// Function to load tasks from local storage
function loadTasksFromLocalStorage() {
  const storedTasks = localStorage.getItem('tasks');
  if (storedTasks) {
    tasks = JSON.parse(storedTasks);
  }
}

// Event listener when the DOM content is loaded
document.addEventListener('DOMContentLoaded', () => {
  loadTasksFromLocalStorage();
  populateList();

  const newTaskInput = document.querySelector('#new-task');
  newTaskInput.addEventListener('keyup', (event) => {
    if (event.key === 'Enter' && newTaskInput.value.trim() !== '') {
      addTask(newTaskInput.value.trim());
      newTaskInput.value = '';
    }
  });

  setupClearButton();
  setupTaskList();
});

export {
  tasks, updateTaskIndexes, saveTasksToLocalStorage, populateList,
};
