import toast from "../components/toast";
import OrderService from "../services/order.service";
import OrderListRow from "../ui-components/orderListRow";
import Pagination from "../ui-components/pagination";


export default class OrderListController {
  PAGE_SIZE = 10;

  constructor() {
    this.body = document.querySelector("table.order-list tbody");
    this.selectOrderStatus = document.querySelector("select.order-status");
    this.selectOrderDate = document.querySelector("input.input-date-range");

    this.pagination = new Pagination(
      document.querySelector("nav.pagination"),
      this.updateRows.bind(this)
    );
  }

  init() {
    this.selectOrderStatus.addEventListener("change", async () => {
      this.pagination.setCurrentPage(1);
      await this.updateRows();
    });

    this.selectOrderDate.addEventListener("change", async () => {
      this.pagination.setCurrentPage(1);
      await this.updateRows();
    });

    document.addEventListener("DOMContentLoaded", async () => {
      this.pagination.setCurrentPage(1);
      await this.updateRows();
    });
  }

  async updateRows() {
    try {
      
      const { count, orders } = await this.getOrders();
      this.pagination.setTotalPages(Math.ceil(count / this.PAGE_SIZE));

      this.body.innerHTML = orders.map((order) => new OrderListRow(order).toHtml()).join("\n");

    } catch (error) {
      console.log(error);
      toast.danger(error.message);
    }
  }

  async getOrders() {
    const status = this.selectOrderStatus.value;
    const [start, end] = this.selectOrderDate.value.split(' ').filter((_value, index) => index == 0 || index == 2);
    
    const query = {
      status: status || undefined,
      startDate: start || undefined,
      endDate: end || undefined,
      limit: this.PAGE_SIZE,
      offset: (this.pagination.currentPage - 1) * this.PAGE_SIZE,
      sortBy: 'createdAt',
      order: 'desc'
    };
    const { count, orders } = await OrderService.getOrders(query);
    return { count, orders };
  }
}