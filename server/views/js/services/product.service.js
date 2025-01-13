import { API_SERVER } from "../config/api.config";
import Product, { Brand, Category } from "../interfaces/product";
import custom_fetch from "./custom_fetch";

export default class ProductService {

  /**
   * 
   * @returns {Promise<Category[]>}
   */
  static async getCategories() {
    const { categories } = await custom_fetch(
      "GET",
      `${API_SERVER}/api/v1/products/categories`,
      undefined,
      undefined,
      false
    );
    return categories;
  }

  /**
   * 
   * @returns {Promise<Brand[]>}
   */
  static async getBrands() {
    const { brands } = await custom_fetch(
      "GET",
      `${API_SERVER}/api/v1/products/brands`,
      undefined,
      undefined,
      false
    );
    return brands;
  }

  /**
   * 
   * @param {{}} query 
   * @returns {Promise<{count: number, products: Product[]}>}
   */
  static async getProducts(query) {
    const { count, products } = await custom_fetch(
      "GET",
      `${API_SERVER}/api/v1/products`,
      query,
      undefined,
      true
    );
    return { count, products };
  }

  static async postProduct(product) {}

  static async updProduct(data) {}

  static async updProductStatus(id, status) {}
}
