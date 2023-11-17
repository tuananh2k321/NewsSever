var express = require("express");
var router = express.Router();
const jwt = require("jsonwebtoken");
const userService = require("../user/UserService");

//http://localhost:3000/user/api/login
router.post("/login", async (req, res, next) => {
  try {
    const { email } = req.body;
    const { password } = req.body;
    console.log(email, password);
    const user = await userService.findUserByEmail(email);
    //console.log(user);
    if (user) {
          const userLogin = await userService.login(email, password);
          if (userLogin) {
            const token = jwt.sign({ user }, "secret", { expiresIn: "1h" });
            return res
              .status(200)
              .json({
                result: true,
                user: user,
                token: token,
                message: "Login Success",
              });
          } else {
            return res
              .status(200)
              .json({
                result: false,
                user: null,
                token: null,
                message: "Sai tài khoản hoặc mật khẩu",
              });
          }
    } else {
      return res
        .status(200)
        .json({
          result: false,
          user: null,
          token: null,
          message: "Tài khoản không tồn tại",
        });
    }
  } catch (error) {
    console.log(error);
    // next(error); for web
    //api 200
    //error can control 400
    //error can't controll system 500
    return res.status(500).json({ result: false, message: "Error System" });
  }
});


//http://localhost:3000/user/api/register
router.post("/register", async (req, res, next) => {
    try {
      const {
        name, email, password
      } = req.body;
  
      const createAt = new Date(); // Lấy thời gian hiện tại
  
      const user = await userService.register(name, email, password, createAt);
      if (user) {
        return res
          .status(200)
          .json({ result: true, user: user, message: "Register Success" });
      } else {
        return res
        .status(200)
        .json({ result: false, user: null, message: "Email is exits" });
      }
    } catch (error) {
      return res.status(500).json({ result: false, user: null });
    }
  });
  


//http://localhost:3000/user/api/update
router.post("/update", async (req, res, next) => {
  try {
    const { email } = req.query;
    const { name, lastName, address, avatar, phoneNumber, dob } = req.body;
    console.log(email, name, address, dob, avatar, phoneNumber, lastName);
    const user = await userController.updateUser(
      email,
      name,
      address,
      avatar,
      phoneNumber,
      dob,
      lastName
    );
    console.log(user);
    if (user) {
      return res
        .status(200)
        .json({ result: true, user: user, message: "Update Success" });
    } else {
      return res
        .status(400)
        .json({ result: false, user: null, message: "User not exist" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ result: false, user: null });
  }
});


//http://localhost:3000/user/api/updatePasswordByEmail
router.post("/updatePasswordByEmail", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const user = await userController.updatePasswordByEmail(password, email);
    if (user) {
      return res
        .status(200)
        .json({ result: true, user: user, message: "Thay đổi thành công" });
    } else {
      return res
        .status(200)
        .json({ result: false, user: null, message: "Thay đổi thất bại" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ result: false });
  }
});



//http://localhost:3000/user/api/list
router.get("/list", async (req, res, next) => {
  try {
    const news = await news.getAllUser();
    console.log(users);
    return res.status(200).json({ result: true, news: news });
  } catch (error) {
    console.log("List news:" + error);
    return res
      .status(500)
      .json({ result: false, massage: "Can't get list user" });
  }
});

//http://localhost:3000/user/api/changePassword?email=""
router.post('/changePassword', async (req, res, next) => {
  try {
      
      const {email} = req.query
      const { newPassword, currentPassword} = req.body;
      console.log("currentPassword: ",currentPassword);
      console.log("newPassword: ",newPassword);
      const user = await userService.changePassword(currentPassword, newPassword, email);
      console.log(user)
      if (user) {
        return res.status(200).json({ result: true, user: user, message: "success" });
      } else {
        return res.status(200).json({ result: true, user: user, message: "fail" });
      }
  } catch (error) {
      console.log(error);
      return res.status(500).json({ result: false, user: null });
  }
});








//http://localhost:3000/user/api/delete
router.delete("/delete", async (req, res, next) => {
  try {
    const { email } = req.query;
    const user = await userController.deleteByEmail(email);
    if (user) {
      res.status(200).json({ result: true, message: "Delete Success" });
    } else {
      res.status(400).json({ result: false, massage: "Delete Failed" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ result: false, massage: "Error System" });
  }
});

module.exports = router;
