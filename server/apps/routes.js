import express from "express";
import controller from "./controller.js";
const router = express.Router();

/**
 * @param {express.Request} req
 */
router.use((req, res, next) => {
  res.locals.path = req.url.split("?")[0];
  next();
});

router.get("/", controller.getIndex);

router.get("/login", controller.getLogin);

router.get("/user-list", controller.getUserList);

router.get("/admin-profile", controller.getAdminProfile);

router.get(
    '/revenue-report',
    controller.getRevenueReport
);

router.get(
    '/top-revenue-report',
    controller.getTopRevenueReportByProduct
);

router.get("/profile", controller.getProfile);

router.get("/product-list", controller.getProductListPage);

router.get("/product-edit", controller.getProductEditPage);

router.get("/product-add", controller.getProductAddPage);

router.get("/order-list", controller.getOrderListPage);

router.get("/order-details", controller.getOrderEditPage);

// -------------- ERROR PAGES --------------

router.get("*", controller.getNotFound);

router.use(controller.getServerError);

export default router;
