"use strict";(self.webpackChunk_zooniverse_content=self.webpackChunk_zooniverse_content||[]).push([[8373],{"../../node_modules/grommet-icons/es6/StyledIcon.js"(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{v:()=>StyledIcon});var react=__webpack_require__("../../node_modules/react/index.js"),styled_components_browser_esm=__webpack_require__("../../node_modules/styled-components/dist/styled-components.browser.esm.js"),defaultProps={theme:{global:{colors:{icon:"#666666"}},icon:{size:{small:"12px",medium:"24px",large:"48px",xlarge:"96px"}}}},utils=__webpack_require__("../../node_modules/grommet-icons/es6/utils.js"),_excluded=["a11yTitle","color","size","theme"];function _extends(){return _extends=Object.assign?Object.assign.bind():function(n){for(var e=1;e<arguments.length;e++){var t=arguments[e];for(var r in t)({}).hasOwnProperty.call(t,r)&&(n[r]=t[r])}return n},_extends.apply(null,arguments)}var normalizeColor=function normalizeColor(color,theme,dark){var colorSpec=theme.global&&void 0!==theme.global.colors[color]?theme.global.colors[color]:color,result=colorSpec;return colorSpec&&((!0===dark||void 0===dark&&theme.dark)&&void 0!==colorSpec.dark?result=colorSpec.dark:!1!==dark&&theme.dark||void 0===colorSpec.light||(result=colorSpec.light)),result&&theme.global&&void 0!==theme.global.colors[result]&&(result=normalizeColor(result,theme,dark)),result},colorStyle=function colorStyle(name,value,theme,required){return(0,styled_components_browser_esm.css)(["",":",";"],name,normalizeColor(value,theme,required))},colorCss=(0,styled_components_browser_esm.css)([""," "," g{fill:inherit;stroke:inherit;}*:not([stroke]){&[fill='none']{stroke-width:0;}}*[stroke*='#'],*[STROKE*='#']{stroke:inherit;fill:none;}*[fill-rule],*[FILL-RULE],*[fill*='#'],*[FILL*='#']{fill:inherit;stroke:none;}"],function(props){return colorStyle("fill",props.color||props.theme.global.colors.icon,props.theme)},function(props){return colorStyle("stroke",props.color||props.theme.global.colors.icon,props.theme)}),IconInner=(0,react.forwardRef)(function(_ref,ref){var a11yTitle=_ref.a11yTitle,rest=(_ref.color,_ref.size,_ref.theme,function _objectWithoutPropertiesLoose(r,e){if(null==r)return{};var t={};for(var n in r)if({}.hasOwnProperty.call(r,n)){if(e.indexOf(n)>=0)continue;t[n]=r[n]}return t}(_ref,_excluded));return react.createElement("svg",_extends({ref,"aria-label":a11yTitle},rest))});IconInner.displayName="Icon";var StyledIcon=(0,styled_components_browser_esm.default)(IconInner).withConfig({shouldForwardProp:function shouldForwardProp(prop){return!["height","width"].includes(prop)}}).withConfig({displayName:"StyledIcon",componentId:"sc-ofa7kd-0"})(["display:inline-block;flex:0 0 auto;"," "," "," ",""],function(_ref2){var _size$match,_ref2$size=_ref2.size,sizeProp=void 0===_ref2$size?"medium":_ref2$size,theme=_ref2.theme,_split=(_ref2.viewBox||"0 0 24 24").split(" "),w=_split[2],h=_split[3],scale=w/h,size=theme.icon.size[sizeProp]||sizeProp,dimension=(0,utils.HY)(size),unit=(null==(_size$match=size.match(/[a-z]+$/))?void 0:_size$match[0])||"px";return w<h?"\n      width: "+dimension+unit+";\n      height: "+dimension/scale+unit+";\n    ":h<w?"\n      width: "+dimension*scale+unit+";\n      height: "+dimension+unit+";\n    ":"\n      width: "+dimension+unit+";\n      height: "+dimension+unit+";\n    "},function(_ref3){return"plain"!==_ref3.color&&colorCss},function(props){return(props.height||props.width)&&(0,utils.zj)(props)},function(_ref4){var theme=_ref4.theme;return theme&&theme.icon.extend});StyledIcon.defaultProps={},Object.setPrototypeOf(StyledIcon.defaultProps,defaultProps)},"../../node_modules/grommet-icons/es6/icons/FormDown.js"(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{t:()=>FormDown});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/react/index.js"),_StyledIcon__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../node_modules/grommet-icons/es6/StyledIcon.js");function _extends(){return _extends=Object.assign?Object.assign.bind():function(n){for(var e=1;e<arguments.length;e++){var t=arguments[e];for(var r in t)({}).hasOwnProperty.call(t,r)&&(n[r]=t[r])}return n},_extends.apply(null,arguments)}var FormDown=(0,react__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(function(props,ref){return react__WEBPACK_IMPORTED_MODULE_0__.createElement(_StyledIcon__WEBPACK_IMPORTED_MODULE_1__.v,_extends({ref,viewBox:"0 0 24 24",a11yTitle:"FormDown"},props),react__WEBPACK_IMPORTED_MODULE_0__.createElement("path",{fill:"none",stroke:"#000",strokeWidth:"2",d:"m18 9-6 6-6-6"}))});FormDown.displayName="FormDown"},"../../node_modules/grommet-icons/es6/utils.js"(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{HY:()=>parseMetricToNum,Uf:()=>useScaleProps,zj:()=>iconPad});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/react/index.js"),styled_components__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../node_modules/styled-components/dist/styled-components.browser.esm.js");var parseMetricToNum=function parseMetricToNum(string){return void 0===string&&(string=""),parseFloat(string.match(/\d+(\.\d+)?/),10)};function useScaleProps(props){var _theme$icon,theme=(0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(styled_components__WEBPACK_IMPORTED_MODULE_1__.ThemeContext),size=props.size,result={};null!=theme&&null!=(_theme$icon=theme.icon)&&_theme$icon.disableScaleDown&&(parseMetricToNum(theme.icon.size[size]||size)<24&&(result.vectorEffect="non-scaling-stroke"));return result}var calculatePad=function calculatePad(value,iconDimension){return(value-iconDimension)/2+"px"};function iconPad(props){var _theme$icon2,_theme$text,_theme$text2,_window,height=props.height,_props$size=props.size,size=void 0===_props$size?"medium":_props$size,width=props.width,theme=(0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(styled_components__WEBPACK_IMPORTED_MODULE_1__.ThemeContext),iconDimension=parseMetricToNum((null==theme||null==(_theme$icon2=theme.icon)||null==(_theme$icon2=_theme$icon2.size)?void 0:_theme$icon2[size])||size),style="",rootFontSize=parseMetricToNum("16px");"undefined"!=typeof window&&(rootFontSize=parseMetricToNum((null==(_window=window)?void 0:_window.getComputedStyle(document.body).getPropertyValue("font-size"))||"16px"));if(height&&null!=theme&&null!=(_theme$text=theme.text)&&null!=(_theme$text=_theme$text[height])&&_theme$text.height){var unit=theme.text[height].height.match(/(px|rem)/)[0],lineHeight=parseMetricToNum(theme.text[height].height);if("rem"===unit&&(lineHeight*=rootFontSize),lineHeight>iconDimension){var pad=calculatePad(lineHeight,iconDimension);style+="padding-top: "+pad+"; padding-bottom: "+pad+";"}}if(width&&null!=theme&&null!=(_theme$text2=theme.text)&&null!=(_theme$text2=_theme$text2[width])&&_theme$text2.height){var _unit=theme.text[width].height.match(/(px|rem)/)[0],desiredWidth=parseMetricToNum(theme.text[width].height);if("rem"===_unit&&(desiredWidth*=rootFontSize),desiredWidth>iconDimension){var _pad=calculatePad(desiredWidth,iconDimension);style+="padding-left: "+_pad+"; padding-right: "+_pad+";"}}return style}},"../../node_modules/grommet/es6/components/DropButton/DropButton.js"(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{E:()=>DropButton});var react=__webpack_require__("../../node_modules/react/index.js"),Button=__webpack_require__("../../node_modules/grommet/es6/components/Button/Button.js"),Drop=__webpack_require__("../../node_modules/grommet/es6/components/Drop/Drop.js"),refs=__webpack_require__("../../node_modules/grommet/es6/utils/refs.js");var DropButtonPropTypes={},_excluded=["a11yTitle","onAlign","disabled","dropAlign","dropProps","dropContent","dropTarget","id","open","onClick","onClose","onOpen"];function DropButton_extends(){return DropButton_extends=Object.assign?Object.assign.bind():function(n){for(var e=1;e<arguments.length;e++){var t=arguments[e];for(var r in t)({}).hasOwnProperty.call(t,r)&&(n[r]=t[r])}return n},DropButton_extends.apply(null,arguments)}var defaultDropAlign={top:"top",left:"left"},DropButton=(0,react.forwardRef)(function(_ref,ref){var _ref$a11yTitle=_ref.a11yTitle,a11yTitle=void 0===_ref$a11yTitle?"Open Drop":_ref$a11yTitle,onAlign=_ref.onAlign,disabled=_ref.disabled,_ref$dropAlign=_ref.dropAlign,dropAlign=void 0===_ref$dropAlign?defaultDropAlign:_ref$dropAlign,dropProps=_ref.dropProps,dropContent=_ref.dropContent,dropTarget=_ref.dropTarget,id=_ref.id,open=_ref.open,onClick=_ref.onClick,onClose=_ref.onClose,onOpen=_ref.onOpen,rest=function _objectWithoutPropertiesLoose(r,e){if(null==r)return{};var t={};for(var n in r)if({}.hasOwnProperty.call(r,n)){if(-1!==e.indexOf(n))continue;t[n]=r[n]}return t}(_ref,_excluded),buttonRef=(0,refs.N)(ref),_useState=(0,react.useState)(),show=_useState[0],setShow=_useState[1];(0,react.useEffect)(function(){void 0!==open&&open!==show&&setShow(open)},[open,show]);var onDropClose=(0,react.useCallback)(function(event){for(var node=event.composed&&event.composedPath()[0]||event.target;node&&node!==document&&!(node instanceof ShadowRoot)&&node!==buttonRef.current;)node=node.parentNode;node!==buttonRef.current&&(void 0===open&&setShow(!1),onClose&&onClose(event))},[buttonRef,onClose,open]),onClickInternal=(0,react.useCallback)(function(event){show?(setShow(!1),onClose&&onClose(event)):(setShow(!0),onOpen&&onOpen(event)),onClick&&onClick(event)},[onClick,onClose,onOpen,show]);return react.createElement(react.Fragment,null,react.createElement(Button.$,DropButton_extends({id,ref:buttonRef,a11yTitle,disabled},rest,{onClick:onClickInternal})),show&&buttonRef.current&&react.createElement(Drop.e,DropButton_extends({id:id?id+"__drop":void 0,onAlign,restrictFocus:!0,align:dropAlign,target:dropTarget||buttonRef,onClickOutside:onDropClose,onEsc:onDropClose},dropProps),dropContent))});DropButton.displayName="DropButton",DropButton.propTypes=DropButtonPropTypes},"../lib-react-components/dist/esm/SpacedText/SpacedText.js"(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{A:()=>SpacedText});var grommet__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/grommet/es6/components/Text/Text.js"),styled_components__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../node_modules/styled-components/dist/styled-components.browser.esm.js"),prop_types__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("../../node_modules/prop-types/index.js"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("../../node_modules/react/jsx-runtime.js"),_excluded=["children","margin","size","uppercase","weight"];function ownKeys(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);r&&(o=o.filter(function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable})),t.push.apply(t,o)}return t}function _objectSpread(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?ownKeys(Object(t),!0).forEach(function(r){_defineProperty(e,r,t[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):ownKeys(Object(t)).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))})}return e}function _defineProperty(e,r,t){return(r=function _toPropertyKey(t){var i=function _toPrimitive(t,r){if("object"!=typeof t||!t)return t;var e=t[Symbol.toPrimitive];if(void 0!==e){var i=e.call(t,r||"default");if("object"!=typeof i)return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===r?String:Number)(t)}(t,"string");return"symbol"==typeof i?i:i+""}(r))in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}var StyledText=(0,styled_components__WEBPACK_IMPORTED_MODULE_1__.default)(grommet__WEBPACK_IMPORTED_MODULE_0__.E).withConfig({displayName:"SpacedText__StyledText",componentId:"sc-kfun0y-0"})(["letter-spacing:0.0625rem;",""],props=>props.uppercase?(0,styled_components__WEBPACK_IMPORTED_MODULE_1__.css)(["text-transform:uppercase;"]):(0,styled_components__WEBPACK_IMPORTED_MODULE_1__.css)(["text-transform:normal;"]));function SpacedText(_ref){var{children,margin="none",size="small",uppercase=!0,weight="normal"}=_ref,props=function _objectWithoutProperties(e,t){if(null==e)return{};var o,r,i=function _objectWithoutPropertiesLoose(r,e){if(null==r)return{};var t={};for(var n in r)if({}.hasOwnProperty.call(r,n)){if(-1!==e.indexOf(n))continue;t[n]=r[n]}return t}(e,t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);for(r=0;r<n.length;r++)o=n[r],-1===t.indexOf(o)&&{}.propertyIsEnumerable.call(e,o)&&(i[o]=e[o])}return i}(_ref,_excluded);return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(StyledText,_objectSpread(_objectSpread({margin,size,uppercase,weight},props),{},{children}))}SpacedText.propTypes={children:prop_types__WEBPACK_IMPORTED_MODULE_2__.node.isRequired,margin:(0,prop_types__WEBPACK_IMPORTED_MODULE_2__.oneOfType)([prop_types__WEBPACK_IMPORTED_MODULE_2__.string,(0,prop_types__WEBPACK_IMPORTED_MODULE_2__.objectOf)(prop_types__WEBPACK_IMPORTED_MODULE_2__.string)]),size:prop_types__WEBPACK_IMPORTED_MODULE_2__.string,uppercase:prop_types__WEBPACK_IMPORTED_MODULE_2__.bool,weight:(0,prop_types__WEBPACK_IMPORTED_MODULE_2__.oneOfType)([prop_types__WEBPACK_IMPORTED_MODULE_2__.number,prop_types__WEBPACK_IMPORTED_MODULE_2__.string])}},"../lib-react-components/dist/esm/ZooniverseLogotype/ZooniverseLogotype.js"(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{A:()=>ZooniverseLogotype});var prop_types=__webpack_require__("../../node_modules/prop-types/index.js"),jsx_runtime=__webpack_require__("../../node_modules/react/jsx-runtime.js");function SVGContent(){return(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[(0,jsx_runtime.jsx)("polygon",{points:"32.5,20.2 32.5,57.5 169.4,57.5 27.9,229.9 27.9,261 224.2,261 224.2,223.7 82.7,223.7 224.2,51.4 224.2,20.2"}),(0,jsx_runtime.jsx)("path",{d:"M307.6,140.6v-0.8c0-46.5,33.1-85,80.7-85s81.4,38.8,81.4,85.8v0.8c0,46.5-33.5,85-80.7,85 C341.4,226.4,307.6,187.5,307.6,140.6 M263,140.6v0.8c0,67.7,51.4,123.8,124.8,123.8s125.6-56.9,125.6-124.6v-0.8 C513.4,72.2,462,16,388.6,16S263,72.9,263,140.6"}),(0,jsx_runtime.jsx)("polygon",{points:"1036.6,20.2 1036.6,186.8 908.3,20.2 869.1,20.2 869.1,261 910.6,261 910.6,89.9 1042.6,261 1078,261 1078,20.2 "}),(0,jsx_runtime.jsx)("rect",{x:"1138.5",y:"20.2",width:"42.2",height:"240.8"}),(0,jsx_runtime.jsx)("polygon",{points:"1421.6,20.2 1349.7,205.2 1277.4,20.2 1231,20.2 1330.7,262.5 1367.6,262.5 1467.3,20.2"}),(0,jsx_runtime.jsx)("polygon",{points:"1515.2,20.2 1515.2,261 1694.8,261 1694.8,223.3 1557.4,223.3 1557.4,158.7 1677.7,158.7 1677.7,120.6 1557.4,120.6 1557.4,57.9 1692.9,57.9 1692.9,20.2"}),(0,jsx_runtime.jsx)("path",{d:"M1794.1,139.1V58.7h61.3c30.8,0,49.5,14.2,49.5,39.6v0.8c0,24.6-19.4,40-49.5,40H1794.1z M1751.1,20.2h-0.4V261h42.2v-84.2 h52.1h1.1l59,84.2h49.5l-64.7-91.2c33.5-9.2,57.1-33.5,57.1-72.7v-0.8c0-21.2-7.2-38.8-19.8-51.9c-15.6-15.4-39.2-24.2-69.3-24.2 H1751.1z"}),(0,jsx_runtime.jsx)("path",{d:"M1999.2,86.8v0.8c0,44.2,28.9,59.6,79.9,71.9c44.5,10.4,54,19.6,54,36.5v0.8c0,18.1-16.7,30.4-42.6,30.4 c-29.7,0-52.9-11.5-75.7-31.2l-25.5,30.4c28.9,26.2,63.5,38.5,100.1,38.5c50.2,0,85.6-26.9,85.6-71.9v-0.8 c0-40-26.3-58.5-76.9-70.8c-45.7-11.2-56.7-19.2-56.7-37.7v-0.8c0-16.2,14.5-28.8,39.2-28.8c22.1,0,43.4,8.8,65.1,25l22.4-31.9 c-24.4-19.6-52.1-30.4-87.1-30.4C2033.4,16.8,1999.2,45.6,1999.2,86.8"}),(0,jsx_runtime.jsx)("polygon",{points:"2226.3,20.2 2226.3,261 2405.9,261 2405.9,223.3 2268.6,223.3 2268.6,158.7 2388.8,158.7 2388.8,120.6 2268.6,120.6 2268.6,57.9 2404,57.9 2404,20.2"}),(0,jsx_runtime.jsx)("path",{d:"M710.1,140.2c0-1.2,0-2.7-0.4-3.8c17.1-13.1,33.1-25.8,47.2-37.3c6.5,12.7,9.9,26.5,9.9,41.5v0.8c0,46.9-33.1,85-80.7,85 c-24.7,0-46-10.8-60.5-27.3c14.8-10.4,31.6-22.3,48.7-35.4c3.4,1.9,7.2,2.7,11,2.7C699.1,166.4,710.1,154.9,710.1,140.2 M604.7,140.6v-0.8c0-46.9,33.1-85,80.7-85c24.7,0,46,10.8,60.5,27.3c-14.8,10.4-31.6,22.3-48.7,35.4c-3.4-1.9-7.2-2.7-11-2.7 c-13.7,0-24.7,11.5-24.7,26.2c0,1.2,0,2.7,0.4,3.8c-17.1,13.1-33.1,25.8-47.2,37.3C608.1,169.5,604.7,155.6,604.7,140.6 M561,140.2 v0.8c0,25.4,7.2,49.2,20.2,68.8c-20.5,18.1-32,30.4-30.1,32.7s16.7-5.4,39.6-20c22.1,25.8,55.5,42.7,95.1,42.7 c73.4,0,125.6-57.3,125.6-125v-0.8c0-25.4-7.2-49.2-20.2-68.8c20.2-17.7,31.6-30,30.1-32.7c-1.9-2.3-16.7,5.4-39.6,20 c-22.1-25.8-55.5-42.7-95.1-42.7C613.1,15.2,561,72.5,561,140.2"})]})}var _excluded=["id","width"];function ownKeys(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);r&&(o=o.filter(function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable})),t.push.apply(t,o)}return t}function _objectSpread(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?ownKeys(Object(t),!0).forEach(function(r){_defineProperty(e,r,t[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):ownKeys(Object(t)).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))})}return e}function _defineProperty(e,r,t){return(r=function _toPropertyKey(t){var i=function _toPrimitive(t,r){if("object"!=typeof t||!t)return t;var e=t[Symbol.toPrimitive];if(void 0!==e){var i=e.call(t,r||"default");if("object"!=typeof i)return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===r?String:Number)(t)}(t,"string");return"symbol"==typeof i?i:i+""}(r))in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function ZooniverseLogotype(_ref){var{id,width=178}=_ref,rest=function _objectWithoutProperties(e,t){if(null==e)return{};var o,r,i=function _objectWithoutPropertiesLoose(r,e){if(null==r)return{};var t={};for(var n in r)if({}.hasOwnProperty.call(r,n)){if(-1!==e.indexOf(n))continue;t[n]=r[n]}return t}(e,t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);for(r=0;r<n.length;r++)o=n[r],-1===t.indexOf(o)&&{}.propertyIsEnumerable.call(e,o)&&(i[o]=e[o])}return i}(_ref,_excluded),height="number"==typeof width?280.5/2433.8*width:"100%";return(0,jsx_runtime.jsxs)("svg",_objectSpread(_objectSpread({"aria-labelledby":id,height,role:"img",viewBox:"0 0 ".concat(2433.8," ").concat(280.5),width},rest),{},{children:[(0,jsx_runtime.jsx)("title",{id,children:"Zooniverse"}),(0,jsx_runtime.jsx)("g",{fill:"currentColor",stroke:"none",children:(0,jsx_runtime.jsx)(SVGContent,{})})]}))}ZooniverseLogotype.propTypes={id:prop_types.string.isRequired,width:(0,prop_types.oneOfType)([prop_types.number,prop_types.string])}},"./src/components/DropdownNav/DropdownNav.jsx"(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/react/jsx-runtime.js"),react__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../node_modules/react/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("../../node_modules/prop-types/index.js"),styled_components__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("../../node_modules/styled-components/dist/styled-components.browser.esm.js"),grommet__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("../../node_modules/grommet/es6/components/Button/Button.js"),grommet__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("../../node_modules/grommet/es6/components/DropButton/DropButton.js"),grommet__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("../../node_modules/grommet/es6/components/Nav/Nav.js"),grommet__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__("../../node_modules/grommet/es6/components/Box/Box.js"),grommet_icons__WEBPACK_IMPORTED_MODULE_8__=__webpack_require__("../../node_modules/grommet-icons/es6/icons/FormDown.js"),next_link__WEBPACK_IMPORTED_MODULE_9__=__webpack_require__("../../node_modules/next/link.js"),next_link__WEBPACK_IMPORTED_MODULE_9___default=__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_9__),_zooniverse_react_components__WEBPACK_IMPORTED_MODULE_10__=__webpack_require__("../lib-react-components/dist/esm/SpacedText/SpacedText.js");let t,t1,t2,t3,t4,t5,t6,t7,t8,_=t=>t;const StyledButton=(0,styled_components__WEBPACK_IMPORTED_MODULE_3__.default)(grommet__WEBPACK_IMPORTED_MODULE_4__.$)(t1||(t1=_`
  text-decoration: none;
  padding: 10px 15px;
  width: 100%;
  text-shadow: 0 2px 2px rgba(0, 0, 0, 0.22);

  &:hover,
  :focus {
    ${0}
  }

  &[aria-current='true'] {
    & > span {
      border-bottom: 2px solid white;
    }
  }
`),props=>(0,styled_components__WEBPACK_IMPORTED_MODULE_3__.css)(t||(t=_`
        background: ${0};
      `),props.theme.global.colors["neutral-1"])),StyledLink=(0,styled_components__WEBPACK_IMPORTED_MODULE_3__.default)(next_link__WEBPACK_IMPORTED_MODULE_9___default())(t3||(t3=_`
  text-decoration: none;
  padding: 10px 15px;
  width: 100%;
  text-shadow: 0 2px 2px rgba(0, 0, 0, 0.22);

  &:hover,
  :focus {
    ${0}
  }

  &[aria-current='page'] {
    & > span {
      border-bottom: 2px solid white;
    }
  }
`),props=>(0,styled_components__WEBPACK_IMPORTED_MODULE_3__.css)(t2||(t2=_`
        background: ${0};
      `),props.theme.global.colors["neutral-1"])),StyledDropButton=(0,styled_components__WEBPACK_IMPORTED_MODULE_3__.default)(grommet__WEBPACK_IMPORTED_MODULE_5__.E)(t6||(t6=_`
  border-radius: 2em;
  position: relative;
  min-width: 18rem;

  &:hover, &:focus {
    ${0}

    & > div > span {
      color: white;
    }

    & > div > [aria-label='FormDown'] {
      stroke: white;
    }
  }

  ${0}
`),props=>(0,styled_components__WEBPACK_IMPORTED_MODULE_3__.css)(t4||(t4=_`
      background: ${0};
    `),props.theme.global.colors["neutral-1"]),props=>props.open&&(0,styled_components__WEBPACK_IMPORTED_MODULE_3__.css)(t5||(t5=_`
      background: ${0};

      & > div > span {
        color: white;
      }

      & > div > [aria-label='FormDown'] {
        stroke: white;
      }

      &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        background: ${0};
        height: 50%;
        width: 100%;
        z-index: -1;
      }
    `),props.theme.global.colors["neutral-1"],props.theme.global.colors.brand)),StyledUl=styled_components__WEBPACK_IMPORTED_MODULE_3__.default.ul(t7||(t7=_`
  padding-inline-start: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
