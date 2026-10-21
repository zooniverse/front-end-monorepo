"use strict";(self.webpackChunk_zooniverse_content=self.webpackChunk_zooniverse_content||[]).push([[1662],{"../lib-react-components/dist/esm/ProjectCard/ProjectCard.js"(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{A:()=>ProjectCard_ProjectCard});var Box=__webpack_require__("../../node_modules/grommet/es6/components/Box/Box.js"),prop_types=__webpack_require__("../../node_modules/prop-types/index.js"),styled_components_browser_esm=__webpack_require__("../../node_modules/styled-components/dist/styled-components.browser.esm.js"),i18n=__webpack_require__("../lib-react-components/dist/esm/translations/i18n.js"),SpacedText=__webpack_require__("../lib-react-components/dist/esm/SpacedText/SpacedText.js"),Text=__webpack_require__("../../node_modules/grommet/es6/components/Text/Text.js"),jsx_runtime=__webpack_require__("../../node_modules/react/jsx-runtime.js"),StyledBox=(0,styled_components_browser_esm.default)(Box.a).withConfig({displayName:"CardHeader__StyledBox",componentId:"sc-1xt6zav-0"})(["backdrop-filter:",";background:",";position:relative;"],props=>"paused"===props.state||"finished"===props.state?"blur(2px);":"none",props=>"paused"===props.state?"rgba(67, 187, 253, 0.5)":"finished"===props.state?"rgba(228, 89, 80, 0.5)":void 0),StyledBadge=(0,styled_components_browser_esm.default)(Text.E).withConfig({displayName:"CardHeader__StyledBadge",componentId:"sc-1xt6zav-1"})(["background:white;border-radius:0.5rem;box-shadow:1px 1px 4px 0px rgba(0,0,0,0.25);height:fit-content;min-width:0.75rem;padding:2px 3px;position:absolute;right:5px;text-align:center;top:5px;"]);function CardHeader(_ref){var{badge,state="live"}=_ref;if("paused"!==state&&"finished"!==state&&!badge)return null;var stateText,{t}=(0,i18n.B)();return"paused"===state?stateText=t("ProjectCard.paused"):"finished"===state&&(stateText=t("ProjectCard.finished")),(0,jsx_runtime.jsxs)(StyledBox,{direction:"row",align:"center",height:"30px",justify:"center",round:{corner:"top",size:"8px"},state,children:[stateText?(0,jsx_runtime.jsx)(SpacedText.A,{color:"white",size:"0.75rem",weight:"bold",children:stateText}):null,badge?(0,jsx_runtime.jsx)(StyledBadge,{color:"black",size:"0.75rem",weight:"bold",elevation:"small",children:badge}):null]})}CardHeader.propTypes={badge:prop_types.number,state:prop_types.string};const components_CardHeader=CardHeader;var _excluded=["badge","description","displayName","href","imageSrc","size","state"];function ownKeys(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);r&&(o=o.filter(function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable})),t.push.apply(t,o)}return t}function _objectSpread(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?ownKeys(Object(t),!0).forEach(function(r){_defineProperty(e,r,t[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):ownKeys(Object(t)).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))})}return e}function _defineProperty(e,r,t){return(r=function _toPropertyKey(t){var i=function _toPrimitive(t,r){if("object"!=typeof t||!t)return t;var e=t[Symbol.toPrimitive];if(void 0!==e){var i=e.call(t,r||"default");if("object"!=typeof i)return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===r?String:Number)(t)}(t,"string");return"symbol"==typeof i?i:i+""}(r))in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}var StyledProjectCard=(0,styled_components_browser_esm.default)(Box.a).withConfig({displayName:"ProjectCard__StyledProjectCard",componentId:"sc-hlc2qo-0"})(["text-decoration:none;font-size:",";"],props=>props.cardFontSize),StyledProjectContent=(0,styled_components_browser_esm.default)(Box.a).withConfig({displayName:"ProjectCard__StyledProjectContent",componentId:"sc-hlc2qo-1"})(["position:static;bottom:0;height:20%;transition:height 0.5s ease;",":hover &,",":focus &{height:60%;}"],StyledProjectCard,StyledProjectCard),StyledProjectName=(0,styled_components_browser_esm.default)(SpacedText.A).withConfig({displayName:"ProjectCard__StyledProjectName",componentId:"sc-hlc2qo-2"})(["display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden;"]),StyledProjectDescription=(0,styled_components_browser_esm.default)(SpacedText.A).withConfig({displayName:"ProjectCard__StyledProjectDescription",componentId:"sc-hlc2qo-3"})(["display:-webkit-box;-webkit-line-clamp:4;-webkit-box-orient:vertical;height:0;margin-top:0px;overflow:hidden;",":hover &,",":focus &{height:auto;margin-top:10px;}"],StyledProjectCard,StyledProjectCard);function cardWidth(size){switch(size){case"small":return 157;case"medium":default:return 189;case"large":return 220;case"xlarge":return 252}}function cardFontSize(size){switch(size){case"small":return"0.625rem";case"medium":default:return"0.656rem";case"large":return"0.688rem";case"xlarge":return"0.8rem"}}function ProjectCard(_ref){var{badge,description="",displayName="",href=null,imageSrc="",size="medium",state="live"}=_ref,rest=function _objectWithoutProperties(e,t){if(null==e)return{};var o,r,i=function _objectWithoutPropertiesLoose(r,e){if(null==r)return{};var t={};for(var n in r)if({}.hasOwnProperty.call(r,n)){if(-1!==e.indexOf(n))continue;t[n]=r[n]}return t}(e,t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);for(r=0;r<n.length;r++)o=n[r],-1===t.indexOf(o)&&{}.propertyIsEnumerable.call(e,o)&&(i[o]=e[o])}return i}(_ref,_excluded),{t}=(0,i18n.B)(),cardTitle="".concat(displayName,", ").concat(description);return"paused"===state?cardTitle+=", ".concat(t("ProjectCard.state"),": ").concat(t("ProjectCard.paused")):"finished"===state&&(cardTitle+=", ".concat(t("ProjectCard.state"),": ").concat(t("ProjectCard.finished"))),badge&&(cardTitle+=", ".concat(t("ProjectCard.classifications"),": ").concat(badge)),(0,jsx_runtime.jsxs)(StyledProjectCard,_objectSpread(_objectSpread({a11yTitle:cardTitle,elevation:"small",flex:!1,forwardedAs:"a",href,round:"8px",cardFontSize:cardFontSize(size),height:"".concat(14*cardWidth(size)/11,"px"),width:"".concat(cardWidth(size),"px")},rest),{},{children:[(0,jsx_runtime.jsx)(Box.a,{className:"project-image",background:{image:"url(".concat(imageSrc,")"),position:"top",size:"cover"},height:"".concat(cardWidth(size),"px"),round:{corner:"top",size:"8px"},children:(0,jsx_runtime.jsx)(components_CardHeader,{badge,state})}),(0,jsx_runtime.jsxs)(StyledProjectContent,{flex:"grow",justify:"center",pad:{horizontal:"xsmall"},round:{corner:"bottom",size:"8px"},children:[(0,jsx_runtime.jsx)(StyledProjectName,{color:{dark:"neutral-6",light:"dark-5"},size:"inherit",textAlign:"center",weight:"bold",children:displayName}),(0,jsx_runtime.jsx)(StyledProjectDescription,{color:{dark:"neutral-6",light:"dark-5"},size:"inherit",textAlign:"center",uppercase:!1,children:description})]})]}))}ProjectCard.propTypes={badge:prop_types.number,description:prop_types.string,displayName:prop_types.string,href:prop_types.string,imageSrc:prop_types.string,size:prop_types.string,state:prop_types.string};const ProjectCard_ProjectCard=ProjectCard},"../lib-react-components/dist/esm/ZooniverseLogo/ZooniverseLogo.js"(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{A:()=>ZooniverseLogo});var prop_types__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/prop-types/index.js"),_translations_i18n__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../lib-react-components/dist/esm/translations/i18n.js"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("../../node_modules/react/jsx-runtime.js"),_excluded=["id","size"];function ownKeys(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);r&&(o=o.filter(function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable})),t.push.apply(t,o)}return t}function _objectSpread(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?ownKeys(Object(t),!0).forEach(function(r){_defineProperty(e,r,t[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):ownKeys(Object(t)).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))})}return e}function _defineProperty(e,r,t){return(r=function _toPropertyKey(t){var i=function _toPrimitive(t,r){if("object"!=typeof t||!t)return t;var e=t[Symbol.toPrimitive];if(void 0!==e){var i=e.call(t,r||"default");if("object"!=typeof i)return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===r?String:Number)(t)}(t,"string");return"symbol"==typeof i?i:i+""}(r))in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function ZooniverseLogo(_ref){var{id,size="1em"}=_ref,rest=function _objectWithoutProperties(e,t){if(null==e)return{};var o,r,i=function _objectWithoutPropertiesLoose(r,e){if(null==r)return{};var t={};for(var n in r)if({}.hasOwnProperty.call(r,n)){if(-1!==e.indexOf(n))continue;t[n]=r[n]}return t}(e,t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);for(r=0;r<n.length;r++)o=n[r],-1===t.indexOf(o)&&{}.propertyIsEnumerable.call(e,o)&&(i[o]=e[o])}return i}(_ref,_excluded),{t}=(0,_translations_i18n__WEBPACK_IMPORTED_MODULE_1__.B)();return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("svg",_objectSpread(_objectSpread({role:"img",viewBox:"0 0 100 100",width:size,height:size,"aria-labelledby":id},rest),{},{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("title",{id,children:t("ZooniverseLogo.title")}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("g",{fill:"currentColor",stroke:"none",transform:"translate(50, 50)",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("path",{d:"M 0 -45 A 45 45 0 0 1 0 45 A 45 45 0 0 1 0 -45 Z M 0 -30 A 30 30 0 0 0 0 30 A 30 30 0 0 0 0 -30 Z"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("path",{d:"M 0 -14 A 14 14 0 0 1 0 14 A 14 14 0 0 1 0 -14 Z"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("ellipse",{cx:"0",cy:"0",rx:"6",ry:"65",transform:"rotate(50)"})]})]}))}ZooniverseLogo.propTypes={id:prop_types__WEBPACK_IMPORTED_MODULE_0__.string.isRequired,size:prop_types__WEBPACK_IMPORTED_MODULE_0__.string}},"./src/components/HorizontalRuleLogo/HorizontalRuleLogo.jsx"(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/react/jsx-runtime.js"),styled_components__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../node_modules/styled-components/dist/styled-components.browser.esm.js"),grommet__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("../../node_modules/grommet/es6/components/Box/Box.js"),_zooniverse_react_components_ZooniverseLogo__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("../lib-react-components/dist/esm/ZooniverseLogo/ZooniverseLogo.js");let t,t1,t2,t3,t4,t5,t6,t7,t8,t9,t10,_=t=>t;const LeftElement=(0,styled_components__WEBPACK_IMPORTED_MODULE_1__.default)(grommet__WEBPACK_IMPORTED_MODULE_2__.a)(t4||(t4=_`
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
          `),props.theme.global.colors["neutral-1"],props.theme.global.colors["neutral-1"]));function HorizontalRuleLogo(){const{dark,global}=(0,styled_components__WEBPACK_IMPORTED_MODULE_1__.useTheme)();return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(HorizontalRuleLogoContainer,{align:"center",direction:"row",justify:"center",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(LeftElement,{}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_zooniverse_react_components_ZooniverseLogo__WEBPACK_IMPORTED_MODULE_3__.A,{id:"root-about-zooniverse",color:dark?global.colors["accent-1"]:global.colors["neutral-1"],size:"48px"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(RightElement,{})]})}const __WEBPACK_DEFAULT_EXPORT__=HorizontalRuleLogo;HorizontalRuleLogo.__docgenInfo={description:"",methods:[],displayName:"HorizontalRuleLogo"}},"./src/screens/Home/DefaultHome/components/FeaturedProjects.jsx"(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{A:()=>FeaturedProjects});var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/react/jsx-runtime.js"),grommet__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../node_modules/grommet/es6/contexts/ResponsiveContext/ResponsiveContext.js"),grommet__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("../../node_modules/grommet/es6/components/Box/Box.js"),react__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("../../node_modules/react/index.js"),swr__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("../../node_modules/swr/dist/index/index.mjs"),_zooniverse_panoptes_js__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("../lib-panoptes-js/src/index.js"),_zooniverse_react_components__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("../lib-react-components/dist/esm/SpacedHeading/SpacedHeading.js"),_zooniverse_react_components__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__("../lib-react-components/dist/esm/ProjectCard/ProjectCard.js"),react_i18next__WEBPACK_IMPORTED_MODULE_8__=__webpack_require__("../../node_modules/react-i18next/dist/es/index.js"),_components_HorizontalRuleLogo_HorizontalRuleLogo__WEBPACK_IMPORTED_MODULE_9__=__webpack_require__("./src/components/HorizontalRuleLogo/HorizontalRuleLogo.jsx"),console=__webpack_require__("../../node_modules/console-browserify/index.js");const SWROptions={revalidateIfStale:!0,revalidateOnMount:!0,revalidateOnFocus:!0,revalidateOnReconnect:!0,refreshInterval:0},getFeaturedProjects=async()=>{try{const response=await _zooniverse_panoptes_js__WEBPACK_IMPORTED_MODULE_5__.dt.get({query:{featured:!0,launch_approved:!0,cards:!0}});return response.ok?response.body.projects:[]}catch(error){return console.log(error),[]}};function FeaturedProjects(){const{data:featuredProjects,isLoading}=function useFeaturedProjects(){return(0,swr__WEBPACK_IMPORTED_MODULE_4__.Ay)("featured-projects",getFeaturedProjects,SWROptions)}(),{t}=(0,react_i18next__WEBPACK_IMPORTED_MODULE_8__.Bd)(),cardSize="small"===(0,react__WEBPACK_IMPORTED_MODULE_3__.useContext)(grommet__WEBPACK_IMPORTED_MODULE_1__.u)?"medium":"xlarge";return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(grommet__WEBPACK_IMPORTED_MODULE_2__.a,{fill:!0,children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_zooniverse_react_components__WEBPACK_IMPORTED_MODULE_6__.A,{level:2,size:"1.5rem",color:{light:"neutral-1",dark:"accent-1"},textAlign:"center",fill:!0,margin:{bottom:"medium",top:"0"},children:t("Home.DefaultHome.FeaturedProjects.heading")}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_HorizontalRuleLogo_HorizontalRuleLogo__WEBPACK_IMPORTED_MODULE_9__.A,{}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(grommet__WEBPACK_IMPORTED_MODULE_2__.a,{as:"ul",direction:"row",justify:"between",margin:{top:"medium",bottom:"0"},gap:"small",pad:{horizontal:"xxsmall",bottom:"xsmall"},overflow:{horizontal:"auto"},style:{listStyle:"none"},children:(null==featuredProjects?void 0:featuredProjects.length)?featuredProjects.map(project=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_zooniverse_react_components__WEBPACK_IMPORTED_MODULE_7__.A,{description:project.description,displayName:project.display_name,href:`https://www.zooniverse.org/projects/${project.slug}`,imageSrc:project.avatar_src,size:cardSize},project.slug)):(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(grommet__WEBPACK_IMPORTED_MODULE_2__.a,{as:"li",align:"center",fill:!0,children:t("Home.DefaultHome.FeaturedProjects.none")})})]})}FeaturedProjects.__docgenInfo={description:"",methods:[],displayName:"FeaturedProjects"}}}]);
//# sourceMappingURL=1662.c577dceb.iframe.bundle.js.map