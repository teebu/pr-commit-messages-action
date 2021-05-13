const core = require('@actions/core');
const { exec } = require('child_process');

try {
  const message_count = core.getInput('message_count') || 3;
  const sha = core.getInput('sha') || process.env.GITHUB_SHA;
  exec(`git log --format=%B -n ${message_count} ${sha}`, (err, stdout, stderr) => {
    if (err) {
      throw err;
    }

    const commits = stdout
    .split('\n\n')
    .filter(m => !/^Merge pull request/.test(m)) // remove merge line
    .filter(n => n) // remove empty strings
    .map(m => m.replace(/\n+(.*)/g, '\n> $1'))
    .map(m => `> ${m}`)
    .join('\n')

    core.setOutput('commits', commits)
  });
} catch (error) {
  core.setFailed(error.message);
}
