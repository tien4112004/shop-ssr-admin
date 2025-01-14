export default class Pagination {
  MAX_PAGES = 7;

  /**
   * 
   */
  constructor(parent, onPageChange) {
    console.log(parent)
    this.parent = parent;
    this.currentPage = 1;
    this.totalPages = 0;

    this.onPageChange = onPageChange;
  }

  setCurrentPage(value) {
    this.currentPage = value;
    this.apply();
  }

  setTotalPages(value) {
    this.totalPages = value;
    this.apply();
  }

  apply() {
    this.parent.innerHTML = this.#toHtml();
    
    document.querySelectorAll('a.pagination-link')
    .forEach((link) => {
      link.addEventListener('click', (event) => {
        event.preventDefault();

        const prevPage = this.currentPage;

        if (link.classList.contains('pagination-link-prev-text')) {
          this.currentPage -= 1;
        }
        else if (link.classList.contains('pagination-link-next-text')) {
          this.currentPage += 1;
        }
        else if (link.classList.contains('pagination-link')) {
          this.currentPage = parseInt(link.textContent);
        }

        this.currentPage = Math.max(1, Math.min(this.currentPage, this.totalPages));

        if (prevPage !== this.currentPage)
          this.onPageChange();
      });
    });
  }

  #toHtml() {
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