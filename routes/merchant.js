const router = require("express").Router();
// Bring in the User Registration function
const {
  merchantAuth,
  merchantLogin,
  checkRole,
  merchantRegister,
  serializeUser
} = require("../utils/Auth");



// Merchant Registration Route
router.post("/register", async (req, res) => {
  await merchantRegister(req.body, "owner", res);
});

// Merchant Registration Route
router.post("/register-stuff", async (req, res) => {
    await merchantRegister(req.body, "stuff", res);
  });

// Merchant-Owner Login Route
router.post("/login", async (req, res) => {
  await merchantLogin(req.body, "owner", res);
});

// Merchant-Stuff Login Route
router.post("/login-stuff", async (req, res) => {
    await merchantLogin(req.body, "stuff", res);
  });


// Profile Route
router.get("/profile", merchantAuth, async (req, res) => {
  return res.json(serializeUser(req.user));
});

// Super Admin Protected Route
router.get(
  "/super-admin-and-admin-protectd",
  merchantAuth,
  checkRole(["superadmin", "admin"]),
  async (req, res) => {
    return res.json("Super admin and Admin");
  }
);

module.exports = router;
