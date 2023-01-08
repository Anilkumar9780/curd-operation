const BASE_URL = process.env.REACT_APP_BASE_URL;

export const URLS = {
    // Get User
    GET_USERS_LIST: `${BASE_URL}/posts`,

    // Add User
    ADD_USER: `${BASE_URL}/posts`,

    // Delete User
    DELETE_USER: `${BASE_URL}/posts/#ID#`,

    // Update User
    UPDATE_USER: `${BASE_URL}/posts/#ID#`,

    // Single User detail Page
    USER_DETAIL: `${BASE_URL}/posts/#ID#`,
}
