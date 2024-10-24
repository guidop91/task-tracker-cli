function list(state = '') {
  if (!state) {
    console.log('List all tasks');
    return;
  }

  console.log(`Return task with state of ${state}`);
}

export { list };