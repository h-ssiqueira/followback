@startuml

start

:Setup the authentication token;
note left
    First by env var GH_TOKEN
end note

note right
    Second by git user's password (gpg)
end note

:Get the total number of followers and following users of the authenticated user;

partition Retrieve followers {
    repeat :Get next page of followers;
        repeat :Get next follower user;
            :Insert user login into followers list;
        repeat while (Has more users?) is (yes) not (no)
    repeat while (Has more pages?) is (yes) not (no)
}

partition Retrieve following users {
    repeat :Get next page of following users;
        repeat :Get next following user;
            :Insert user login into followers list;
        repeat while (Has more users?) is (yes) not (no)
    repeat while (Has more pages?) is (yes) not (no)
}

partition Follow followers {
    repeat :For each follower user login;
        if (Is the login present in the following users list?) then (no)
            :Follow user;
        else (yes)
        endif
    repeat while (Has more users?) is (yes) not (no)
}
stop

@enduml