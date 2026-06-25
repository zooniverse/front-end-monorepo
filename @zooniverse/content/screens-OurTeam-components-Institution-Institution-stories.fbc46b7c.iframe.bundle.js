"use strict";(self.webpackChunk_zooniverse_content=self.webpackChunk_zooniverse_content||[]).push([[585],{"./src/components/SharedStyledComponents/SharedStyledComponents.jsx"(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{A1:()=>StyledHeading,HK:()=>MobileHeading,PI:()=>StickyBox,eH:()=>StyledGrid,ik:()=>mobileBreakpoint,qJ:()=>StickySidebar});var styled_components__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/styled-components/dist/styled-components.browser.esm.js"),grommet__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../node_modules/grommet/es6/components/Heading/Heading.js"),grommet__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("../../node_modules/grommet/es6/components/Box/Box.js"),grommet__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("../../node_modules/grommet/es6/components/Grid/Grid.js"),_Sidebar_Sidebar__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./src/components/Sidebar/Sidebar.jsx");let t,t1,t2,t3,t4,t5,t6,t7,_=t=>t;const mobileBreakpoint="72rem",MobileHeading=(0,styled_components__WEBPACK_IMPORTED_MODULE_0__.default)(grommet__WEBPACK_IMPORTED_MODULE_1__.D)(t1||(t1=_`
  color: white;
  display: flex;
  justify-content: center;
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
//# sourceMappingURL=screens-OurTeam-components-Institution-Institution-stories.fbc46b7c.iframe.bundle.js.map