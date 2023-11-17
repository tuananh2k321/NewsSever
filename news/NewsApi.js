var express = require("express");
var router = express.Router();
const newService = require("./NewsService")

//http://localhost:3000/news/api/add-news
router.post("/add-news", async (req, res, next) => {
  try {
      const {
          title, image, description, specific, country,
      } = req.body;

      const createdAt = new Date();
      const day = createdAt.getDate();
      const month = createdAt.getMonth() + 1; // Tháng bắt đầu từ 0, nên cộng thêm 1
      const year = createdAt.getFullYear();

      // Tạo một đối tượng Date chỉ chứa ngày, tháng, năm (giờ, phút, giây giữ nguyên)
      const createAtWithDateOnly = new Date(year, month - 1, day); // Tháng bắt đầu từ 0, nên trừ đi 1

      const news = await newService.addNews(title, image, description, specific, country, createAtWithDateOnly);
      if (news) {
          return res
              .status(200)
              .json({ result: true, news: news, message: "Success" });
      } else {
          return res
              .status(200)
              .json({ result: false, news: null, message: "fail" });
      }
  } catch (error) {
      return res.status(500).json({ result: false, news: null });
  }
});


//http://localhost:3000/news/api/news-list
router.get("/news-list", async (req, res, next) => {
    try {
      const news = await newService.getAllNews();
      // console.log(news);
      return res.status(200).json({ result: true, news: news });
    } catch (error) {
      console.log("List User:" + error);
      return res
        .status(500)
        .json({ result: false, massage: "Can't get list user" });
    }
  });

//http://localhost:3000/news/api/news-detail?id=""
router.get("/news-detail", async (req, res, next) => {
    try {
        const {id} = req.query
      const news = await newService.newsDetail(id);
      console.log(news);
      return res.status(200).json({ result: true, news: news });
    } catch (error) {
      console.log("news-detail:" + error);
    }
  });

module.exports = router;