`)),StyledLi=styled_components__WEBPACK_IMPORTED_MODULE_3__.default.li(t8||(t8=_`
  list-style-type: none;
  display: flex;
  width: 100%;
`)),DEFAULT_HANDLER=()=>{};function DropdownNav({activeSection=0,className="",sections=[],setActiveSection=DEFAULT_HANDLER,sidebarLabel=""}){const[isOpen,setIsOpen]=(0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(!1),handleClose=()=>{setIsOpen(!1)},dropContent=(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(grommet__WEBPACK_IMPORTED_MODULE_6__.s,{"aria-label":sidebarLabel,width:"100%",background:"brand",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(StyledUl,{children:sections.map((section,index)=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(StyledLi,{children:section.slug?(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(StyledButton,{"aria-current":index===activeSection?"true":"false",href:`#${section.slug}`,onClick:()=>(index=>{handleClose(),setActiveSection(index)})(index),children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_zooniverse_react_components__WEBPACK_IMPORTED_MODULE_10__.A,{size:"0.875rem",color:"white",weight:"bold",children:section.name})}):(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(StyledLink,{"aria-current":index===activeSection?"page":"",href:section.href||"",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_zooniverse_react_components__WEBPACK_IMPORTED_MODULE_10__.A,{size:"0.875rem",color:"white",weight:"bold",children:section.name})})},section.name))})});return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(StyledDropButton,{alignSelf:"center",className,dropAlign:{top:"bottom"},onClose:handleClose,onOpen:()=>{setIsOpen(!0)},open:isOpen,margin:{top:"30px"},dropContent,children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(grommet__WEBPACK_IMPORTED_MODULE_7__.a,{align:"center",direction:"row",gap:"xsmall",justify:"center",pad:{horizontal:"20px",vertical:"10px"},children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_zooniverse_react_components__WEBPACK_IMPORTED_MODULE_10__.A,{weight:"bold",color:{light:"neutral-1",dark:"white"},children:sidebarLabel}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(grommet_icons__WEBPACK_IMPORTED_MODULE_8__.t,{color:{light:"neutral-1",dark:"white"}})]})})}const __WEBPACK_DEFAULT_EXPORT__=DropdownNav;DropdownNav.propTypes={activeSection:prop_types__WEBPACK_IMPORTED_MODULE_2__.number,className:prop_types__WEBPACK_IMPORTED_MODULE_2__.string,sections:(0,prop_types__WEBPACK_IMPORTED_MODULE_2__.arrayOf)((0,prop_types__WEBPACK_IMPORTED_MODULE_2__.shape)({active:prop_types__WEBPACK_IMPORTED_MODULE_2__.bool,name:prop_types__WEBPACK_IMPORTED_MODULE_2__.string,setActive:prop_types__WEBPACK_IMPORTED_MODULE_2__.func,href:prop_types__WEBPACK_IMPORTED_MODULE_2__.string,slug:prop_types__WEBPACK_IMPORTED_MODULE_2__.string})),setActiveSection:prop_types__WEBPACK_IMPORTED_MODULE_2__.func,sidebarLabel:prop_types__WEBPACK_IMPORTED_MODULE_2__.string},DropdownNav.__docgenInfo={description:"",methods:[],displayName:"DropdownNav",props:{activeSection:{defaultValue:{value:"0",computed:!1},description:"",type:{name:"custom",raw:"number"},required:!1},className:{defaultValue:{value:"''",computed:!1},description:"",type:{name:"custom",raw:"string"},required:!1},sections:{defaultValue:{value:"[]",computed:!1},description:"",type:{name:"arrayOf",value:{name:"shape",value:{active:{name:"bool",required:!1},name:{name:"string",required:!1},setActive:{name:"func",required:!1},href:{name:"string",required:!1},slug:{name:"string",required:!1}}}},required:!1},setActiveSection:{defaultValue:{value:"() => {}",computed:!1},description:"",type:{name:"custom",raw:"func"},required:!1},sidebarLabel:{defaultValue:{value:"''",computed:!1},description:"",type:{name:"custom",raw:"string"},required:!1}}}},"./src/components/MaxWidthContent/MaxWidthContent.jsx"(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{A:()=>Content});var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/react/jsx-runtime.js"),grommet__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../node_modules/grommet/es6/components/Box/Box.js");function Content({children,...props}){return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(grommet__WEBPACK_IMPORTED_MODULE_1__.a,{...props,width:"min(100%, 45rem)",children})}Content.__docgenInfo={description:"",methods:[],displayName:"Content"}},"./src/components/PageLayout/ContainerBox.jsx"(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var styled_components__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/styled-components/dist/styled-components.browser.esm.js"),grommet__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../node_modules/grommet/es6/components/Box/Box.js");let t,t1,t2,t3,t4,_=t=>t;const __WEBPACK_DEFAULT_EXPORT__=(0,styled_components__WEBPACK_IMPORTED_MODULE_0__.default)(grommet__WEBPACK_IMPORTED_MODULE_1__.a)(t4||(t4=_`
  position: relative;

  @media (width > 90rem) {
    box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.3); // Grommet elevation = 'medium'
    clip-path: inset(0px -30px 0 -30px); // don't put elevation top and bottom

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: -30px;
      width: 30px;
      height: 300px;
      clip-path: polygon(100% 0, 0 0, 100% 100%);

      ${0}
    }

    &::after {
      content: '';
      position: absolute;
      top: 0;
      right: -30px;
      width: 30px;
      height: 300px;
      clip-path: polygon(100% 0, 0 0, 0 100%);

      ${0}
    }
  }
