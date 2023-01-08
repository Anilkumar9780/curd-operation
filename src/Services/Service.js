// package
import axios from "axios";

// components
import { URLS } from "./Config/Urls";

/**
 * Get User List
 */
export const GetUser = async () => {
  return await axios.get(`${URLS.GET_USERS_LIST}`);
};

/**
 *  Add User
 * @param {object} user 
 */
export const AddUser = async (user) => {
  return await axios.post(`${URLS.ADD_USER}`, user);
};

/**
 * Delete User
 * @param {number} id 
 */
export const DeleteUser = async (id) => {
  return await axios.delete(URLS.DELETE_USER.replace("#ID#", id));
};

/**
 * Update User
 * @param {number} id 
 * @param {object} user 
 */
export const UpdateUser = async (id, user) => {
  return await axios.put(URLS.UPDATE_USER.replace("#ID#", id), user);
};

/**
 * Get the Single User Detail 
 * @param {number} id 
 */
export const UserDetailPage = async (id) => {
  return await axios.get(URLS.USER_DETAIL.replace("#ID#", id))
}
