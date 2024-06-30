const NewsModel = require('../../models/news');

const DeleteHeadline = async (req, res) => {
    try {
        const { item, index, bookmarks, email } = req.body;

        const result = await NewsModel.updateOne(
            { email: email },
            {   $pull: {  [`bookmarked.${item}`]: bookmarks[item][index] }   }
        );
        if (result.modifiedCount > 0) {
            return res.json("success");
        } else {
            return res.json("not deleted");
        }
    } catch (err) {
        console.error(err);
        return res.json('error');
    }
}

module.exports = DeleteHeadline;
