webpackJsonp([1],{472:function(e,t,n){"use strict";function o(){return function(e,t){return new Promise(function(t,n){e({type:g,payload:!0,message:"Handling signup!"});var o={name:"thien phu",email:"thienphu@gmail.com",password:"123123",password2:"123123"};l.a.post("/register",o).then(function(n){if(1==n.data.success)e({type:m,payload:!0,message:n.data.message});else{e({type:d,payload:!0,message:"Handling login!"});var o={email:"thienphu@gmail.com",password:"123123"};l.a.post("/login",o).then(function(t){0==t.data.success?e({type:LOGIN_FAILED,payload:!0,message:t.data.message}):(localStorage.setItem("access_token",t.data.token),p.browserHistory.push("/"))},function(t){console.log(t),e({type:f,payload:!0,message:"An error occurred!"})}),t()}},function(t){console.log(t),e({type:m,payload:!0,message:"An error occurred!"})}),t()})}}function r(){return function(e,t){return new Promise(function(t,n){e({type:d,payload:!0,message:"Handling login!"});var o={email:"thienphu@gmail.com",password:"123123"};l.a.post("/login",o).then(function(t){0==t.data.success?e({type:m,payload:!0,message:t.data.message}):(localStorage.setItem("access_token",t.data.token),p.browserHistory.push("/"))},function(t){console.log(t),e({type:f,payload:!0,message:"An error occurred!"})}),t()})}}function i(e,t){return{type:h,payload:t,key:e}}function a(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:b,t=arguments[1],n=y[t.type];return n?n(e,t):e}Object.defineProperty(t,"__esModule",{value:!0}),n.d(t,"LOGIN_FALSE",function(){return f}),n.d(t,"HANDLE_LOGIN",function(){return d}),n.d(t,"HANDLE_SIGNUP",function(){return g}),n.d(t,"SIGNUP_FAILED",function(){return m}),n.d(t,"MAKE_STATE",function(){return h}),t.handleSignup=o,t.handleLogin=r,t.makeState=i,t.default=a;var s,u=n(202),c=n.n(u),l=n(117),p=n(37),f="LOGIN_FALSE",d="HANDLE_LOGIN",g="HANDLE SIGNUP",m="SIGNUP_FAILED",h="MAKE_STATE",y=(s={},c()(s,d,function(e,t){return Object.assign({},e,{message:t.message})}),c()(s,g,function(e,t){return Object.assign({},e,{message:t.message})}),c()(s,f,function(e,t){return Object.assign({},e,{dialog:t.payload,message:t.message})}),c()(s,m,function(e,t){return Object.assign({},e,{dialog:t.payload,message:t.message})}),c()(s,h,function(e,t){return Object.assign({},e,c()({},t.key,t.payload))}),s),b={dialog:!1}},473:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=n(62),r=n(472),i=n(474),a={handleLogin:r.handleLogin,makeState:r.makeState,handleSignup:r.handleSignup},s=function(e){return{login:e.login}};t.default=n.i(o.connect)(s,a)(i.a)},474:function(e,t,n){"use strict";var o=n(5),r=n.n(o),i=n(6),a=n.n(i),s=n(476),u=(n.n(s),n(475)),c=(n.n(u),function(e){console.log(e)}),l=function(e){var t=(e.login,e.handleLogin);e.makeState,e.handleSignup;return r.a.createElement("div",{className:"row"},r.a.createElement(s.GoogleLogin,{className:"btn btn-danger form-inline",clientId:"878435691543-6onie784kklsgrjhmbketu5lkq465t1l.apps.googleusercontent.com",onSuccess:c,onFailure:c},r.a.createElement("div",{className:"google-search-icon form-control"}),r.a.createElement("span",{className:"form-control",style:{backgroundColor:"inherit",color:"#fff",border:"unset"}},"Login in With Google")),r.a.createElement("form",{onSubmit:function(e){e.preventDefault(),t()}},r.a.createElement("button",{className:"btn btn-success",type:"submit"},"Login")),r.a.createElement("div",{className:"fb-login-button","data-max-rows":"1","data-size":"large","data-button-type":"login_with","data-show-faces":"false","data-auto-logout-link":"false","data-use-continue-as":"false",onClick:function(){return r.a.createElement("script",null,"checkLoginState()")}}))};l.propTypes={login:a.a.object.isRequired,handleLogin:a.a.func.isRequired,handleSignup:a.a.func.isRequired},t.a=l},475:function(e,t){},476:function(e,t,n){!function(t,o){e.exports=o(n(5))}(0,function(e){return function(e){function t(o){if(n[o])return n[o].exports;var r=n[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,t),r.l=!0,r.exports}var n={};return t.m=e,t.c=n,t.d=function(e,n,o){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:o})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=3)}([function(e,t,n){"use strict";function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var a=n(1),s=n.n(a),u=n(2),c=(n.n(u),function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}()),l=function(e){function t(e){o(this,t);var n=r(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.signIn=n.signIn.bind(n),n.enableButton=n.enableButton.bind(n),n.state={disabled:!0},n}return i(t,e),c(t,[{key:"componentDidMount",value:function(){var e=this,t=this.props,n=t.clientId,o=t.cookiePolicy,r=t.loginHint,i=t.hostedDomain,a=t.autoLoad,s=t.isSignedIn,u=t.fetchBasicProfile,c=t.redirectUri,l=t.discoveryDocs,p=t.onFailure,f=t.uxMode,d=t.scope,g=t.accessType,m=t.responseType,h=t.jsSrc;!function(e,t,n,o){var r=e.getElementsByTagName(t)[0],i=r,a=r;a=e.createElement(t),a.id="google-login",a.src=h,i&&i.parentNode?i.parentNode.insertBefore(a,i):e.head.appendChild(a),a.onload=o}(document,"script",0,function(){var t={client_id:n,cookie_policy:o,login_hint:r,hosted_domain:i,fetch_basic_profile:u,discoveryDocs:l,ux_mode:f,redirect_uri:c,scope:d,access_type:g};"code"===m&&(t.access_type="offline"),window.gapi.load("auth2",function(){e.enableButton(),window.gapi.auth2.getAuthInstance()||window.gapi.auth2.init(t).then(function(t){s&&t.isSignedIn.get()&&e.handleSigninSuccess(t.currentUser.get())},function(e){return p(e)}),a&&e.signIn()})})}},{key:"componentWillUnmount",value:function(){this.enableButton=function(){}}},{key:"enableButton",value:function(){this.setState({disabled:!1})}},{key:"signIn",value:function(e){var t=this;if(e&&e.preventDefault(),!this.state.disabled){var n=window.gapi.auth2.getAuthInstance(),o=this.props,r=o.onSuccess,i=o.onRequest,a=o.onFailure,s=o.prompt,u=o.responseType,c={prompt:s};i(),"code"===u?n.grantOfflineAccess(c).then(function(e){return r(e)},function(e){return a(e)}):n.signIn(c).then(function(e){return t.handleSigninSuccess(e)},function(e){return a(e)})}}},{key:"handleSigninSuccess",value:function(e){var t=e.getBasicProfile(),n=e.getAuthResponse();e.googleId=t.getId(),e.tokenObj=n,e.tokenId=n.id_token,e.accessToken=n.access_token,e.profileObj={googleId:t.getId(),imageUrl:t.getImageUrl(),email:t.getEmail(),name:t.getName(),givenName:t.getGivenName(),familyName:t.getFamilyName()},this.props.onSuccess(e)}},{key:"render",value:function(){var e=this.props,t=e.tag,n=e.type,o=e.style,r=e.className,i=e.disabledStyle,a=e.buttonText,u=e.children,c=this.state.disabled||this.props.disabled,l={display:"inline-block",background:"#d14836",color:"#fff",width:190,paddingTop:10,paddingBottom:10,borderRadius:2,border:"1px solid transparent",fontSize:16,fontWeight:"bold",fontFamily:"Roboto"},p=function(){return o||(r&&!o?{}:l)}(),f=function(){return c?Object.assign({},p,i):p}();return s.a.createElement(t,{onClick:this.signIn,style:f,type:n,disabled:c,className:r},u||a)}}]),t}(a.Component);l.defaultProps={type:"button",tag:"button",buttonText:"Login with Google",scope:"profile email",accessType:"online",prompt:"",cookiePolicy:"single_host_origin",fetchBasicProfile:!0,isSignedIn:!1,uxMode:"popup",disabledStyle:{opacity:.6},onRequest:function(){},jsSrc:"https://apis.google.com/js/client:platform.js"},t.a=l},function(t,n){t.exports=e},function(e,t,n){"function"==typeof Symbol&&Symbol.iterator,e.exports=n(5)()},function(e,t,n){e.exports=n(4)},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=n(0);n.d(t,"default",function(){return o.a}),n.d(t,"GoogleLogin",function(){return o.a});var r=n(9);n.d(t,"GoogleLogout",function(){return r.a})},function(e,t,n){"use strict";var o=n(6),r=n(7),i=n(8);e.exports=function(){function e(e,t,n,o,a,s){s!==i&&r(!1,"Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types")}function t(){return e}e.isRequired=e;var n={array:e,bool:e,func:e,number:e,object:e,string:e,symbol:e,any:e,arrayOf:t,element:e,instanceOf:t,node:e,objectOf:t,oneOf:t,oneOfType:t,shape:t,exact:t};return n.checkPropTypes=o,n.PropTypes=n,n}},function(e,t,n){"use strict";function o(e){return function(){return e}}var r=function(){};r.thatReturns=o,r.thatReturnsFalse=o(!1),r.thatReturnsTrue=o(!0),r.thatReturnsNull=o(null),r.thatReturnsThis=function(){return this},r.thatReturnsArgument=function(e){return e},e.exports=r},function(e,t,n){"use strict";function o(e,t,n,o,i,a,s,u){if(r(t),!e){var c;if(void 0===t)c=new Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");else{var l=[n,o,i,a,s,u],p=0;c=new Error(t.replace(/%s/g,function(){return l[p++]})),c.name="Invariant Violation"}throw c.framesToPop=1,c}}var r=function(e){};e.exports=o},function(e,t,n){"use strict";e.exports="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"},function(e,t,n){"use strict";function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var a=n(1),s=n.n(a),u=n(2),c=(n.n(u),function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}()),l=function(e){function t(e){o(this,t);var n=r(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.state={disabled:!0},n.signOut=n.signOut.bind(n),n}return i(t,e),c(t,[{key:"componentDidMount",value:function(){var e=this,t=this.props.jsSrc;!function(e,n,o,r){var i=e.getElementsByTagName(n)[0],a=i,s=i;s=e.createElement(n),s.id="google-login",s.src=t,a&&a.parentNode?a.parentNode.insertBefore(s,a):e.head.appendChild(s),s.onload=r}(document,"script",0,function(){window.gapi.load("auth2",function(){e.setState({disabled:!1})})})}},{key:"signOut",value:function(){var e=window.gapi.auth2.getAuthInstance();null!=e&&e.signOut().then(this.props.onLogoutSuccess)}},{key:"render",value:function(){var e=this.props,t=e.tag,n=e.style,o=e.className,r=e.disabledStyle,i=e.buttonText,a=e.children,u=this.state.disabled||this.props.disabled,c={display:"inline-block",background:"#d14836",color:"#fff",width:190,paddingTop:10,paddingBottom:10,borderRadius:2,border:"1px solid transparent",fontSize:16,fontWeight:"bold",fontFamily:"Roboto"},l=function(){return n||(o&&!n?{}:c)}(),p=function(){return u?Object.assign({},l,r):l}();return s.a.createElement(t,{onClick:this.signOut,style:p,disabled:u,className:o},a||i)}}]),t}(a.Component);l.defaultProps={tag:"button",buttonText:"Logout",disabledStyle:{opacity:.6},jsSrc:"https://apis.google.com/js/client:platform.js"},t.a=l}])})}});
//# sourceMappingURL=1.11439ff703f8331d038e.js.map