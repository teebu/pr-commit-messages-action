const core = require('@actions/core')
const github = require('@actions/github')

try {
  const { payload } = github.context
  const commits = payload.commits
    .map(c => c.message)
    .filter(m => !/^Merge pull request/.test(m))
    .map(m => m.replace(/\n+(.*)/g, '\n> $1'))
    .map(m => `> ${m}`)
    .join('\n')

  core.setOutput('commits', commits)
} catch (error) {
  core.setFailed(error.message)
}
