import Order from "../interfaces/order";


class OrderListRow {

  /**
   * 
   * @param {Order} order 
   */
  constructor(order) {
    this.order = order;
  }

  toHtml() {
    return `
<tr>
  <td>
    <input class="checkbox order-checkbox" type="checkbox" />
  </td>
  <td>
    <a
      class="text-sm font-medium text-primary-500 transition duration-150 ease-in-out hover:underline"
      href="/order-details?id=${this.order.orderId}"
    >
      #${this.order.orderId}
    </a>
  </td>
  <td>
    <div class="flex gap-2">
      <div class="avatar avatar-circle">
        <img class="avatar-img" src="${this.order.user.avatarUrl || './images/avatar1.png'}" alt="Avatar" />
      </div>

      <div>
        <h6 class="whitespace-nowrap text-sm font-medium text-slate-700 dark:text-slate-100">
          ${this.order.user.fullname ?? 'No name'}
        </h6>
        <p class="truncate text-xs text-slate-500 dark:text-slate-400">${this.order.user.email}</p>
      </div>
    </div>
  </td>
  <td>$${this.order.totalAmount}</td>
  <td>19 Aug 2022, 10:39 pm</td>
  <td>
    <div class="badge badge-soft-primary">${this.order.orderStatus}</div>
  </td>
  <td>
    <div class="flex justify-end">
      <div class="dropdown" data-placement="bottom-start">
        <div class="dropdown-toggle">
          <i class="w-6 text-slate-400" data-feather="more-horizontal"></i>
        </div>
        <div class="dropdown-content w-40">
          <ul class="dropdown-list">
            <li class="dropdown-list-item">
              <a href="javascript:void(0)" class="dropdown-link">
                <i class="h-5 text-slate-400" data-feather="external-link"></i>
                <span>Details</span>
              </a>
            </li>
            <li class="dropdown-list-item">
              <a href="javascript:void(0)" class="dropdown-link">
                <i class="h-5 text-slate-400" data-feather="file-text"></i>
                <span>PDF</span>
              </a>
            </li>
            <li class="dropdown-list-item">
              <a href="javascript:void(0)" class="dropdown-link">
                <i class="h-5 text-slate-400" data-feather="trash-2"></i>
                <span>Delete</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </td>
</tr>
    `;
  }
}

export default OrderListRow;