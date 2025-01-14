import Dropzone from "dropzone";
import toast from "../components/toast";
import Product from "../interfaces/product";
import ProductService from "../services/product.service";
import ProductEditDetail from "../ui-components/productEditDetail";
import ProductOrganization from "../ui-components/productOrganization";

export default class ProductEditController {
  constructor() {
    this.productId = new URLSearchParams(window.location.search).get("id");
    this.product = new Product();

    this.detail = document.querySelector("section.detail");
    this.organization = document.querySelector("section.organization");
  }

  init() {
    this.loadData().then(async ({ product, categories, brands }) => {
      this.product = product;
      this.detail.innerHTML = new ProductEditDetail(product).toHtml();
      this.organization.innerHTML = new ProductOrganization(
        product,
        categories,
        brands
      ).toHtml();

      this.dropzone = this.createDropzone();

      document.querySelector("#submit").addEventListener("click", async (e) => {
        e.preventDefault();

        if (await this.postUpdateProduct()) {
          // wait for 3s then reload
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        }
      });
    });
  }

  async loadData() {
    try {
      const product = await ProductService.getProductById(this.productId);
      const categories = await ProductService.getCategories();
      const brands = await ProductService.getBrands();
      return { product, categories, brands };
    } catch (error) {
      console.log(error);
      toast.danger(error.message);
    }
  }

  async postUpdateProduct() {
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
      
      console.log('delete', this.product.deletingImages)
      formData.append(
        "productImages",
        JSON.stringify(this.product.deletingImages)
      );

      this.dropzone.files.filter(file => !this.product.productImages.map(img => img.imageId).includes(file.id)).forEach((file) => {
        formData.append("images", file);
      });

      this.product = await ProductService.updProduct(this.productId, formData);
      toast.success("Product updated successfully");

    } catch (err) {
      console.log(err);
      toast.danger(err.message);
      return false;
    }
    return true;
  }

  createDropzone() {
    const images = this.product.productImages;
    this.product.deletingImages = [];
    const deletingImages = this.product.deletingImages;

    return new Dropzone("#dropzone-product-edit", {
      url: window.location.href,
      maxFiles: 5,
      maxFilesize: 5,
      addRemoveLinks: true,
      autoProcessQueue: false,
      accept: function (file, done) {
        file.type.match(/image.*/) ? done() : done("File not supported");
      },
      init: function () {
        const files = images.map((image) => {
          return {
            id: image.imageId,
            name: image.publicId,
            url: image.url,
          };
        });

        files.forEach((file) => {
          const { id, name, url } = file;
          this.files.push(file);
          this.displayExistingFile({ id, name }, url);
        });

        this.options.maxFiles = this.options.maxFiles - files.length;

        this.on("removedfile", (file) => {
          this.files = this.files.filter((f) => f.id !== file.id);
          this.options.maxFiles = files.length - this.files.length;
          deletingImages.push({ imageId: file.id, publicId: file.name });
        });
      },
    });
  }
}