`),props=>props.theme.dark?(0,styled_components__WEBPACK_IMPORTED_MODULE_0__.css)(t||(t=_`
              background: linear-gradient(
                to bottom left,
                rgba(0, 0, 0, 0.3) 0%,
                rgba(92, 92, 92, 0) 60%
              );
            `)):(0,styled_components__WEBPACK_IMPORTED_MODULE_0__.css)(t1||(t1=_`
              background: linear-gradient(
                to bottom left,
                rgba(92, 92, 92, 0.3) 0%,
                rgba(92, 92, 92, 0) 60%
              );
            `)),props=>props.theme.dark?(0,styled_components__WEBPACK_IMPORTED_MODULE_0__.css)(t2||(t2=_`
              background: linear-gradient(
                to bottom right,
                rgba(0, 0, 0, 0.3) 0%,
                rgba(92, 92, 92, 0) 60%
              );
            `)):(0,styled_components__WEBPACK_IMPORTED_MODULE_0__.css)(t3||(t3=_`
              background: linear-gradient(
                to bottom right,
                rgba(92, 92, 92, 0.3) 0%,
                rgba(92, 92, 92, 0) 60%
              );
            `)))},"./src/components/SharedStyledComponents/SharedStyledComponents.jsx"(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{A1:()=>StyledHeading,HK:()=>MobileHeading,PI:()=>StickyBox,eH:()=>StyledGrid,ik:()=>mobileBreakpoint,qJ:()=>StickySidebar});var styled_components__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/styled-components/dist/styled-components.browser.esm.js"),grommet__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../node_modules/grommet/es6/components/Heading/Heading.js"),grommet__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("../../node_modules/grommet/es6/components/Box/Box.js"),grommet__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("../../node_modules/grommet/es6/components/Grid/Grid.js"),_Sidebar_Sidebar__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./src/components/Sidebar/Sidebar.jsx");let t,t1,t2,t3,t4,t5,t6,t7,_=t=>t;const mobileBreakpoint="72rem",MobileHeading=(0,styled_components__WEBPACK_IMPORTED_MODULE_0__.default)(grommet__WEBPACK_IMPORTED_MODULE_1__.D)(t1||(t1=_`
  color: white;
  display: flex;
  justify-content: center;
  text-align: center;
  padding: 0 0 20px 0;
  margin: 0;
  width: 100%;

  ${0}

  @media (width > ${0}) {
    display: none;
  }
