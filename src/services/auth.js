// const URL = 'https://link-management-backend.onrender.com';
const URL = 'http://localhost:8000';

export const signup = (data) => {
    return fetch(`${URL}/api/user/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
};

export const login = (data) => {
    return fetch(`${URL}/api/user/login`, {
        method: 'POST',
        headers:{
            'Content-Type' : 'application/json',
        },
        body: JSON.stringify(data),
    })
};

export const getUserDetails = (token) => {
    return fetch(`${URL}/api/user`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    })
} 

export const getUserName = (token) => {
    return fetch(`${URL}/api/user/name`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    })
}

export const modifyUserDetails = (data, token) => {
    return fetch(`${URL}/api/user/modify`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token,
        },
        body: JSON.stringify(data),
    });
}

export const deleteUser = (token) => {
    return fetch(`${URL}/api/user/delete`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    })
}