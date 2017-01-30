var API_HOST = 'https://practicapi.herokuapp.com';

exports.API_HOST = API_HOST;

exports.LOGIN_URL    = API_HOST + '/user/login';
exports.LOGOUT_URL   = API_HOST + '/user/logout';
exports.REGISTER_URL = API_HOST + '/user/';

exports.USER_REQUEST             = API_HOST + "/user/:id";
exports.USER_CONTESTS_REQUEST    = API_HOST + "/user/:id/contests";
exports.USER_PRIZES_REQUEST      = API_HOST + "/user/:id/prizes";
exports.USER_EVALUATIONS_REQUEST = API_HOST + "/user/:id/answered_poll";
exports.EVALUATIONS_DETAILS_REQUEST = API_HOST + "/user/:user_id/answered_poll/:answered_poll_id";

exports.SELLPOINT_BY_CODE_REQUEST = API_HOST + "/QR/:code/sellpoint";
exports.SELLPOINT_POLL_REQUEST = API_HOST + "/company/:company_id/sell_point/:sell_point_id/:poll_type";

exports.COMPANIES_REQUEST     = API_HOST + "/company";