`),props=>(0,styled_components__WEBPACK_IMPORTED_MODULE_0__.css)(t||(t=_`
      background: ${0};
    `),props.theme.global.colors["neutral-1"]),mobileBreakpoint),StickyBox=(0,styled_components__WEBPACK_IMPORTED_MODULE_0__.default)(grommet__WEBPACK_IMPORTED_MODULE_2__.a)(t2||(t2=_`
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 1;

  @media (width > ${0}) {
    display: none;
  }
`),mobileBreakpoint),StickySidebar=(0,styled_components__WEBPACK_IMPORTED_MODULE_0__.default)(_Sidebar_Sidebar__WEBPACK_IMPORTED_MODULE_4__.A)(t3||(t3=_`
  max-height: 100vh;
  overflow: auto;
  position: sticky;
  top: 0;

  @media (width <= ${0}) {
    display: none;
  }
`),mobileBreakpoint),StyledGrid=(0,styled_components__WEBPACK_IMPORTED_MODULE_0__.default)(grommet__WEBPACK_IMPORTED_MODULE_3__.x)(t4||(t4=_`
  grid-template-columns: 1fr minmax(auto, 45rem) 1fr;
  width: 100%;
  padding: 0 30px;

  @media (width <= ${0}) {
    padding: 0 20px;
  }
