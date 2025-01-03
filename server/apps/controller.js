
export default {
  getIndex: (req, res) => {
    res.render('pages/index');
  },

  getUserList: (req, res) => {
    res.render('pages/user-list');
  },

  getAdminProfile: (req, res) => {
    res.render('pages/admin-profile');
  },

  getNotFound: (req, res) => {
    res.render('pages/404-error');
  },

  getServerError: (err, req, res, next) => {
    res.render('pages/500-error');
  },
}