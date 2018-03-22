webpackJsonp([1],{

/***/ "./src/routes/Login/components/Login.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export Login */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__("./node_modules/react/react.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__("./node_modules/prop-types/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);



var Login = function Login(_ref) {
  var login = _ref.login,
      handleLogin = _ref.handleLogin,
      makeState = _ref.makeState,
      handleSignup = _ref.handleSignup;
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'div',
    { className: 'row' },
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'form',
      { onSubmit: function onSubmit(event) {
          event.preventDefault();
          handleLogin();
        } },
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'button',
        { className: 'btn btn-success', type: 'submit' },
        'Login'
      )
    )
  );
};
Login.propTypes = {
  login: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object.isRequired,
  handleLogin: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired,
  handleSignup: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired
};

/* harmony default export */ __webpack_exports__["a"] = (Login);

/***/ }),

/***/ "./src/routes/Login/containers/LoginContainer.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react_redux__ = __webpack_require__("./node_modules/react-redux/es/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__modules_login__ = __webpack_require__("./src/routes/Login/modules/login.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_Login__ = __webpack_require__("./src/routes/Login/components/Login.js");





var mapDispatchToProps = {
  handleLogin: __WEBPACK_IMPORTED_MODULE_1__modules_login__["handleLogin"],
  makeState: __WEBPACK_IMPORTED_MODULE_1__modules_login__["makeState"],
  handleSignup: __WEBPACK_IMPORTED_MODULE_1__modules_login__["handleSignup"]
};

var mapStateToProps = function mapStateToProps(state) {
  return {
    login: state.login
  };
};

/* harmony default export */ __webpack_exports__["default"] = (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react_redux__["connect"])(mapStateToProps, mapDispatchToProps)(__WEBPACK_IMPORTED_MODULE_2__components_Login__["a" /* default */]));

/***/ }),

/***/ "./src/routes/Login/modules/login.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LOGIN_FALSE", function() { return LOGIN_FALSE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HANDLE_LOGIN", function() { return HANDLE_LOGIN; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HANDLE_SIGNUP", function() { return HANDLE_SIGNUP; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SIGNUP_FAILED", function() { return SIGNUP_FAILED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MAKE_STATE", function() { return MAKE_STATE; });
/* harmony export (immutable) */ __webpack_exports__["handleSignup"] = handleSignup;
/* harmony export (immutable) */ __webpack_exports__["handleLogin"] = handleLogin;
/* harmony export (immutable) */ __webpack_exports__["makeState"] = makeState;
/* harmony export (immutable) */ __webpack_exports__["default"] = counterReducer;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__ = __webpack_require__("./node_modules/babel-runtime/helpers/defineProperty.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_api__ = __webpack_require__("./src/api.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_router__ = __webpack_require__("./node_modules/react-router/es/index.js");


var _ACTION_HANDLERS;




var LOGIN_FALSE = 'LOGIN_FALSE';
var HANDLE_LOGIN = 'HANDLE_LOGIN';
var HANDLE_SIGNUP = 'HANDLE SIGNUP';
var SIGNUP_FAILED = 'SIGNUP_FAILED';
var MAKE_STATE = 'MAKE_STATE';

function handleSignup() {
    return function (dispatch, getState) {
        return new Promise(function (resolve, reject) {
            dispatch({
                type: HANDLE_SIGNUP,
                payload: true,
                message: 'Handling signup!'
            });
            var body = {
                // email: getState().login.email,
                // password: getState().login.password
                name: "thien phu",
                email: "thienphu@gmail.com",
                password: "123123",
                password2: '123123'

            };
            __WEBPACK_IMPORTED_MODULE_1__src_api__["a" /* default */].post('/register', body).then(function (res) {
                if (res.data.success == true) {
                    dispatch({
                        type: SIGNUP_FAILED,
                        payload: true,
                        message: res.data.message
                    });
                } else {
                    dispatch({
                        type: HANDLE_LOGIN,
                        payload: true,
                        message: 'Handling login!'
                    });
                    var body = {
                        // email: getState().login.email,
                        // password: getState().login.password
                        email: "thienphu@gmail.com",
                        password: "123123"
                    };
                    __WEBPACK_IMPORTED_MODULE_1__src_api__["a" /* default */].post('/login', body).then(function (res) {
                        if (res.data.success == false) {
                            dispatch({
                                type: LOGIN_FAILED,
                                payload: true,
                                message: res.data.message
                            });
                        } else {
                            localStorage.setItem('access_token', res.data.token);
                            // var home = {...getState().login};
                            // home.doctor = response.doctor;
                            __WEBPACK_IMPORTED_MODULE_2_react_router__["browserHistory"].push('/');
                        }
                    }, function (err) {
                        console.log(err);
                        dispatch({
                            type: LOGIN_FALSE,
                            payload: true,
                            message: 'An error occurred!'
                        });
                    });
                    resolve();
                }
            }, function (err) {
                console.log(err);
                dispatch({
                    type: SIGNUP_FAILED,
                    payload: true,
                    message: 'An error occurred!'
                });
            });
            resolve();
        });
    };
}

function handleLogin() {
    return function (dispatch, getState) {
        return new Promise(function (resolve, reject) {
            dispatch({
                type: HANDLE_LOGIN,
                payload: true,
                message: 'Handling login!'
            });
            var body = {
                // email: getState().login.email,
                // password: getState().login.password
                email: "thienphu@gmail.com",
                password: "123123"
            };
            __WEBPACK_IMPORTED_MODULE_1__src_api__["a" /* default */].post('/login', body).then(function (res) {
                if (res.data.success == false) {
                    dispatch({
                        type: SIGNUP_FAILED,
                        payload: true,
                        message: res.data.message
                    });
                } else {
                    localStorage.setItem('access_token', res.data.token);
                    // var home = {...getState().login};
                    // home.doctor = response.doctor;
                    __WEBPACK_IMPORTED_MODULE_2_react_router__["browserHistory"].push('/');
                }
            }, function (err) {
                console.log(err);
                dispatch({
                    type: LOGIN_FALSE,
                    payload: true,
                    message: 'An error occurred!'
                });
            });
            resolve();
        });
    };
}

function makeState(key, text) {
    return {
        type: MAKE_STATE,
        payload: text,
        key: key
    };
}

var ACTION_HANDLERS = (_ACTION_HANDLERS = {}, __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_ACTION_HANDLERS, HANDLE_LOGIN, function (state, action) {
    return Object.assign({}, state, {
        message: action.message
    });
}), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_ACTION_HANDLERS, HANDLE_SIGNUP, function (state, action) {
    return Object.assign({}, state, {
        message: action.message
    });
}), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_ACTION_HANDLERS, LOGIN_FALSE, function (state, action) {
    return Object.assign({}, state, {
        dialog: action.payload,
        message: action.message
    });
}), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_ACTION_HANDLERS, SIGNUP_FAILED, function (state, action) {
    return Object.assign({}, state, {
        dialog: action.payload,
        message: action.message
    });
}), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_ACTION_HANDLERS, MAKE_STATE, function (state, action) {
    return Object.assign({}, state, __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()({}, action.key, action.payload));
}), _ACTION_HANDLERS);

var initialState = {
    dialog: false
};
function counterReducer() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var action = arguments[1];

    var handler = ACTION_HANDLERS[action.type];

    return handler ? handler(state, action) : state;
}

/***/ })

});
//# sourceMappingURL=1.js.map