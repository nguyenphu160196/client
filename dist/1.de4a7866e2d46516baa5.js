webpackJsonp([1],{654:function(e,t,a){"use strict";function n(){var e=void 0!==window.pageXOffset,t="CSS1Compat"===(document.compatMode||""),a={x:e?window.pageXOffset:t?document.documentElement.scrollLeft:document.body.scrollLeft,y:e?window.pageYOffset:t?document.documentElement.scrollTop:document.body.scrollTop};return function(e,t){Object.assign({},t().login);a.y>0?e({type:v,payload:"block"}):0==a.y&&e({type:v,payload:"none"})}}function o(){return function(e,t){return new Promise(function(a,n){e({type:h,payload:"block"});var o={name:t().login.name,email:t().login.email,password:t().login.password,password2:t().login.password2};d.a.post("/register",o).then(function(n){if(0==n.data.success)e({type:y,payload:!0,message:n.data.message?n.data.message:"The password does not match!"});else{e({type:m,payload:"block"});var o={email:t().login.email,password:t().login.password};d.a.post("/login",o).then(function(t){0==t.data.success?e({type:f,payload:!0,message:t.data.message}):(localStorage.setItem("access_token",t.data.token),localStorage.setItem("user",JSON.stringify(t.data.user)),p.browserHistory.push("/"),e({type:C,payload:"none"}))},function(t){console.log(t),e({type:f,payload:!0,message:"An error occurred!"})}),a()}},function(t){console.log(t),e({type:y,payload:!0,message:"An error occurred!"})}),a()})}}function l(){return function(e,t){return new Promise(function(a,n){e({type:m,payload:!0,message:"Handling login!"});var o={email:t().login.email,password:t().login.password};d.a.post("/login",o).then(function(t){0==t.data.success?e({type:f,payload:!0,message:t.data.message}):(localStorage.setItem("access_token",t.data.token),localStorage.setItem("user",JSON.stringify(t.data.user)),e({type:C,payload:"none"}),p.browserHistory.push("/"))},function(t){console.log(t),e({type:f,payload:!0,message:"An error occurred!"})}),a()})}}function r(e,t){return{type:g,payload:t,key:e}}function i(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:w,t=arguments[1],a=N[t.type];return a?a(e,t):e}Object.defineProperty(t,"__esModule",{value:!0}),a.d(t,"LOGIN_FALSE",function(){return f}),a.d(t,"HANDLE_LOGIN",function(){return m}),a.d(t,"HANDLE_SIGNUP",function(){return h}),a.d(t,"SIGNUP_FAILED",function(){return y}),a.d(t,"MAKE_STATE",function(){return g}),a.d(t,"ICON_CHANGE",function(){return v}),a.d(t,"SIGNUP_CLICK",function(){return b}),a.d(t,"SIGNUP_CANCEL",function(){return E}),a.d(t,"CLOSE_DIALOG",function(){return k}),a.d(t,"LOAD_SUCCESS",function(){return C}),t.handleScroll=n,t.handleSignup=o,t.handleLogin=l,t.makeState=r,a.d(t,"closeDialog",function(){return S}),a.d(t,"signupClick",function(){return _}),a.d(t,"signupCancel",function(){return T}),t.default=i;var s,u=a(284),c=a.n(u),d=a(168),p=a(63),f="LOGIN_FALSE",m="HANDLE_LOGIN",h="HANDLE SIGNUP",y="SIGNUP_FAILED",g="MAKE_STATE",v="ICON_CHANGE",b="SIGNUP_CLICK",E="SIGNUP_CANCEL",k="CLOSE_DIALOG",C="LOAD_SUCCESS",S=function(){return{type:k,payload:!1}},_=function(){return{type:b,payload:"block"}},T=function(){return{type:E,payload:"none"}},w={display:"none",message:"",dialog:!1,icon:"none",block:"none"},N=(s={},c()(s,v,function(e,t){return Object.assign({},e,{icon:t.payload})}),c()(s,k,function(e,t){return Object.assign({},e,{dialog:t.payload,block:"none"})}),c()(s,b,function(e,t){return Object.assign({},e,{display:t.payload})}),c()(s,E,function(e,t){return Object.assign({},e,{display:t.payload})}),c()(s,m,function(e,t){return Object.assign({},e,{block:t.payload})}),c()(s,h,function(e,t){return Object.assign({},e,{block:t.payload})}),c()(s,C,function(e,t){return Object.assign({},e,{block:t.payload})}),c()(s,f,function(e,t){return Object.assign({},e,{dialog:t.payload,message:t.message,block:"none"})}),c()(s,y,function(e,t){return Object.assign({},e,{dialog:t.payload,message:t.message,block:"none"})}),c()(s,g,function(e,t){return Object.assign({},e,c()({},t.key,t.payload))}),s)},655:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=a(96),o=a(654),l=a(660),r={handleLogin:o.handleLogin,makeState:o.makeState,handleSignup:o.handleSignup,handleScroll:o.handleScroll,closeDialog:o.closeDialog,signupClick:o.signupClick,signupCancel:o.signupCancel},i=function(e){return{login:e.login}};t.default=a.i(n.connect)(i,r)(l.a)},656:function(e,t,a){"use strict";var n=a(280),o=a.n(n),l=a(281),r=a.n(l),i=a(283),s=a.n(i),u=a(282),c=a.n(u),d=a(0),p=a.n(d),f=a(667),m=a.n(f),h=a(670),y=a.n(h),g=function(e){function t(){return o()(this,t),s()(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return c()(t,e),r()(t,[{key:"render",value:function(){var e=[p.a.createElement(y.a,{label:"OK",primary:!0,onClick:this.props.closeDialog})];return p.a.createElement("div",null,p.a.createElement(m.a,{actions:e,modal:!1,open:this.props.dialog,onRequestClose:this.props.closeDialog,contentStyle:{width:"40%"}},this.props.message))}}]),t}(p.a.Component);t.a=g},657:function(e,t,a){"use strict";var n=a(280),o=a.n(n),l=a(281),r=a.n(l),i=a(283),s=a.n(i),u=a(282),c=a.n(u),d=a(0),p=a.n(d),f=a(665),m=a.n(f),h=function(e){function t(){return o()(this,t),s()(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return c()(t,e),r()(t,[{key:"render",value:function(){return p.a.createElement("div",{style:{backgroundColor:"rgba(0,0,0,0.5)",position:"fixed",width:"100%",height:"100%",zIndex:3,display:this.props.display}},p.a.createElement("div",{style:{height:"40px",display:"block",margin:"auto"}},p.a.createElement(m.a,{size:70,thickness:7,color:"white"})))}}]),t}(p.a.Component);t.a=h},658:function(e,t,a){"use strict";var n=a(280),o=a.n(n),l=a(281),r=a.n(l),i=a(283),s=a.n(i),u=a(282),c=a.n(u),d=a(0),p=a.n(d),f=a(661),m=(a.n(f),a(656)),h=a(287),y=(a.n(h),function(e){console.log(e)}),g=function(e){function t(e){return o()(this,t),s()(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e))}return c()(t,e),r()(t,[{key:"componentDidMount",value:function(){window.addEventListener("scroll",this.props.handleScroll)}},{key:"componentWillUnmount",value:function(){window.removeEventListener("scroll",this.props.handleScroll)}},{key:"render",value:function(){var e=this;return p.a.createElement("div",{className:"login-field col-5"},p.a.createElement("div",{className:"icon2x"}),p.a.createElement("h1",null,'"Cut Air"'),p.a.createElement("p",null,"Login in With Cut-air"),p.a.createElement("form",{onSubmit:function(t){t.preventDefault(),e.props.handleLogin()}},p.a.createElement("input",{type:"email",onChange:function(t){e.props.makeState("email",t.target.value)},name:"email",placeholder:"Email",required:!0}),p.a.createElement("input",{type:"password",onChange:function(t){e.props.makeState("password",t.target.value)},name:"password",placeholder:"Password",required:!0}),p.a.createElement("button",{type:"submit"},"Login in"),p.a.createElement("div",{className:"form-group remember-me"},p.a.createElement(h.GoogleLogin,{className:"btn btn-danger form-control form-inline btn-gmail",clientId:"878435691543-6onie784kklsgrjhmbketu5lkq465t1l.apps.googleusercontent.com",onSuccess:y,onFailure:y},p.a.createElement("div",{className:"google-search-icon form-control"}),p.a.createElement("span",{className:"form-control",style:{backgroundColor:"inherit",color:"#fff",border:"unset"}},"Login in With Google"))),p.a.createElement("div",{className:"form-group remember-me"},p.a.createElement("div",{className:"fb-login-button","data-width":"320px","data-max-rows":"1","data-size":"large","data-button-type":"login_with","data-show-faces":"false","data-auto-logout-link":"false","data-use-continue-as":"true",onClick:function(){return p.a.createElement("script",null,"checkLoginState()")}}))),p.a.createElement(m.a,{dialog:this.props.dialog,message:this.props.message,closeDialog:this.props.closeDialog}))}}]),t}(p.a.Component);t.a=g},659:function(e,t,a){"use strict";var n=a(280),o=a.n(n),l=a(281),r=a.n(l),i=a(283),s=a.n(i),u=a(282),c=a.n(u),d=a(0),p=a.n(d),f=a(662),m=(a.n(f),function(e){function t(e){return o()(this,t),s()(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e))}return c()(t,e),r()(t,[{key:"render",value:function(){var e=this;return p.a.createElement("div",{className:"sign-up col-12",style:{display:this.props.display}},p.a.createElement("div",{className:"signup-popup col-4"},p.a.createElement("div",{className:"signup-label"},p.a.createElement("label",null,"Sign Up")),p.a.createElement("form",{onSubmit:function(t){t.preventDefault(),e.props.handleSignup()}},p.a.createElement("input",{type:"text",onChange:function(t){e.props.makeState("name",t.target.value)},name:"username",placeholder:"Username",required:!0}),p.a.createElement("input",{type:"email",onChange:function(t){e.props.makeState("email",t.target.value)},name:"email",placeholder:"Email",required:!0}),p.a.createElement("input",{type:"password",onChange:function(t){e.props.makeState("password",t.target.value)},name:"password",placeholder:"Password",required:!0}),p.a.createElement("input",{type:"password",onChange:function(t){e.props.makeState("password2",t.target.value)},name:"re-password",placeholder:"Re-Password",required:!0}),p.a.createElement("div",{className:"btn_form"},p.a.createElement("input",{type:"submit",className:"signup-submit",value:"Sign Up"}),p.a.createElement("input",{type:"button",onClick:this.props.onCancel,className:"signup-cancel",value:"Cancel"})))))}}]),t}(p.a.Component));t.a=m},660:function(e,t,a){"use strict";var n=a(0),o=a.n(n),l=a(1),r=a.n(l),i=a(663),s=(a.n(i),a(657)),u=a(659),c=a(658),d=function(e){var t=e.login,a=e.handleLogin,n=e.makeState,l=e.handleSignup,r=e.handleScroll,i=e.closeDialog,d=e.signupClick,p=e.signupCancel;return o.a.createElement("div",{style:{margin:"0px!important",padding:"0px!important"}},o.a.createElement(s.a,{display:t.block}),o.a.createElement(u.a,{display:t.display,onCancel:p,handleSignup:l,makeState:n}),o.a.createElement("div",{className:"nav-bar col-12"},o.a.createElement("ul",null,o.a.createElement("li",null,o.a.createElement("a",{className:"active",onClick:d},"Sign Up")),o.a.createElement("li",null,o.a.createElement("a",{href:"/feature",target:"_blank"},"Feature")),o.a.createElement("li",null,o.a.createElement("a",{className:"mess",style:{display:t.icon},href:"#"},'"Cut Air"')),o.a.createElement("li",null,o.a.createElement("a",{className:"mess-icon",style:{display:t.icon},href:"#"})))),o.a.createElement("div",{className:"page-1 col-12"},o.a.createElement(c.a,{closeDialog:i,handleLogin:a,message:t.message,dialog:t.dialog,handleScroll:r,makeState:n}),o.a.createElement("div",{className:"devices-img col-7"})),o.a.createElement("div",{className:"page-2 col-12"},o.a.createElement("div",{className:"page-2-img col-3"}),o.a.createElement("div",{className:"page-2-txt col-3"},o.a.createElement("h1",null,'Introducing video calling in "Cut Air".'),o.a.createElement("p",null,"Now you can have face-to-face conversations with friends and family. It’s fast and easy to make video calls anywhere in the world."),o.a.createElement("a",{className:"btn_learnMore",href:"#"},"LERN MORE"))),o.a.createElement("div",{className:"page-3 col-12"},o.a.createElement("h1",null,"Texting and so much more."),o.a.createElement("p",null,"Check out all you can do in Messenger."),o.a.createElement("div",{className:"page-3-content col-8"},o.a.createElement("div",{className:"content-child col-2"},o.a.createElement("a",{href:""},o.a.createElement("div",{id:"Aa"}),o.a.createElement("h3",null,"Know when people have seen your texts."))),o.a.createElement("div",{className:"content-child col-2"},o.a.createElement("a",{href:""},o.a.createElement("div",{id:"phone_icon"}),o.a.createElement("h3",null,"Make HD calls anywhere in the world."))),o.a.createElement("div",{className:"content-child col-2"},o.a.createElement("a",{href:""},o.a.createElement("div",{id:"camera_icon"}),o.a.createElement("h3",null,"Snap photos and shoot videos.")))),o.a.createElement("div",{className:"page-3-content col-8"},o.a.createElement("div",{className:"content-child col-2"},o.a.createElement("a",{href:""},o.a.createElement("div",{id:"smile"}),o.a.createElement("h3",null,"Choose from thousands of stickers."))),o.a.createElement("div",{className:"content-child col-2"},o.a.createElement("a",{href:""},o.a.createElement("div",{id:"record"}),o.a.createElement("h3",null,"Record voice messages."))),o.a.createElement("div",{className:"content-child col-2"},o.a.createElement("a",{href:""},o.a.createElement("div",{id:"three_somes"}),o.a.createElement("h3",null,"Chat with your favorite groups.")))),o.a.createElement("a",{id:"explore",href:"#"},"EXPLORE")),o.a.createElement("div",{className:"footer col-12"},o.a.createElement("p",null,"The Facebook, Apple, Google Play, and Windows logos are trademarks of their respective owners.")))};d.propTypes={login:r.a.object.isRequired,handleLogin:r.a.func.isRequired,handleSignup:r.a.func.isRequired,handleScroll:r.a.func.isRequired,closeDialog:r.a.func.isRequired,signupClick:r.a.func.isRequired,signupCancel:r.a.func.isRequired},t.a=d},661:function(e,t){},662:function(e,t){},663:function(e,t){},664:function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function o(e,t,a){return Math.min(Math.max(t,e),a)/(a-t)}function l(e,t){return e*Math.PI*(t.size-t.thickness)}function r(e,t){var a=e.max,n=e.min,r=e.size,i=e.value,s=t.muiTheme.baseTheme.palette,u={root:{position:"relative",display:"inline-block",width:r,height:r},wrapper:{width:r,height:r,display:"inline-block",transition:L.default.create("transform","20s",null,"linear"),transitionTimingFunction:"linear"},svg:{width:r,height:r,position:"relative"},path:{stroke:e.color||s.primary1Color,strokeLinecap:"round",transition:L.default.create("all","1.5s",null,"ease-in-out")}};if("determinate"===e.mode){var c=o(i,n,a);u.path.transition=L.default.create("all","0.3s",null,"linear"),u.path.strokeDasharray=l(c,e)+", "+l(1,e)}return u}Object.defineProperty(t,"__esModule",{value:!0});var i=a(12),s=n(i),u=a(13),c=n(u),d=a(6),p=n(d),f=a(3),m=n(f),h=a(5),y=n(h),g=a(8),v=n(g),b=a(7),E=n(b),k=a(10),C=n(k),S=a(0),_=n(S),T=a(1),w=n(T),N=a(98),x=n(N),O=a(23),L=n(O),D=function(e){function t(){return(0,m.default)(this,t),(0,v.default)(this,(t.__proto__||(0,p.default)(t)).apply(this,arguments))}return(0,E.default)(t,e),(0,y.default)(t,[{key:"componentDidMount",value:function(){this.scalePath(this.refs.path),this.rotateWrapper(this.refs.wrapper)}},{key:"componentWillUnmount",value:function(){clearTimeout(this.scalePathTimer),clearTimeout(this.rotateWrapperTimer)}},{key:"scalePath",value:function(e){var t=this,a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;"indeterminate"===this.props.mode&&(a%=3,0===a?(e.style.strokeDasharray=l(0,this.props)+", "+l(1,this.props),e.style.strokeDashoffset=0,e.style.transitionDuration="0ms"):1===a?(e.style.strokeDasharray=l(.7,this.props)+", "+l(1,this.props),e.style.strokeDashoffset=l(-.3,this.props),e.style.transitionDuration="750ms"):(e.style.strokeDasharray=l(.7,this.props)+", "+l(1,this.props),e.style.strokeDashoffset=l(-1,this.props),e.style.transitionDuration="850ms"),this.scalePathTimer=setTimeout(function(){return t.scalePath(e,a+1)},a?750:250))}},{key:"rotateWrapper",value:function(e){var t=this;"indeterminate"===this.props.mode&&(x.default.set(e.style,"transform","rotate(0deg)"),x.default.set(e.style,"transitionDuration","0ms"),setTimeout(function(){x.default.set(e.style,"transform","rotate(1800deg)"),x.default.set(e.style,"transitionDuration","10s"),x.default.set(e.style,"transitionTimingFunction","linear")},50),this.rotateWrapperTimer=setTimeout(function(){return t.rotateWrapper(e)},10050))}},{key:"render",value:function(){var e=this.props,t=e.style,a=e.innerStyle,n=e.size,o=e.thickness,l=(0,c.default)(e,["style","innerStyle","size","thickness"]),i=this.context.muiTheme.prepareStyles,u=r(this.props,this.context);return _.default.createElement("div",(0,s.default)({},l,{style:i((0,C.default)(u.root,t))}),_.default.createElement("div",{ref:"wrapper",style:i((0,C.default)(u.wrapper,a))},_.default.createElement("svg",{viewBox:"0 0 "+n+" "+n,style:i(u.svg)},_.default.createElement("circle",{ref:"path",style:i(u.path),cx:n/2,cy:n/2,r:(n-o)/2,fill:"none",strokeWidth:o,strokeMiterlimit:"20"}))))}}]),t}(S.Component);D.defaultProps={mode:"indeterminate",value:0,min:0,max:100,size:40,thickness:3.5},D.contextTypes={muiTheme:w.default.object.isRequired},D.propTypes={},t.default=D},665:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=a(664),o=function(e){return e&&e.__esModule?e:{default:e}}(n);t.default=o.default},666:function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function o(e,t){var a=e.autoScrollBodyContent,n=e.open,o=t.muiTheme,l=o.baseTheme,r=l.spacing,i=l.palette,s=o.dialog,u=o.zIndex,c=r.desktopGutter,d="1px solid "+i.borderColor;return{root:{position:"fixed",boxSizing:"border-box",WebkitTapHighlightColor:"rgba(0,0,0,0)",zIndex:u.dialog,top:0,left:n?0:-1e4,width:"100%",height:"100%",transition:n?M.default.easeOut("0ms","left","0ms"):M.default.easeOut("0ms","left","450ms")},content:{boxSizing:"border-box",WebkitTapHighlightColor:"rgba(0,0,0,0)",transition:M.default.easeOut(),position:"relative",width:"75%",maxWidth:12*r.desktopKeylineIncrement,margin:"0 auto",zIndex:u.dialog},actionsContainer:{boxSizing:"border-box",WebkitTapHighlightColor:"rgba(0,0,0,0)",padding:8,width:"100%",textAlign:"right",marginTop:a?-1:0},overlay:{zIndex:u.dialogOverlay},title:{margin:0,padding:c+"px "+c+"px 20px "+c+"px",color:i.textColor,fontSize:s.titleFontSize,lineHeight:"32px",fontWeight:400,marginBottom:a?-1:0},body:{fontSize:s.bodyFontSize,color:s.bodyColor,padding:(e.title?0:c)+"px "+c+"px "+c+"px",boxSizing:"border-box",overflowY:a?"auto":"hidden",borderTop:a?d:"none",borderBottom:a?d:"none"}}}Object.defineProperty(t,"__esModule",{value:!0});var l=a(12),r=n(l),i=a(13),s=n(i),u=a(6),c=n(u),d=a(3),p=n(d),f=a(5),m=n(f),h=a(8),y=n(h),g=a(7),v=n(g),b=a(10),E=n(b),k=a(0),C=n(k),S=a(1),_=n(S),T=a(17),w=n(T),N=a(286),x=n(N),O=a(169),L=n(O),D=a(23),M=n(D),P=a(672),A=n(P),R=a(285),W=n(R),j=a(97),I=n(j),q=a(171),z=n(q),H=function(e){function t(){var e,a,n,o;(0,p.default)(this,t);for(var l=arguments.length,r=Array(l),i=0;i<l;i++)r[i]=arguments[i];return a=n=(0,y.default)(this,(e=t.__proto__||(0,c.default)(t)).call.apply(e,[this].concat(r))),n.state={style:{}},o=a,(0,y.default)(n,o)}return(0,v.default)(t,e),(0,m.default)(t,[{key:"componentWillUnmount",value:function(){clearTimeout(this.enterTimeout),clearTimeout(this.leaveTimeout)}},{key:"componentWillEnter",value:function(e){this.componentWillAppear(e)}},{key:"componentWillAppear",value:function(e){var t=this.context.muiTheme.baseTheme.spacing;this.setState({style:{opacity:1,transform:"translate(0, "+t.desktopKeylineIncrement+"px)"}}),this.enterTimeout=setTimeout(e,450)}},{key:"componentWillLeave",value:function(e){this.setState({style:{opacity:0,transform:"translate(0, 0)"}}),this.leaveTimeout=setTimeout(e,450)}},{key:"render",value:function(){var e=this.props,t=e.style,a=e.children,n=(0,s.default)(e,["style","children"]),o=this.context.muiTheme.prepareStyles;return C.default.createElement("div",(0,r.default)({},n,{style:o((0,E.default)({},this.state.style,t))}),a)}}]),t}(k.Component);H.contextTypes={muiTheme:_.default.object.isRequired},H.propTypes={};var U=function(e){function t(){var e,a,n,o;(0,p.default)(this,t);for(var l=arguments.length,r=Array(l),i=0;i<l;i++)r[i]=arguments[i];return a=n=(0,y.default)(this,(e=t.__proto__||(0,c.default)(t)).call.apply(e,[this].concat(r))),n.handleClickOverlay=function(){n.requestClose(!1)},n.handleKeyUp=function(e){"esc"===(0,L.default)(e)&&n.requestClose(!1)},n.handleResize=function(){n.positionDialog()},o=a,(0,y.default)(n,o)}return(0,v.default)(t,e),(0,m.default)(t,[{key:"componentDidMount",value:function(){this.positionDialog()}},{key:"componentDidUpdate",value:function(){this.positionDialog()}},{key:"positionDialog",value:function(){var e=this.props,t=e.actions,a=e.autoDetectWindowHeight,n=e.autoScrollBodyContent,l=e.bodyStyle,r=e.open,i=e.repositionOnUpdate,s=e.title;if(r){var u=window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight,c=w.default.findDOMNode(this),d=w.default.findDOMNode(this.refs.dialogWindow),p=w.default.findDOMNode(this.refs.dialogContent);d.style.height="",p.style.height="";var f=d.offsetHeight,m=(u-f)/2-64;if(m<16&&(m=16),!i&&c.style.paddingTop||(c.style.paddingTop=m+"px"),a||n){var h=o(this.props,this.context);h.body=(0,E.default)(h.body,l);var y=u-128;s&&(y-=p.previousSibling.offsetHeight),C.default.Children.count(t)&&(y-=p.nextSibling.offsetHeight),p.style.maxHeight=y+"px",y>f&&(p.style.borderBottom="none",p.style.borderTop="none")}}}},{key:"requestClose",value:function(e){!e&&this.props.modal||this.props.onRequestClose&&this.props.onRequestClose(!!e)}},{key:"render",value:function(){var e=this.props,t=e.actions,a=e.actionsContainerClassName,n=e.actionsContainerStyle,l=e.bodyClassName,i=e.bodyStyle,s=e.children,u=e.className,c=e.contentClassName,d=e.contentStyle,p=e.overlayClassName,f=e.overlayStyle,m=e.open,h=e.paperClassName,y=e.paperProps,g=e.style,v=e.titleClassName,b=e.titleStyle,k=e.title,S=this.context.muiTheme.prepareStyles,_=o(this.props,this.context);_.root=(0,E.default)(_.root,g),_.content=(0,E.default)(_.content,d),_.body=(0,E.default)(_.body,i),_.actionsContainer=(0,E.default)(_.actionsContainer,n),_.overlay=(0,E.default)(_.overlay,f),_.title=(0,E.default)(_.title,b);var T=C.default.Children.count(t)>0&&C.default.createElement("div",{className:a,style:S(_.actionsContainer)},C.default.Children.toArray(t)),w=k;return C.default.isValidElement(k)?w=C.default.cloneElement(k,{className:k.props.className||v,style:S((0,E.default)(_.title,k.props.style))}):"string"==typeof k&&(w=C.default.createElement("h3",{className:v,style:S(_.title)},k)),C.default.createElement("div",{className:u,style:S(_.root)},m&&C.default.createElement(x.default,{target:"window",onKeyUp:this.handleKeyUp,onResize:this.handleResize}),C.default.createElement(z.default,{component:"div",ref:"dialogWindow",transitionAppear:!0,transitionAppearTimeout:450,transitionEnter:!0,transitionEnterTimeout:450},m&&C.default.createElement(H,{className:c,style:_.content},C.default.createElement(I.default,(0,r.default)({className:h,zDepth:4},y),w,C.default.createElement("div",{ref:"dialogContent",className:l,style:S(_.body)},s),T))),C.default.createElement(A.default,{show:m,className:p,style:_.overlay,onClick:this.handleClickOverlay}))}}]),t}(k.Component);U.contextTypes={muiTheme:_.default.object.isRequired},U.propTypes={};var F=function(e){function t(){var e,a,n,o;(0,p.default)(this,t);for(var l=arguments.length,r=Array(l),i=0;i<l;i++)r[i]=arguments[i];return a=n=(0,y.default)(this,(e=t.__proto__||(0,c.default)(t)).call.apply(e,[this].concat(r))),n.renderLayer=function(){return C.default.createElement(U,n.props)},o=a,(0,y.default)(n,o)}return(0,v.default)(t,e),(0,m.default)(t,[{key:"render",value:function(){return C.default.createElement(W.default,{render:this.renderLayer,open:!0,useLayerForClickAway:!1})}}]),t}(k.Component);F.contextTypes={muiTheme:_.default.object.isRequired},F.defaultProps={autoDetectWindowHeight:!0,autoScrollBodyContent:!1,modal:!1,repositionOnUpdate:!0},F.propTypes={},t.default=F},667:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=a(666),o=function(e){return e&&e.__esModule?e:{default:e}}(n);t.default=o.default},668:function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var o=a(12),l=n(o),r=a(13),i=n(r),s=a(6),u=n(s),c=a(3),d=n(c),p=a(5),f=n(p),m=a(8),h=n(m),y=a(7),g=n(y),v=a(10),b=n(v),E=a(0),k=n(E),C=a(1),S=n(C),_=a(23),T=n(_),w=a(82),N=a(170),x=n(N),O=a(669),L=n(O),D=function(e){function t(){var e,a,n,o;(0,d.default)(this,t);for(var l=arguments.length,r=Array(l),i=0;i<l;i++)r[i]=arguments[i];return a=n=(0,h.default)(this,(e=t.__proto__||(0,u.default)(t)).call.apply(e,[this].concat(r))),n.state={hovered:!1,isKeyboardFocused:!1,touch:!1},n.handleKeyboardFocus=function(e,t){n.setState({isKeyboardFocused:t}),n.props.onKeyboardFocus(e,t)},n.handleMouseEnter=function(e){n.state.touch||n.setState({hovered:!0}),n.props.onMouseEnter(e)},n.handleMouseLeave=function(e){n.setState({hovered:!1}),n.props.onMouseLeave(e)},n.handleTouchStart=function(e){n.setState({touch:!0}),n.props.onTouchStart(e)},o=a,(0,h.default)(n,o)}return(0,g.default)(t,e),(0,f.default)(t,[{key:"componentWillReceiveProps",value:function(e){e.disabled&&this.setState({hovered:!1})}},{key:"render",value:function(){var e=this.props,t=e.backgroundColor,a=e.children,n=e.disabled,o=e.fullWidth,r=e.hoverColor,s=e.icon,u=e.label,c=e.labelStyle,d=e.labelPosition,p=e.primary,f=e.rippleColor,m=e.secondary,h=e.style,y=(0,i.default)(e,["backgroundColor","children","disabled","fullWidth","hoverColor","icon","label","labelStyle","labelPosition","primary","rippleColor","secondary","style"]),g=this.context.muiTheme,v=g.borderRadius,E=g.button,C=E.height,S=E.minWidth,_=E.textTransform,N=g.flatButton,O=N.buttonFilterColor,D=N.color,M=N.disabledTextColor,P=N.fontSize,A=N.fontWeight,R=N.primaryTextColor,W=N.secondaryTextColor,j=N.textColor,I=N.textTransform,q=void 0===I?_||"uppercase":I,z=n?M:p?R:m?W:j,H=(0,w.fade)(O,.2),U=O,F=r||H,G=f||U,K=t||D,B=(this.state.hovered||this.state.isKeyboardFocused)&&!n,J=(0,b.default)({},{height:C,lineHeight:C+"px",minWidth:o?"100%":S,color:z,transition:T.default.easeOut(),borderRadius:v,userSelect:"none",overflow:"hidden",backgroundColor:B?F:K,padding:0,margin:0,textAlign:"center"},h),X=void 0,Y={};if(s){var V=(0,b.default)({verticalAlign:"middle",marginLeft:u&&"before"!==d?12:0,marginRight:u&&"before"===d?12:0},s.props.style);X=k.default.cloneElement(s,{color:s.props.color||J.color,style:V,key:"iconCloned"}),"before"===d?Y.paddingRight=8:Y.paddingLeft=8}var Z=(0,b.default)({letterSpacing:0,textTransform:q,fontWeight:A,fontSize:P},Y,c),Q=u?k.default.createElement(L.default,{key:"labelElement",label:u,style:Z}):void 0,$="before"===d?[Q,X,a]:[a,X,Q];return k.default.createElement(x.default,(0,l.default)({},y,{disabled:n,focusRippleColor:G,focusRippleOpacity:.3,onKeyboardFocus:this.handleKeyboardFocus,onMouseLeave:this.handleMouseLeave,onMouseEnter:this.handleMouseEnter,onTouchStart:this.handleTouchStart,style:J,touchRippleColor:G,touchRippleOpacity:.3}),$)}}]),t}(E.Component);D.muiName="FlatButton",D.defaultProps={disabled:!1,fullWidth:!1,labelStyle:{},labelPosition:"after",onKeyboardFocus:function(){},onMouseEnter:function(){},onMouseLeave:function(){},onTouchStart:function(){},primary:!1,secondary:!1},D.contextTypes={muiTheme:S.default.object.isRequired},D.propTypes={},t.default=D},669:function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function o(e,t){var a=t.muiTheme.baseTheme;return{root:{position:"relative",paddingLeft:a.spacing.desktopGutterLess,paddingRight:a.spacing.desktopGutterLess,verticalAlign:"middle"}}}Object.defineProperty(t,"__esModule",{value:!0});var l=a(6),r=n(l),i=a(3),s=n(i),u=a(5),c=n(u),d=a(8),p=n(d),f=a(7),m=n(f),h=a(10),y=n(h),g=a(0),v=n(g),b=a(1),E=n(b),k=function(e){function t(){return(0,s.default)(this,t),(0,p.default)(this,(t.__proto__||(0,r.default)(t)).apply(this,arguments))}return(0,m.default)(t,e),(0,c.default)(t,[{key:"render",value:function(){var e=this.props,t=e.label,a=e.style,n=this.context.muiTheme.prepareStyles,l=o(this.props,this.context);return v.default.createElement("span",{style:n((0,y.default)(l.root,a))},t)}}]),t}(g.Component);k.contextTypes={muiTheme:E.default.object.isRequired},k.propTypes={},t.default=k},670:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=a(668),o=function(e){return e&&e.__esModule?e:{default:e}}(n);t.default=o.default},671:function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var o=a(6),l=n(o),r=a(3),i=n(r),s=a(5),u=n(s),c=a(8),d=n(c),p=a(7),f=n(p),m=a(0),h=a(1),y=(n(h),null),g=0,v=function(e){function t(){var e,a,n,o;(0,i.default)(this,t);for(var r=arguments.length,s=Array(r),u=0;u<r;u++)s[u]=arguments[u];return a=n=(0,d.default)(this,(e=t.__proto__||(0,l.default)(t)).call.apply(e,[this].concat(s))),n.locked=!1,o=a,(0,d.default)(n,o)}return(0,f.default)(t,e),(0,u.default)(t,[{key:"componentDidMount",value:function(){!0===this.props.lock&&this.preventScrolling()}},{key:"componentWillReceiveProps",value:function(e){this.props.lock!==e.lock&&(e.lock?this.preventScrolling():this.allowScrolling())}},{key:"componentWillUnmount",value:function(){this.allowScrolling()}},{key:"preventScrolling",value:function(){if(!0!==this.locked&&(g+=1,this.locked=!0,1===g)){var e=document.getElementsByTagName("body")[0];y=e.style.overflow,e.style.overflow="hidden"}}},{key:"allowScrolling",value:function(){if(!0===this.locked&&(g-=1,this.locked=!1),0===g&&null!==y){document.getElementsByTagName("body")[0].style.overflow=y||"",y=null}}},{key:"render",value:function(){return null}}]),t}(m.Component);v.propTypes={},t.default=v},672:function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function o(e,t){var a=t.muiTheme.overlay,n={root:{position:"fixed",height:"100%",width:"100%",top:0,left:"-100%",opacity:0,backgroundColor:a.backgroundColor,WebkitTapHighlightColor:"rgba(0, 0, 0, 0)",willChange:"opacity",transform:"translateZ(0)",transition:e.transitionEnabled&&w.default.easeOut("0ms","left","400ms")+", "+w.default.easeOut("400ms","opacity")}};return e.show&&(0,E.default)(n.root,{left:0,opacity:1,transition:w.default.easeOut("0ms","left")+", "+w.default.easeOut("400ms","opacity")}),n}Object.defineProperty(t,"__esModule",{value:!0});var l=a(12),r=n(l),i=a(13),s=n(i),u=a(6),c=n(u),d=a(3),p=n(d),f=a(5),m=n(f),h=a(8),y=n(h),g=a(7),v=n(g),b=a(10),E=n(b),k=a(0),C=n(k),S=a(1),_=n(S),T=a(23),w=n(T),N=a(671),x=n(N),O=function(e){function t(){return(0,p.default)(this,t),(0,y.default)(this,(t.__proto__||(0,c.default)(t)).apply(this,arguments))}return(0,v.default)(t,e),(0,m.default)(t,[{key:"setOpacity",value:function(e){this.refs.overlay.style.opacity=e}},{key:"render",value:function(){var e=this.props,t=e.autoLockScrolling,a=e.show,n=e.style,l=(e.transitionEnabled,(0,s.default)(e,["autoLockScrolling","show","style","transitionEnabled"])),i=this.context.muiTheme.prepareStyles,u=o(this.props,this.context);return C.default.createElement("div",(0,r.default)({},l,{ref:"overlay",style:i((0,E.default)(u.root,n))}),t&&C.default.createElement(x.default,{lock:a}))}}]),t}(k.Component);O.defaultProps={autoLockScrolling:!0,style:{},transitionEnabled:!0},O.contextTypes={muiTheme:_.default.object.isRequired},O.propTypes={},t.default=O}});
//# sourceMappingURL=1.de4a7866e2d46516baa5.js.map