var API_HOST = 'https://practicapi.herokuapp.com';

exports.API_HOST = API_HOST;

exports.LOGIN_URL    = API_HOST + '/user/login';
exports.LOGOUT_URL   = API_HOST + '/user/logout';
exports.REGISTER_URL = API_HOST + '/user/';


exports.USER_CONTESTS_REQUEST = API_HOST + "/user/:id/contests";
exports.USER_PRIZES_REQUEST   = API_HOST + "/user/:id/prizes";
exports.COMPANIES_REQUEST     = API_HOST + "/company";
