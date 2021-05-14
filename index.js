const core = require('@actions/core')
const github = require('@actions/github')

const validEvent = ['pull_request']

async function main() {
  try {
    const { eventName, payload: {repository: repo, pull_request: pr} } = github.context

    if (validEvent.indexOf(eventName) < 0) {
      core.error(`Invalid event: ${eventName}`)
      return
    }

    const token = core.getInput('token')
    const num_commits = core.getInput('num_commits') || 5

    const octokit = new github.GitHub(token)

    const response = await octokit.pulls.listCommits({
      owner: repo.owner.login,
      repo: repo.name,
      pull_number: pr.number,
      per_page: 100
    })

    if (response.status !== 200) {
      core.error(`Invalid status: ${response.status}`)
      return
    }

    const commits = response.data
    // core.debug(JSON.stringify(response.data))

    let filtered_commits = commits
      .map(c => c.commit.message)
      .filter(m => !/^Merge pull request/.test(m)) // remove merge string
      .filter(n => n) // remove empty strings
      .map(m => m.replace(/\n+(.*)/g, '\n> $1'))
      .map(m => `> ${m}`)

    const last_commit = filtered_commits.slice(Math.max(filtered_commits.length - 1, 0))
    const last_x_commit = filtered_commits.slice(Math.max(filtered_commits.length - num_commits, 0))

    // set outputs
    core.setOutput('commits', filtered_commits.join('\n'))
    core.setOutput('last_commit', last_commit.join('\n'))
    core.setOutput('last_x_commit', last_x_commit.join('\n'))

  } catch (error) {
    core.setFailed(error.message)
  }
}

main()

