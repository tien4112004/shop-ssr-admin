import { REVENUE_ENDPOINT } from "../config/api.config";
import { API_SERVER } from "../config/api.config";
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
      `${API_SERVER}/profile/api/admin/${adminId}`
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

  static async getTopRevenueReportByProduct(startDate, endDate, page=1, pageSize=10, sortBy='createdAt', order='desc', timeRange='day') {
    const {totalRevenue, totalCount, revenue} = await custom_fetch(
        "GET",
        `${REVENUE_ENDPOINT}/api/topRevenueReportByProduct?startDate=${startDate}&endDate=${endDate}&page=${page}&pageSize=${pageSize}&sortBy=${sortBy}&order=${order}&timeRange=${timeRange}`
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
      `${API_SERVER}/api/v1/users`,
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
      `${API_SERVER}/profile/api/admin`,
      undefined,
      data,
      true
    );
    return profile;
  }
}
