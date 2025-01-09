
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

  getAdminProfile: (req, res) => {
    res.render('pages/admin-profile');
  },

  /**
   * 
   * @param {Express.Request} req 
   * @param {Express.Response} res 
   * @returns 
   */
  getProfile: (req, res) => {
    const { id } = req.query;
    if (!id) {
      return res.redirect('/404-error');
    }
    res.render('pages/profile');
  },

  getNotFound: (req, res) => {
    res.render('pages/404-error', { layout: false });
  },

  getServerError: (err, req, res, next) => {
    res.render('pages/500-error', { layout: false });
  },

}