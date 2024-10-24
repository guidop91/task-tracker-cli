import { add, update, list, markAs, remove } from './commands/index.js';

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

main();
