"use strict";(self.webpackChunk_zooniverse_content=self.webpackChunk_zooniverse_content||[]).push([[20],{"../lib-react-components/dist/esm/SpacedHeading/SpacedHeading.js"(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var _SpacedText__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../lib-react-components/dist/esm/SpacedText/SpacedText.js"),grommet__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../node_modules/grommet/es6/components/Heading/Heading.js"),prop_types__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("../../node_modules/prop-types/index.js"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("../../node_modules/react/jsx-runtime.js"),_excluded=["children","className","color","level","size","weight"];function ownKeys(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);r&&(o=o.filter(function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable})),t.push.apply(t,o)}return t}function _objectSpread(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?ownKeys(Object(t),!0).forEach(function(r){_defineProperty(e,r,t[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):ownKeys(Object(t)).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))})}return e}function _defineProperty(e,r,t){return(r=function _toPropertyKey(t){var i=function _toPrimitive(t,r){if("object"!=typeof t||!t)return t;var e=t[Symbol.toPrimitive];if(void 0!==e){var i=e.call(t,r||"default");if("object"!=typeof i)return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===r?String:Number)(t)}(t,"string");return"symbol"==typeof i?i:i+""}(r))in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function SpacedHeading(_ref){var{children,className="",color={dark:"neutral-6",light:"black"},level=2,size="medium",weight="bold"}=_ref,props=function _objectWithoutProperties(e,t){if(null==e)return{};var o,r,i=function _objectWithoutPropertiesLoose(r,e){if(null==r)return{};var t={};for(var n in r)if({}.hasOwnProperty.call(r,n)){if(-1!==e.indexOf(n))continue;t[n]=r[n]}return t}(e,t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);for(r=0;r<n.length;r++)o=n[r],-1===t.indexOf(o)&&{}.propertyIsEnumerable.call(e,o)&&(i[o]=e[o])}return i}(_ref,_excluded);return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(grommet__WEBPACK_IMPORTED_MODULE_1__.D,_objectSpread(_objectSpread({className,level,size},props),{},{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_SpacedText__WEBPACK_IMPORTED_MODULE_0__.A,{color,weight,size,children})}))}SpacedHeading.propTypes={children:prop_types__WEBPACK_IMPORTED_MODULE_2__.node.isRequired,className:prop_types__WEBPACK_IMPORTED_MODULE_2__.string,color:(0,prop_types__WEBPACK_IMPORTED_MODULE_2__.oneOfType)([prop_types__WEBPACK_IMPORTED_MODULE_2__.object,prop_types__WEBPACK_IMPORTED_MODULE_2__.string]),level:prop_types__WEBPACK_IMPORTED_MODULE_2__.number,size:prop_types__WEBPACK_IMPORTED_MODULE_2__.string,weight:prop_types__WEBPACK_IMPORTED_MODULE_2__.string};const __WEBPACK_DEFAULT_EXPORT__=SpacedHeading},"./src/components/HeadingForAboutNav/SubHeading.jsx"(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/react/jsx-runtime.js"),grommet__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../node_modules/grommet/es6/components/Heading/Heading.js"),styled_components__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("../../node_modules/styled-components/dist/styled-components.browser.esm.js"),_SharedStyledComponents_SharedStyledComponents__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/components/SharedStyledComponents/SharedStyledComponents.jsx");let t;const StyledSubHeading=(0,styled_components__WEBPACK_IMPORTED_MODULE_2__.default)(grommet__WEBPACK_IMPORTED_MODULE_1__.D)(t||(t=(t=>t)`
  font-size: 2rem;

  @media (width <= ${0}) {
    font-size: 1.5rem;
  }
