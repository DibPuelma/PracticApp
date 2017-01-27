var API_HOST = 'http://192.168.0.11:3000';
//var API_HOST = 'http://10.201.114.20:3000';
exports.API_HOST = API_HOST;

exports.LOGIN_URL    = API_HOST + '/user/login';
exports.LOGOUT_URL   = API_HOST + '/user/logout';
exports.REGISTER_URL = API_HOST + '/user/';

exports.USER_CONTESTS_REQUEST = API_HOST + "/user/:id/contests";
exports.USER_PRIZES_REQUEST = API_HOST + "/user/:id/prizes";


