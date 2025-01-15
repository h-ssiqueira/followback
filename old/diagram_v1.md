@startuml

start

:Setup the authentication token;

:Get the total number of followers of the authenticated user;

repeat :Get next page of followers;
    repeat :Get next follower user;
        if (Does the authenticated user follow this user?) then (no)
            :Follow user;
        else (yes)
        endif
    repeat while (Has more users?) is (yes) not (no)
repeat while (Has more pages?) is (yes) not (no)

stop

@enduml