
export default {
  getIndex: (req, res) => {
    res.render('pages/index');
  },

  getLogin: (req, res) => {
    res.render('pages/login', { layout: false });
  },

  getUserList: (req, res) => {
    res.render('pages/user-list');
  },

  getRevenueReport: (req, res) => {
    res.render('pages/revenue-report');
  },

  getAdminProfile: (req, res) => {
    res.render('pages/admin-profile');
  },

  getTopRevenueReportByProduct: (req, res) => {
    res.render('pages/top-revenue-report');
  },

  getProfile: (req, res) => {
    const { id } = req.query;
    if (!id) {
      return res.redirect('/404-error');
    }
    res.render('pages/profile');
  },

  getAdminProfile: (req, res) => {
    res.render('pages/admin-profile');
  },

  getProductListPage: (req, res) => {
    res.render('pages/product-list');
  },

  getProductEditPage: (req, res) => {
    res.render('pages/product-edit');
  },

  getProductAddPage: (req, res) => {
    res.render('pages/product-add');
  },

  getOrderListPage: (req, res) => {
    res.render('pages/order-list');
  },

  getOrderEditPage: (req, res) => {
    res.render('pages/order-details');
  },

  getNotFound: (req, res) => {
    res.render('pages/404-error', { layout: false });
  },

  getServerError: (err, req, res, next) => {
    res.render('pages/500-error', { layout: false });
  },

}