`),mobileBreakpoint),StyledHeading=(0,styled_components__WEBPACK_IMPORTED_MODULE_0__.default)(grommet__WEBPACK_IMPORTED_MODULE_1__.D)(t7||(t7=_`
  position: relative;
  padding: 44px 0;
  margin: 0;
  text-align: center;

  @media (width <= ${0}) {
    display: none;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    height: 2px;
    width: 100%;
    ${0}
  }
`),mobileBreakpoint,props=>props.theme.dark?(0,styled_components__WEBPACK_IMPORTED_MODULE_0__.css)(t5||(t5=_`
            background: linear-gradient(
              90deg,
              transparent 0%,
              #000000 50%,
              transparent 100%
            );
          `)):(0,styled_components__WEBPACK_IMPORTED_MODULE_0__.css)(t6||(t6=_`
            background: linear-gradient(
              90deg,
              transparent 0%,
              #a6a7a9 50%,
              transparent 100%
            );
          `)))},"./src/components/Sidebar/Sidebar.jsx"(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/react/jsx-runtime.js"),prop_types__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../node_modules/prop-types/index.js"),styled_components__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("../../node_modules/styled-components/dist/styled-components.browser.esm.js"),grommet__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("../../node_modules/grommet/es6/components/Button/Button.js"),grommet__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("../../node_modules/grommet/es6/components/Nav/Nav.js"),next_link__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("../../node_modules/next/link.js"),next_link__WEBPACK_IMPORTED_MODULE_5___default=__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_5__),_zooniverse_react_components__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("../lib-react-components/dist/esm/SpacedText/SpacedText.js");let t,t1,t2,t3,t4,t5,t6,t7,_=t=>t;const StyledUl=styled_components__WEBPACK_IMPORTED_MODULE_2__.default.ul(t||(t=_`
  padding-inline-start: 0;
