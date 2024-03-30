const moment = require("moment");
async function getErrorMsg(error, path) {
    const error_name = await error.filter(function (el) {
        return el.path === path
    })
    return error_name.length ? error_name[0].msg : ''
}

function dateFormat(mdate) {
    return moment(mdate).format("DD-MM-YYYY");
}



module.exports = {getErrorMsg, dateFormat}