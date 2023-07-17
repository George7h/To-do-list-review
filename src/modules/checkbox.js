// eslint-disable-next-line
import {
  tasks, updateTaskIndexes, saveTasksToLocalStorage, populateList,
} from '../index.js';

export function setupClearButton() {
  const clearBtn = document.querySelector('#clearbtn');
  clearBtn.addEventListener('click', () => {
    tasks = tasks.filter((task) => !task.completed);
    updateTaskIndexes();
    saveTasksToLocalStorage();
    populateList();
  });
}

export function setupTaskList() {
  const taskList = document.querySelector('#task-list');
  taskList.addEventListener('change', (event) => {
    if (event.target.type === 'checkbox') {
      const li = event.target.closest('li');
      const index = Array.from(taskList.children).indexOf(li);
      tasks[index].completed = event.target.checked;
      saveTasksToLocalStorage();
    }
  });
}