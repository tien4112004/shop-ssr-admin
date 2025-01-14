import toast from "../components/toast";
import Order from "../interfaces/order";
import OrderService from "../services/order.service";
import AddressProfile from "../ui-components/addressProfile";
import OrderDetailRow from "../ui-components/orderDetailRow";


export default class OrderDetailController {
  constructor() {
    this.orderId = parseInt(new URLSearchParams(window.location.search).get('id'));

    this.orderIdTag = document.querySelector('.order-id');
    this.orderStatus = document.querySelector('.order-status');
    this.orderDate = document.querySelector('.order-date');
    this.actions = document.querySelectorAll('.actions button');
    this.productList = document.querySelector('.product-list tbody');

    this.paymentMethod = document.querySelector('.payment-method');
    this.subtotal = document.querySelector('.subtotal');
    this.shipping = document.querySelector('.shipping');
    this.total = document.querySelector('.total');

    this.addressProfile = document.querySelector('.address-profile');

  }

  init() {
    this.getOrder().then(order => this.fillData(order));

    this.actions.forEach(element => {
      element.addEventListener('click', async (e) => {
        e.preventDefault();
        console.log(element)
        await this.changeStatus(element.id);
        this.getOrder().then(order => this.fillData(order));
      });
    });
  }

  /**
   * 
   * @param {Order} order 
   */
  fillData(order) {
    this.orderIdTag.textContent = 'Order#'+order.orderId;
    this.orderStatus.textContent = order.orderStatus;
    this.orderDate.textContent = new Date(order.createdAt).toLocaleString();
    
    this.productList.innerHTML = order.details.map(detaul => new OrderDetailRow(detaul).toHtml()).join('\n');

    this.paymentMethod.textContent = order.paymentMethod;
    this.subtotal.textContent = '$' + order.totalAmount.toFixed(2);
    this.shipping.textContent = '10% ' + '$' + (order.totalAmount * 0.1).toFixed(2);
    this.total.textContent = '$' + (order.totalAmount * 1.1).toFixed(2);

    this.addressProfile.innerHTML = new AddressProfile(order.user, order).toHtml();
  }

  async getOrder() {
    try {
      const order = await OrderService.getOrderById(this.orderId);
      return order;
    }
    catch (error) {
      console.log(error);
      toast.danger(error.message);
    }
  }

  async changeStatus(status) {
    try {
      await OrderService.changeOrderStatus(this.orderId, status);
      toast.success('Update order status successfully');
    }
    catch (error) {
      console.log(error);
      toast.danger(error.message);
    }
  }
}