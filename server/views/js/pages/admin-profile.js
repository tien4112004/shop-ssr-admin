import AdminProfileController from '../controllers/adminProfile.controller.js';


const userImage = document.getElementById('user-image');
const uploadAvatar = document.getElementById('upload-avatar');
uploadAvatar.onchange = () => (userImage.src = URL.createObjectURL(uploadAvatar.files[0]));



const adminProfileController = new AdminProfileController();
adminProfileController.init();
