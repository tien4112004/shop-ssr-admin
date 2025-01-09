import toast from "../components/toast";
import UserService from "../services/user.service";

export default class ProfileController {
  constructor() {
    const urlParams = new URLSearchParams(window.location.search);
    this.userId  = urlParams.get('id');

    this.userFullname = document.querySelector('.user-fullname');
    this.userStatus = document.querySelector('.user-status');
    this.userAvatar = document.querySelector('.user-avatar');
    this.userEmail = document.querySelector('.user-email');
    this.userPhoneNumber = document.querySelector('.user-phone');
    
    this.banUserBtn = document.querySelector('.ban-user');
  }

  async init() {
    this.user = await this.getUser();

    this.fillData();

    this.banUserBtn.addEventListener('click', async (e) => {
      e.preventDefault();
      await this.changeUserStatus();
    });
  }

  fillData() {
    this.userFullname.textContent = this.user.fullname ?? 'unknown';
    this.userStatus.textContent = this.user.status;
    this.userAvatar.src = this.user.avatarUrl ?? './images/avatar11.png';
    this.userEmail.value = this.user.email;
    this.userPhoneNumber.value = this.user.phoneNumber;

    this.banUserBtn.textContent = this.user.status === 'ACTIVE' ? 'Ban User' : 'Unban User';
  }

  async getUser() {
    try {
      const user = await UserService.getUserById(this.userId);
      return user;
    }
    catch (error) {
      console.log(error);
      toast.danger(error.message);
    }
  }

  async changeUserStatus() {
    try {
      await UserService.changeUserStatus(this.userId, this.user.status === 'ACTIVE' ? 'BLOCK' : 'ACTIVE');
      toast.success('Update user status successfully');
      this.user = await this.getUser();
      this.fillData();
    }
    catch (error) {
      console.log(error);
      toast.danger(error.message);
    }
  }

}