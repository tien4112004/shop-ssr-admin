import Product from "../interfaces/product";


export default class ProductEditDetail {
  /**
   * 
   * @param {Product} product 
   */
  constructor(product) {
    this.product = product;
  }

  toHtml() {
    return `
<!-- General  -->
<div class="rounded-primary bg-white p-6 shadow-sm dark:bg-slate-800">
  <h5 class="m-0 p-0 text-xl font-semibold text-slate-700 dark:text-slate-200">General</h5>
  <p class="mb-4 p-0 text-sm font-normal text-slate-400">
    Customize the basic information of your product
  </p>
  <div class="py-2">
    <label class="label mb-1 font-medium" for="code"> Product ID </label>
    <input type="text" class="input" id="code" value="${this.product?.productId || ''}" disabled />
  </div>
  <div class="py-2">
    <label class="label label-required mb-1 font-medium" for="name"> Name </label>
    <input type="text" class="input" id="name" value="${this.product?.productName || ''}" />
  </div>
  <div class="py-2">
    <label class="label label-required mb-1 font-medium"> Description </label>
    <textarea id="p-description" class="textarea text-start" rows="5" placeholder="Describe your product here">
${this.product?.productDescription || ''}
    </textarea
    >
  </div>
</div>
<!-- Pricing  -->
<div class="rounded-primary bg-white p-6 shadow-sm dark:bg-slate-800">
  <h5 class="m-0 p-0 text-xl font-semibold text-slate-700 dark:text-slate-200">Pricing</h5>
  <p class="mb-4 p-0 text-sm font-normal text-slate-400">
    Set your pricing strategies to stay ahead of the competition
  </p>
  <div class="grid w-full grid-cols-1 gap-4 py-2 md:grid-cols-2">
    <div class="flex w-full flex-col md:w-auto">
      <label class="label label-required mb-1 font-medium" for="base-price"> Base Price ($) </label>
      <input type="text" class="input" id="base-price" value="${this.product?.originalPrice || 0}" />
      <p class="help-text mt-1">Set the product regular price</p>
    </div>
    <div class="flex w-full flex-col md:w-auto">
      <label class="label label-required mb-1 font-medium" for="sale-price"> Sale Price ($) </label>
      <input type="text" class="input" id="sale-price" value="${this.product?.currentPrice || 0}" />
      <p class="help-text mt-1">Set the product offer price</p>
    </div>
  </div>
</div>
<!-- Media  -->
<div class="rounded-primary bg-white p-6 shadow-sm dark:bg-slate-800">
  <h5 class="m-0 p-0 text-xl font-semibold text-slate-700 dark:text-slate-200">Media</h5>
  <p class="mb-4 p-0 text-sm font-normal text-slate-400">
    Showcase your product with high-quality images
  </p>
  <div id="dropzone-product-edit" class="dropzone my-5">
    <div class="dz-message">
      <i class="text-slate-500 dark:text-slate-300" width="48" height="48" data-feather="image"></i>
      <p class="max-w-xs text-slate-500 dark:text-slate-300">
        Drag & Drop your media files to upload or
        <a
          class="text-primary-500 transition-colors duration-150 hover:text-primary-600 hover:underline"
          href="#"
        >
          click to browse
        </a>
      </p>
    </div>
    <!-- Fallback for no JavaScript -->
    <div class="fallback">
      <input name="file" type="file" />
    </div>
  </div>
</div>
<!-- Inventory  -->
<div class="rounded-primary bg-white p-6 shadow-sm dark:bg-slate-800">
  <h5 class="m-0 p-0 text-xl font-semibold text-slate-700 dark:text-slate-200">Inventory</h5>
  <p class="mb-4 p-0 text-sm font-normal text-slate-400">Manage and track your product stocks</p>
  <div class="grid w-full grid-cols-1 gap-4 py-2 md:grid-cols-2">
    <div class="flex w-full flex-col md:w-auto">
      <label class="label label-required mb-1 font-medium" for="stock-quantity"> Stock Quantity </label>
      <input type="text" class="input" id="stock-quantity" value="${this.product?.stock || 0}" />
      <p class="help-text mt-1">Enter available stock quantity</p>
    </div>
    <!-- <div class="flex w-full flex-col md:w-auto">
      <label class="label mb-1 font-medium" for="low-stock-threshold"> Low Stock Threshold </label>
      <input type="text" class="input" id="low-stock-threshold" value="50" />
      <p class="help-text mt-1">Enter low stock quantity alert threshold</p>
    </div> -->
  </div>
</div>

<button id="submit" class="btn btn-primary">Commit changes</button>
    `;
  }
}