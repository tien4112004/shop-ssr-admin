import { API_SERVER } from '../config/api.config.js';
import custom_fetch from './custom_fetch.js';

import User from '../interfaces/user.js';

class UserService {
  /**
   * 
   * @param {{
   * fullname?: string,
   * email?: string,
   * confirmed?: boolean,
   * status?: 'ACTIVE' | 'BLOCK'
   * orderBy?: 'createdAt' | 'fullname' | 'email',
   * order?: 'asc' | 'desc',
   * limit?: number,
   * offset?: number
   * }} query 
   * 
   * @returns {Promise<{
   * count: number,
   * users: User[]
   * }>}
   */
  static async getUsers(query) {
    const { count, users } = await custom_fetch('GET', `${API_SERVER}/api/v1/users`, query, undefined, true);
    return { count, users };
  }

  /**
   * 
   * @param {number} id 
   * @returns {Promise<User>}
   */
  static async getUserById(id) {
    const { user } = await custom_fetch('GET', `${API_SERVER}/api/v1/users/${id}`, undefined, undefined, true);
    return user;
  }

  static async changeUserStatus(userId, status) {
    await custom_fetch('PATCH', `${API_SERVER}/api/v1/users/${userId}`, undefined, { status }, true);
  }
}

export default UserService;