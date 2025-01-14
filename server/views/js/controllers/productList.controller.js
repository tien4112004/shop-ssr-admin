import toast from "../components/toast";
import ProductService from "../services/product.service";
import Pagination from "../ui-components/pagination";
import ProductListRow from "../ui-components/productListRow";

export default class ProductListController {
  PAGE_SIZE = 10;

  constructor() {
    this.body = document.querySelector("table.product-list tbody");
    this.searchProduct = document.querySelector("input.search-product");
    this.selectCategory = document.querySelector("select.product-category");
    this.selectBrand = document.querySelector("select.product-brand");
    this.selectStatus = document.querySelector("select.product-status");
    this.selectSort = document.querySelector("select.product-sort");

    this.pagination = new Pagination(
      document.querySelector("nav.pagination"),
      this.updateRows.bind(this)
    );
  }

  async init() {
    this.searchProduct.addEventListener("input", async () => {
      this.pagination.setCurrentPage(1);
      await this.updateRows();
    });

    this.selectCategory.addEventListener("change", async () => {
      this.pagination.setCurrentPage(1);
      await this.updateRows();
    });

    this.selectBrand.addEventListener("change", async () => {
      this.pagination.setCurrentPage(1);
      await this.updateRows();
    });

    this.selectStatus.addEventListener("change", async () => {
      this.pagination.setCurrentPage(1);
      await this.updateRows();
    });

    this.selectSort.addEventListener("change", async () => {
      this.pagination.setCurrentPage(1);
      await this.updateRows();
    });

    document.addEventListener("DOMContentLoaded", async () => {
      await this.loadCategories();
      await this.loadBrands();

      this.pagination.setCurrentPage(1);
      await this.updateRows();
    });

  }

  async updateRows() {
    try {
      const { count, products } = await this.loadProducts();
      this.pagination.setTotalPages(Math.ceil(count / this.PAGE_SIZE));

      this.body.innerHTML = products
        .map((product) => new ProductListRow(product).toHtml())
        .join("\n");

    } catch (error) {
      console.log(error);
      toast.danger(error.message);
    }
  }

  async loadCategories() {
    try {
      const categories = await ProductService.getCategories();
      categories
        .forEach((cat) => {
          const option = document.createElement("option");
          option.value = cat.categoryId;
          option.textContent = cat.categoryName;
          this.selectCategory.appendChild(option);
        })  
    } catch (error) {
      console.log(error);
      toast.danger(error.message);
    }
  }

  async loadBrands() {
    try {
      const brands = await ProductService.getBrands();
      this.selectBrand.innerHTML += brands
        .map((brand) => `<option value="${brand.brandId}">${brand.brandName}</option>`)
        .join("");
    } catch (error) {
      console.log(error);
      toast.danger(error.message);
    }
  }

  async loadProducts() {
    const [sortField, sortOrder] = this.selectSort.value.split("_");
    const query = {
      searchTerm: this.searchProduct.value || undefined,
      categories: this.selectCategory.value  || undefined,
      brands: this.selectBrand.value || undefined,
      status: this.selectStatus.value || undefined,
      limit: this.PAGE_SIZE,
      offset: (this.pagination.currentPage - 1) * this.PAGE_SIZE,
      sortBy: sortField || undefined,
      order: sortOrder || undefined
    };

    const { count, products } = await ProductService.getProducts(query);

    return { count, products };
  }
}
