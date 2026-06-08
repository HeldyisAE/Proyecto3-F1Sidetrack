// src/services/authService.js

import { getUsers } from "./csvService";

export async function login(username, password) {

    const users = await getUsers();

    console.log(users);

    const user = users.find(
        user =>
            user.username === username &&
            user.password === password
    );

    return user || null;
}

export async function loginAsDemoUser() {

    const users = await getUsers();

    return users.find(
        user => Number(user.id) === 1
    );
}