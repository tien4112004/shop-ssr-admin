import AccessService from "./services/access.service";


console.log(localStorage.getItem('profile'));
const profile = JSON.parse(localStorage.getItem('profile'));

document.querySelector('p.profile-name').textContent = profile.fullname;

document.querySelector('button.sign-out').addEventListener('click', (e) => {
  e.preventDefault();
  AccessService.logout();
  window.location.href = '/login';
});
