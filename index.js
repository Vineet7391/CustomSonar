const core = require('@actions/core');

async function run() {
  try {
    // Get the input value
    const myInput = core.getInput('my-input');
    console.log(`Hello, ${myInput}!`);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
