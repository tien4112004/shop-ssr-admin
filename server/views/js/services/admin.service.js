import { PROFILE_ENDPOINT } from '../config/api.config';
import custom_fetch from './custom_fetch';
import Admin from '../interfaces/admin';

export default class ProfileService {
  /**
   *
   * @param {number} adminId
   * @returns {Promise<Admin>}
   */
  static async getAdminProfile(adminId) {
    const { profile } = await custom_fetch('GET', `${PROFILE_ENDPOINT}/api/admin/${adminId}`);
    return profile;
  }

  /**
   *
   * @param {number} adminId
   * @param {{
   * dob?: Date,
   * email?: string,
   * fullname?: string,
   * gender?: 'male' | 'female',
   * address?: string,
   * gender?: string,
   * phoneNumber?: string
   * }} data
   */
  static async updateAdminProfile(data) {
    const { profile } = await custom_fetch('PATCH', `${PROFILE_ENDPOINT}/api/admin`, undefined, data, true);
    return profile;
  }
}
