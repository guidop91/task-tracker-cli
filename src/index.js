function main() {
  const [,, command, arg1, arg2] = process.argv;

  if (command === '--help') {
    console.log('Available commands are: add, update, remove, list');
    return;
  }

  switch (command) {
    case 'add': 
      add(arg1);
      break;
    case 'update': 
      update(arg1, arg2);
      break;
    case 'remove': 
      remove(arg1);
      break;
    case 'list': 
      list(arg1);
      break;
    case 'mark-as': 
      markAs(arg1, arg2);
      break;

    default: 
      console.log('That command is not supported');
  }
}

/**
 * Add a task
 * 
 * @param {string} taskTitle - TItle of the task to add
 */
function add(taskTitle) {
  console.log(`Add the following: ${taskTitle}`);
}

function update(id, newTaskTitle) {
  console.log(`Update task with id ${id} to ${newTaskTitle}`);
}

function remove(word) {
  console.log(`Remove task with id ${id}`);
}

function markAs(id, state) {
  console.log(`Mark task ${id} as ${state}`);
}

function list(state = '') {
  if (!state) {
    console.log('List all tasks');
    return;
  }

  console.log(`Return task with state of ${state}`);
}

main();
