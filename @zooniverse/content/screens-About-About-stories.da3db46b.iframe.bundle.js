"use strict";(self.webpackChunk_zooniverse_content=self.webpackChunk_zooniverse_content||[]).push([[7010],{"../lib-react-components/dist/esm/SpacedHeading/SpacedHeading.js"(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var _SpacedText__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../lib-react-components/dist/esm/SpacedText/SpacedText.js"),grommet__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../node_modules/grommet/es6/components/Heading/Heading.js"),prop_types__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("../../node_modules/prop-types/index.js"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("../../node_modules/react/jsx-runtime.js"),_excluded=["children","className","color","level","size","weight"];function ownKeys(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);r&&(o=o.filter(function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable})),t.push.apply(t,o)}return t}function _objectSpread(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?ownKeys(Object(t),!0).forEach(function(r){_defineProperty(e,r,t[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):ownKeys(Object(t)).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))})}return e}function _defineProperty(e,r,t){return(r=function _toPropertyKey(t){var i=function _toPrimitive(t,r){if("object"!=typeof t||!t)return t;var e=t[Symbol.toPrimitive];if(void 0!==e){var i=e.call(t,r||"default");if("object"!=typeof i)return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===r?String:Number)(t)}(t,"string");return"symbol"==typeof i?i:i+""}(r))in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function SpacedHeading(_ref){var{children,className="",color={dark:"neutral-6",light:"black"},level=2,size="medium",weight="bold"}=_ref,props=function _objectWithoutProperties(e,t){if(null==e)return{};var o,r,i=function _objectWithoutPropertiesLoose(r,e){if(null==r)return{};var t={};for(var n in r)if({}.hasOwnProperty.call(r,n)){if(-1!==e.indexOf(n))continue;t[n]=r[n]}return t}(e,t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);for(r=0;r<n.length;r++)o=n[r],-1===t.indexOf(o)&&{}.propertyIsEnumerable.call(e,o)&&(i[o]=e[o])}return i}(_ref,_excluded);return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(grommet__WEBPACK_IMPORTED_MODULE_1__.D,_objectSpread(_objectSpread({className,level,size},props),{},{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_SpacedText__WEBPACK_IMPORTED_MODULE_0__.A,{color,weight,size,children})}))}SpacedHeading.propTypes={children:prop_types__WEBPACK_IMPORTED_MODULE_2__.node.isRequired,className:prop_types__WEBPACK_IMPORTED_MODULE_2__.string,color:(0,prop_types__WEBPACK_IMPORTED_MODULE_2__.oneOfType)([prop_types__WEBPACK_IMPORTED_MODULE_2__.object,prop_types__WEBPACK_IMPORTED_MODULE_2__.string]),level:prop_types__WEBPACK_IMPORTED_MODULE_2__.number,size:prop_types__WEBPACK_IMPORTED_MODULE_2__.string,weight:prop_types__WEBPACK_IMPORTED_MODULE_2__.string};const __WEBPACK_DEFAULT_EXPORT__=SpacedHeading},"./src/components/DropdownNav/DropdownNav.jsx"(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/react/jsx-runtime.js"),react__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../node_modules/react/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("../../node_modules/prop-types/index.js"),styled_components__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("../../node_modules/styled-components/dist/styled-components.browser.esm.js"),grommet__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("../../node_modules/grommet/es6/components/Button/Button.js"),grommet__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("../../node_modules/grommet/es6/components/DropButton/DropButton.js"),grommet__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("../../node_modules/grommet/es6/components/Nav/Nav.js"),grommet__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__("../../node_modules/grommet/es6/components/Box/Box.js"),grommet_icons__WEBPACK_IMPORTED_MODULE_8__=__webpack_require__("../../node_modules/grommet-icons/es6/icons/FormDown.js"),_zooniverse_react_components__WEBPACK_IMPORTED_MODULE_9__=__webpack_require__("../lib-react-components/dist/esm/SpacedText/SpacedText.js");let t,t1,t2,t3,t4,t5,t6,_=t=>t;const StyledButton=(0,styled_components__WEBPACK_IMPORTED_MODULE_3__.default)(grommet__WEBPACK_IMPORTED_MODULE_4__.$)(t1||(t1=_`
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
      `),props.theme.global.colors["neutral-1"])),StyledDropButton=(0,styled_components__WEBPACK_IMPORTED_MODULE_3__.default)(grommet__WEBPACK_IMPORTED_MODULE_5__.E)(t4||(t4=_`
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
`),props=>(0,styled_components__WEBPACK_IMPORTED_MODULE_3__.css)(t2||(t2=_`
      background: ${0};
    `),props.theme.global.colors["neutral-1"]),props=>props.open&&(0,styled_components__WEBPACK_IMPORTED_MODULE_3__.css)(t3||(t3=_`
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
    `),props.theme.global.colors["neutral-1"],props.theme.global.colors.brand)),StyledUl=styled_components__WEBPACK_IMPORTED_MODULE_3__.default.ul(t5||(t5=_`
  padding-inline-start: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
`)),StyledLi=styled_components__WEBPACK_IMPORTED_MODULE_3__.default.li(t6||(t6=_`
  list-style-type: none;
  display: flex;
  width: 100%;
`)),DEFAULT_HANDLER=()=>{};function DropdownNav({activeSection=0,className="",sections=[],setActiveSection=DEFAULT_HANDLER,sidebarLabel=""}){const[isOpen,setIsOpen]=(0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(!1),handleClose=()=>{setIsOpen(!1)},dropContent=(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(grommet__WEBPACK_IMPORTED_MODULE_6__.s,{"aria-label":sidebarLabel,width:"100%",background:"brand",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(StyledUl,{children:sections.map((section,index)=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(StyledLi,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(StyledButton,{"aria-current":index===activeSection?"true":"false",href:section.slug?`#${section.slug}`:"",onClick:()=>(index=>{handleClose(),setActiveSection(index)})(index),children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_zooniverse_react_components__WEBPACK_IMPORTED_MODULE_9__.A,{size:"0.875rem",color:"white",weight:"bold",children:section.name})})},section.name))})});return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(StyledDropButton,{alignSelf:"center",className,dropAlign:{top:"bottom"},onClose:handleClose,onOpen:()=>{setIsOpen(!0)},open:isOpen,margin:{top:"30px"},dropContent,children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(grommet__WEBPACK_IMPORTED_MODULE_7__.a,{align:"center",direction:"row",gap:"xsmall",justify:"center",pad:{horizontal:"20px",vertical:"10px"},children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_zooniverse_react_components__WEBPACK_IMPORTED_MODULE_9__.A,{weight:"bold",color:{light:"neutral-1",dark:"white"},children:sidebarLabel}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(grommet_icons__WEBPACK_IMPORTED_MODULE_8__.t,{color:{light:"neutral-1",dark:"white"}})]})})}const __WEBPACK_DEFAULT_EXPORT__=DropdownNav;DropdownNav.propTypes={activeSection:prop_types__WEBPACK_IMPORTED_MODULE_2__.number,className:prop_types__WEBPACK_IMPORTED_MODULE_2__.string,sections:(0,prop_types__WEBPACK_IMPORTED_MODULE_2__.arrayOf)((0,prop_types__WEBPACK_IMPORTED_MODULE_2__.shape)({active:prop_types__WEBPACK_IMPORTED_MODULE_2__.bool,name:prop_types__WEBPACK_IMPORTED_MODULE_2__.string,setActive:prop_types__WEBPACK_IMPORTED_MODULE_2__.func,slug:prop_types__WEBPACK_IMPORTED_MODULE_2__.string})),setActiveSection:prop_types__WEBPACK_IMPORTED_MODULE_2__.func,sidebarLabel:prop_types__WEBPACK_IMPORTED_MODULE_2__.string},DropdownNav.__docgenInfo={description:"",methods:[],displayName:"DropdownNav",props:{activeSection:{defaultValue:{value:"0",computed:!1},description:"",type:{name:"custom",raw:"number"},required:!1},className:{defaultValue:{value:"''",computed:!1},description:"",type:{name:"custom",raw:"string"},required:!1},sections:{defaultValue:{value:"[]",computed:!1},description:"",type:{name:"arrayOf",value:{name:"shape",value:{active:{name:"bool",required:!1},name:{name:"string",required:!1},setActive:{name:"func",required:!1},slug:{name:"string",required:!1}}}},required:!1},setActiveSection:{defaultValue:{value:"() => {}",computed:!1},description:"",type:{name:"custom",raw:"func"},required:!1},sidebarLabel:{defaultValue:{value:"''",computed:!1},description:"",type:{name:"custom",raw:"string"},required:!1}}}},"./src/components/HeadingForAboutNav/HeadingForAboutNav.jsx"(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{A:()=>HeadingForAboutNav});var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/react/jsx-runtime.js"),react__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../node_modules/react/index.js"),_zooniverse_react_components_SpacedHeading__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("../lib-react-components/dist/esm/SpacedHeading/SpacedHeading.js"),styled_components__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("../../node_modules/styled-components/dist/styled-components.browser.esm.js"),grommet__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("../../node_modules/grommet/es6/components/Box/Box.js"),prop_types__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("../../node_modules/prop-types/index.js"),_SharedStyledComponents_SharedStyledComponents__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("./src/components/SharedStyledComponents/SharedStyledComponents.jsx");let t;const HeadingForNav=(0,styled_components__WEBPACK_IMPORTED_MODULE_3__.default)(_zooniverse_react_components_SpacedHeading__WEBPACK_IMPORTED_MODULE_2__.A)(t||(t=(t=>t)`
  margin: 0;

  @media (width <= ${0}) {
    border-top: 70px solid transparent; // Handles navigation to an h2 without the sticky dropdown covering it
    margin-top: -70px;
  }
`),_SharedStyledComponents_SharedStyledComponents__WEBPACK_IMPORTED_MODULE_6__.ik),defaultPad={vertical:"30px"};function HeadingForAboutNav({color="black",pad=defaultPad,sectionIndex=0,sectionName="",setActiveSection=()=>{},slug=""}){const headingRef=(0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)();return(0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{const intersectionObserver=new window.IntersectionObserver(entries=>{if(entries[0].isIntersecting){setActiveSection(sectionIndex);const location=window.location.toString().split("#")[0],oldHash=window.location.hash,hash="#"+slug;0===sectionIndex?history.replaceState(null,null,location):oldHash!==slug&&history.replaceState(null,null,location+hash)}},{root:null,rootMargin:"0px 0px -70% 0px",threshold:1});return intersectionObserver.observe(headingRef.current),()=>{intersectionObserver.disconnect()}},[headingRef.current]),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(grommet__WEBPACK_IMPORTED_MODULE_4__.a,{ref:headingRef,pad,children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(HeadingForNav,{id:slug,color,level:2,size:"1.5rem",tabIndex:-1,textAlign:"center",children:sectionName})})}HeadingForAboutNav.propTypes={sectionIndex:prop_types__WEBPACK_IMPORTED_MODULE_5__.number,sectionName:prop_types__WEBPACK_IMPORTED_MODULE_5__.string,setActiveSection:prop_types__WEBPACK_IMPORTED_MODULE_5__.func,slug:prop_types__WEBPACK_IMPORTED_MODULE_5__.string},HeadingForAboutNav.__docgenInfo={description:"",methods:[],displayName:"HeadingForAboutNav",props:{color:{defaultValue:{value:"'black'",computed:!1},required:!1},pad:{defaultValue:{value:"{ vertical: '30px' }",computed:!1},required:!1},sectionIndex:{defaultValue:{value:"0",computed:!1},description:"",type:{name:"custom",raw:"number"},required:!1},sectionName:{defaultValue:{value:"''",computed:!1},description:"",type:{name:"custom",raw:"string"},required:!1},setActiveSection:{defaultValue:{value:"() => {}",computed:!1},description:"",type:{name:"custom",raw:"func"},required:!1},slug:{defaultValue:{value:"''",computed:!1},description:"",type:{name:"custom",raw:"string"},required:!1}}}},"./src/components/HeadingForAboutNav/SubHeading.jsx"(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/react/jsx-runtime.js"),grommet__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../node_modules/grommet/es6/components/Heading/Heading.js"),styled_components__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("../../node_modules/styled-components/dist/styled-components.browser.esm.js"),_SharedStyledComponents_SharedStyledComponents__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/components/SharedStyledComponents/SharedStyledComponents.jsx");let t;const StyledSubHeading=(0,styled_components__WEBPACK_IMPORTED_MODULE_2__.default)(grommet__WEBPACK_IMPORTED_MODULE_1__.D)(t||(t=(t=>t)`
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
          `),props.theme.global.colors["neutral-1"],props.theme.global.colors["neutral-1"]));function HorizontalRuleLogo(){const{dark,global}=(0,styled_components__WEBPACK_IMPORTED_MODULE_1__.useTheme)();return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(HorizontalRuleLogoContainer,{align:"center",direction:"row",justify:"center",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(LeftElement,{}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_zooniverse_react_components_ZooniverseLogo__WEBPACK_IMPORTED_MODULE_3__.A,{id:"root-about-zooniverse",color:dark?global.colors["accent-1"]:global.colors["neutral-1"],size:"48px"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(RightElement,{})]})}const __WEBPACK_DEFAULT_EXPORT__=HorizontalRuleLogo;HorizontalRuleLogo.__docgenInfo={description:"",methods:[],displayName:"HorizontalRuleLogo"}},"./src/components/Mobile/Mobile.jsx"(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{A:()=>Mobile});var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/react/jsx-runtime.js"),grommet__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../node_modules/grommet/es6/components/Box/Box.js"),grommet__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("../../node_modules/grommet/es6/components/Image/Image.js"),grommet__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("../../node_modules/grommet/es6/components/Text/Text.js"),grommet__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("../../node_modules/grommet/es6/components/Button/Button.js"),grommet__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("../../node_modules/grommet/es6/components/Anchor/Anchor.js"),_translations_i18n__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("./src/translations/i18n.jsx");function Mobile(){const{t}=(0,_translations_i18n__WEBPACK_IMPORTED_MODULE_6__.Bd)();return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(grommet__WEBPACK_IMPORTED_MODULE_1__.a,{margin:{bottom:"medium"},children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(grommet__WEBPACK_IMPORTED_MODULE_1__.a,{align:"center",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(grommet__WEBPACK_IMPORTED_MODULE_2__._,{alt:t("AboutPage.mobile.altImage"),src:"https://static.zooniverse.org/fem-assets/phone.png",width:"300px",margin:{vertical:"30px"}}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(grommet__WEBPACK_IMPORTED_MODULE_3__.E,{textAlign:"center",color:{light:"black",dark:"white"},children:t("AboutPage.mobile.description")})]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(grommet__WEBPACK_IMPORTED_MODULE_1__.a,{justify:"center",gap:"xxsmall",direction:"row",margin:{top:"15px"},children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(grommet__WEBPACK_IMPORTED_MODULE_4__.$,{as:grommet__WEBPACK_IMPORTED_MODULE_5__.M,href:"https://apps.apple.com/us/app/zooniverse/id1194130243","aria-label":t("AboutPage.mobile.altAppStore"),children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(grommet__WEBPACK_IMPORTED_MODULE_2__._,{alt:t("AboutPage.mobile.altAppStore"),src:"https://static.zooniverse.org/fem-assets/app-store.png",width:"140px"})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(grommet__WEBPACK_IMPORTED_MODULE_4__.$,{as:grommet__WEBPACK_IMPORTED_MODULE_5__.M,href:"https://play.google.com/store/apps/details?id=com.zooniversemobile","aria-label":t("AboutPage.mobile.altPlayStore"),children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(grommet__WEBPACK_IMPORTED_MODULE_2__._,{alt:t("AboutPage.mobile.altPlayStore"),src:"https://static.zooniverse.org/fem-assets/google-play.png",width:"140px"})})]})]})}Mobile.__docgenInfo={description:"",methods:[],displayName:"Mobile"}},"./src/components/Stats/Stats.jsx"(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{A:()=>Stats});var prefersReducedMotion,jsx_runtime=__webpack_require__("../../node_modules/react/jsx-runtime.js"),Box=__webpack_require__("../../node_modules/grommet/es6/components/Box/Box.js"),ResponsiveContext=__webpack_require__("../../node_modules/grommet/es6/contexts/ResponsiveContext/ResponsiveContext.js"),Text=__webpack_require__("../../node_modules/grommet/es6/components/Text/Text.js"),react=__webpack_require__("../../node_modules/react/index.js"),styled_components_browser_esm=__webpack_require__("../../node_modules/styled-components/dist/styled-components.browser.esm.js"),SpacedText=__webpack_require__("../lib-react-components/dist/esm/SpacedText/SpacedText.js"),prop_types=__webpack_require__("../../node_modules/prop-types/index.js"),defaultLocale=__webpack_require__("../../node_modules/d3-format/src/defaultLocale.js"),src_value=__webpack_require__("../../node_modules/@visx/vendor/node_modules/d3-interpolate/src/value.js"),d3=__webpack_require__("../../node_modules/d3/index.js");function asyncGeneratorStep(n,t,e,r,o,a,c){try{var i=n[a](c),u=i.value}catch(n){return void e(n)}i.done?t(u):Promise.resolve(u).then(r,o)}function _asyncToGenerator(n){return function(){var t=this,e=arguments;return new Promise(function(r,o){var a=n.apply(t,e);function _next(n){asyncGeneratorStep(a,r,o,_next,_throw,"next",n)}function _throw(n){asyncGeneratorStep(a,r,o,_next,_throw,"throw",n)}_next(void 0)})}}function formatValue(num){return(0,defaultLocale.GP)(",d")(num)}prefersReducedMotion=()=>window.matchMedia("(prefers-reduced-motion: reduce)").matches;function _animateValue(){return _animateValue=_asyncToGenerator(function*(element,value,duration){if(0!==value){var animationInProgress=element.textContent!==formatValue(0),animationDuration=prefersReducedMotion()||animationInProgress?0:duration,interpolator=(0,src_value.A)(0,value);return(0,d3.Ltv)(element).data([value]).transition().duration(animationDuration).textTween(()=>t=>formatValue(interpolator(t))).end()}}),_animateValue.apply(this,arguments)}function AnimatedNumber(_ref){var{duration=1e3,value=0}=_ref,numRef=(0,react.useRef)(null),[animated,setAnimated]=(0,react.useState)(!1),displayedValue=animated?value:0;return(0,react.useEffect)(()=>{var numElement=numRef.current;if(!(numElement.textContent!==formatValue(0)||animated||formatValue(value)===numElement.textContent)){var intersectionCallback=function(){var _ref3=_asyncToGenerator(function*(_ref2){var[entry]=_ref2;entry.intersectionRatio<=0||(intersectionObserver.unobserve(numElement),yield function animateValue(_x,_x2,_x3){return _animateValue.apply(this,arguments)}(numElement,value,duration),setAnimated(!0))});return function intersectionCallback(_x4){return _ref3.apply(this,arguments)}}(),intersectionObserver=new window.IntersectionObserver(intersectionCallback);return intersectionObserver.observe(numElement),()=>{intersectionObserver.disconnect()}}},[0,value,duration]),(0,jsx_runtime.jsx)("span",{ref:numRef,children:formatValue(displayedValue)})}AnimatedNumber.propTypes={duration:prop_types.number,value:prop_types.number.isRequired};const AnimatedNumber_AnimatedNumber=AnimatedNumber;var i18n=__webpack_require__("./src/translations/i18n.jsx"),index=__webpack_require__("../../node_modules/swr/dist/index/index.mjs"),src=__webpack_require__("../lib-panoptes-js/src/index.js"),console=__webpack_require__("../../node_modules/console-browserify/index.js");const SWROptions={revalidateIfStale:!0,revalidateOnMount:!0,revalidateOnFocus:!0,revalidateOnReconnect:!0,refreshInterval:0},getClassificationCounts=async()=>{try{const statsResponse=await fetch("https://eras.zooniverse.org/classifications");return(await statsResponse.json()).total_count}catch(error){return console.log(error),null}};const getVolunteerCount=async()=>{try{const query={page_size:1};return(await src.bB.get("/users",query)).body.meta.users.count}catch(error){return console.log(error),null}};let t,t1,t2,_=t=>t;const ClassificationsLabel=(0,styled_components_browser_esm.default)(Box.a)(t||(t=_`
  background: linear-gradient(
    to right,
    rgba(240, 178, 0, 0.4) 0%,
    rgba(209, 143, 54, 1) 25%,
    rgba(209, 143, 54, 1) 75%,
    rgba(240, 178, 0, 0.4) 100%
  );
`)),VolunteersLabel=(0,styled_components_browser_esm.default)(Box.a)(t1||(t1=_`
  background: linear-gradient(
    to right,
    rgba(0, 93, 105, 0.4) 0%,
    rgba(0, 93, 105, 1) 25%,
    rgba(0, 93, 105, 1) 75%,
    rgba(0, 93, 105, 0.4) 100%
  );
`)),Stat=(0,styled_components_browser_esm.default)(Box.a)(t2||(t2=_`
  overflow: hidden;

  &.classifications {
    background: rgba(240, 178, 0, 0.05);
  }

  &.volunteers {
    background: rgba(0, 93, 105, 0.1); // matches VolunteersLabel
  }
`));function Stats(){const{t}=(0,i18n.Bd)(),numberFontSize="small"!==(0,react.useContext)(ResponsiveContext.u)?"5rem":"2.5rem",{data:classifications}=function useTotalClassificationCount(){return(0,index.Ay)("eras-classifications-total",getClassificationCounts,SWROptions)}(),{data:volunteers}=function useTotalVolunteerCount(){return(0,index.Ay)("total-zooniverse-volunteers",getVolunteerCount,SWROptions)}(),totalClassifications=classifications+25284786,totalVolunteers=volunteers+114576;return(0,jsx_runtime.jsxs)(Box.a,{gap:"medium",children:[(0,jsx_runtime.jsxs)(Stat,{className:"classifications",round:"8px",children:[(0,jsx_runtime.jsx)(Text.E,{color:"neutral-2",size:numberFontSize,textAlign:"center",children:classifications&&(0,jsx_runtime.jsx)(AnimatedNumber_AnimatedNumber,{value:totalClassifications})}),(0,jsx_runtime.jsx)(ClassificationsLabel,{children:(0,jsx_runtime.jsx)(SpacedText.A,{color:"white",weight:"bold",size:"1.4rem",textAlign:"center",children:t("AboutPage.ourMission.stats.classifications")})})]}),(0,jsx_runtime.jsxs)(Stat,{className:"volunteers",round:"8px",children:[(0,jsx_runtime.jsx)(Text.E,{color:{light:"neutral-1",dark:"accent-1"},size:numberFontSize,textAlign:"center",children:volunteers&&(0,jsx_runtime.jsx)(AnimatedNumber_AnimatedNumber,{value:totalVolunteers})}),(0,jsx_runtime.jsx)(VolunteersLabel,{children:(0,jsx_runtime.jsx)(SpacedText.A,{color:"white",weight:"bold",size:"1.4rem",textAlign:"center",children:t("AboutPage.ourMission.stats.volunteers")})})]})]})}Stats.__docgenInfo={description:"",methods:[],displayName:"Stats"}},"./src/screens/About/About.stories.jsx"(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,__namedExportsOrder:()=>__namedExportsOrder,default:()=>About_stories});var jsx_runtime=__webpack_require__("../../node_modules/react/jsx-runtime.js"),Heading=__webpack_require__("../../node_modules/grommet/es6/components/Heading/Heading.js"),Box=__webpack_require__("../../node_modules/grommet/es6/components/Box/Box.js"),script=__webpack_require__("./node_modules/next/script.js"),script_default=__webpack_require__.n(script),react=__webpack_require__("../../node_modules/react/index.js"),styled_components_browser_esm=__webpack_require__("../../node_modules/styled-components/dist/styled-components.browser.esm.js"),i18n=__webpack_require__("./src/translations/i18n.jsx"),AboutLayout=__webpack_require__("./src/components/PageLayout/AboutLayout.jsx"),DropdownNav=__webpack_require__("./src/components/DropdownNav/DropdownNav.jsx"),HeadingForAboutNav=__webpack_require__("./src/components/HeadingForAboutNav/HeadingForAboutNav.jsx"),MaxWidthContent=__webpack_require__("./src/components/MaxWidthContent/MaxWidthContent.jsx"),SharedStyledComponents=__webpack_require__("./src/components/SharedStyledComponents/SharedStyledComponents.jsx"),HorizontalRuleLogo=__webpack_require__("./src/components/HorizontalRuleLogo/HorizontalRuleLogo.jsx"),Mobile=__webpack_require__("./src/components/Mobile/Mobile.jsx"),SubHeading=__webpack_require__("./src/components/HeadingForAboutNav/SubHeading.jsx"),Button=__webpack_require__("../../node_modules/grommet/es6/components/Button/Button.js"),Text=__webpack_require__("../../node_modules/grommet/es6/components/Text/Text.js"),Paragraph=__webpack_require__("../../node_modules/grommet/es6/components/Paragraph/Paragraph.js"),Anchor=__webpack_require__("../../node_modules/grommet/es6/components/Anchor/Anchor.js"),Help=__webpack_require__("../../node_modules/grommet-icons/es6/icons/Help.js"),Group=__webpack_require__("../../node_modules/grommet-icons/es6/icons/Group.js"),Edit=__webpack_require__("../../node_modules/grommet-icons/es6/icons/Edit.js");let t;const StyledButton=(0,styled_components_browser_esm.default)(Button.$)(t||(t=(t=>t)`
  text-align: center;
  color: white;
  padding: 10px;
  background: ${0};
  width: clamp(250px, 100%, 400px);
  border-radius: 5px;
`),props=>props.theme.global.colors["neutral-1"]);function Contact({widgetLoaded=!1}){const{t}=(0,i18n.Bd)();return(0,jsx_runtime.jsxs)(Box.a,{children:[(0,jsx_runtime.jsxs)(Box.a,{direction:"row",gap:"xlarge",width:"100%",justify:"center",pad:{vertical:"medium"},children:[(0,jsx_runtime.jsxs)(Box.a,{width:"30%",align:"center",children:[(0,jsx_runtime.jsx)(Box.a,{height:"2.5rem",width:"2.5rem",align:"center",justify:"center",background:"neutral-1",round:"50%",children:(0,jsx_runtime.jsx)(Help._,{size:"1.5rem",color:"white"})}),(0,jsx_runtime.jsx)(Text.E,{textAlign:"center",margin:{top:"xsmall"},size:"1rem",color:{light:"black",dark:"white"},children:t("AboutPage.contact.categories.first")})]}),(0,jsx_runtime.jsxs)(Box.a,{width:"30%",align:"center",pad:{horizontal:"small"},children:[(0,jsx_runtime.jsx)(Box.a,{height:"2.5rem",width:"2.5rem",align:"center",justify:"center",background:"neutral-1",round:"50%",children:(0,jsx_runtime.jsx)(Group.Y,{size:"1.5rem",color:"white"})}),(0,jsx_runtime.jsx)(Text.E,{textAlign:"center",margin:{top:"xsmall"},size:"1rem",color:{light:"black",dark:"white"},children:t("AboutPage.contact.categories.second")})]}),(0,jsx_runtime.jsxs)(Box.a,{width:"30%",align:"center",children:[(0,jsx_runtime.jsx)(Box.a,{height:"2.5rem",width:"2.5rem",align:"center",justify:"center",background:"neutral-1",round:"50%",children:(0,jsx_runtime.jsx)(Edit.f,{size:"1.5rem",color:"white"})}),(0,jsx_runtime.jsx)(Text.E,{textAlign:"center",margin:{top:"xsmall"},size:"1rem",color:{light:"black",dark:"white"},children:t("AboutPage.contact.categories.third")})]})]}),(0,jsx_runtime.jsx)(Paragraph.f,{margin:{top:"0"},children:(0,jsx_runtime.jsx)(i18n.x6,{i18nKey:"AboutPage.contact.paragraphs.first",t,components:[(0,jsx_runtime.jsx)(Anchor.M,{href:"/about/faq"},"faq-page"),(0,jsx_runtime.jsx)(Anchor.M,{href:"https://zooniverse.freshdesk.com/support/solutions"},"freshdesk-page")]})}),(0,jsx_runtime.jsx)(Paragraph.f,{children:t("AboutPage.contact.paragraphs.second")}),(0,jsx_runtime.jsxs)(Box.a,{align:"center",pad:{top:"small",bottom:"180px"},children:[(0,jsx_runtime.jsx)(StyledButton,{primary:!0,textAlign:"center",onClick:e=>{if(widgetLoaded){const contactButton=document.activeElement;window.FreshworksWidget("open"),setTimeout(()=>{var _iframe_contentDocument,_iframe_contentDocument1;const iframe=document.querySelector("iframe#widget-frame"),input=null==iframe||null===(_iframe_contentDocument=iframe.contentDocument)||void 0===_iframe_contentDocument?void 0:_iframe_contentDocument.querySelector("input#name");null==input||input.focus(),null==iframe||null===(_iframe_contentDocument1=iframe.contentDocument)||void 0===_iframe_contentDocument1||_iframe_contentDocument1.addEventListener("keydown",event=>{"Escape"===event.key&&(contactButton.focus(),window.FreshworksWidget("close"))})},1e3)}},"aria-haspopup":"dialog",children:t("AboutPage.contact.heading")}),(0,jsx_runtime.jsx)(Paragraph.f,{margin:{top:"medium"},children:(0,jsx_runtime.jsx)(i18n.x6,{i18nKey:"AboutPage.contact.paragraphs.third",t,components:[(0,jsx_runtime.jsx)(Anchor.M,{href:"mailto:contact@zooniverse.org"},"direct-email-contact")]})})]})]})}Contact.__docgenInfo={description:"",methods:[],displayName:"Contact",props:{widgetLoaded:{defaultValue:{value:"false",computed:!1},required:!1}}};var Image=__webpack_require__("../../node_modules/grommet/es6/components/Image/Image.js"),Tip=__webpack_require__("../../node_modules/grommet/es6/components/Tip/Tip.js"),CircleInformation=__webpack_require__("../../node_modules/grommet-icons/es6/icons/CircleInformation.js");let Highlights_t;const Relative=(0,styled_components_browser_esm.default)(Box.a)(Highlights_t||(Highlights_t=(t=>t)`
  // This is necessary so the Contact Us section's header margin doesn't overlap the interactive icon in this section
  position: relative;
`));function Highlights(){const{t}=(0,i18n.Bd)();return(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[(0,jsx_runtime.jsx)(Paragraph.f,{children:(0,jsx_runtime.jsx)(i18n.x6,{i18nKey:"AboutPage.highlights.paragraphs.first",t,components:[(0,jsx_runtime.jsx)(Anchor.M,{href:"/about/publications"},"publications-page")]})}),(0,jsx_runtime.jsx)(Paragraph.f,{margin:"0",children:t("AboutPage.highlights.paragraphs.second")}),(0,jsx_runtime.jsxs)(Box.a,{justify:"center",gap:"xsmall",margin:{top:"30px"},direction:"row",pad:{horizontal:"medium"},children:[(0,jsx_runtime.jsx)(Box.a,{children:(0,jsx_runtime.jsx)(Image._,{alt:t("AboutPage.highlights.pictures.first"),src:"https://static.zooniverse.org/fem-assets/into-the-zooniverse1.jpg",loading:"lazy",fit:"contain",width:"100%"})}),(0,jsx_runtime.jsx)(Box.a,{children:(0,jsx_runtime.jsx)(Image._,{alt:t("AboutPage.highlights.pictures.second"),src:"https://static.zooniverse.org/fem-assets/into-the-zooniverse2.png",loading:"lazy",fit:"contain",width:"100%"})}),(0,jsx_runtime.jsx)(Box.a,{children:(0,jsx_runtime.jsx)(Image._,{alt:t("AboutPage.highlights.pictures.third"),src:"https://static.zooniverse.org/fem-assets/into-the-zooniverse3.jpg",loading:"lazy",fit:"contain",width:"99%"})})]}),(0,jsx_runtime.jsxs)(Relative,{direction:"row",gap:"6px",margin:{bottom:"medium",top:"8px"},alignContent:"center",pad:{horizontal:"medium"},children:[(0,jsx_runtime.jsx)(Text.E,{color:{light:"black",dark:"white"},children:(0,jsx_runtime.jsx)(i18n.x6,{i18nKey:"AboutPage.highlights.description",t,components:[(0,jsx_runtime.jsx)(Anchor.M,{href:"https://www.blurb.com/b/11384070-into-the-zooniverse-vol-iv"},"into-the-zooniverse")]})}),(0,jsx_runtime.jsx)(Tip.Y,{content:(0,jsx_runtime.jsx)(Text.E,{children:t("AboutPage.highlights.tip")}),plain:!0,dropProps:{align:{top:"bottom"},background:"dark-4",round:"5px",pad:"5px"},children:(0,jsx_runtime.jsx)(Button.$,{plain:!0,icon:(0,jsx_runtime.jsx)(CircleInformation.x,{size:"1rem"})})})]})]})}Highlights.__docgenInfo={description:"",methods:[],displayName:"Highlights"};var Compass=__webpack_require__("../../node_modules/grommet-icons/es6/icons/Compass.js"),Info=__webpack_require__("../../node_modules/grommet-icons/es6/icons/Info.js"),Compliance=__webpack_require__("../../node_modules/grommet-icons/es6/icons/Compliance.js"),Certificate=__webpack_require__("../../node_modules/grommet-icons/es6/icons/Certificate.js"),Troubleshoot=__webpack_require__("../../node_modules/grommet-icons/es6/icons/Troubleshoot.js"),Validate=__webpack_require__("../../node_modules/grommet-icons/es6/icons/Validate.js"),Deploy=__webpack_require__("../../node_modules/grommet-icons/es6/icons/Deploy.js"),Download=__webpack_require__("../../node_modules/grommet-icons/es6/icons/Download.js");let HowItWorks_t,t1,t2,t3,t4,t5,HowItWorks_=t=>t;const GradientBox=(0,styled_components_browser_esm.default)(Box.a)(HowItWorks_t||(HowItWorks_t=HowItWorks_`
  position: relative;
  background: linear-gradient(
    212deg,
    rgba(0, 151, 157, 0.2) 8.04%,
    rgba(255, 255, 255, 0.2) 11.21%,
    rgba(0, 93, 105, 0.2) 24.51%,
    rgba(255, 255, 255, 0.2) 45.18%,
    rgba(0, 93, 105, 0.2) 67.56%,
    rgba(255, 255, 255, 0.2) 85.31%,
    rgba(0, 151, 157, 0.2) 86.6%,
    rgba(255, 255, 255, 0) 100.98%
  );

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 2px;
    width: 100%;
    background: linear-gradient(
      90deg,
      transparent 0%,
      #a6a7a9 50%,
      transparent 100%
    );
  }
