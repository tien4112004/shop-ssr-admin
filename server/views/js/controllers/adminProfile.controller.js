import toast from "../components/toast";
import ProfileService from "../services/profile.service";


export default class AdminProfileController {
  constructor() {
    this.fullnameInput = document.querySelector('input#fullname');
    this.addressInput = document.querySelector('input#address');
    this.emailInput = document.querySelector('input#email');
    this.phoneNumberInput = document.querySelector('input#phone');
    this.dobInput = document.querySelector('input#dob');
    this.genderInput = document.querySelector('select#gender');


    this.cancelUpdateProfileBtn = document.querySelector('button.cancel-update-profile');
    this.updateProfileBtn = document.querySelector('button.submit-update-profile');
  }

  init() {
    const profile = JSON.parse(localStorage.getItem('profile'));

    this.fullnameInput.value = profile.fullname;
    this.addressInput.value = profile.address;
    this.emailInput.value = profile.email;
    this.phoneNumberInput.value = profile.phoneNumber;
    this.dobInput.value = profile.dob;
    this.genderInput.value = profile.gender;

    this.cancelUpdateProfileBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.location.reload();
    });

    this.updateProfileBtn.addEventListener('click', async (e) => {
      e.preventDefault();
      await this.updateProfile();
    });
  }

  async updateProfile() {
    try {
      const fullname = this.fullnameInput.value;
      const address = this.addressInput.value;
      const email = this.emailInput.value;
      const phoneNumber = this.phoneNumberInput.value;
      const dob = new Date(this.dobInput.value);
      const gender = this.genderInput.value;

      console.log(dob);

      const profile = await ProfileService.updateAdminProfile({ fullname, address, email, phoneNumber, dob, gender})
      localStorage.setItem('profile', JSON.stringify(profile));

      toast.success('Profile updated successfully');
    }
    catch (error) {
      console.log(error);
      toast.danger(error.message);
    }
  }


}