`),_SharedStyledComponents_SharedStyledComponents__WEBPACK_IMPORTED_MODULE_3__.ik);function SubHeading({children}){return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(StyledSubHeading,{level:3,margin:"0",textAlign:"center",weight:"normal",fill:!0,children})}const __WEBPACK_DEFAULT_EXPORT__=SubHeading;SubHeading.__docgenInfo={description:"",methods:[],displayName:"SubHeading"}},"./src/components/HorizontalRuleLogo/HorizontalRuleLogo.jsx"(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/react/jsx-runtime.js"),styled_components__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../node_modules/styled-components/dist/styled-components.browser.esm.js"),grommet__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("../../node_modules/grommet/es6/components/Box/Box.js"),_zooniverse_react_components_ZooniverseLogo__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("../lib-react-components/dist/esm/ZooniverseLogo/ZooniverseLogo.js");let t,t1,t2,t3,t4,t5,t6,t7,t8,t9,t10,_=t=>t;const LeftElement=(0,styled_components__WEBPACK_IMPORTED_MODULE_1__.default)(grommet__WEBPACK_IMPORTED_MODULE_2__.a)(t4||(t4=_`
  position: relative;
  width: calc(50% - 40px);

  &::before {
    content: '';
    position: absolute;
    right: 0;
    top: calc(50% - 5px);
    width: 100%;
    height: 6px;
    ${0}
  }

  &::after {
    content: '';
    position: absolute;
    right: 0;
    top: calc(50% + 2px);
    width: 95%;
    height: 3px;
    ${0}
  }
`),props=>props.theme.dark?(0,styled_components__WEBPACK_IMPORTED_MODULE_1__.css)(t||(t=_`
            background: linear-gradient(
              -90deg,
              transparent 0%,
              ${0} 5%,
              ${0} 70%,
              transparent 100%
            );
          `),props.theme.global.colors["accent-1"],props.theme.global.colors["accent-1"]):(0,styled_components__WEBPACK_IMPORTED_MODULE_1__.css)(t1||(t1=_`
            background: linear-gradient(
              -90deg,
              transparent 0%,
              ${0} 5%,
              ${0} 70%,
              transparent 100%
            );
          `),props.theme.global.colors["neutral-1"],props.theme.global.colors["neutral-1"]),props=>props.theme.dark?(0,styled_components__WEBPACK_IMPORTED_MODULE_1__.css)(t2||(t2=_`
            background: linear-gradient(
              -90deg,
              transparent 0%,
              ${0} 5%,
              ${0} 70%,
              transparent 100%
            );
          `),props.theme.global.colors["accent-1"],props.theme.global.colors["accent-1"]):(0,styled_components__WEBPACK_IMPORTED_MODULE_1__.css)(t3||(t3=_`
            background: linear-gradient(
              -90deg,
              transparent 0%,
              ${0} 5%,
              ${0} 70%,
              transparent 100%
            );
          `),props.theme.global.colors["neutral-1"],props.theme.global.colors["neutral-1"])),HorizontalRuleLogoContainer=(0,styled_components__WEBPACK_IMPORTED_MODULE_1__.default)(grommet__WEBPACK_IMPORTED_MODULE_2__.a)(t5||(t5=_`
  position: relative;
  width: 100%;
`)),RightElement=(0,styled_components__WEBPACK_IMPORTED_MODULE_1__.default)(grommet__WEBPACK_IMPORTED_MODULE_2__.a)(t10||(t10=_`
  position: relative;
  width: calc(50% - 40px);

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: calc(50% - 5px);
    width: 100%;
    height: 6px;
    ${0}
  }

  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: calc(50% + 2px);
    width: 95%;
    height: 3px;
    ${0}
  }
