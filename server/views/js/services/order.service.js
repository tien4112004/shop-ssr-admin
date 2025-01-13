import { API_SERVER } from "../config/api.config";
import custom_fetch from "./custom_fetch";

export default class OrderService {
  /**
   *
   * @param {{}} query
   */
  static async getOrders(query) {
    const { count, orders } = await custom_fetch(
      "GET",
      `${API_SERVER}/api/v1/orders`,
      query,
      undefined,
      true
    );
    console.log(orders)
    return { count, orders };
  }

  static async getOrderById(orderId) {
    const { order } = await custom_fetch(
      "GET",
      `${API_SERVER}/api/v1/orders/${orderId}`,
      undefined,
      undefined,
      true
    );
    return order;
  }

  static async changeOrderStatus(orderId, status) {
    await custom_fetch(
      "PATCH",
      `${API_SERVER}/api/v1/orders/${orderId}/status`,
      undefined,
      { status },
      true
    );
  }
}
