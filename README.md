# Followback
![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)

Follow back your GitHub followers using the [GitHub API](https://docs.github.com/en/rest).

## Usage
- Script retrieves GitHub token as environment variable `GH_TOKEN` or with the git password variable, using:
```shell
git config user.password
```
Execute the script with:
```shell
node script.js
```
### Configuring Actions
- Generate a token in [settings](https://github.com/settings/personal-access-tokens) - token (classic), with the scopes for `followers` and `users`
- Add the generated secret into the [action secrets](https://github.com/h-ssiqueira/followback/settings/secrets/actions) within the repository, with the name `ACTIONS_OAUTH_TOKEN`.

## Documentation
- [Diagram](diagram_v2.md)
- [Flow](flow.md)
