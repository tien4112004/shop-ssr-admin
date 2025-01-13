import Order from "../interfaces/order";
import User from "../interfaces/user";


export default class AddressProfile {
  /**
   * 
   * @param {User} user 
   * @param {Order} order 
   */
  constructor(user, order) {
    this.user = user;
    this.order = order;
  }

  toHtml() {
    return `
  <div class="sticky top-20 min-h-max rounded-primary bg-white shadow dark:bg-slate-800">
    <!-- User  -->
    <div class="flex items-center gap-2 border-b border-slate-200 px-6 py-4 dark:border-slate-700">
      <img src="${this.user.avatarUrl || './images/avatar1.png'}" class="h-10 w-10 rounded-full" alt="avatar-img" />
      <div class="flex flex-col gap-0">
        <h4 class="text-sm font-medium">${this.user.fullname || 'No name'}</h4>
      </div>
    </div>
    <!-- Contact Address  -->
    <div class="flex flex-col gap-2 border-b border-slate-200 px-6 py-4 dark:border-slate-700">
      <div class="flex items-center gap-2 text-slate-700 dark:text-slate-300">
        <i class="h-4 w-4" data-feather="mail"></i>
        <p class="text-sm font-normal">${this.user.email}</p>
      </div>
      <div class="flex items-center gap-2 text-slate-700 dark:text-slate-300">
        <i class="h-4 w-4" data-feather="phone-call"></i>
        <p class="text-sm font-normal">${this.user.phoneNumber || 'none'}</p>
      </div>
    </div>
    <!-- shipping Address  -->
    <div class="flex flex-col gap-2 border-b border-slate-200 px-6 py-4 dark:border-slate-700">
      <h6 class="text-sm font-semibold uppercase text-slate-700 dark:text-slate-300">SHIPPING ADDRESS</h6>
      <p class="text-sm font-normal leading-5">
        ${this.order.addressDetail + ', ' || ''}${this.order.ward} <br />
        ${this.order.district},<br />
        ${this.order.city},<br />
        ${this.order.country}
      </p>
    </div>
  </div>
    `;
  }
}