`)),ListsContainer=(0,styled_components_browser_esm.default)(Box.a)(t1||(t1=HowItWorks_`
  flex-direction: row;

  @media (width < 37rem) {
    flex-direction: column;
    align-items: center;
    row-gap: 50px;
  }
`)),Institute=(0,styled_components_browser_esm.default)(Box.a)(t2||(t2=HowItWorks_`
  border: solid white 1px;
  border-radius: 8px;
  backdrop-filter: blur(10px);
  background: rgba(239, 242, 245, 0.3);
  box-shadow: 2px 2px 4px 0px rgba(0, 0, 0, 0.25);
  padding: 5px;
  align-items: center;
  justify-content: center;
  width: 33%;

  & > img {
    max-width: 100px;
    @media (max-width: 768px) { // Grommet's ResponsiveContext size 'small'
      max-width: 70px;
    }
  }
`)),ArrowBox=(0,styled_components_browser_esm.default)(Box.a)(t3||(t3=HowItWorks_`
  position: relative;
  width: 240px; // same as ArrowSVG
  height: 46px; // upper portion of SVG
  align-items: center;
  justify-content: center;
  padding: 0 25px;
  margin-bottom: 50px;
`)),HowItWorks_StyledButton=(0,styled_components_browser_esm.default)(Button.$)(t4||(t4=HowItWorks_`
  display: flex;
  justify-content: center;
  background: white;
  box-shadow: 2px 2px 4px 0px rgba(0, 0, 0, 0.25);
  font-size: 0.8rem;
  padding: 5px;
  width: clamp(130px, 100%, 240px);
  border-radius: 8px;
  border: solid 1px ${0};

  &:hover {
    text-decoration: none;
  }
