# Flow

## Version 1
1. Get the total number of followers of the authenticated user: [API](https://docs.github.com/en/rest/users/users?apiVersion=2022-11-28#get-the-authenticated-user)
2. Iterate over the followers list: [API](https://docs.github.com/en/rest/users/followers?apiVersion=2022-11-28#list-followers-of-the-authenticated-user)
3. If the next user is not followed ([API](https://docs.github.com/en/rest/users/followers?apiVersion=2022-11-28#check-if-a-person-is-followed-by-the-authenticated-user)), then follow [API](https://docs.github.com/en/rest/users/followers?apiVersion=2022-11-28#follow-a-user)

## Version 2

1. Get the total number of followers of the authenticated user: [API](https://docs.github.com/en/rest/users/users?apiVersion=2022-11-28#get-the-authenticated-user)
2. Iterate over the followers list: [API](https://docs.github.com/en/rest/users/followers?apiVersion=2022-11-28#list-followers-of-the-authenticated-user)
    - Saving the followers into a list
3. Iterate over the following list: [API](https://docs.github.com/en/rest/users/followers?apiVersion=2022-11-28#list-the-people-the-authenticated-user-follows)
    - Remove the user if exists in followers list
4. Iterate over the remaining followers list, following each user: [API](https://docs.github.com/en/rest/users/followers?apiVersion=2022-11-28#follow-a-user)

