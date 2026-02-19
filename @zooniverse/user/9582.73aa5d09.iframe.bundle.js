"use strict";(self.webpackChunk_zooniverse_user=self.webpackChunk_zooniverse_user||[]).push([[9582],{"./src/components/shared/HeaderButton/HeaderButton.jsx"(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/react/jsx-runtime.js"),_zooniverse_react_components__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../lib-react-components/dist/esm/SpacedText/SpacedText.js"),grommet__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("../../node_modules/grommet/es6/components/Button/Button.js"),prop_types__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("../../node_modules/prop-types/index.js"),styled_components__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("../../node_modules/styled-components/dist/styled-components.browser.esm.js");let t,t1,t2,_=t=>t;const StyledButton=(0,styled_components__WEBPACK_IMPORTED_MODULE_4__.default)(grommet__WEBPACK_IMPORTED_MODULE_2__.$)(t2||(t2=_`
  ${0}
  border: none;
  border-radius: 24px;
  box-shadow: none;

  &:hover {
    ${0}
    border: none;
    box-shadow: none;
  }
`),props=>(0,styled_components__WEBPACK_IMPORTED_MODULE_4__.css)(t||(t=_`
    color: ${0};
    background: ${0};`),props.theme.global.colors.white,props.theme.global.colors["neutral-1"]),props=>(0,styled_components__WEBPACK_IMPORTED_MODULE_4__.css)(t1||(t1=_`
      color: ${0};
      background: ${0};

      svg {
        fill: ${0};
        stroke: ${0};
      }
    `),props.theme.global.colors.brand,props.theme.global.colors["accent-1"],props.theme.global.colors.brand,props.theme.global.colors.brand));function HeaderButton({icon,label,primaryItem=!1,...rest}){const padding=primaryItem?{left:"xsmall",right:"medium"}:{horizontal:"medium"};return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(StyledButton,{gap:primaryItem?"small":"xsmall",icon,label:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_zooniverse_react_components__WEBPACK_IMPORTED_MODULE_1__.A,{size:".78rem",weight:700,children:label}),pad:padding,...rest})}HeaderButton.propTypes={icon:prop_types__WEBPACK_IMPORTED_MODULE_3__.node,label:prop_types__WEBPACK_IMPORTED_MODULE_3__.string.isRequired,primaryItem:prop_types__WEBPACK_IMPORTED_MODULE_3__.bool};const __WEBPACK_DEFAULT_EXPORT__=HeaderButton;HeaderButton.__docgenInfo={description:"",methods:[],displayName:"HeaderButton",props:{primaryItem:{defaultValue:{value:"false",computed:!1},description:"",type:{name:"custom",raw:"bool"},required:!1},icon:{description:"",type:{name:"custom",raw:"node"},required:!1},label:{description:"",type:{name:"string"},required:!0}}}},"./src/components/shared/HeaderLink/HeaderLink.jsx"(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/react/jsx-runtime.js"),grommet_icons__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../node_modules/grommet-icons/es6/icons/Previous.js"),prop_types__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("../../node_modules/prop-types/index.js"),_components_shared__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/components/shared/HeaderButton/HeaderButton.jsx"),next_link__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/next/link.js"),next_link__WEBPACK_IMPORTED_MODULE_4___default=__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_4__);function HeaderLink({href,label,...rest}){return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_shared__WEBPACK_IMPORTED_MODULE_3__.A,{forwardedAs:next_link__WEBPACK_IMPORTED_MODULE_4___default(),href,icon:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(grommet_icons__WEBPACK_IMPORTED_MODULE_1__.s,{color:"white",size:"small"}),label,...rest})}HeaderLink.propTypes={href:prop_types__WEBPACK_IMPORTED_MODULE_2__.string.isRequired,label:prop_types__WEBPACK_IMPORTED_MODULE_2__.string.isRequired};const __WEBPACK_DEFAULT_EXPORT__=HeaderLink;HeaderLink.__docgenInfo={description:"",methods:[],displayName:"HeaderLink",props:{href:{description:"",type:{name:"string"},required:!0},label:{description:"",type:{name:"string"},required:!0}}}},"./src/components/shared/Layout/Layout.jsx"(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{A:()=>Layout_Layout});var jsx_runtime=__webpack_require__("../../node_modules/react/jsx-runtime.js"),Box=__webpack_require__("../../node_modules/grommet/es6/components/Box/Box.js"),prop_types=__webpack_require__("../../node_modules/prop-types/index.js"),styled_components_browser_esm=__webpack_require__("../../node_modules/styled-components/dist/styled-components.browser.esm.js"),ResponsiveContext=__webpack_require__("../../node_modules/grommet/es6/contexts/ResponsiveContext/ResponsiveContext.js"),react=__webpack_require__("../../node_modules/react/index.js");function SVGContent(){return(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[(0,jsx_runtime.jsx)("polygon",{points:"32.5,20.2 32.5,57.5 169.4,57.5 27.9,229.9 27.9,261 224.2,261 224.2,223.7 82.7,223.7 224.2,51.4 224.2,20.2"}),(0,jsx_runtime.jsx)("path",{d:"M307.6,140.6v-0.8c0-46.5,33.1-85,80.7-85s81.4,38.8,81.4,85.8v0.8c0,46.5-33.5,85-80.7,85 C341.4,226.4,307.6,187.5,307.6,140.6 M263,140.6v0.8c0,67.7,51.4,123.8,124.8,123.8s125.6-56.9,125.6-124.6v-0.8 C513.4,72.2,462,16,388.6,16S263,72.9,263,140.6"}),(0,jsx_runtime.jsx)("polygon",{points:"1036.6,20.2 1036.6,186.8 908.3,20.2 869.1,20.2 869.1,261 910.6,261 910.6,89.9 1042.6,261 1078,261 1078,20.2 "}),(0,jsx_runtime.jsx)("rect",{x:"1138.5",y:"20.2",width:"42.2",height:"240.8"}),(0,jsx_runtime.jsx)("polygon",{points:"1421.6,20.2 1349.7,205.2 1277.4,20.2 1231,20.2 1330.7,262.5 1367.6,262.5 1467.3,20.2"}),(0,jsx_runtime.jsx)("polygon",{points:"1515.2,20.2 1515.2,261 1694.8,261 1694.8,223.3 1557.4,223.3 1557.4,158.7 1677.7,158.7 1677.7,120.6 1557.4,120.6 1557.4,57.9 1692.9,57.9 1692.9,20.2"}),(0,jsx_runtime.jsx)("path",{d:"M1794.1,139.1V58.7h61.3c30.8,0,49.5,14.2,49.5,39.6v0.8c0,24.6-19.4,40-49.5,40H1794.1z M1751.1,20.2h-0.4V261h42.2v-84.2 h52.1h1.1l59,84.2h49.5l-64.7-91.2c33.5-9.2,57.1-33.5,57.1-72.7v-0.8c0-21.2-7.2-38.8-19.8-51.9c-15.6-15.4-39.2-24.2-69.3-24.2 H1751.1z"}),(0,jsx_runtime.jsx)("path",{d:"M1999.2,86.8v0.8c0,44.2,28.9,59.6,79.9,71.9c44.5,10.4,54,19.6,54,36.5v0.8c0,18.1-16.7,30.4-42.6,30.4 c-29.7,0-52.9-11.5-75.7-31.2l-25.5,30.4c28.9,26.2,63.5,38.5,100.1,38.5c50.2,0,85.6-26.9,85.6-71.9v-0.8 c0-40-26.3-58.5-76.9-70.8c-45.7-11.2-56.7-19.2-56.7-37.7v-0.8c0-16.2,14.5-28.8,39.2-28.8c22.1,0,43.4,8.8,65.1,25l22.4-31.9 c-24.4-19.6-52.1-30.4-87.1-30.4C2033.4,16.8,1999.2,45.6,1999.2,86.8"}),(0,jsx_runtime.jsx)("polygon",{points:"2226.3,20.2 2226.3,261 2405.9,261 2405.9,223.3 2268.6,223.3 2268.6,158.7 2388.8,158.7 2388.8,120.6 2268.6,120.6 2268.6,57.9 2404,57.9 2404,20.2"}),(0,jsx_runtime.jsx)("path",{d:"M710.1,140.2c0-1.2,0-2.7-0.4-3.8c17.1-13.1,33.1-25.8,47.2-37.3c6.5,12.7,9.9,26.5,9.9,41.5v0.8c0,46.9-33.1,85-80.7,85 c-24.7,0-46-10.8-60.5-27.3c14.8-10.4,31.6-22.3,48.7-35.4c3.4,1.9,7.2,2.7,11,2.7C699.1,166.4,710.1,154.9,710.1,140.2 M604.7,140.6v-0.8c0-46.9,33.1-85,80.7-85c24.7,0,46,10.8,60.5,27.3c-14.8,10.4-31.6,22.3-48.7,35.4c-3.4-1.9-7.2-2.7-11-2.7 c-13.7,0-24.7,11.5-24.7,26.2c0,1.2,0,2.7,0.4,3.8c-17.1,13.1-33.1,25.8-47.2,37.3C608.1,169.5,604.7,155.6,604.7,140.6 M561,140.2 v0.8c0,25.4,7.2,49.2,20.2,68.8c-20.5,18.1-32,30.4-30.1,32.7s16.7-5.4,39.6-20c22.1,25.8,55.5,42.7,95.1,42.7 c73.4,0,125.6-57.3,125.6-125v-0.8c0-25.4-7.2-49.2-20.2-68.8c20.2-17.7,31.6-30,30.1-32.7c-1.9-2.3-16.7,5.4-39.6,20 c-22.1-25.8-55.5-42.7-95.1-42.7C613.1,15.2,561,72.5,561,140.2"})]})}var _excluded=["id","width"];function ownKeys(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);r&&(o=o.filter(function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable})),t.push.apply(t,o)}return t}function _objectSpread(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?ownKeys(Object(t),!0).forEach(function(r){_defineProperty(e,r,t[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):ownKeys(Object(t)).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))})}return e}function _defineProperty(e,r,t){return(r=function _toPropertyKey(t){var i=function _toPrimitive(t,r){if("object"!=typeof t||!t)return t;var e=t[Symbol.toPrimitive];if(void 0!==e){var i=e.call(t,r||"default");if("object"!=typeof i)return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===r?String:Number)(t)}(t,"string");return"symbol"==typeof i?i:i+""}(r))in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function ZooniverseLogotype(_ref){var{id,width=178}=_ref,rest=function _objectWithoutProperties(e,t){if(null==e)return{};var o,r,i=function _objectWithoutPropertiesLoose(r,e){if(null==r)return{};var t={};for(var n in r)if({}.hasOwnProperty.call(r,n)){if(-1!==e.indexOf(n))continue;t[n]=r[n]}return t}(e,t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);for(r=0;r<n.length;r++)o=n[r],-1===t.indexOf(o)&&{}.propertyIsEnumerable.call(e,o)&&(i[o]=e[o])}return i}(_ref,_excluded),height="number"==typeof width?280.5/2433.8*width:"100%";return(0,jsx_runtime.jsxs)("svg",_objectSpread(_objectSpread({"aria-labelledby":id,height,role:"img",viewBox:"0 0 ".concat(2433.8," ").concat(280.5),width},rest),{},{children:[(0,jsx_runtime.jsx)("title",{id,children:"Zooniverse"}),(0,jsx_runtime.jsx)("g",{fill:"currentColor",stroke:"none",children:(0,jsx_runtime.jsx)(SVGContent,{})})]}))}ZooniverseLogotype.propTypes={id:prop_types.string.isRequired,width:(0,prop_types.oneOfType)([prop_types.number,prop_types.string])};var DropButton=__webpack_require__("../../node_modules/grommet/es6/components/DropButton/DropButton.js"),FormDown=__webpack_require__("../../node_modules/grommet-icons/es6/icons/FormDown.js"),SpacedText=__webpack_require__("../lib-react-components/dist/esm/SpacedText/SpacedText.js"),i18n=__webpack_require__("./src/translations/i18n.jsx");let t,t1,t2,t3,t4,_=t=>t;const StyledDropButton=(0,styled_components_browser_esm.default)(DropButton.E)(t3||(t3=_`
  position: relative;

  // This is the same styling as HeaderButton, but applied to a DropButton
  ${0}
  border: none;
  border-radius: 24px;
  box-shadow: none;

  &:hover,
  &:focus {
    ${0}
    border: none;
    box-shadow: none;
  }

  ${0}
`),props=>(0,styled_components_browser_esm.css)(t||(t=_`
    color: ${0};
    background: ${0};
  `),props.theme.global.colors.white,props.theme.global.colors["neutral-1"]),props=>(0,styled_components_browser_esm.css)(t1||(t1=_`
      color: ${0};
      background: ${0};

      svg {
        fill: ${0};
        stroke: ${0};
      }
    `),props.theme.global.colors.brand,props.theme.global.colors["accent-1"],props.theme.global.colors.brand,props.theme.global.colors.brand),props=>props.open&&(0,styled_components_browser_esm.css)(t2||(t2=_`
      background: ${0};

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
    `),props.theme.global.colors["neutral-1"],props.theme.global.colors.brand)),StyledLi=styled_components_browser_esm.default.li(t4||(t4=_`
  list-style-type: none;
  display: flex;
  width: 100%;
`));function HeaderDropdown({secondaryHeaderItems=[]}){const{t}=(0,i18n.Bd)(),[isOpen,setIsOpen]=(0,react.useState)(!1),dropContent=(0,jsx_runtime.jsx)(Box.a,{as:"ul",pad:{vertical:"small",horizontal:"0"},margin:"0",gap:"small",background:"neutral-1",children:secondaryHeaderItems.map(item=>(0,jsx_runtime.jsx)(StyledLi,{children:item},item.key))});return(0,jsx_runtime.jsx)(StyledDropButton,{alignSelf:"center",dropAlign:{top:"bottom"},onClose:()=>{setIsOpen(!1)},onOpen:()=>{setIsOpen(!0)},open:isOpen,dropContent,children:(0,jsx_runtime.jsxs)(Box.a,{align:"center",direction:"row",gap:"xsmall",justify:"center",pad:{horizontal:"medium",vertical:"xsmall"},children:[(0,jsx_runtime.jsx)(SpacedText.A,{size:".78rem",weight:700,children:t("HeaderDropdown.label")}),(0,jsx_runtime.jsx)(FormDown.t,{color:"white"})]})})}HeaderDropdown.propTypes={secondaryHeaderItems:(0,prop_types.arrayOf)(prop_types.node)};const components_HeaderDropdown=HeaderDropdown;HeaderDropdown.__docgenInfo={description:"",methods:[],displayName:"HeaderDropdown",props:{secondaryHeaderItems:{defaultValue:{value:"[]",computed:!1},description:"",type:{name:"arrayOf",value:{name:"node"}},required:!1}}};let PageHeader_t,PageHeader_t1,PageHeader_=t=>t;const StyledBox=(0,styled_components_browser_esm.default)(Box.a)(PageHeader_t||(PageHeader_t=PageHeader_`
  @media print {
    display: none;
  }
`)),HeaderItems=(0,styled_components_browser_esm.default)(Box.a)(PageHeader_t1||(PageHeader_t1=PageHeader_`
  max-width: calc(90rem - 160px);
  white-space: nowrap;
`));function PageHeader({primaryHeaderItem="",secondaryHeaderItems=[]}){const size=(0,react.useContext)(ResponsiveContext.u);return(0,jsx_runtime.jsx)(StyledBox,{forwardedAs:"header",background:"neutral-1",fill:!0,height:{min:"140px",max:"140px"},align:"center",pad:{horizontal:"medium"},children:(0,jsx_runtime.jsxs)(HeaderItems,{direction:"row",fill:!0,height:{min:"70px",max:"70px"},align:"center",justify:"between",children:[(0,jsx_runtime.jsx)(Box.a,{align:"center",direction:"row",children:primaryHeaderItem}),(0,jsx_runtime.jsx)(Box.a,{align:"center",justify:"end",direction:"row",gap:"xxsmall",children:secondaryHeaderItems.length>0?"small"!==size?secondaryHeaderItems:(0,jsx_runtime.jsx)(components_HeaderDropdown,{secondaryHeaderItems}):(0,jsx_runtime.jsx)(ZooniverseLogotype,{id:"HeaderZooniverseLogo",color:"white"})})]})})}PageHeader.propTypes={primaryHeaderItem:prop_types.node,secondaryHeaderItems:(0,prop_types.arrayOf)(prop_types.node)};const components_PageHeader=PageHeader;PageHeader.__docgenInfo={description:"",methods:[],displayName:"PageHeader",props:{primaryHeaderItem:{defaultValue:{value:"''",computed:!1},description:"",type:{name:"custom",raw:"node"},required:!1},secondaryHeaderItems:{defaultValue:{value:"[]",computed:!1},description:"",type:{name:"arrayOf",value:{name:"node"}},required:!1}}};let Layout_t,Layout_t1,Layout_t2,Layout_t3,Layout_t4,t5,Layout_=t=>t;const InnerPageContainer=(0,styled_components_browser_esm.default)(Box.a)(Layout_t||(Layout_t=Layout_`
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.3); // Same as About pages & Home pages

  // Grommet theme's size is definied in pixels
  // Size "small" is viewport widths less than 769px
  // If Grommet theme breakpoints are changed to rem units, adjust here as needed

  @media (768px < width <= 90rem) {
    padding: 0 30px;
  }

  @media (width <= 769px) {
    padding: 0;
  }
`)),PageBody=(0,styled_components_browser_esm.default)(Box.a)(t5||(t5=Layout_`
  position: relative;
  min-height: 90vh;
  max-width: min(100%, calc(90rem - 160px));

  margin-top: -70px; // half height of PageHeader
  border-radius: 8px 8px 0 0;
  padding-bottom: 50px;

  @media print {
    margin-top: 0;
  }

  @media (width > 90rem) {
    &::before {
      content: '';
      position: absolute;
      top: 70px;
      left: -30px;
      width: 30px;
      height: 300px;
      clip-path: polygon(100% 0, 0 0, 100% 100%);

      ${0}
    }

    &::after {
      content: '';
      position: absolute;
      top: 70px;
      right: -30px;
      width: 30px;
      height: 300px;
      clip-path: polygon(100% 0, 0 0, 0 100%);

      ${0}
    }
  }
`),props=>props.theme.dark?(0,styled_components_browser_esm.css)(Layout_t1||(Layout_t1=Layout_`
              background: linear-gradient(
                to bottom left,
                rgba(0, 0, 0, 0.3) 0%,
                transparent 60%
              );
            `)):(0,styled_components_browser_esm.css)(Layout_t2||(Layout_t2=Layout_`
              background: linear-gradient(
                to bottom left,
                rgba(92, 92, 92, 0.3) 0%,
                transparent 60%
              );
            `)),props=>props.theme.dark?(0,styled_components_browser_esm.css)(Layout_t3||(Layout_t3=Layout_`
              background: linear-gradient(
                to bottom right,
                rgba(0, 0, 0, 0.3) 0%,
                transparent 60%
              );
            `)):(0,styled_components_browser_esm.css)(Layout_t4||(Layout_t4=Layout_`
              background: linear-gradient(
                to bottom right,
                rgba(92, 92, 92, 0.3) 0%,
                transparent 60%
              );
            `)));function Layout({children,primaryHeaderItem="",secondaryHeaderItems=[]}){return(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[(0,jsx_runtime.jsx)(components_PageHeader,{primaryHeaderItem,secondaryHeaderItems}),(0,jsx_runtime.jsx)(Box.a,{background:{dark:"dark-1",light:"light-1"},align:"center",children:(0,jsx_runtime.jsx)(InnerPageContainer,{align:"center",background:{dark:"dark-3",light:"neutral-6"},width:"min(100%, 90rem)",elevation:"medium",children:(0,jsx_runtime.jsx)(PageBody,{fill:!0,forwardedAs:"main",gap:"30px",children})})})]})}Layout.propTypes={children:prop_types.node,primaryHeaderItem:prop_types.node,secondaryHeaderItems:(0,prop_types.arrayOf)(prop_types.node)};const Layout_Layout=Layout;Layout.__docgenInfo={description:"",methods:[],displayName:"Layout",props:{primaryHeaderItem:{defaultValue:{value:"''",computed:!1},description:"",type:{name:"custom",raw:"node"},required:!1},secondaryHeaderItems:{defaultValue:{value:"[]",computed:!1},description:"",type:{name:"arrayOf",value:{name:"node"}},required:!1},children:{description:"",type:{name:"custom",raw:"node"},required:!1}}}}}]);
//# sourceMappingURL=9582.73aa5d09.iframe.bundle.js.map