`),props=>props.theme.dark?(0,styled_components__WEBPACK_IMPORTED_MODULE_1__.css)(t6||(t6=_`
            background: linear-gradient(
              90deg,
              transparent 0%,
              ${0} 5%,
              ${0} 70%,
              transparent 100%
            );
          `),props.theme.global.colors["accent-1"],props.theme.global.colors["accent-1"]):(0,styled_components__WEBPACK_IMPORTED_MODULE_1__.css)(t7||(t7=_`
            background: linear-gradient(
              90deg,
              transparent 0%,
              ${0} 5%,
              ${0} 70%,
              transparent 100%
            );
          `),props.theme.global.colors["neutral-1"],props.theme.global.colors["neutral-1"]),props=>props.theme.dark?(0,styled_components__WEBPACK_IMPORTED_MODULE_1__.css)(t8||(t8=_`
            background: linear-gradient(
              90deg,
              transparent 0%,
              ${0} 5%,
              ${0} 70%,
              transparent 100%
            );
          `),props.theme.global.colors["accent-1"],props.theme.global.colors["accent-1"]):(0,styled_components__WEBPACK_IMPORTED_MODULE_1__.css)(t9||(t9=_`
            background: linear-gradient(
              90deg,
              transparent 0%,
              ${0} 5%,
              ${0} 70%,
              transparent 100%
            );
          `),props.theme.global.colors["neutral-1"],props.theme.global.colors["neutral-1"]));function HorizontalRuleLogo(){const{dark,global}=(0,styled_components__WEBPACK_IMPORTED_MODULE_1__.useTheme)();return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(HorizontalRuleLogoContainer,{align:"center",direction:"row",justify:"center",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(LeftElement,{}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_zooniverse_react_components_ZooniverseLogo__WEBPACK_IMPORTED_MODULE_3__.A,{id:"root-about-zooniverse",color:dark?global.colors["accent-1"]:global.colors["neutral-1"],size:"48px"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(RightElement,{})]})}const __WEBPACK_DEFAULT_EXPORT__=HorizontalRuleLogo;HorizontalRuleLogo.__docgenInfo={description:"",methods:[],displayName:"HorizontalRuleLogo"}},"./src/components/Mobile/Mobile.jsx"(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{A:()=>Mobile});var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/react/jsx-runtime.js"),grommet__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../node_modules/grommet/es6/components/Box/Box.js"),grommet__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("../../node_modules/grommet/es6/components/Image/Image.js"),grommet__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("../../node_modules/grommet/es6/components/Text/Text.js"),grommet__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("../../node_modules/grommet/es6/components/Button/Button.js"),grommet__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("../../node_modules/grommet/es6/components/Anchor/Anchor.js"),_translations_i18n__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("./src/translations/i18n.jsx");function Mobile(){const{t}=(0,_translations_i18n__WEBPACK_IMPORTED_MODULE_6__.Bd)();return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(grommet__WEBPACK_IMPORTED_MODULE_1__.a,{margin:{bottom:"medium"},children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(grommet__WEBPACK_IMPORTED_MODULE_1__.a,{align:"center",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(grommet__WEBPACK_IMPORTED_MODULE_2__._,{alt:t("AboutPage.mobile.altImage"),src:"https://static.zooniverse.org/fem-assets/phone.png",width:"300px",margin:{vertical:"30px"}}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(grommet__WEBPACK_IMPORTED_MODULE_3__.E,{textAlign:"center",color:{light:"black",dark:"white"},children:t("AboutPage.mobile.description")})]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(grommet__WEBPACK_IMPORTED_MODULE_1__.a,{justify:"center",gap:"xxsmall",direction:"row",margin:{top:"15px"},children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(grommet__WEBPACK_IMPORTED_MODULE_4__.$,{as:grommet__WEBPACK_IMPORTED_MODULE_5__.M,href:"https://apps.apple.com/us/app/zooniverse/id1194130243","aria-label":t("AboutPage.mobile.altAppStore"),children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(grommet__WEBPACK_IMPORTED_MODULE_2__._,{alt:t("AboutPage.mobile.altAppStore"),src:"https://static.zooniverse.org/fem-assets/app-store.png",width:"140px"})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(grommet__WEBPACK_IMPORTED_MODULE_4__.$,{as:grommet__WEBPACK_IMPORTED_MODULE_5__.M,href:"https://play.google.com/store/apps/details?id=com.zooniversemobile","aria-label":t("AboutPage.mobile.altPlayStore"),children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(grommet__WEBPACK_IMPORTED_MODULE_2__._,{alt:t("AboutPage.mobile.altPlayStore"),src:"https://static.zooniverse.org/fem-assets/google-play.png",width:"140px"})})]})]})}Mobile.__docgenInfo={description:"",methods:[],displayName:"Mobile"}},"./src/components/Stats/Stats.jsx"(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{A:()=>Stats});var prefersReducedMotion,jsx_runtime=__webpack_require__("../../node_modules/react/jsx-runtime.js"),Box=__webpack_require__("../../node_modules/grommet/es6/components/Box/Box.js"),ResponsiveContext=__webpack_require__("../../node_modules/grommet/es6/contexts/ResponsiveContext/ResponsiveContext.js"),Text=__webpack_require__("../../node_modules/grommet/es6/components/Text/Text.js"),react=__webpack_require__("../../node_modules/react/index.js"),styled_components_browser_esm=__webpack_require__("../../node_modules/styled-components/dist/styled-components.browser.esm.js"),SpacedText=__webpack_require__("../lib-react-components/dist/esm/SpacedText/SpacedText.js"),prop_types=__webpack_require__("../../node_modules/prop-types/index.js"),defaultLocale=__webpack_require__("../../node_modules/d3-format/src/defaultLocale.js"),src_value=__webpack_require__("../../node_modules/@visx/vendor/node_modules/d3-interpolate/src/value.js"),d3=__webpack_require__("../../node_modules/d3/index.js");function asyncGeneratorStep(n,t,e,r,o,a,c){try{var i=n[a](c),u=i.value}catch(n){return void e(n)}i.done?t(u):Promise.resolve(u).then(r,o)}function _asyncToGenerator(n){return function(){var t=this,e=arguments;return new Promise(function(r,o){var a=n.apply(t,e);function _next(n){asyncGeneratorStep(a,r,o,_next,_throw,"next",n)}function _throw(n){asyncGeneratorStep(a,r,o,_next,_throw,"throw",n)}_next(void 0)})}}function formatValue(num){return(0,defaultLocale.GP)(",d")(num)}prefersReducedMotion=()=>window.matchMedia("(prefers-reduced-motion: reduce)").matches;function _animateValue(){return _animateValue=_asyncToGenerator(function*(element,value,duration){if(0!==value){var animationInProgress=element.textContent!==formatValue(0),animationDuration=prefersReducedMotion()||animationInProgress?0:duration,interpolator=(0,src_value.A)(0,value);return(0,d3.Ltv)(element).data([value]).transition().duration(animationDuration).textTween(()=>t=>formatValue(interpolator(t))).end()}}),_animateValue.apply(this,arguments)}function AnimatedNumber(_ref){var{duration=1e3,value=0}=_ref,numRef=(0,react.useRef)(null),[animated,setAnimated]=(0,react.useState)(!1),displayedValue=animated?value:0;return(0,react.useEffect)(()=>{var numElement=numRef.current;if(!(numElement.textContent!==formatValue(0)||animated||formatValue(value)===numElement.textContent)){var intersectionCallback=function(){var _ref3=_asyncToGenerator(function*(_ref2){var[entry]=_ref2;entry.intersectionRatio<=0||(intersectionObserver.unobserve(numElement),yield function animateValue(_x,_x2,_x3){return _animateValue.apply(this,arguments)}(numElement,value,duration),setAnimated(!0))});return function intersectionCallback(_x4){return _ref3.apply(this,arguments)}}(),intersectionObserver=new window.IntersectionObserver(intersectionCallback);return intersectionObserver.observe(numElement),()=>{intersectionObserver.disconnect()}}},[0,value,duration]),(0,jsx_runtime.jsx)("span",{ref:numRef,children:formatValue(displayedValue)})}AnimatedNumber.propTypes={duration:prop_types.number,value:prop_types.number.isRequired};const AnimatedNumber_AnimatedNumber=AnimatedNumber;var i18n=__webpack_require__("./src/translations/i18n.jsx"),index=__webpack_require__("../../node_modules/swr/dist/index/index.mjs"),src=__webpack_require__("../lib-panoptes-js/src/index.js"),console=__webpack_require__("../../node_modules/console-browserify/index.js");const SWROptions={revalidateIfStale:!0,revalidateOnMount:!0,revalidateOnFocus:!0,revalidateOnReconnect:!0,refreshInterval:0},getClassificationCounts=async()=>{try{const statsResponse=await fetch("https://eras.zooniverse.org/classifications");return(await statsResponse.json()).total_count}catch(error){return console.log(error),null}};const getVolunteerCount=async()=>{try{const query={page_size:1};return(await src.bB.get("/users",query)).body.meta.users.count}catch(error){return console.log(error),null}};var Paragraph=__webpack_require__("../../node_modules/grommet/es6/components/Paragraph/Paragraph.js");let t,t1,t2,t3,t4,t5,t6,t7,t8,t9,t10,_=t=>t;const Container=(0,styled_components_browser_esm.default)(Box.a)(t||(t=_`
  background: rgba(255, 255, 255, 1);
  border-radius: 1em;
  box-shadow: 0px 2px 20px 5px #00000033;
  overflow: hidden;
  width: 100%;
  height: 500px;
  position: relative;
