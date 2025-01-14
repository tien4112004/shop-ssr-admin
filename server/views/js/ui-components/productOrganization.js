import Product, { Brand, Category } from "../interfaces/product";


export default class ProductOrganization {
  /**
   * 
   * @param {Product} product
   * @param {Category[]} categories 
   * @param {Brand[]} brands 
   */
  constructor(product, categories, brands) {
    this.product = product;
    this.categories = categories;
    this.brands = brands;
  }

  toHtml() {
    return `
<div class="sticky top-20 rounded-primary bg-white p-6 shadow dark:bg-slate-800">
    <h5 class="m-0 p-0 text-xl font-semibold text-slate-700 dark:text-slate-200">Organization</h5>
    <p class="mb-4 p-0 text-sm font-normal text-slate-400">Better organize your product</p>
    <div class="flex flex-col gap-4">
      <div>
        <label class="label label-required mb-1 font-medium" for="status"> Status </label>
        <select class="select" id="status">
          <option value="PUBLISHED" ${this.product?.status === 'PUBLISHED' ? 'selected' : ''}>Published</option>
          <option value="UNPUBLISHED"  ${this.product?.status === 'UNPUBLISHED' ? 'selected' : ''}>Unpublished</option>
          <option value="DELETED"  ${this.product?.status === 'DELETED' ? 'selected' : ''}>Deleted</option>
        </select>
      </div>
      <div>
        <label class="label label-required mb-1 font-medium" for="category"> Category </label>
        <select class="select" id="category">
          ${
            this.categories.map(category => {
              return `<option value="${category.categoryId}" ${this.product?.category.categoryId === category.categoryId ? 'selected' : ''}>${category.categoryName}</option>`
            }).join('\n')
          }
        </select>
      </div>
      <div>
        <label class="label label-required mb-1 font-medium" for="brand"> Brand </label>
        <select class="select" id="brand">
          ${
            this.brands.map(brand => {
              return `<option value="${brand.brandId}" ${this.product?.brand.brandId === brand.brandId ? 'selected' : ''}>${brand.brandName}</option>`
            }).join('\n')
          }
        </select>
      </div>
    </div>
  </div>
    `;
  }
}