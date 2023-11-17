const newsModel = require('./NewsModel')



const addNews = async (title, image, description, specific, country, createAt) => {
    try {
        const news = {  title, image, description, specific, country, createAt };
        const u = new newsModel(news);
        await u.save();
        return u;
        
    } catch (error) {
        console.log("Register error service: " + error)
    }
}

const getAllNews = async () => {
    try {
        // return data;
        const news = newsModel.find()
        if (news) {
            return news
        } else {
            return false
        }
    } catch (error) {
        console.log("List user Got an error: " + error);
        throw error;
    }
}

const newsDetail = async (id) => {
    try {
        const news = await newsModel.findOne({ _id: id })
        console.log(news)
        if (news) {
            return news;
        } else {
            return false; 
        }
        
    } catch (error) {
        console.log("Delete User  error" + error);
        return false;

    }
}

module.exports = {
    addNews, getAllNews, newsDetail
};