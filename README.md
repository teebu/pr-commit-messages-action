# pr-commit-x-messages-action

get PR commit messages

## Inputs

token _(gh token)_   
num_commits _(default: 5)_

## Outputs

### `commits`, `last_commit`, `last_x_commit`

PR commit messages:

```
> commit message 1
> commit message 2
> commit message 3
```

## Example usage

```yaml
  - name: Get PR Commits
    id: 'pr-commit-x-messages-action'
    uses: teebu/pr-commit-messages-action@v1.1.5
    with:
      token: ${{ secrets.GITHUB_TOKEN }}
...
...
  echo: '${{ steps.pr-commit-x-messages-action.outputs.last_commit }}'
```
