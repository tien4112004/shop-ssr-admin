
import Admin from "../interfaces/admin";
import User from "../interfaces/user";

class UserListRow {
  
  /**
   * @param {User | Admin} user 
   */
  constructor(data, isUser = true) {
    this.user = data;
    this.admin = data;
    this.isUser = isUser;
  }

  toHtml() {
    return this.isUser ? this.toHtmlForUser() : this.toHtmlForAdmin();
  }

  toHtmlForUser() {
    return `
<tr>
  <td>
    <input class="checkbox user-checkbox" type="checkbox" />
  </td>
  <td>
    <div class="flex items-center gap-3">
      <div class="avatar avatar-circle">
        <img class="avatar-img" src="${this.user.avatarUrl ?? '../../images/avatar1.png'}" alt="Avatar 1" />
      </div>
      <div>
        <a href="/profile?id=${this.user.userId}">
        <h6 class="whitespace-nowrap text-sm font-medium text-slate-700 dark:text-slate-100">
          ${this.user.fullname ?? 'No name'}
        </h6>
        </a>
      </div>
    </div>
  </td>
  <td>${this.user.email}</td>
  <td>${this.user.phoneNumber ?? 'None'}</td>
  <td>${new Date(this.user.createdAt).toLocaleString('en-US', {day: 'numeric', month: 'short', year: 'numeric'})}</td>
  <td>
    <div class="badge badge-soft-${this.user.status === 'ACTIVE' ? 'success' : 'danger'}">${this.user.status}</div>
  </td>
  <td>
    <div class="flex justify-end">
      <div class="dropdown" data-placement="bottom-start">
        <div class="dropdown-toggle">
          <i class="w-6 text-slate-400" data-feather="more-horizontal"></i>
        </div>
        <div class="dropdown-content">
          <ul class="dropdown-list">
            <li class="dropdown-list-item">
              <a href="javascript:void(0)" class="dropdown-link">
                <i class="h-5 text-slate-400" data-feather="external-link"></i>
                <span>Details</span>
              </a>
            </li>
            <li class="dropdown-list-item">
              <a href="javascript:void(0)" class="dropdown-link">
                <i class="h-5 text-slate-400" data-feather="trash"></i>
                <span>Delete</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </td>
</tr>
    `
  }

  toHtmlForAdmin() {
    return `
<tr>
  <td>
    <div class="flex items-center gap-3">
      <div class="avatar avatar-circle">
        <img class="avatar-img" src="../../images/avatar1.png" alt="Avatar" />
      </div>
      <div>
        <h6 class="whitespace-nowrap text-sm font-medium text-slate-700 dark:text-slate-100">
          ${this.admin.fullname ?? 'No name'}
        </h6>
      </div>
    </div>
  </td>
  <td>${this.admin.email}</td>
  <td>${this.admin.phoneNumber ?? 'None'}</td>
  <td>${this.admin.gender}</td>
</tr>
    `;
  }

}

export default UserListRow;


/*


                    <tr>
                      <td>
                        <input class="checkbox user-checkbox" type="checkbox" />
                      </td>
                      <td>
                        <div class="flex items-center gap-3">
                          <div class="avatar avatar-circle">
                            <img class="avatar-img" src="./images/avatar1.png" alt="Avatar 1" />
                          </div>
                          <div>
                            <h6 class="whitespace-nowrap text-sm font-medium text-slate-700 dark:text-slate-100">
                              Korrie O'Crevy
                            </h6>
                            <p class="truncate text-xs text-slate-500 dark:text-slate-400">Nuclear Power Engineer</p>
                          </div>
                        </div>
                      </td>
                      <td>kocrevy0@thetimes.co.uk</td>
                      <td>+1 080-123-4567</td>
                      <td>19 Aug 2022</td>
                      <td>
                        <div class="badge badge-soft-success">Active</div>
                      </td>
                      <td>
                        <div class="flex justify-end">
                          <div class="dropdown" data-placement="bottom-start">
                            <div class="dropdown-toggle">
                              <i class="w-6 text-slate-400" data-feather="more-horizontal"></i>
                            </div>
                            <div class="dropdown-content">
                              <ul class="dropdown-list">
                                <li class="dropdown-list-item">
                                  <a href="javascript:void(0)" class="dropdown-link">
                                    <i class="h-5 text-slate-400" data-feather="external-link"></i>
                                    <span>Details</span>
                                  </a>
                                </li>
                                <li class="dropdown-list-item">
                                  <a href="javascript:void(0)" class="dropdown-link">
                                    <i class="h-5 text-slate-400" data-feather="trash"></i>
                                    <span>Delete</span>
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>

*/