`)),StyledLi=styled_components__WEBPACK_IMPORTED_MODULE_2__.default.li(t1||(t1=_`
  list-style-type: none;
  display: flex;
`)),StyledButton=(0,styled_components__WEBPACK_IMPORTED_MODULE_2__.default)(grommet__WEBPACK_IMPORTED_MODULE_3__.$)(t4||(t4=_`
  text-decoration: none;
  padding: 5px 20px; // Same as Project About page sidebar
  width: 100%;

  &[aria-current='true'] {
    ${0}
  }
`),props=>props.theme.dark?(0,styled_components__WEBPACK_IMPORTED_MODULE_2__.css)(t2||(t2=_`
            background: ${0};
          `),props.theme.global.colors["neutral-1"]):(0,styled_components__WEBPACK_IMPORTED_MODULE_2__.css)(t3||(t3=_`
            background: ${0};
          `),props.theme.global.colors["accent-1"])),StyledLink=(0,styled_components__WEBPACK_IMPORTED_MODULE_2__.default)(next_link__WEBPACK_IMPORTED_MODULE_5___default())(t7||(t7=_`
  text-decoration: none;
  padding: 5px 20px; // Same as Project About page sidebar
  width: 100%;

  &[aria-current='page'] {
    ${0}
  }
`),props=>props.theme.dark?(0,styled_components__WEBPACK_IMPORTED_MODULE_2__.css)(t5||(t5=_`
            background: ${0};
          `),props.theme.global.colors["neutral-1"]):(0,styled_components__WEBPACK_IMPORTED_MODULE_2__.css)(t6||(t6=_`
            background: ${0};
          `),props.theme.global.colors["accent-1"])),DEFAULT_HANDLER=()=>{};function Sidebar({activeSection=0,className="",ariaLabel="",sections=[],setActiveSection=DEFAULT_HANDLER}){return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(grommet__WEBPACK_IMPORTED_MODULE_4__.s,{"aria-label":ariaLabel,className,margin:{horizontal:"auto"},children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(StyledUl,{children:sections.map((section,index)=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(StyledLi,{children:section.slug?(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(StyledButton,{"aria-current":index===activeSection?"true":"false",href:`#${section.slug}`,onClick:()=>setActiveSection(index),children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_zooniverse_react_components__WEBPACK_IMPORTED_MODULE_6__.A,{color:{light:"black",dark:"white"},weight:index===activeSection?"bold":"normal",children:section.name})}):(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(StyledLink,{"aria-current":index===activeSection?"page":"",href:section.href||"",onClick:()=>setActiveSection(index),children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_zooniverse_react_components__WEBPACK_IMPORTED_MODULE_6__.A,{color:{light:"black",dark:"white"},weight:index===activeSection?"bold":"normal",children:section.name})})},section.name))})})}const __WEBPACK_DEFAULT_EXPORT__=Sidebar;Sidebar.propTypes={activeSection:prop_types__WEBPACK_IMPORTED_MODULE_1__.number,className:prop_types__WEBPACK_IMPORTED_MODULE_1__.string,ariaLabel:prop_types__WEBPACK_IMPORTED_MODULE_1__.string,sections:(0,prop_types__WEBPACK_IMPORTED_MODULE_1__.arrayOf)((0,prop_types__WEBPACK_IMPORTED_MODULE_1__.shape)({name:prop_types__WEBPACK_IMPORTED_MODULE_1__.string,href:prop_types__WEBPACK_IMPORTED_MODULE_1__.string,slug:prop_types__WEBPACK_IMPORTED_MODULE_1__.string})),setActiveSection:prop_types__WEBPACK_IMPORTED_MODULE_1__.func},Sidebar.__docgenInfo={description:"",methods:[],displayName:"Sidebar",props:{activeSection:{defaultValue:{value:"0",computed:!1},description:"",type:{name:"custom",raw:"number"},required:!1},className:{defaultValue:{value:"''",computed:!1},description:"",type:{name:"custom",raw:"string"},required:!1},ariaLabel:{defaultValue:{value:"''",computed:!1},description:"",type:{name:"custom",raw:"string"},required:!1},sections:{defaultValue:{value:"[]",computed:!1},description:"",type:{name:"arrayOf",value:{name:"shape",value:{name:{name:"string",required:!1},href:{name:"string",required:!1},slug:{name:"string",required:!1}}}},required:!1},setActiveSection:{defaultValue:{value:"() => {}",computed:!1},description:"",type:{name:"custom",raw:"func"},required:!1}}}},"./src/screens/Settings/AccountSettings.stories.jsx"(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,__namedExportsOrder:()=>__namedExportsOrder,default:()=>AccountSettings_stories});var jsx_runtime=__webpack_require__("../../node_modules/react/jsx-runtime.js"),Heading=__webpack_require__("../../node_modules/grommet/es6/components/Heading/Heading.js"),Box=__webpack_require__("../../node_modules/grommet/es6/components/Box/Box.js"),MaxWidthContent=__webpack_require__("./src/components/MaxWidthContent/MaxWidthContent.jsx"),prop_types=__webpack_require__("../../node_modules/prop-types/index.js"),es=__webpack_require__("../../node_modules/react-i18next/dist/es/index.js"),styled_components_browser_esm=__webpack_require__("../../node_modules/styled-components/dist/styled-components.browser.esm.js"),SharedStyledComponents=__webpack_require__("./src/components/SharedStyledComponents/SharedStyledComponents.jsx"),DropdownNav=__webpack_require__("./src/components/DropdownNav/DropdownNav.jsx"),ThemeContext=__webpack_require__("../../node_modules/grommet/es6/contexts/ThemeContext/ThemeContext.js"),next_link=__webpack_require__("../../node_modules/next/link.js"),link_default=__webpack_require__.n(next_link),ZooniverseLogotype=__webpack_require__("../lib-react-components/dist/esm/ZooniverseLogotype/ZooniverseLogotype.js"),ContainerBox=__webpack_require__("./src/components/PageLayout/ContainerBox.jsx"),react=__webpack_require__("../../node_modules/react/index.js"),StyledIcon=__webpack_require__("../../node_modules/grommet-icons/es6/StyledIcon.js"),utils=__webpack_require__("../../node_modules/grommet-icons/es6/utils.js");function _extends(){return _extends=Object.assign?Object.assign.bind():function(n){for(var e=1;e<arguments.length;e++){var t=arguments[e];for(var r in t)({}).hasOwnProperty.call(t,r)&&(n[r]=t[r])}return n},_extends.apply(null,arguments)}var Previous=(0,react.forwardRef)(function(props,ref){var scaleProps=(0,utils.Uf)(props);return react.createElement(StyledIcon.v,_extends({ref,viewBox:"0 0 24 24",a11yTitle:"Previous"},props),react.createElement("path",_extends({fill:"none",stroke:"#000",strokeWidth:"2",d:"M17 2 7 12l10 10"},scaleProps)))});Previous.displayName="Previous";var SpacedText=__webpack_require__("../lib-react-components/dist/esm/SpacedText/SpacedText.js"),Button=__webpack_require__("../../node_modules/grommet/es6/components/Button/Button.js");let t,t1,t2,_=t=>t;const StyledButton=(0,styled_components_browser_esm.default)(Button.$)(t2||(t2=_`
  ${0}
  border: none;
  border-radius: 24px;
  box-shadow: none;

  &:hover {
    ${0}
    border: none;
    box-shadow: none;
  }