`),props=>props.theme.global.colors["neutral-2"]),BoxWithConnector=(0,styled_components_browser_esm.default)(Box.a)(t5||(t5=HowItWorks_`
  position: relative;

  &:not(:nth-child(2)) {
    &:before {
      content: '';
      position: absolute;
      bottom: calc(50% + 40px);
      left: 24px;
      height: 30px;
      width: 2px;
      background: white;
    }
  }

  &:not(:last-child) {
    margin-bottom: 70px;

    &:after {
      content: '';
      position: absolute;
      top: calc(50% + 40px);
      left: 24px;
      height: 30px;
      width: 2px;
      background: white;
    }
  }
`)),ArrowSVG=()=>(0,jsx_runtime.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"240px",viewBox:"0 0 248 68",fill:"none","aria-hidden":!0,style:{position:"absolute",top:0,left:0,filter:"drop-shadow(3px 3px 4px rgba(0 0 0 0.5))"},children:(0,jsx_runtime.jsx)("path",{d:"M237 2.55109H7.33333C3.33333 2.55109 2.11111 6.56608 2 8.57358V39.6898C2 45.3108 5.55556 46.716 7.33333 46.716H95.9036C97.4877 46.716 99.0361 47.1863 100.353 48.0673L117.853 59.7779C120.561 61.5901 124.098 61.5787 126.794 59.7489L143.966 48.0963C145.291 47.1969 146.856 46.716 148.458 46.716H236.667H237C241 46.716 242 42.0319 242 39.6898V10.0792C242 4.05671 238.667 2.55109 237 2.55109Z",fill:"white",fillOpacity:"0.2",strokeWidth:"1px",stroke:"white"})}),ListItem=({children})=>(0,jsx_runtime.jsx)(BoxWithConnector,{forwardedAs:"li",direction:"row",align:"center",width:"240px",children}),Step=({children})=>(0,jsx_runtime.jsx)(Text.E,{margin:{left:"10px"},size:"1rem",color:"white",children});function HowItWorks({setActiveSection=()=>{}}){const{t}=(0,i18n.Bd)(),{global}=(0,styled_components_browser_esm.useTheme)(),customButtonBorder=global.colors.brand;return(0,jsx_runtime.jsxs)(MaxWidthContent.A,{background:"neutral-1",round:"16px",margin:{bottom:"30px"},overflow:"hidden",children:[(0,jsx_runtime.jsxs)(Box.a,{align:"center",children:[(0,jsx_runtime.jsx)(HeadingForAboutNav.A,{color:"accent-1",pad:{top:"30px",bottom:"10px"},sectionIndex:1,sectionName:t("AboutPage.howItWorks.heading"),setActiveSection,slug:"how-it-works"}),(0,jsx_runtime.jsx)(Heading.D,{alignSelf:"center",color:"white",level:3,margin:{top:"0",bottom:"medium"},size:"2rem",textAlign:"center",weight:"normal",children:t("AboutPage.howItWorks.subheading")})]}),(0,jsx_runtime.jsxs)(GradientBox,{pad:"large",children:[(0,jsx_runtime.jsxs)(ListsContainer,{direction:"row",width:"100%",justify:"between",children:[(0,jsx_runtime.jsxs)(Box.a,{as:"ul",margin:"0",pad:"0",height:"100%",children:[(0,jsx_runtime.jsxs)(ArrowBox,{children:[(0,jsx_runtime.jsx)(ArrowSVG,{}),(0,jsx_runtime.jsx)(Text.E,{color:"white",weight:"bold",size:"1.125rem",children:`${t("AboutPage.howItWorks.participants.description")}:`})]}),(0,jsx_runtime.jsxs)(ListItem,{children:[(0,jsx_runtime.jsx)(Compass.F,{color:"white",size:"50px"}),(0,jsx_runtime.jsx)(Step,{children:t("AboutPage.howItWorks.participants.steps.first")})]}),(0,jsx_runtime.jsxs)(ListItem,{children:[(0,jsx_runtime.jsx)(Info.R,{color:"white",size:"50px"}),(0,jsx_runtime.jsx)(Step,{children:t("AboutPage.howItWorks.participants.steps.second")})]}),(0,jsx_runtime.jsxs)(ListItem,{children:[(0,jsx_runtime.jsx)(Compliance.m,{color:"white",size:"50px"}),(0,jsx_runtime.jsx)(Step,{children:t("AboutPage.howItWorks.participants.steps.third")})]}),(0,jsx_runtime.jsxs)(ListItem,{children:[(0,jsx_runtime.jsx)(Certificate.u,{color:"white",size:"50px"}),(0,jsx_runtime.jsx)(Step,{children:t("AboutPage.howItWorks.participants.steps.fourth")})]})]}),(0,jsx_runtime.jsxs)(Box.a,{as:"ul",margin:"0",pad:"0",height:"100%",children:[(0,jsx_runtime.jsxs)(ArrowBox,{children:[(0,jsx_runtime.jsx)(ArrowSVG,{}),(0,jsx_runtime.jsx)(Text.E,{color:"white",weight:"bold",size:"1.125rem",children:`${t("AboutPage.howItWorks.researchers.description")}:`})]}),(0,jsx_runtime.jsxs)(ListItem,{children:[(0,jsx_runtime.jsx)(Troubleshoot.F,{color:"white",size:"50px"}),(0,jsx_runtime.jsx)(Step,{children:t("AboutPage.howItWorks.researchers.steps.first")})]}),(0,jsx_runtime.jsxs)(ListItem,{children:[(0,jsx_runtime.jsx)(Validate.b,{color:"white",size:"50px"}),(0,jsx_runtime.jsx)(Step,{children:t("AboutPage.howItWorks.researchers.steps.second")})]}),(0,jsx_runtime.jsxs)(ListItem,{children:[(0,jsx_runtime.jsx)(Deploy.m,{color:"white",size:"50px"}),(0,jsx_runtime.jsx)(Step,{children:t("AboutPage.howItWorks.researchers.steps.third")})]}),(0,jsx_runtime.jsxs)(ListItem,{children:[(0,jsx_runtime.jsx)(Download.f,{color:"white",size:"50px"}),(0,jsx_runtime.jsx)(Step,{children:t("AboutPage.howItWorks.researchers.steps.fourth")})]})]})]}),(0,jsx_runtime.jsxs)(Box.a,{direction:"row",pad:{vertical:"medium"},gap:"small",justify:"between",children:[(0,jsx_runtime.jsx)(HowItWorks_StyledButton,{as:Anchor.M,color:"black",plain:!0,href:"https://www.zooniverse.org/projects",label:t("AboutPage.howItWorks.participants.link"),weight:"normal"}),(0,jsx_runtime.jsx)(HowItWorks_StyledButton,{as:Anchor.M,color:"black",plain:!0,href:"https://www.zooniverse.org/lab",label:t("AboutPage.howItWorks.researchers.link"),weight:"normal",style:{borderColor:customButtonBorder}})]}),(0,jsx_runtime.jsxs)(Box.a,{direction:"row",gap:"small",children:[(0,jsx_runtime.jsx)(Institute,{children:(0,jsx_runtime.jsx)("img",{alt:"The Adler Planetarium",src:"https://static.zooniverse.org/fem-assets/adler.png"})}),(0,jsx_runtime.jsx)(Institute,{children:(0,jsx_runtime.jsx)("img",{alt:"University of Minnesota",src:"https://static.zooniverse.org/fem-assets/minnesota.png"})}),(0,jsx_runtime.jsx)(Institute,{children:(0,jsx_runtime.jsx)("img",{alt:"University of Oxford",src:"https://static.zooniverse.org/fem-assets/oxford.jpg"})})]})]})]})}HowItWorks.__docgenInfo={description:"",methods:[],displayName:"HowItWorks",props:{setActiveSection:{defaultValue:{value:"() => {}",computed:!1},required:!1}}};var ResponsiveContext=__webpack_require__("../../node_modules/grommet/es6/contexts/ResponsiveContext/ResponsiveContext.js"),Grid=__webpack_require__("../../node_modules/grommet/es6/components/Grid/Grid.js"),google=__webpack_require__("./node_modules/@next/third-parties/dist/google/index.js"),Stats=__webpack_require__("./src/components/Stats/Stats.jsx");let OurMission_t,OurMission_t1,OurMission_=t=>t;const VideoWrapper=(0,styled_components_browser_esm.default)(Box.a)(OurMission_t||(OurMission_t=OurMission_`
  border-radius: 8px; // same as Stat component
  aspect-ratio: 16 / 9;
  overflow: hidden;
  margin: 60px 0;
