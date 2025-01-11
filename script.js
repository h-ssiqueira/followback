const { execSync } = require('child_process');

function retrieveGHToken() {
    const envVarName = "GH_TOKEN";

    if (process.env[envVarName]) {
        console.log(`${envVarName} exists, using as auth token`);
        return process.env[envVarName];
    }
    var tkn = '';
    try {
        tkn = execSync('git config user.password', { encoding: 'utf8' });
        console.log("git user.password set, using as auth token");
    } catch (error) {
        console.log(`Failed to get user token from git config: ${error}`);
        return;
    }
    return tkn;
}

async function makeRequest(url, method, tkn) {
    try {
        const response = await fetch(url, {
            method: method,
            headers: {
                "Accept": "application/vnd.github+json",
                "Authorization": `Bearer ${tkn}`,
                "X-GitHub-Api-Version": "2022-11-28"
            }});
        if(response.status == 204) {
            return true;
        }
        if(response.status == 404) {
            return false;
        }
        if(!response.ok) {
            throw new Error(`Could not make the request! Status: ${response.status}\n${response}`);
        }
        return await response.json();
    } catch(err) {
        console.log(err);
        throw err;
    }
}

async function retrieveTotalFollowers(tkn) {
    try {
        const resp = await makeRequest("https://api.github.com/user", "GET", tkn);
        return resp.followers;
    } catch (err) {
        console.log(err);
        return;
    }
}

async function getNextPage(i, tkn) {
    try {
        return await makeRequest(`https://api.github.com/user/followers?per_page=100&page=${i}`, "GET", tkn);
    } catch (err) {
        console.log(err);
        return;
    }
}

async function isNotFollowing(usr, tkn) {
    try {
        console.log(`Checking user: ${usr}`);
        return !(await makeRequest(`https://api.github.com/user/following/${usr}`, "GET", tkn));
    } catch (err) {
        console.log(err);
        return;
    }
}

async function followUser(usr, tkn) {
    try {
        console.log(`Following user: ${usr}`);
        if(await makeRequest(`https://api.github.com/user/following/${usr}`, "PUT", tkn)) {
            console.log(`User followed: ${usr}`);
        }
        return;
    } catch (err) {
        console.log(err);
        return;
    }
}

(async () => {
    const tkn = retrieveGHToken();
    if(!tkn) {
        console.log("Check token configuration and try again.");
        return;
    }

    const totalFollowers = await retrieveTotalFollowers(tkn);

    console.log(`Total Followers: ${totalFollowers}`);
    let usersFollowed = [];
    let usersProcessed = 0;

    const totalPages = Math.ceil(totalFollowers / 100);
    for (var i = 1; i <= totalPages; i++) {
        console.log(`Page [${i}/${totalPages}]`)
        var users = await getNextPage(i, tkn);
        if(users.empty) {
            break;
        }
        usersProcessed += users.length;
        for(var j = 0; j < users.length; j++) {
            var login = users[j].login;
            if(await isNotFollowing(login, tkn)){
                console.log(`Following user ${usr}`);
                await followUser(login, tkn);
                usersFollowed.push(login);
            }
        }
    }
    console.log(`Processed: ${usersProcessed} users`);
    console.log(`Followed: ${usersFollowed.length} users:\n${usersFollowed}`);
})();