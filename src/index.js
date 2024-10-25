import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'node:fs';

import { add, update, list, markAs, remove } from './commands/index.js';

// Get the current file path and directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const FILE_LOCATION = path.join(__dirname, '..', 'storage/task-list.json');

function main() {
  const [,, command, arg1, arg2] = process.argv;

  const taskList = getOrCreateList();
  const tasksObject = {
    list: taskList,
    fileLocation: FILE_LOCATION
  };

  if (command === '--help') {
    console.log('Available commands are: add, update, delete, list');
    return;
  }

  switch (command) {
    case 'add': 
      add(tasksObject, arg1);
      break;
    case 'update': 
      update(tasksObject, arg1, arg2);
      break;
    case 'delete': 
      // delete is a keyword in JS, so using "remove" instead
      remove(tasksObject, arg1);
      break;
    case 'list': 
      list(tasksObject, arg1);
      break;
    case 'mark-as': 
      markAs(arg1, arg2);
      break;

    default: 
      console.error('That command is not supported');
  }
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

main();
