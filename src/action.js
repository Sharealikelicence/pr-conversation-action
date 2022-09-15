const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
  const GITHUB_TOKEN = core.getInput('GITHUB_TOKEN');
  const comment = process.env.COMMENT ?? 'Default Comment.';

  const octokit = github.getOctokit(GITHUB_TOKEN);

  console.log({octokit});

  const { context = {} } = github;

  const { pull_request } = context.payload;

  await octokit.issues.createComment({
    ...context.repo,
    issue_number: pull_request.number,
    body: `${comment}`,
  });
}

run();