`)),BackgroundDeco1=(0,styled_components_browser_esm.default)(Box.a)(t1||(t1=_`
  background: url('https://panoptes-uploads.zooniverse.org/project_attached_image/3369c5fa-8d4a-4538-8f92-0c1c799235d9.jpeg');
  background-position: top;
  background-size: cover;
  background-repeat: no-repeat;
  height: 50%;
  position: relative;
`)),BackgroundDeco2=(0,styled_components_browser_esm.default)(Box.a)(t2||(t2=_`
  background: linear-gradient(0deg, rgb(0, 82, 93) 0%, rgba(0, 62, 70, 0) 100%);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
`)),ClassificationsNumber=(0,styled_components_browser_esm.default)(Text.E)(t3||(t3=_`
  color: #ffffff;
  text-align: center;
  text-shadow: 0px 0px 8px #005d69;
  text-transform: uppercase;
  font-size: 72px;

  @media (width < 769px) {
    font-size: 60px;
  }
`)),WhiteText=(0,styled_components_browser_esm.default)(Text.E)(t4||(t4=_`
  color: #ffffff;
  text-align: center;
  text-shadow: 0px 0px 8px #005d69;
  text-transform: uppercase;
  font-size: 20px;
  position: absolute;
  top: 68%;
`)),BillionImg=styled_components_browser_esm.default.img(t5||(t5=_`
  display: flex;
  width: 100%;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
