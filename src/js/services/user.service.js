import {USERS_ENDPOINT} from '../config/api.config.js';
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
    const { count, users } = await custom_fetch('GET', `${USERS_ENDPOINT}/api`, query);
    return { count, users };
  }

  static async getUserById(id) {
    const { user } = await custom_fetch('GET', `${USERS_ENDPOINT}/api/${id}`);
    return user;
  }

  static async changeUserStatus(userId, status) {
    await custom_fetch('PATCH', `${USERS_ENDPOINT}/api/${userId}`, null, { status }, true);
  }
}

export default UserService;