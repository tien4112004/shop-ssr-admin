import { ACCESS_ENDPOINT } from '../config/api.config';
import custom_fetch from './custom_fetch';

export default class AccessService {
  static async login(username, password) {
    const { token, profile } = await custom_fetch(
      'POST', 
      `${ACCESS_ENDPOINT}/api/admin/login`, 
      undefined, 
      { username, password },
      false
    );
    localStorage.setItem('token', token);
    localStorage.setItem('profile', JSON.stringify(profile));
  }

  static logout() {
    if (!localStorage.getItem('token')) {
      throw new Error('Can not logout without login');
    }
    localStorage.removeItem('token');
  }

}