`)),Content=(0,styled_components_browser_esm.default)(Box.a)(t6||(t6=_`
  width: 100%;
  justify-content: center;
  height: 50%;
`)),UpperTealText=(0,styled_components_browser_esm.default)(Text.E)(t7||(t7=_`
  color: #005d69;
  text-align: center;
  text-shadow: 0px 0px 8px #ffffff;
  letter-spacing: 4.8px;
  text-transform: uppercase;
  font-size: 24px;
`)),LowerTealText=(0,styled_components_browser_esm.default)(Text.E)(t8||(t8=_`
  color: #005d69;
  text-align: center;
  text-shadow: 0px 0px 8px #ffffff;
  font-size: 32px;
  margin-top: 20px;

  @media (width < 769px) {
    font-size: 20px;
  }
`)),BlackText=(0,styled_components_browser_esm.default)(Paragraph.f)(t9||(t9=_`
  color: #404040;
  text-align: center;
  text-shadow: 0px 0px 8px #ffffff;
  text-transform: uppercase;
  font-size: 20px;
  margin: 0 10px;

  @media (width < 769px) {
    font-size: 1rem;
  }
`)),HR=(0,styled_components_browser_esm.default)("div")(t10||(t10=_`
  margin: 1em auto;
  width: 50%;
  height: 1px;
  background: #000000;
  background: linear-gradient(
    90deg,
    rgba(0, 0, 0, 0) 0%,
    rgba(203, 204, 203, 1) 50%,
    rgba(0, 0, 0, 0) 100%
  );
`)),MESSAGES=["discovering gravitational waves","mapping the universe","discovering hidden black holes","digitizing historical documents","everglades restoration","mapping humanitarian need"];function BillionsCountdown({totalClassifications=0,error,isLoading=!0}){const classificationsToGo=1e9-totalClassifications,messageIndex=(0,react.useRef)(Math.floor(Math.random()*MESSAGES.length)),[message,setMessage]=(0,react.useState)(MESSAGES[messageIndex.current]),timerId=(0,react.useRef)(null);function nextMessage(){const newIndex=(messageIndex.current+1)%MESSAGES.length;setMessage(MESSAGES[newIndex]),messageIndex.current=newIndex}return(0,react.useEffect)(function onLoadOnce(){return timerId.current=setInterval(nextMessage,6e3),()=>{clearInterval(timerId.current)}},[]),(0,jsx_runtime.jsxs)(Container,{className:"billions-countdown-container",children:[(0,jsx_runtime.jsx)(BackgroundDeco1,{className:"billions-countdown-deco-1",children:(0,jsx_runtime.jsxs)(BackgroundDeco2,{className:"billions-countdown-deco-1",children:[isLoading||(null==error?void 0:error.length)?null:classificationsToGo>0?(0,jsx_runtime.jsx)(ClassificationsNumber,{children:null==classificationsToGo?void 0:classificationsToGo.toLocaleString()}):null,(0,jsx_runtime.jsx)(WhiteText,{children:classificationsToGo>0?"until we reach":"thanks to our millions of volunteers, we've reached"})]})}),(0,jsx_runtime.jsx)(BillionImg,{"aria-label":"1 billion",src:"https://panoptes-uploads.zooniverse.org/project_attached_image/bd65e25b-2e31-4a44-a864-4e5d2bc66d78.png"}),(0,jsx_runtime.jsxs)(Content,{className:"billions-countdown-content",children:[(0,jsx_runtime.jsx)(UpperTealText,{children:"classifications"}),(0,jsx_runtime.jsx)(HR,{}),(0,jsx_runtime.jsx)(BlackText,{children:"every classification on Zooniverse brings us one step closer to"}),(0,jsx_runtime.jsx)(LowerTealText,{children:message})]})]})}BillionsCountdown.__docgenInfo={description:"",methods:[],displayName:"BillionsCountdown",props:{totalClassifications:{defaultValue:{value:"0",computed:!1},required:!1},isLoading:{defaultValue:{value:"true",computed:!1},required:!1}}};let Stats_t,Stats_t1,Stats_t2,Stats_=t=>t;const ClassificationsLabel=(0,styled_components_browser_esm.default)(Box.a)(Stats_t||(Stats_t=Stats_`
  background: linear-gradient(
    to right,
    rgba(240, 178, 0, 0.4) 0%,
    rgba(209, 143, 54, 1) 25%,
    rgba(209, 143, 54, 1) 75%,
    rgba(240, 178, 0, 0.4) 100%
  );
