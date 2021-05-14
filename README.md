# pr-commit-x-messages-action

get PR commit messages

## Inputs

token _(gh token)_  
num_commits _(default: 5)_

## Outputs

### `commits`

PR commit messages:

```
> commit message 1
> commit message 2
> commit message 3
```

## Example usage

```yaml
uses: teebu/pr-commit-messages-action@main
```
