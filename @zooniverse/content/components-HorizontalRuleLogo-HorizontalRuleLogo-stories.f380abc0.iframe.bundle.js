"use strict";(self.webpackChunk_zooniverse_content=self.webpackChunk_zooniverse_content||[]).push([[2727],{"../lib-react-components/dist/esm/ZooniverseLogo/ZooniverseLogo.js"(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{A:()=>ZooniverseLogo});var prop_types__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/prop-types/index.js"),_translations_i18n__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../lib-react-components/dist/esm/translations/i18n.js"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("../../node_modules/react/jsx-runtime.js"),_excluded=["id","size"];function ownKeys(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);r&&(o=o.filter(function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable})),t.push.apply(t,o)}return t}function _objectSpread(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?ownKeys(Object(t),!0).forEach(function(r){_defineProperty(e,r,t[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):ownKeys(Object(t)).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))})}return e}function _defineProperty(e,r,t){return(r=function _toPropertyKey(t){var i=function _toPrimitive(t,r){if("object"!=typeof t||!t)return t;var e=t[Symbol.toPrimitive];if(void 0!==e){var i=e.call(t,r||"default");if("object"!=typeof i)return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===r?String:Number)(t)}(t,"string");return"symbol"==typeof i?i:i+""}(r))in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function ZooniverseLogo(_ref){var{id,size="1em"}=_ref,rest=function _objectWithoutProperties(e,t){if(null==e)return{};var o,r,i=function _objectWithoutPropertiesLoose(r,e){if(null==r)return{};var t={};for(var n in r)if({}.hasOwnProperty.call(r,n)){if(-1!==e.indexOf(n))continue;t[n]=r[n]}return t}(e,t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);for(r=0;r<n.length;r++)o=n[r],-1===t.indexOf(o)&&{}.propertyIsEnumerable.call(e,o)&&(i[o]=e[o])}return i}(_ref,_excluded),{t}=(0,_translations_i18n__WEBPACK_IMPORTED_MODULE_1__.B)();return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("svg",_objectSpread(_objectSpread({role:"img",viewBox:"0 0 100 100",width:size,height:size,"aria-labelledby":id},rest),{},{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("title",{id,children:t("ZooniverseLogo.title")}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("g",{fill:"currentColor",stroke:"none",transform:"translate(50, 50)",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("path",{d:"M 0 -45 A 45 45 0 0 1 0 45 A 45 45 0 0 1 0 -45 Z M 0 -30 A 30 30 0 0 0 0 30 A 30 30 0 0 0 0 -30 Z"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("path",{d:"M 0 -14 A 14 14 0 0 1 0 14 A 14 14 0 0 1 0 -14 Z"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("ellipse",{cx:"0",cy:"0",rx:"6",ry:"65",transform:"rotate(50)"})]})]}))}ZooniverseLogo.propTypes={id:prop_types__WEBPACK_IMPORTED_MODULE_0__.string.isRequired,size:prop_types__WEBPACK_IMPORTED_MODULE_0__.string}},"./src/components/HorizontalRuleLogo/HorizontalRuleLogo.jsx"(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/react/jsx-runtime.js"),styled_components__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../node_modules/styled-components/dist/styled-components.browser.esm.js"),grommet__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("../../node_modules/grommet/es6/components/Box/Box.js"),_zooniverse_react_components_ZooniverseLogo__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("../lib-react-components/dist/esm/ZooniverseLogo/ZooniverseLogo.js");let t,t1,t2,t3,t4,t5,t6,t7,t8,t9,t10,_=t=>t;const LeftElement=(0,styled_components__WEBPACK_IMPORTED_MODULE_1__.default)(grommet__WEBPACK_IMPORTED_MODULE_2__.a)(t4||(t4=_`
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
          `),props.theme.global.colors["neutral-1"],props.theme.global.colors["neutral-1"]));function HorizontalRuleLogo(){const{dark,global}=(0,styled_components__WEBPACK_IMPORTED_MODULE_1__.useTheme)();return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(HorizontalRuleLogoContainer,{align:"center",direction:"row",justify:"center",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(LeftElement,{}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_zooniverse_react_components_ZooniverseLogo__WEBPACK_IMPORTED_MODULE_3__.A,{id:"root-about-zooniverse",color:dark?global.colors["accent-1"]:global.colors["neutral-1"],size:"48px"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(RightElement,{})]})}const __WEBPACK_DEFAULT_EXPORT__=HorizontalRuleLogo;HorizontalRuleLogo.__docgenInfo={description:"",methods:[],displayName:"HorizontalRuleLogo"}},"./src/components/HorizontalRuleLogo/HorizontalRuleLogo.stories.jsx"(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/react/jsx-runtime.js"),_HorizontalRuleLogo__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/components/HorizontalRuleLogo/HorizontalRuleLogo.jsx");const __WEBPACK_DEFAULT_EXPORT__={title:"Shared / HorizontalRuleLogo",component:_HorizontalRuleLogo__WEBPACK_IMPORTED_MODULE_1__.A},Default=()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_HorizontalRuleLogo__WEBPACK_IMPORTED_MODULE_1__.A,{}),__namedExportsOrder=["Default"]}}]);
//# sourceMappingURL=components-HorizontalRuleLogo-HorizontalRuleLogo-stories.f380abc0.iframe.bundle.js.map