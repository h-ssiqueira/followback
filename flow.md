# Flow

<!-- TODO: diagram https://plantuml.com/activity-diagram-beta -->

1. Get the total of followers of the authenticated user: [API](https://docs.github.com/en/rest/users/users?apiVersion=2022-11-28#get-the-authenticated-user)
2. Iterate over the followers list: [API](https://docs.github.com/en/rest/users/followers?apiVersion=2022-11-28#list-followers-of-the-authenticated-user)
3. If the next user is not followed ([API](https://docs.github.com/en/rest/users/followers?apiVersion=2022-11-28#check-if-a-person-is-followed-by-the-authenticated-user)), then follow [API](https://docs.github.com/en/rest/users/followers?apiVersion=2022-11-28#follow-a-user)

