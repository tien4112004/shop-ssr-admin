import { OrderDetail } from "../interfaces/order";


export default class OrderDetailRow {
  /**
   * 
   * @param {OrderDetail} orderDetail 
   */
  constructor(orderDetail) {
    this.orderDetail = orderDetail;
  }

  toHtml() {
    return `
<tr>
  <td>
    <div class="flex items-center gap-2">
      <img src="${this.orderDetail.product.productImages[0]?.url || './images/product1.png'}" class="h-12 w-12 rounded-primary" alt="product-img" />
      <div class="flex flex-col items-start justify-center">
        <h4 class="m-0 p-0 text-sm font-medium text-slate-700">${this.orderDetail.product.productName}</h4>
      </div>
    </div>
  </td>
  <td>
    <p class="text-right text-sm font-normal text-slate-400 dark:text-slate-400">$${this.orderDetail.priceAtPurchase.toFixed(2)}</p>
  </td>
  <td>
    <p class="text-right text-sm font-normal text-slate-400 dark:text-slate-400">${this.orderDetail.quantity} pcs</p>
  </td>
  <td>
    <p class="text-right text-sm font-semibold text-slate-700 dark:text-slate-200">$${(this.orderDetail.priceAtPurchase * this.orderDetail.quantity).toFixed(2)}</p>
  </td>
</tr>
    `;
  }
}
