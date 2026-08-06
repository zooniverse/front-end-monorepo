"use strict";(self.webpackChunk_zooniverse_content=self.webpackChunk_zooniverse_content||[]).push([[7139],{"./src/components/MaxWidthContent/MaxWidthContent.jsx"(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{A:()=>Content});var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/react/jsx-runtime.js"),grommet__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../node_modules/grommet/es6/components/Box/Box.js");function Content({children,...props}){return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(grommet__WEBPACK_IMPORTED_MODULE_1__.a,{...props,width:"min(100%, 45rem)",children})}Content.__docgenInfo={description:"",methods:[],displayName:"Content"}},"./src/components/Stats/Stats.jsx"(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{A:()=>Stats});var prefersReducedMotion,jsx_runtime=__webpack_require__("../../node_modules/react/jsx-runtime.js"),Box=__webpack_require__("../../node_modules/grommet/es6/components/Box/Box.js"),ResponsiveContext=__webpack_require__("../../node_modules/grommet/es6/contexts/ResponsiveContext/ResponsiveContext.js"),Text=__webpack_require__("../../node_modules/grommet/es6/components/Text/Text.js"),react=__webpack_require__("../../node_modules/react/index.js"),styled_components_browser_esm=__webpack_require__("../../node_modules/styled-components/dist/styled-components.browser.esm.js"),SpacedText=__webpack_require__("../lib-react-components/dist/esm/SpacedText/SpacedText.js"),prop_types=__webpack_require__("../../node_modules/prop-types/index.js"),defaultLocale=__webpack_require__("../../node_modules/d3-format/src/defaultLocale.js"),src_value=__webpack_require__("../../node_modules/@visx/vendor/node_modules/d3-interpolate/src/value.js"),d3=__webpack_require__("../../node_modules/d3/index.js");function asyncGeneratorStep(n,t,e,r,o,a,c){try{var i=n[a](c),u=i.value}catch(n){return void e(n)}i.done?t(u):Promise.resolve(u).then(r,o)}function _asyncToGenerator(n){return function(){var t=this,e=arguments;return new Promise(function(r,o){var a=n.apply(t,e);function _next(n){asyncGeneratorStep(a,r,o,_next,_throw,"next",n)}function _throw(n){asyncGeneratorStep(a,r,o,_next,_throw,"throw",n)}_next(void 0)})}}function formatValue(num){return(0,defaultLocale.GP)(",d")(num)}prefersReducedMotion=()=>window.matchMedia("(prefers-reduced-motion: reduce)").matches;function _animateValue(){return _animateValue=_asyncToGenerator(function*(element,value,duration){if(0!==value){var animationInProgress=element.textContent!==formatValue(0),animationDuration=prefersReducedMotion()||animationInProgress?0:duration,interpolator=(0,src_value.A)(0,value);return(0,d3.Ltv)(element).data([value]).transition().duration(animationDuration).textTween(()=>t=>formatValue(interpolator(t))).end()}}),_animateValue.apply(this,arguments)}function AnimatedNumber(_ref){var{duration=1e3,value=0}=_ref,numRef=(0,react.useRef)(null),[animated,setAnimated]=(0,react.useState)(!1),displayedValue=animated?value:0;return(0,react.useEffect)(()=>{var numElement=numRef.current;if(!(numElement.textContent!==formatValue(0)||animated||formatValue(value)===numElement.textContent)){var intersectionCallback=function(){var _ref3=_asyncToGenerator(function*(_ref2){var[entry]=_ref2;entry.intersectionRatio<=0||(intersectionObserver.unobserve(numElement),yield function animateValue(_x,_x2,_x3){return _animateValue.apply(this,arguments)}(numElement,value,duration),setAnimated(!0))});return function intersectionCallback(_x4){return _ref3.apply(this,arguments)}}(),intersectionObserver=new window.IntersectionObserver(intersectionCallback);return intersectionObserver.observe(numElement),()=>{intersectionObserver.disconnect()}}},[0,value,duration]),(0,jsx_runtime.jsx)("span",{ref:numRef,children:formatValue(displayedValue)})}AnimatedNumber.propTypes={duration:prop_types.number,value:prop_types.number.isRequired};const AnimatedNumber_AnimatedNumber=AnimatedNumber;var i18n=__webpack_require__("./src/translations/i18n.jsx"),index=__webpack_require__("../../node_modules/swr/dist/index/index.mjs"),src=__webpack_require__("../lib-panoptes-js/src/index.js"),console=__webpack_require__("../../node_modules/console-browserify/index.js");const SWROptions={revalidateIfStale:!0,revalidateOnMount:!0,revalidateOnFocus:!0,revalidateOnReconnect:!0,refreshInterval:0},getClassificationCounts=async()=>{try{const statsResponse=await fetch("https://eras.zooniverse.org/classifications");return(await statsResponse.json()).total_count}catch(error){return console.log(error),null}};const getVolunteerCount=async()=>{try{const query={page_size:1};return(await src.bB.get("/users",query)).body.meta.users.count}catch(error){return console.log(error),null}};var Paragraph=__webpack_require__("../../node_modules/grommet/es6/components/Paragraph/Paragraph.js");let t,t1,t2,t3,t4,t5,t6,t7,t8,t9,t10,_=t=>t;const Container=(0,styled_components_browser_esm.default)(Box.a)(t||(t=_`
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
`));function Stats(){const{t}=(0,i18n.Bd)(),numberFontSize="small"!==(0,react.useContext)(ResponsiveContext.u)?"5rem":"2.5rem",{data:classifications,error:classificationsError,isLoading:classificationsLoading}=function useTotalClassificationCount(){return(0,index.Ay)("eras-classifications-total",getClassificationCounts,SWROptions)}(),{data:volunteers}=function useTotalVolunteerCount(){return(0,index.Ay)("total-zooniverse-volunteers",getVolunteerCount,SWROptions)}(),totalClassifications=classifications+25284786,totalVolunteers=volunteers+114576;return(0,jsx_runtime.jsxs)(Box.a,{gap:"medium",children:[(0,jsx_runtime.jsxs)(Stat,{className:"classifications",round:"8px",children:[(0,jsx_runtime.jsx)(Text.E,{color:"neutral-2",size:numberFontSize,textAlign:"center",children:classifications&&(0,jsx_runtime.jsx)(AnimatedNumber_AnimatedNumber,{value:totalClassifications})}),(0,jsx_runtime.jsx)(ClassificationsLabel,{children:(0,jsx_runtime.jsx)(SpacedText.A,{color:"white",weight:"bold",size:"1.4rem",textAlign:"center",children:t("AboutPage.ourMission.stats.classifications")})})]}),(0,jsx_runtime.jsxs)(Stat,{className:"volunteers",round:"8px",children:[(0,jsx_runtime.jsx)(Text.E,{color:{light:"neutral-1",dark:"accent-1"},size:numberFontSize,textAlign:"center",children:volunteers&&(0,jsx_runtime.jsx)(AnimatedNumber_AnimatedNumber,{value:totalVolunteers})}),(0,jsx_runtime.jsx)(VolunteersLabel,{children:(0,jsx_runtime.jsx)(SpacedText.A,{color:"white",weight:"bold",size:"1.4rem",textAlign:"center",children:t("AboutPage.ourMission.stats.volunteers")})})]}),(0,jsx_runtime.jsx)("a",{id:"zooniverse-billion"}),(0,jsx_runtime.jsx)(BillionsCountdown,{error:classificationsError,isLoading:classificationsLoading,totalClassifications})]})}Stats.__docgenInfo={description:"",methods:[],displayName:"Stats"}},"./src/components/Stats/Stats.stories.jsx"(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/react/jsx-runtime.js"),_Stats__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/components/Stats/Stats.jsx"),_MaxWidthContent_MaxWidthContent__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/components/MaxWidthContent/MaxWidthContent.jsx");const __WEBPACK_DEFAULT_EXPORT__={title:"Shared / Stats",component:_Stats__WEBPACK_IMPORTED_MODULE_1__.A},Default=()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_MaxWidthContent_MaxWidthContent__WEBPACK_IMPORTED_MODULE_2__.A,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Stats__WEBPACK_IMPORTED_MODULE_1__.A,{})}),__namedExportsOrder=["Default"]}}]);
//# sourceMappingURL=components-Stats-Stats-stories.6771d2e5.iframe.bundle.js.map