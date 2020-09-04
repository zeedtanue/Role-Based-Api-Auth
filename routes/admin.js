const router = require("express").Router();
// Bring in the User Registration function
const {
  adminAuth,
  adminLogin,
  checkRole,
  adminRegister,
  serializeUser
} = require("../utils/Auth");

// Users Registeration Route
router.route("/register")
    .post(async (req, res) => {
        await adminRegister(req.body, "admin", res);
      });

router.route("/register-executive")
      .post( async (req, res) => {
        await adminRegister(req.body, "executive", res);
      })
  
  


// Admin Login Route
router.post("/login-executive", async (req, res) => {
  await adminLogin(req.body, "executive", res);
});



// Admin Login Route
router.post("/login", async (req, res) => {
    await adminLogin(req.body, "admin", res);
  });


// Profile Route
router.get("/profile", adminAuth, async (req, res) => {
  return res.json(serializeUser(req.user));
});



// Admin Protected Route
router.get(
  "/admin-protectd",
  adminAuth,
  checkRole(["admin"]),
  async (req, res) => {
    return res.json("Hello Admin");
  }
);

// Super Admin Protected Route
router.get(
  "/super-admin-and-admin-protectd",
  adminAuth,
  checkRole(["superadmin", "admin"]),
  async (req, res) => {
    return res.json("Super admin and Admin");
  }
);

module.exports = router;
