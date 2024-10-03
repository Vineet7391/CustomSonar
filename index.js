const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
  try {
    // Get the GitHub token from the input
    const token = core.getInput('GITHUB_TOKEN');

    // Initialize Octokit to interact with the GitHub API
    const octokit = github.getOctokit(token);

    // Get the pull request number from the event payload
    const pullRequestNumber = github.context.payload.pull_request?.number;
    if (!pullRequestNumber) {
      core.setFailed('No pull request found.');
      return;
    }

    // Get repository information (owner and repo)
    const { owner, repo } = github.context.repo;

    // Create a "Hello" comment on the PR
    const commentBody = 'Hello';
    
    await octokit.rest.issues.createComment({
      owner,
      repo,
      issue_number: pullRequestNumber,
      body: commentBody,
    });

    core.info('PR comment successfully created: Hello');
  } catch (error) {
    core.setFailed(`Action failed with error: ${error.message}`);
  }
}

run();