`)),CircleImage=(0,styled_components_browser_esm.default)(Box.a)(OurMission_t1||(OurMission_t1=OurMission_`
  border-radius: 50%;
  overflow: hidden;
  border: rgba(0, 0, 0, 0.2) solid 1px;
  width: 8rem;
  height: 8rem;
  margin-bottom: 10px;
`)),Discovery=({href,src,labelString})=>(0,jsx_runtime.jsx)(Anchor.M,{href,children:(0,jsx_runtime.jsxs)(Box.a,{width:"8rem",children:[(0,jsx_runtime.jsx)(CircleImage,{children:(0,jsx_runtime.jsx)(Image._,{alt:"",loading:"lazy",src,width:"100%",height:"100%"})}),(0,jsx_runtime.jsx)(Text.E,{color:{light:"black",dark:"white"},textAlign:"center",weight:"normal",size:"0.875rem",children:labelString})]})});function OurMission(){const{t}=(0,i18n.Bd)(),size=(0,react.useContext)(ResponsiveContext.u);return(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[(0,jsx_runtime.jsx)(Paragraph.f,{margin:{vertical:"20px"},children:(0,jsx_runtime.jsx)(i18n.x6,{i18nKey:"AboutPage.ourMission.paragraphs.first",t,components:[(0,jsx_runtime.jsx)(Anchor.M,{href:"/about/publications"},"publications-page")]})}),(0,jsx_runtime.jsx)(Heading.D,{level:3,size:"1.125rem",textAlign:"start",margin:"0",color:{light:"black",dark:"white"},children:t("AboutPage.ourMission.subheadings.second")}),(0,jsx_runtime.jsx)(Paragraph.f,{margin:{vertical:"20px"},children:(0,jsx_runtime.jsx)(i18n.x6,{i18nKey:"AboutPage.ourMission.paragraphs.second",t,components:[(0,jsx_runtime.jsx)(Anchor.M,{href:"https://www.zooniverse.org/projects"},"projects-page")]})}),(0,jsx_runtime.jsx)(Heading.D,{level:3,size:"1.125rem",margin:"0",color:{light:"black",dark:"white"},children:t("AboutPage.ourMission.subheadings.third")}),(0,jsx_runtime.jsx)(Paragraph.f,{margin:{vertical:"20px"},children:(0,jsx_runtime.jsx)(i18n.x6,{i18nKey:"AboutPage.ourMission.paragraphs.third",t,components:[(0,jsx_runtime.jsx)(Anchor.M,{href:"https://en.wikipedia.org/wiki/Wisdom_of_the_crowd"},"crowd-wisdom")]})}),(0,jsx_runtime.jsx)(Paragraph.f,{margin:{top:"0",bottom:"50px"},children:(0,jsx_runtime.jsx)(i18n.x6,{i18nKey:"AboutPage.ourMission.paragraphs.fourth",t,components:[(0,jsx_runtime.jsx)(Anchor.M,{href:"https://www.zooniverse.org/talk"},"talk-page")]})}),(0,jsx_runtime.jsx)(Heading.D,{color:{light:"neutral-1",dark:"accent-1"},fill:!0,level:3,size:"1.125rem",textAlign:"center",alignSelf:"center",children:t("AboutPage.ourMission.subheadings.fourth").toUpperCase()}),(0,jsx_runtime.jsx)(Stats.A,{}),(0,jsx_runtime.jsx)(VideoWrapper,{children:(0,jsx_runtime.jsx)(google.YouTubeEmbed,{height:"100%",width:"100%",videoid:"F-B8gXJyMHc",title:t("AboutPage.ourMission.video")})}),(0,jsx_runtime.jsxs)(Box.a,{direction:"row",justify:"center",gap:"10px",children:[(0,jsx_runtime.jsx)(Heading.D,{color:{light:"neutral-1",dark:"accent-1"},level:3,margin:"0",size:"1.125rem",textAlign:"center",children:t("AboutPage.ourMission.subheadings.fifth").toUpperCase()}),(0,jsx_runtime.jsx)(Tip.Y,{content:(0,jsx_runtime.jsx)(Text.E,{children:t("AboutPage.ourMission.discoveries.tip")}),plain:!0,dropProps:{align:{top:"bottom"},background:"dark-4",round:"5px",pad:"5px"},children:(0,jsx_runtime.jsx)(Button.$,{plain:!0,icon:(0,jsx_runtime.jsx)(CircleInformation.x,{size:"1rem"})})})]}),(0,jsx_runtime.jsxs)(Grid.x,{columns:"small"===size?["8rem","8rem"]:["8rem","8rem","8rem","8rem"],rows:"small"===size?["1fr","1fr"]:"auto",justifyContent:"small"===size?"around":"between",margin:{top:"medium",bottom:"large"},gap:"small"===size?"large":"none",children:[(0,jsx_runtime.jsx)(Discovery,{href:"https://academic.oup.com/mnras/article/399/3/1191/1073770",src:"https://static.zooniverse.org/fem-assets/green-pea.jpg",labelString:t("AboutPage.ourMission.discoveries.first")}),(0,jsx_runtime.jsx)(Discovery,{href:"https://en.wikipedia.org/wiki/Planet_Hunters",src:"https://static.zooniverse.org/fem-assets/exoplanet.jpg",labelString:t("AboutPage.ourMission.discoveries.second")}),(0,jsx_runtime.jsx)(Discovery,{href:"https://blog.shakespearesworld.org/2017/04/05/shakespeares-world-and-updating-the-oed-a-splendid-antedating-of-white-lie/",src:"https://static.zooniverse.org/fem-assets/transcription.jpg",labelString:t("AboutPage.ourMission.discoveries.third")}),(0,jsx_runtime.jsx)(Discovery,{href:"https://en.wikipedia.org/wiki/Tabby%27s_Star",src:"https://static.zooniverse.org/fem-assets/star.jpg",labelString:t("AboutPage.ourMission.discoveries.fourth")})]})]})}OurMission.__docgenInfo={description:"",methods:[],displayName:"OurMission"};let About_t;const StyledAboutHeading=(0,styled_components_browser_esm.default)(Heading.D)(About_t||(About_t=(t=>t)`
  position: relative;
  padding: 44px 0;
  margin: 0;
  text-align: center;

  @media (width <= ${0}) {
    display: none;
  }
