"use strict";(self.webpackChunk_zooniverse_content=self.webpackChunk_zooniverse_content||[]).push([[585],{"../lib-react-components/dist/esm/SpacedText/SpacedText.js"(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{A:()=>SpacedText});var grommet__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/grommet/es6/components/Text/Text.js"),styled_components__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../node_modules/styled-components/dist/styled-components.browser.esm.js"),prop_types__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("../../node_modules/prop-types/index.js"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("../../node_modules/react/jsx-runtime.js"),_excluded=["children","margin","size","uppercase","weight"];function ownKeys(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);r&&(o=o.filter(function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable})),t.push.apply(t,o)}return t}function _objectSpread(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?ownKeys(Object(t),!0).forEach(function(r){_defineProperty(e,r,t[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):ownKeys(Object(t)).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))})}return e}function _defineProperty(e,r,t){return(r=function _toPropertyKey(t){var i=function _toPrimitive(t,r){if("object"!=typeof t||!t)return t;var e=t[Symbol.toPrimitive];if(void 0!==e){var i=e.call(t,r||"default");if("object"!=typeof i)return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===r?String:Number)(t)}(t,"string");return"symbol"==typeof i?i:i+""}(r))in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}var StyledText=(0,styled_components__WEBPACK_IMPORTED_MODULE_1__.default)(grommet__WEBPACK_IMPORTED_MODULE_0__.E).withConfig({displayName:"SpacedText__StyledText",componentId:"sc-kfun0y-0"})(["letter-spacing:0.0625rem;",""],props=>props.uppercase?(0,styled_components__WEBPACK_IMPORTED_MODULE_1__.css)(["text-transform:uppercase;"]):(0,styled_components__WEBPACK_IMPORTED_MODULE_1__.css)(["text-transform:normal;"]));function SpacedText(_ref){var{children,margin="none",size="small",uppercase=!0,weight="normal"}=_ref,props=function _objectWithoutProperties(e,t){if(null==e)return{};var o,r,i=function _objectWithoutPropertiesLoose(r,e){if(null==r)return{};var t={};for(var n in r)if({}.hasOwnProperty.call(r,n)){if(-1!==e.indexOf(n))continue;t[n]=r[n]}return t}(e,t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);for(r=0;r<n.length;r++)o=n[r],-1===t.indexOf(o)&&{}.propertyIsEnumerable.call(e,o)&&(i[o]=e[o])}return i}(_ref,_excluded);return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(StyledText,_objectSpread(_objectSpread({margin,size,uppercase,weight},props),{},{children}))}SpacedText.propTypes={children:prop_types__WEBPACK_IMPORTED_MODULE_2__.node.isRequired,margin:(0,prop_types__WEBPACK_IMPORTED_MODULE_2__.oneOfType)([prop_types__WEBPACK_IMPORTED_MODULE_2__.string,(0,prop_types__WEBPACK_IMPORTED_MODULE_2__.objectOf)(prop_types__WEBPACK_IMPORTED_MODULE_2__.string)]),size:prop_types__WEBPACK_IMPORTED_MODULE_2__.string,uppercase:prop_types__WEBPACK_IMPORTED_MODULE_2__.bool,weight:(0,prop_types__WEBPACK_IMPORTED_MODULE_2__.oneOfType)([prop_types__WEBPACK_IMPORTED_MODULE_2__.number,prop_types__WEBPACK_IMPORTED_MODULE_2__.string])}},"./src/components/SharedStyledComponents/SharedStyledComponents.jsx"(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{A1:()=>StyledHeading,HK:()=>MobileHeading,PI:()=>StickyBox,eH:()=>StyledGrid,ik:()=>mobileBreakpoint,qJ:()=>StickySidebar});var styled_components__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/styled-components/dist/styled-components.browser.esm.js"),grommet__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../node_modules/grommet/es6/components/Heading/Heading.js"),grommet__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("../../node_modules/grommet/es6/components/Box/Box.js"),grommet__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("../../node_modules/grommet/es6/components/Grid/Grid.js"),_Sidebar_Sidebar__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./src/components/Sidebar/Sidebar.jsx");let t,t1,t2,t3,t4,t5,t6,t7,_=t=>t;const mobileBreakpoint="72rem",MobileHeading=(0,styled_components__WEBPACK_IMPORTED_MODULE_0__.default)(grommet__WEBPACK_IMPORTED_MODULE_1__.D)(t1||(t1=_`
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
          `)))},"./src/components/Sidebar/Sidebar.jsx"(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/react/jsx-runtime.js"),prop_types__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../node_modules/prop-types/index.js"),styled_components__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("../../node_modules/styled-components/dist/styled-components.browser.esm.js"),grommet__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("../../node_modules/grommet/es6/components/Button/Button.js"),grommet__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("../../node_modules/grommet/es6/components/Nav/Nav.js"),_zooniverse_react_components__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("../lib-react-components/dist/esm/SpacedText/SpacedText.js");let t,t1,t2,t3,t4,_=t=>t;const StyledUl=styled_components__WEBPACK_IMPORTED_MODULE_2__.default.ul(t||(t=_`
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
          `),props.theme.global.colors["accent-1"])),DEFAULT_HANDLER=()=>{};function Sidebar({activeSection=0,className="",ariaLabel="",sections=[],setActiveSection=DEFAULT_HANDLER}){return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(grommet__WEBPACK_IMPORTED_MODULE_4__.s,{"aria-label":ariaLabel,className,margin:{horizontal:"auto"},children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(StyledUl,{children:sections.map((section,index)=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(StyledLi,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(StyledButton,{"aria-current":index===activeSection?"true":"false",href:section.slug?`#${section.slug}`:"",onClick:()=>setActiveSection(index),children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_zooniverse_react_components__WEBPACK_IMPORTED_MODULE_5__.A,{color:{light:"black",dark:"white"},weight:index===activeSection?"bold":"normal",children:section.name})})},section.name))})})}const __WEBPACK_DEFAULT_EXPORT__=Sidebar;Sidebar.propTypes={activeSection:prop_types__WEBPACK_IMPORTED_MODULE_1__.number,className:prop_types__WEBPACK_IMPORTED_MODULE_1__.string,ariaLabel:prop_types__WEBPACK_IMPORTED_MODULE_1__.string,sections:(0,prop_types__WEBPACK_IMPORTED_MODULE_1__.arrayOf)((0,prop_types__WEBPACK_IMPORTED_MODULE_1__.shape)({name:prop_types__WEBPACK_IMPORTED_MODULE_1__.string,slug:prop_types__WEBPACK_IMPORTED_MODULE_1__.string})),setActiveSection:prop_types__WEBPACK_IMPORTED_MODULE_1__.func},Sidebar.__docgenInfo={description:"",methods:[],displayName:"Sidebar",props:{activeSection:{defaultValue:{value:"0",computed:!1},description:"",type:{name:"custom",raw:"number"},required:!1},className:{defaultValue:{value:"''",computed:!1},description:"",type:{name:"custom",raw:"string"},required:!1},ariaLabel:{defaultValue:{value:"''",computed:!1},description:"",type:{name:"custom",raw:"string"},required:!1},sections:{defaultValue:{value:"[]",computed:!1},description:"",type:{name:"arrayOf",value:{name:"shape",value:{name:{name:"string",required:!1},slug:{name:"string",required:!1}}}},required:!1},setActiveSection:{defaultValue:{value:"() => {}",computed:!1},description:"",type:{name:"custom",raw:"func"},required:!1}}}},"./src/screens/OurTeam/components/Institution/Institution.stories.jsx"(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});const __WEBPACK_DEFAULT_EXPORT__={title:"About / Our Team / Institution",component:__webpack_require__("./src/screens/OurTeam/components/Institution/Institution.jsx").A},Default={args:{name:"Institution Name",people:[{avatarSrc:"https://images.ctfassets.net/jt90kyhvp0qv/4VLR5cADevEVF8bvlW6kFN/e9c51f81f54a466e7c77f0d660919afe/59866818-204c8d80-9352-11e9-8fcc-5676aa100fdf.jpg?w=160&h=160",bio:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",jobTitle:"Science Lead",name:"Cliff Johnson"},{avatarSrc:"https://images.ctfassets.net/jt90kyhvp0qv/1j7WkbxH80PpAw471yIJHo/e910c138d79260306c01037e237f570c/laura.jpg?w=160&h=160",bio:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",jobTitle:"Web Developer",name:"Laura Trouille"}],slug:"institution-name"}},__namedExportsOrder=["Default"]}}]);
//# sourceMappingURL=screens-OurTeam-components-Institution-Institution-stories.ab060225.iframe.bundle.js.map