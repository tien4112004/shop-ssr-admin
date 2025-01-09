

export default class Pagination {
  MAX_PAGES = 7;

  /**
   * 
   * @param {*} count 
   * @param {*} pageSize 
   * @param {*} currentPage 
   */
  constructor(currentPage, totalPages) {
    this.currentPage = currentPage;
    this.totalPages = Math.max(totalPages, 1);
  }

  toHtml() {
    return this.#toHtmlBasic.totalPages <= this.MAX_PAGES ? this.#toHtmlBasic() : this.#toHtmlMore();
  }

  #toHtmlBasic() {
    const pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    return `
    <ul class="pagination-list">
        <li class="pagination-item ${this.currentPage === 1 ? 'disabled' : ''}">
            <a class="pagination-link pagination-link-prev-text" href="#"> Previous </a>
        </li>

        ${pages.map(page => `
          <li class="pagination-item ${page === this.currentPage ? 'active' : ''}">
              <a class="pagination-link" href="#">${page}</a>
          </li>
        `).join('\n')}

        <li class="pagination-item ${this.currentPage === this.totalPages ? 'disabled' : ''}">
            <a class="pagination-link pagination-link-next-text" href="#"> Next </a>
        </li>
    </ul>
`;

  }

  #toHtmlMore() {
    const start = Math.max(1, this.currentPage - 1);
    const end = Math.min(this.totalPages, this.currentPage + 1);

    const f = start != 1;
    const l = end != this.totalPages;
    const fist3d = this.currentPage > 2;
    const last3d = end < this.totalPages - 1;

    return `
    <ul class="pagination-list">
        <li class="pagination-item ${this.currentPage === 1 ? 'disabled' : ''}">
            <a class="pagination-link pagination-link-prev-text" href="#"> Previous </a>
        </li>
        ${!f ? '' : `
          <li class="pagination-item">
              <a class="pagination-link" href="#">1</a>
          </li>
        `}

        ${!fist3d ? '' : `
          <li class="pagination-item disabled">
              <span class="pagination-link pagination-link-more"> ... </span>
          </li>
        `}

        ${Array.from({ length: end - start + 1 }, (_, i) => i + start).map(page => `
          <li class="pagination-item ${page === this.currentPage ? 'active' : ''}">
              <a class="pagination-link" href="#">${page}</a>
          </li>
        `).join('\n')}

        ${!last3d ? '' : `
          <li class="pagination-item disabled">
              <span class="pagination-link pagination-link-more"> ... </span>
          </li>
        `}

        ${!l ? '' : `
          <li class="pagination-item">
              <a class="pagination-link" href="#">${this.totalPages}</a>
          </li>
        `}
        <li class="pagination-item ${this.currentPage === this.totalPages ? 'disabled' : ''}">
            <a class="pagination-link pagination-link-next-text" href="#"> Next </a>
        </li>
    </ul>
    `;
  }
}