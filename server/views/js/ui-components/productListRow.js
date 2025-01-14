import Product from "../interfaces/product";


class ProductListRow {
  /**
   * 
   * @param {Product} product 
   */
  constructor(product) {
    this.product = product; 
  }

  toHtml() {
    return `
  <tr>
    <td>
      <input class="checkbox product-checkbox" type="checkbox" />
    </td>
    <td>
      <div class="flex items-center gap-3">
        <img
          src="${this.product.productImages[0]?.url || './images/product1.jpg'}"
          class="h-10 w-10 rounded-primary border border-slate-300 dark:border-slate-400"
          alt="product"
        />
        <div>
          <a href='/product-edit?id=${this.product.productId}'>
            <h6 class="whitespace-nowrap text-sm font-medium text-slate-700 dark:text-slate-100">
              ${this.product.productName}
            </h6>
            <p class="truncate text-xs text-slate-500 dark:text-slate-400">${this.product.category.categoryName}</p>
          </a>
        </div>
      </div>
    </td>
    <td>$${this.product.currentPrice.toFixed(2)}</td>
    <td>${this.product.stock} pcs</td>
    <td>${this.product.soldQuantity} pcs</td>
    <td>${new Date(this.product.publishedAt).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}</td>
    <td>
      <div class="badge badge-soft-success">${this.product.status}</div>
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
                  <i class="h-5 text-slate-400" data-feather="edit"></i>
                  <span>Edit</span>
                </a>
              </li>
              <li class="dropdown-list-item">
                <a href="javascript:void(0)" class="dropdown-link">
                  <i class="h-5 text-slate-400" data-feather="trash"></i>
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

export default ProductListRow;