`),props=>(0,styled_components_browser_esm.css)(t||(t=_`
    color: ${0};
    background: ${0};`),props.theme.global.colors.white,props.theme.global.colors["neutral-1"]),props=>(0,styled_components_browser_esm.css)(t1||(t1=_`
      color: ${0};
      background: ${0};

      svg {
        fill: ${0};
        stroke: ${0};
      }
    `),props.theme.global.colors.brand,props.theme.global.colors["accent-1"],props.theme.global.colors.brand,props.theme.global.colors.brand));function HeaderButton({icon,label,primaryItem=!1,...rest}){const padding=primaryItem?{left:"xsmall",right:"medium"}:{horizontal:"medium"};return(0,jsx_runtime.jsx)(StyledButton,{gap:primaryItem?"small":"xsmall",icon,label:(0,jsx_runtime.jsx)(SpacedText.A,{size:".78rem",weight:700,children:label}),pad:padding,...rest})}HeaderButton.propTypes={icon:prop_types.node,label:prop_types.string.isRequired,primaryItem:prop_types.bool};const HeaderLinkAndButton_HeaderButton=HeaderButton;function HeaderLink({href,label,...rest}){return(0,jsx_runtime.jsx)(HeaderLinkAndButton_HeaderButton,{forwardedAs:link_default(),href,icon:(0,jsx_runtime.jsx)(Previous,{color:"white",size:"small"}),label,...rest})}HeaderButton.__docgenInfo={description:"",methods:[],displayName:"HeaderButton",props:{primaryItem:{defaultValue:{value:"false",computed:!1},description:"",type:{name:"custom",raw:"bool"},required:!1},icon:{description:"",type:{name:"custom",raw:"node"},required:!1},label:{description:"",type:{name:"string"},required:!0}}},HeaderLink.propTypes={href:prop_types.string.isRequired,label:prop_types.string.isRequired};const HeaderLinkAndButton_HeaderLink=HeaderLink;HeaderLink.__docgenInfo={description:"",methods:[],displayName:"HeaderLink",props:{href:{description:"",type:{name:"string"},required:!0},label:{description:"",type:{name:"string"},required:!0}}};let FormLayout_t,FormLayout_t1,FormLayout_=t=>t;const StyledLogo=(0,styled_components_browser_esm.default)(ZooniverseLogotype.A)(FormLayout_t||(FormLayout_t=FormLayout_`
  margin-top: 1em;
  margin-bottom: 1em;

  @media (width < ${0}) {
    display: none;
  }
