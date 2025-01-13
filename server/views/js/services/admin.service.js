import { REVENUE_ENDPOINT } from "../config/api.config";
import custom_fetch from "./custom_fetch";
import Admin from "../interfaces/admin";

export default class AdminService {
  /**
   *
   * @param {number} adminId
   * @returns {Promise<Admin>}
   */
  static async getAdminProfile(adminId) {
    const { profile } = await custom_fetch(
      "GET",
      `${REVENUE_ENDPOINT}/api/admin/${adminId}`
    );
    return profile;
  }

  static async getRevenueReport(startDate, endDate, page=1, pageSize=10, sortBy='createdAt', order='desc', timeRange='day') {
    const {totalRevenue, totalCount, revenue} = await custom_fetch(
        "GET",
        `${REVENUE_ENDPOINT}/api/revenueReport?startDate=${startDate}&endDate=${endDate}&page=${page}&pageSize=${pageSize}&sortBy=${sortBy}&order=${order}&timeRange=${timeRange}`
    );
    console.log(totalRevenue, totalCount, revenue);
    return {totalRevenue, totalCount, revenue};
  }

  /**
   * @param {{
   * limit?: number,
   * offset?: number
   * }} query
   */

  static async getAdminList(query) {
    const { count, admins } = await custom_fetch(
      "GET",
      `${USERS_ENDPOINT}/api`,
      { ...query, admin: true },
      undefined,
      true
    );
    return { count, admins };
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
    const { profile } = await custom_fetch(
      "PATCH",
      `${PROFILE_ENDPOINT}/api/admin`,
      undefined,
      data,
      true
    );
    return profile;
  }
}
