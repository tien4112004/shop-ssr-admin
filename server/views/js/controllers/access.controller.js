import toast from "../components/toast";
import AccessService from "../services/access.service";

export default class LoginController {

  constructor() {
    this.usernameInput = document.querySelector("input.username");
    this.passwordInput = document.querySelector("input.password");
  }

  init() {
    document.querySelector("#login").addEventListener("click", async (e) => {
      await this.login();
      console.log('clicked', this.usernameInput.value, this.passwordInput.value);
    });
  }
  
  async login() {
    try {
      const username = this.usernameInput.value;
      const password = this.passwordInput.value;
      
      await AccessService.login(username, password);
      window.location.href = '/';
    }
    catch (error) {
      console.log(error);
      toast.danger(error.message);
    }
  }

}