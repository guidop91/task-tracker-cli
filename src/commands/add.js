import fs from 'node:fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

// Get the current file path and directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const FILE_LOCATION = path.join(__dirname, '..', '..', 'storage/task-list.json');

/**
 * Add a task to the list (create list if doesn't exist)
 * 
 * @param {string} taskTitle - TItle of the task to add
 */
function add(taskTitle) {
  const taskList = getOrCreateList();

  const lastId = getLastId(taskList);
  const newTask = createNewTask(taskTitle, lastId + 1);

  taskList.push(newTask);
  fs.writeFileSync(FILE_LOCATION, JSON.stringify(taskList, null, 2));
}

/**
 * Get the task list from file, or create if doesn't exist
 * 
 * @returns {undefined}
 */
function getOrCreateList() {
  let taskList;
  try {
    taskList = JSON.parse(fs.readFileSync(FILE_LOCATION));
  } catch (err) {
    if (err.code === 'ENOENT') {
      taskList = createFile()
    } else {
      console.error(err);
    }
  }

  return taskList;
}

/**
 * Create a file and return an empty array. This initializes a task list when it doesn't exist
 * 
 * @returns {Array} Empty array
 */
function createFile() {
  fs.writeFileSync(FILE_LOCATION, JSON.stringify([], null, 2));
  return [];
}

/**
 * 
 * @param {string} taskTitle - Title or description of the task
 * @param {number} id - identifier of the task
 * @returns {object} newly created task object
 */
function createNewTask(taskTitle, id) {
 return {
  id,
  description: taskTitle,
  status: 'new',
  createdAt: new Date(),
  updatedAt: new Date()
 }
}

/**
 * 
 * @param {Array<object>} taskList - list of tasks
 * @returns {number} Number of last id that was created
 */
function getLastId(taskList) {
  const listLength = taskList.length;
  if (listLength === 0) return 0

  return taskList[listLength - 1].id;
}

export { add };
