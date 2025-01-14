
import toast from "../components/toast";
import UserService from "../services/user.service";
import Pagination from "../ui-components/pagination";
import UserListRow from "../ui-components/userListRow";
import AdminService from "../services/admin.service";

export default class UserListController {
  PAGE_SIZE = 10;

  constructor() {
    this.searchUser = document.querySelector('input.search-user');
    this.selectUsertype = document.querySelector('select.user-type');
    this.selectUserStatus = document.querySelector('select.user-status');
    this.selectUserConfirmed = document.querySelector('select.user-confirmed');
    this.sortOption = document.querySelector('select.user-sort');

    this.userListHeader = document.querySelector('.user-list-header');
    this.adminListHeader = document.querySelector('.admin-list-header');

    this.pagination = new Pagination(
      document.querySelector('nav.pagination'), 
      this.updateRows.bind(this)
    );
  }

  init() {

    this.searchUser.addEventListener('input', async () => {
      this.pagination.setCurrentPage(1);
      await this.updateRows();
    });

    this.selectUsertype.addEventListener('change', async () => {
      this.pagination.setCurrentPage(1);
      await this.updateRows();
    });

    this.selectUserStatus.addEventListener('change', async () => {
      this.pagination.setCurrentPage(1);
      await this.updateRows();
    });

    this.selectUserConfirmed.addEventListener('change', async () => {
      this.pagination.setCurrentPage(1);
      await this.updateRows();
    });

    this.sortOption.addEventListener('change', async () => {
      this.pagination.setCurrentPage(1);
      await this.updateRows();
    });

    document.addEventListener('DOMContentLoaded', async () => {
      this.pagination.setCurrentPage(1);
      await this.updateRows();
    });

  }

  async updateRows() {
    try {
      const userType = this.userTypeToQuery(this.selectUsertype.value);
      
      this.switchTablHeader(userType);

      if (userType == 'USER') {
        await this.updateUserRows();
      }
      if (userType == 'ADMIN') {
        await this.updateAdminRows();
      }

    }
    catch (error) {
      console.error(error);
      toast.danger(error.message);
    }
  }

  switchTablHeader(userType) {
    if (userType == "USER") {
      // this.userListHeader.style.display = 'block';
      // this.adminListHeader.style.display = 'none';
      this.userListHeader.classList.remove('hidden');
      this.adminListHeader.classList.add('hidden');
    }
    if (userType == "ADMIN") {
      // this.userListHeader.style.display = 'none';
      // this.adminListHeader.style.display = 'block';
      this.userListHeader.classList.add('hidden');
      this.adminListHeader.classList.remove('hidden');
    }
  }

  async updateUserRows() {
    const { count, users } = await this.getUsers();
    const totalPages = Math.ceil(count / this.PAGE_SIZE);

    this.pagination.setTotalPages(totalPages);

    const rows = users.map((user) => new UserListRow(user).toHtml()).join('\n');
    
    document.querySelector('table.user-list tbody').innerHTML = rows;
  }

  async updateAdminRows() {
    const { count, admins } = await this.getAdmins();
    const totalPages = Math.ceil(count / this.PAGE_SIZE);

    this.pagination.setTotalPages(totalPages);

    const rows = admins.map((admin) => new UserListRow(admin, false).toHtml()).join('\n');
    
    document.querySelector('table.user-list tbody').innerHTML = rows;
  }

  async getUsers() {
    const search = this.searchUser.value || undefined;
    const status = this.userStatusToQuery(this.selectUserStatus.value);
    const confirmed = this.userConfirmedToQuery(this.selectUserConfirmed.value);
    const sortBy = this.userSortToQuery(this.sortOption.value);
    const query = {
      key: search,
      sortBy: sortBy,
      order: 'asc',
      status: status,
      confirmed: confirmed,
      limit: this.PAGE_SIZE,
      offset: (this.pagination.currentPage - 1) * this.PAGE_SIZE,
    };

    const { count, users } = await UserService.getUsers(query);

    return { count, users };
  }
  
  async getAdmins() {
    const search = this.searchUser.value || undefined;
    const sortBy = this.userSortToQuery(this.sortOption.value);
    const query = {
      key: search,
      sortBy: sortBy,
      order: 'asc',
      limit: this.PAGE_SIZE,
      offset: (this.pagination.currentPage - 1) * this.PAGE_SIZE
    };

    const { count, admins } = await AdminService.getAdminList(query);
    return { count, admins };
  }

  userTypeToQuery(type) {
    if (type == "1") {
      return 'USER';
    }
    if (type == "2") {
      return 'ADMIN';
    }
    return undefined;
  }

  userStatusToQuery(status) {
    if (status == "1") {
      return 'ACTIVE';
    }
    if (status == "2") {
      return 'BLOCK';
    }
    return undefined;
  }

  userConfirmedToQuery(confirmed) {
    if (confirmed == "1") {
      return true;
    }
    if (confirmed == "2") {
      return false;
    }
    return undefined;
  }

  userSortToQuery(sort) {
    if (sort == 1) {
      return 'fullname';
    }
    if (sort == 2) {
      return 'email';
    }
    if (sort == 3) {
      return 'phoneNumber';
    }
    return undefined;
  }
}