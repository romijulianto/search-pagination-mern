import User from "../models/UserModel.js";
import { Op } from "sequelize";

export const getUsers = async (req, res) => {
    /* current page convert to integer 
    if user doesn't send query.page, callback 0 */
    const page = parseInt(req.query.page) || 0;

    /* limit page for current page */
    const limit = parseInt(req.query.limit) || 10;

    /* search are need string, if do nothing
    callback empity string */
    const search = req.query.search_query || "";

    /* offset data for limit data to view */
    const offset = limit * page;

    /* count totalRows using count() 
    and using parameter to filter based on search */
    const totalRows = await User.count({
        where: {
            [Op.or]: [{
                name: {
                    [Op.like]: '%' + search + '%' // get character from front and back
                }
            }, {
                email: {
                    [Op.like]: '%' + search + '%'
                }
            }]
        }
    });

    /* create variablee to show total page 
    math.ceil = get value max from / */
    const totalPage = Math.ceil(totalRows / limit);

    /* create variable result for show result from search */
    const result = await User.findAll({
        where: {
            [Op.or]: [{
                name: {
                    [Op.like]: '%' + search + '%' // get character from front and back
                }
            }, {
                email: {
                    [Op.like]: '%' + search + '%'
                }
            }]
        },
        offset: offset,
        limit: limit,
        order: [
            ['id', 'DESC']
        ]
    });

    /* send result to json response */
    res.json({
        result: result,
        page: page,
        limit: limit,
        totalRows: totalRows,
        totalPage: totalPage
    });
}