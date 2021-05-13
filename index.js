const core = require('@actions/core')
const github = require('@actions/github')

try {
  const { payload } = github.context
  const last_n_messages = 3
  const commits = payload.commits
    .map(c => c.message)
    .filter(m => !/^Merge pull request/.test(m))
    .map(m => m.replace(/\n+(.*)/g, '\n> $1'))
    .map(m => `> ${m}`)

  let latest = commits.slice(Math.max(commits.length - last_n_messages, 0))
  latest = latest.join('\n')

  core.setOutput('commits', latest)
} catch (error) {
  core.error(error.message)
}
