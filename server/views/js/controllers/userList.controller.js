
import toast from "../components/toast";
import UserService from "../services/user.service";
import Pagination from "../ui-components/pagination";
import UserListRow from "../ui-components/userListRow";

export default class UserListController {
  PAGE_SIZE = 10;

  currentPage = 1;

  constructor() {
    this.selectUserStatus = document.querySelector('select.user-status');
    this.selectUserConfirmed = document.querySelector('select.user-confirmed');
  }

  init() {
    this.selectUserStatus.addEventListener('change', async () => {
      await this.updUserRows();
    });

    this.selectUserConfirmed.addEventListener('change', async () => {
      await this.updUserRows();
    });

    document.addEventListener('DOMContentLoaded', async () => {
      await this.updUserRows();
    });
  }

  async updUserRows() {
    try {
      await this.updateUserRows();
      this.updatePagination();
    }
    catch (error) {
      console.log(error);
      toast.danger(error.message);
    }
  }

  async updateUserRows() {
    const { count, users } = await this.getUsers();
    this.totalPages = Math.ceil(count / this.PAGE_SIZE);

    console.log(users)
    const rows = users.map((user) => new UserListRow(user).toHtml()).join('\n');
    
    document.querySelector('table.user-list tbody').innerHTML = rows;
  }

  updatePagination() {
    const totalPages = Math.ceil(this.totalPages / this.PAGE_SIZE);
    
    const paginationHtml = new Pagination(this.currentPage, totalPages).toHtml();

    document.querySelector('nav.pagination').innerHTML = paginationHtml;

    const paginationLinks = document.querySelectorAll('a.pagination-link');
    paginationLinks.forEach((link) => {
      link.addEventListener('click', (event) => {
        event.preventDefault();
        if (link.classList.contains('pagination-link-prev-text')) {
          this.currentPage -= 1;
        }
        if (link.classList.contains('pagination-link-next-text')) {
          this.currentPage += 1;
        }
        if (link.classList.contains('pagination-link')) {
          this.currentPage = parseInt(link.textContent);
        }
        this.updateUserRows();
      });
    });
  }

  async getUsers() {
    const status = this.userStatusToQuery(this.selectUserStatus.value);
    const confirmed = this.userConfirmedToQuery(this.selectUserConfirmed.value);

    const query = {
      status: status,
      confirmed: confirmed,
      limit: this.PAGE_SIZE,
      offset: (this.currentPage - 1) * this.PAGE_SIZE,
    };

    const { count, users } = await UserService.getUsers(query);

    return { count, users };
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
}