`),"36rem"),customTheme={paragraph:{extend:props=>(0,styled_components_browser_esm.css)(FormLayout_t1||(FormLayout_t1=FormLayout_`
        color: ${0};
      `),props.theme.dark?"white":"black")}};function FormLayout({children}){const{t}=(0,es.Bd)(),navTitle=t("Settings.common.title"),backLinkLabel=t("Settings.common.backHome");return(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[(0,jsx_runtime.jsx)("header",{children:(0,jsx_runtime.jsxs)(Box.a,{align:"center","aria-label":navTitle,direction:"row",as:"nav",background:"neutral-1",pad:{horizontal:"medium"},height:{min:"3.5rem"},children:[(0,jsx_runtime.jsx)(Box.a,{forwardedAs:"ul",direction:"row",width:"100%",wrap:!0,children:(0,jsx_runtime.jsx)(Box.a,{as:"li",pad:{right:"small"},children:(0,jsx_runtime.jsx)(HeaderLinkAndButton_HeaderLink,{href:"/",label:backLinkLabel,primaryItem:!0})})}),(0,jsx_runtime.jsx)(StyledLogo,{id:"zooniverse-logo-settings-page",color:"white"})]})}),(0,jsx_runtime.jsx)("main",{children:(0,jsx_runtime.jsx)(ThemeContext.D.Extend,{value:customTheme,children:(0,jsx_runtime.jsx)(Box.a,{background:{dark:"dark-1",light:"light-1"},align:"center",children:(0,jsx_runtime.jsx)(ContainerBox.A,{align:"center",background:{dark:"dark-3",light:"neutral-6"},width:"min(100%, 90rem)",height:{min:"80vh"},pad:{horizontal:"20px",top:"60px",bottom:"60px"},children})})})})]})}const PageLayout_FormLayout=FormLayout;FormLayout.__docgenInfo={description:"",methods:[],displayName:"FormLayout"};let AccountSettings_t;(0,styled_components_browser_esm.default)(Heading.D)(AccountSettings_t||(AccountSettings_t=(t=>t)`
  position: relative;
  padding: 44px 0;
  margin: 0;
  text-align: center;

  @media (width <= ${0}) {
    display: none;
  }
`),SharedStyledComponents.ik);function AccountSettings({user}){if(!user)return null;const{t}=(0,es.Bd)(),sidebarSections=[{name:t("Settings.AccountSettings.title"),href:"/settings"},{name:t("Settings.ProfileSettings.title"),href:"/settings/profile"},{name:t("Settings.EmailSettings.title"),href:"/settings/email"}];return(0,jsx_runtime.jsxs)(PageLayout_FormLayout,{children:[(0,jsx_runtime.jsx)(SharedStyledComponents.PI,{background:{dark:"dark-3",light:"neutral-6"},children:(0,jsx_runtime.jsx)(DropdownNav.A,{activeSection:0,sidebarLabel:t("Settings.common.sidebar"),sections:sidebarSections})}),(0,jsx_runtime.jsxs)(SharedStyledComponents.eH,{children:[(0,jsx_runtime.jsx)(Box.a,{as:"aside",align:"center",children:(0,jsx_runtime.jsx)(SharedStyledComponents.qJ,{activeSection:0,ariaLabel:t("Settings.common.sidebar"),sections:sidebarSections})}),(0,jsx_runtime.jsxs)(MaxWidthContent.A,{className:"Account-Settings-Page",color:{light:"black",dark:"white"},background:"#f0e0e0",children:[(0,jsx_runtime.jsx)("h1",{children:"Account Settings Placeholder"}),(0,jsx_runtime.jsxs)("p",{children:["User is ",user.login," aka ",user.display_name]})]})]})]})}AccountSettings.propTypes={user:(0,prop_types.shape)({display_name:prop_types.string,id:prop_types.string.isRequired,login:prop_types.string})};const Settings_AccountSettings=AccountSettings;AccountSettings.__docgenInfo={description:"",methods:[],displayName:"AccountSettings",props:{user:{description:"",type:{name:"shape",value:{display_name:{name:"string",required:!1},id:{name:"string",required:!0},login:{name:"string",required:!1}}},required:!1}}};const AccountSettings_stories={title:"Other / Settings / Account Settings",component:Settings_AccountSettings},Default={args:{user:{display_name:"Zooniverse Test User",id:"1000",login:"zootester"}}},__namedExportsOrder=["Default"]}}]);
//# sourceMappingURL=screens-Settings-AccountSettings-stories.a9cada9e.iframe.bundle.js.map