`),SharedStyledComponents.ik);function AboutPage(){const{t}=(0,i18n.Bd)(),[widgetLoaded,setWidgetLoaded]=(0,react.useState)(!1),[activeSection,setActiveSection]=(0,react.useState)(0),sidebarSections=[{name:t("AboutPage.ourMission.heading"),slug:"our-mission"},{name:t("AboutPage.howItWorks.heading"),slug:"how-it-works"},{name:t("AboutPage.mobile.sidebar"),slug:"mobile"},{name:t("AboutPage.highlights.sidebar"),slug:"highlights"},{name:t("AboutPage.contact.heading"),slug:"contact"}];return(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[(0,jsx_runtime.jsx)(script_default(),{id:"freshdesk-widget-init",dangerouslySetInnerHTML:{__html:"\n        window.fwSettings={\n          'widget_id':44000004375,\n          'locale': 'en'\n        };\n        !function(){if(\"function\"!=typeof window.FreshworksWidget){var n=function(){n.q.push(arguments)};n.q=[],window.FreshworksWidget=n}}()\n      "}}),(0,jsx_runtime.jsx)(script_default(),{id:"freshdesk-widget-src",src:"https://widget.freshworks.com/widgets/44000004375.js",async:!0,defer:!0,onLoad:()=>{window.FreshworksWidget("hide","launcher"),setWidgetLoaded(!0)}}),(0,jsx_runtime.jsxs)(AboutLayout.A,{children:[(0,jsx_runtime.jsx)(SharedStyledComponents.HK,{level:"1",size:"1.5rem",children:t("AboutPage.title")}),(0,jsx_runtime.jsx)(SharedStyledComponents.PI,{background:{dark:"dark-3",light:"neutral-6"},children:(0,jsx_runtime.jsx)(DropdownNav.A,{activeSection,sidebarLabel:t("AboutPage.sidebarLabel"),sections:sidebarSections,setActiveSection})}),(0,jsx_runtime.jsxs)(MaxWidthContent.A,{children:[(0,jsx_runtime.jsx)(StyledAboutHeading,{color:{light:"neutral-1",dark:"accent-1"},level:"1",size:"small",children:t("AboutPage.title")}),(0,jsx_runtime.jsx)(HorizontalRuleLogo.A,{})]}),(0,jsx_runtime.jsxs)(SharedStyledComponents.eH,{children:[(0,jsx_runtime.jsx)(Box.a,{as:"aside",align:"center",children:(0,jsx_runtime.jsx)(SharedStyledComponents.qJ,{activeSection,ariaLabel:t("AboutPage.sidebarLabel"),sections:sidebarSections,setActiveSection})}),(0,jsx_runtime.jsxs)("article",{children:[(0,jsx_runtime.jsx)(HeadingForAboutNav.A,{color:{light:"neutral-1",dark:"accent-1"},pad:{top:"40px",bottom:"10px"},sectionIndex:0,sectionName:t("AboutPage.ourMission.heading"),setActiveSection,slug:sidebarSections[0].slug}),(0,jsx_runtime.jsxs)(SubHeading.A,{children:['"',t("AboutPage.ourMission.subheadings.first"),'"']}),(0,jsx_runtime.jsx)(OurMission,{}),(0,jsx_runtime.jsx)(HowItWorks,{setActiveSection}),(0,jsx_runtime.jsxs)(MaxWidthContent.A,{children:[(0,jsx_runtime.jsx)(HeadingForAboutNav.A,{color:{light:"neutral-1",dark:"accent-1"},pad:{top:"30px",bottom:"10px"},sectionIndex:2,sectionName:t("AboutPage.mobile.heading"),setActiveSection,slug:sidebarSections[2].slug}),(0,jsx_runtime.jsx)(SubHeading.A,{children:t("AboutPage.mobile.subheading")}),(0,jsx_runtime.jsx)(Mobile.A,{})]}),(0,jsx_runtime.jsxs)(MaxWidthContent.A,{children:[(0,jsx_runtime.jsx)(HeadingForAboutNav.A,{color:{light:"neutral-1",dark:"accent-1"},pad:{top:"30px",bottom:"10px"},sectionIndex:3,sectionName:t("AboutPage.highlights.heading"),setActiveSection,slug:sidebarSections[3].slug}),(0,jsx_runtime.jsx)(SubHeading.A,{children:t("AboutPage.highlights.subheading")}),(0,jsx_runtime.jsx)(Highlights,{})]}),(0,jsx_runtime.jsxs)(MaxWidthContent.A,{children:[(0,jsx_runtime.jsx)(HeadingForAboutNav.A,{color:{light:"neutral-1",dark:"accent-1"},pad:{top:"30px",bottom:"10px"},sectionIndex:4,sectionName:t("AboutPage.contact.heading"),setActiveSection,slug:sidebarSections[4].slug}),(0,jsx_runtime.jsx)(SubHeading.A,{children:t("AboutPage.contact.subheading")}),(0,jsx_runtime.jsx)(Contact,{widgetLoaded})]})]}),(0,jsx_runtime.jsx)(Box.a,{})]})]})]})}const About=AboutPage;AboutPage.__docgenInfo={description:"",methods:[],displayName:"AboutPage"};const About_stories={title:"About / About",component:About},Default={},__namedExportsOrder=["Default"]}}]);
//# sourceMappingURL=screens-About-About-stories.da3db46b.iframe.bundle.js.map