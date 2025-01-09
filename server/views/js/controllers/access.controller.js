import AccessService from "../services/access.service";

export default class AccessController {
  init() {
    if (window.location.pathname !== '/login' && !AccessService.isAuthenticated()) {
      window.location.href = '/login'
      
    }    
  }
}