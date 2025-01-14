import Dropzone from "dropzone";
import toast from "../components/toast";
import ProductService from "../services/product.service";
import ProductEditDetail from "../ui-components/productEditDetail";
import ProductOrganization from "../ui-components/productOrganization";

export default class ProductAddController {
  constructor() {
    this.detail = document.querySelector("section.detail");
    this.organization = document.querySelector("section.organization");
  }

  init() {
    this.loadData().then(async ({ categories, brands }) => {
      this.detail.innerHTML = new ProductEditDetail(null).toHtml();
      this.organization.innerHTML = new ProductOrganization(
        null,
        categories,
        brands
      ).toHtml();

      this.dropzone = this.createDropzone();

      document.querySelector("#submit").addEventListener("click", async (e) => {
        e.preventDefault();

        if (await this.postProduct()) {
          setTimeout(() => {
            window.location.href = '/product-list';
          }, 2000);
        };
      });
    });
  }

  async loadData() {
    try {
      const categories = await ProductService.getCategories();
      const brands = await ProductService.getBrands();
      return { categories, brands };
    } catch (error) {
      console.log(error);
      toast.danger(error.message);
    }
  }

  async postProduct() {
    try {
      const formData = new FormData();
      formData.append(
        "productName",
        document.querySelector("input#name").value
      );
      formData.append(
        "productDescription",
        document.querySelector("textarea#p-description").value
      );
      formData.append(
        "originalPrice",
        document.querySelector("input#base-price").value
      );
      formData.append(
        "currentPrice",
        document.querySelector("#sale-price").value
      );
      formData.append(
        "stock",
        document.querySelector("input#stock-quantity").value
      );

      formData.append("status", document.querySelector("select#status").value);
      formData.append(
        "categoryId",
        document.querySelector("select#category").value
      );
      formData.append("brandId", document.querySelector("select#brand").value);
      
      this.dropzone.files.forEach((file) => {
        formData.append("images", file);
      });

      this.product = await ProductService.postProduct(formData);
      toast.success("Product updated successfully");
    } catch (err) {
      console.log(err);
      toast.danger(err.message);
      return false;
    }
    return true;
  }

  createDropzone() {
    return new Dropzone("#dropzone-product-edit", {
      url: window.location.href,
      maxFiles: 5,
      maxFilesize: 5,
      addRemoveLinks: true,
      autoProcessQueue: false,
      accept: function (file, done) {
        file.type.match(/image.*/) ? done() : done("File not supported");
      },
    });
  }
}
