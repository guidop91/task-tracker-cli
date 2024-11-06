#!/usr/bin/env node

import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'node:fs';

import { add, update, list, markAs, remove } from './commands/index.js';

// Get the current file path and directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const DIRECTORY_LOCATION = path.join(__dirname, '..', 'storage');
const FILE_LOCATION = path.join(DIRECTORY_LOCATION, 'task-list.json');

function main() {
  const [,, command, arg1, arg2] = process.argv;

  const taskList = getOrCreateList();
  const tasksObject = {
    list: taskList,
    fileLocation: FILE_LOCATION
  };

  if (command === '--help') {
    console.log(HELP_COMMAND_OUTPUT.trim());
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
    case 'mark-in-progress': 
      markAs(tasksObject, arg1, 'in progress');
      break;
    case 'mark-done': 
      markAs(tasksObject, arg1, 'done');
      break;
    case 'done': 
      markAs(tasksObject, arg1, 'done');
      break;

    default: 
      console.error('That command is not supported. Check "--help" for available commands');
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
  // Check if the directory exists
  if (!fs.existsSync(DIRECTORY_LOCATION)) {
    fs.mkdirSync(DIRECTORY_LOCATION, { recursive: true });
    console.log(`Directory not found, created: ${DIRECTORY_LOCATION}`);
  }

  fs.writeFileSync(FILE_LOCATION, JSON.stringify([], null, 2));
  return [];
}

const HELP_COMMAND_OUTPUT = `
----- Task tracker CLI -----

Create a task tracker accessible from your CLI. These are the available commands and how to use them:

- add "<Task description>"

Add a task with a description of your choosing.

- delete <task_id>

Delete a task given its identifier.

- update <task_id> "<New task description>"

Modify the description of a task, given its identifier.

- list

List all tasks

- list <status>

List tasks with given status

- mark-in-progress <task_id>

Mark task with given identifier as "in progress"

- mark-done <task_id>

Mark task with given identifier as "done"
`

main();