`)),VolunteersLabel=(0,styled_components_browser_esm.default)(Box.a)(Stats_t1||(Stats_t1=Stats_`
  background: linear-gradient(
    to right,
    rgba(0, 93, 105, 0.4) 0%,
    rgba(0, 93, 105, 1) 25%,
    rgba(0, 93, 105, 1) 75%,
    rgba(0, 93, 105, 0.4) 100%
  );
`)),Stat=(0,styled_components_browser_esm.default)(Box.a)(Stats_t2||(Stats_t2=Stats_`
  overflow: hidden;

  &.classifications {
    background: rgba(240, 178, 0, 0.05);
  }

  &.volunteers {
    background: rgba(0, 93, 105, 0.1); // matches VolunteersLabel
  }
`));function Stats(){const{t}=(0,i18n.Bd)(),numberFontSize="small"!==(0,react.useContext)(ResponsiveContext.u)?"5rem":"2.5rem",{data:classifications,error:classificationsError,isLoading:classificationsLoading}=function useTotalClassificationCount(){return(0,index.Ay)("eras-classifications-total",getClassificationCounts,SWROptions)}(),{data:volunteers}=function useTotalVolunteerCount(){return(0,index.Ay)("total-zooniverse-volunteers",getVolunteerCount,SWROptions)}(),totalClassifications=classifications+25284786,totalVolunteers=volunteers+114576;return(0,jsx_runtime.jsxs)(Box.a,{gap:"medium",children:[(0,jsx_runtime.jsxs)(Stat,{className:"classifications",round:"8px",children:[(0,jsx_runtime.jsx)(Text.E,{color:"neutral-2",size:numberFontSize,textAlign:"center",children:classifications&&(0,jsx_runtime.jsx)(AnimatedNumber_AnimatedNumber,{value:totalClassifications})}),(0,jsx_runtime.jsx)(ClassificationsLabel,{children:(0,jsx_runtime.jsx)(SpacedText.A,{color:"white",weight:"bold",size:"1.4rem",textAlign:"center",children:t("AboutPage.ourMission.stats.classifications")})})]}),(0,jsx_runtime.jsxs)(Stat,{className:"volunteers",round:"8px",children:[(0,jsx_runtime.jsx)(Text.E,{color:{light:"neutral-1",dark:"accent-1"},size:numberFontSize,textAlign:"center",children:volunteers&&(0,jsx_runtime.jsx)(AnimatedNumber_AnimatedNumber,{value:totalVolunteers})}),(0,jsx_runtime.jsx)(VolunteersLabel,{children:(0,jsx_runtime.jsx)(SpacedText.A,{color:"white",weight:"bold",size:"1.4rem",textAlign:"center",children:t("AboutPage.ourMission.stats.volunteers")})})]}),(0,jsx_runtime.jsx)("a",{id:"zooniverse-billion"}),(0,jsx_runtime.jsx)(BillionsCountdown,{error:classificationsError,isLoading:classificationsLoading,totalClassifications})]})}Stats.__docgenInfo={description:"",methods:[],displayName:"Stats"}}}]);
//# sourceMappingURL=20.bed899cd.iframe.bundle.js.map