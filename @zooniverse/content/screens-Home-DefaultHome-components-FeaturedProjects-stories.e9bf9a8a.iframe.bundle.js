"use strict";(self.webpackChunk_zooniverse_content=self.webpackChunk_zooniverse_content||[]).push([[305],{"../../node_modules/grommet/es6/components/Heading/Heading.js"(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{D:()=>Heading});var react=__webpack_require__("../../node_modules/react/index.js"),use_isomorphic_layout_effect=__webpack_require__("../../node_modules/grommet/es6/utils/use-isomorphic-layout-effect.js"),styled_components_browser_esm=__webpack_require__("../../node_modules/styled-components/dist/styled-components.browser.esm.js"),mixins=__webpack_require__("../../node_modules/grommet/es6/utils/mixins.js"),colors=__webpack_require__("../../node_modules/grommet/es6/utils/colors.js"),styles=__webpack_require__("../../node_modules/grommet/es6/utils/styles.js"),console=__webpack_require__("../../node_modules/console-browserify/index.js"),colorStyle=(0,styled_components_browser_esm.css)(["color:",";"],function(props){return(0,colors.$2)(props.colorProp||props.theme.heading.color,props.theme)}),StyledHeading=styled_components_browser_esm.default.h1.withConfig(styles.OY).withConfig({displayName:"StyledHeading",componentId:"sc-1rdh4aw-0"})([""," "," "," "," "," "," ",""],styles.m,function(props){return function fontFamily(props){var font=(props.theme.heading.level[props.level]||{}).font;return font&&font.family?(0,styled_components_browser_esm.css)(["font-family:",";"],font.family):props.theme.heading.font?(0,styled_components_browser_esm.css)(["font-family:",";"],props.theme.heading.font.family):""}(props)},function(props){return function sizeStyle(props){var size=props.size||"medium",headingTheme=props.theme.heading,levelStyle=headingTheme.level[props.level];if(levelStyle){var data=levelStyle[size],styles=[(0,styled_components_browser_esm.css)(["font-size:",";line-height:",";max-width:",";font-weight:",";overflow-wrap:",";"],data?data.size:size,data?data.height:"normal",(props.fillProp?"none":data&&data.maxWidth)||levelStyle.medium.maxWidth,props.weight||levelStyle.font.weight||headingTheme.weight,props.overflowWrap)];if(props.responsive&&headingTheme.responsiveBreakpoint){var breakpoint=props.theme.global.breakpoints[headingTheme.responsiveBreakpoint];if(breakpoint){var responsiveData=headingTheme.level[props.level+1]?headingTheme.level[props.level+1][size]:headingTheme.level[props.level][size];responsiveData&&styles.push((0,mixins.Jj)(breakpoint,"\n            font-size: "+responsiveData.size+";\n            line-height: "+responsiveData.height+";\n            max-width: "+(props.fillProp?"none":responsiveData.maxWidth)+";\n          ",props.responsive))}}return styles}return console.warn("Heading level "+props.level+" is not defined in your theme."),""}(props)},function(props){return props.textAlign&&styles.O8},function(props){return props.truncate&&"\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n"},function(props){return(props.colorProp||props.theme.heading.color)&&colorStyle},function(props){return props.theme.heading&&props.theme.heading.extend});var HeadingPropTypes={},refs=__webpack_require__("../../node_modules/grommet/es6/utils/refs.js"),SkeletonContext=__webpack_require__("../../node_modules/grommet/es6/components/Skeleton/SkeletonContext.js"),Skeleton=__webpack_require__("../../node_modules/grommet/es6/components/Skeleton/Skeleton.js"),useThemeValue=__webpack_require__("../../node_modules/grommet/es6/utils/useThemeValue.js");function HeadingSkeleton_extends(){return HeadingSkeleton_extends=Object.assign?Object.assign.bind():function(n){for(var e=1;e<arguments.length;e++){var t=arguments[e];for(var r in t)({}).hasOwnProperty.call(t,r)&&(n[r]=t[r])}return n},HeadingSkeleton_extends.apply(null,arguments)}var HeadingSkeleton=(0,react.forwardRef)(function(_ref,ref){var _theme$heading$level$,responsiveSize,as=_ref.as,_ref$level=_ref.level,level=void 0===_ref$level?1:_ref$level,_ref$size=_ref.size,size=void 0===_ref$size?"medium":_ref$size,responsive=_ref.responsive,theme=(0,useThemeValue.i)().theme,height=(null==(_theme$heading$level$=theme.heading.level[level])||null==(_theme$heading$level$=_theme$heading$level$[size])?void 0:_theme$heading$level$.height)||size;if(responsive&&theme.heading.responsiveBreakpoint){var _theme$heading$level$2,_theme$heading$level$3,breakpoint=theme.global.breakpoints[theme.heading.responsiveBreakpoint];if(breakpoint)responsiveSize={breakpoint,height:(theme.heading.level[level+1]?null==(_theme$heading$level$2=theme.heading.level[level+1][size])?void 0:_theme$heading$level$2.height:null==(_theme$heading$level$3=theme.heading.level[level][size])?void 0:_theme$heading$level$3.height)||height}}return react.createElement(Skeleton.E,HeadingSkeleton_extends({as,ref,height,responsive,responsiveSize},theme.heading.skeleton))});HeadingSkeleton.displayName="HeadingSkeleton";var ResponsiveContainerContext=__webpack_require__("../../node_modules/grommet/es6/contexts/ResponsiveContainerContext.js"),_excluded=["children","color","fill","level","overflowWrap","responsive","weight"];function Heading_extends(){return Heading_extends=Object.assign?Object.assign.bind():function(n){for(var e=1;e<arguments.length;e++){var t=arguments[e];for(var r in t)({}).hasOwnProperty.call(t,r)&&(n[r]=t[r])}return n},Heading_extends.apply(null,arguments)}var Heading=(0,react.forwardRef)(function(_ref,ref){var children=_ref.children,color=_ref.color,fill=_ref.fill,_ref$level=_ref.level,level=void 0===_ref$level?1:_ref$level,overflowWrapProp=_ref.overflowWrap,_ref$responsive=_ref.responsive,responsiveProp=void 0===_ref$responsive||_ref$responsive,weight=_ref.weight,rest=function _objectWithoutPropertiesLoose(r,e){if(null==r)return{};var t={};for(var n in r)if({}.hasOwnProperty.call(r,n)){if(-1!==e.indexOf(n))continue;t[n]=r[n]}return t}(_ref,_excluded),passThemeFlag=(0,useThemeValue.i)().passThemeFlag,headingRef=(0,refs.N)(ref),_useState=(0,react.useState)(overflowWrapProp||"break-word"),overflowWrap=_useState[0],setOverflowWrap=_useState[1],responsive=(0,react.useContext)(ResponsiveContainerContext.x)&&responsiveProp?"container":responsiveProp,skeleton=(0,SkeletonContext.B)();(0,use_isomorphic_layout_effect.N)(function(){var updateOverflowWrap=function updateOverflowWrap(){var wrap;!overflowWrapProp&&headingRef.current&&(wrap=headingRef.current.scrollWidth>headingRef.current.offsetWidth?"anywhere":"break-word",setOverflowWrap(wrap))};return window.addEventListener("resize",updateOverflowWrap),updateOverflowWrap(),function(){return window.removeEventListener("resize",updateOverflowWrap)}},[headingRef,overflowWrapProp]);var content=children;return skeleton&&(content=react.createElement(HeadingSkeleton,Heading_extends({level,fill,responsive},rest))),react.createElement(StyledHeading,Heading_extends({as:"h"+level,colorProp:color,fillProp:fill,level:+level,overflowWrap,responsive,weight},passThemeFlag,rest,{ref:headingRef}),content)});Heading.displayName="Heading",Heading.propTypes=HeadingPropTypes},"./src/components/HorizontalRuleLogo/HorizontalRuleLogo.jsx"(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/react/jsx-runtime.js"),styled_components__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../node_modules/styled-components/dist/styled-components.browser.esm.js"),grommet__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("../../node_modules/grommet/es6/components/Box/Box.js"),_zooniverse_react_components_ZooniverseLogo__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("../lib-react-components/dist/esm/ZooniverseLogo/ZooniverseLogo.js");let t,t1,t2,t3,t4,t5,t6,t7,t8,t9,t10,_=t=>t;const LeftElement=(0,styled_components__WEBPACK_IMPORTED_MODULE_1__.default)(grommet__WEBPACK_IMPORTED_MODULE_2__.a)(t4||(t4=_`
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
          `),props.theme.global.colors["neutral-1"],props.theme.global.colors["neutral-1"]));function HorizontalRuleLogo(){const{dark,global}=(0,styled_components__WEBPACK_IMPORTED_MODULE_1__.useTheme)();return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(HorizontalRuleLogoContainer,{align:"center",direction:"row",justify:"center",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(LeftElement,{}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_zooniverse_react_components_ZooniverseLogo__WEBPACK_IMPORTED_MODULE_3__.A,{id:"root-about-zooniverse",color:dark?global.colors["accent-1"]:global.colors["neutral-1"],size:"48px"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(RightElement,{})]})}const __WEBPACK_DEFAULT_EXPORT__=HorizontalRuleLogo;HorizontalRuleLogo.__docgenInfo={description:"",methods:[],displayName:"HorizontalRuleLogo"}},"./src/screens/Home/DefaultHome/components/FeaturedProjects.jsx"(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{A:()=>FeaturedProjects});var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/react/jsx-runtime.js"),grommet__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../node_modules/grommet/es6/contexts/ResponsiveContext/ResponsiveContext.js"),grommet__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("../../node_modules/grommet/es6/components/Box/Box.js"),react__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("../../node_modules/react/index.js"),swr__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("../../node_modules/swr/dist/index/index.mjs"),_zooniverse_panoptes_js__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("../lib-panoptes-js/src/index.js"),_zooniverse_react_components__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("../lib-react-components/dist/esm/SpacedHeading/SpacedHeading.js"),_zooniverse_react_components__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__("../lib-react-components/dist/esm/ProjectCard/ProjectCard.js"),react_i18next__WEBPACK_IMPORTED_MODULE_8__=__webpack_require__("../../node_modules/react-i18next/dist/es/index.js"),_components_HorizontalRuleLogo_HorizontalRuleLogo__WEBPACK_IMPORTED_MODULE_9__=__webpack_require__("./src/components/HorizontalRuleLogo/HorizontalRuleLogo.jsx"),console=__webpack_require__("../../node_modules/console-browserify/index.js");const SWROptions={revalidateIfStale:!0,revalidateOnMount:!0,revalidateOnFocus:!0,revalidateOnReconnect:!0,refreshInterval:0},getFeaturedProjects=async()=>{try{const response=await _zooniverse_panoptes_js__WEBPACK_IMPORTED_MODULE_5__.dt.get({query:{featured:!0,launch_approved:!0,cards:!0}});return response.ok?response.body.projects:[]}catch(error){return console.log(error),[]}};function FeaturedProjects(){const{data:featuredProjects,isLoading}=function useFeaturedProjects(){return(0,swr__WEBPACK_IMPORTED_MODULE_4__.Ay)("featured-projects",getFeaturedProjects,SWROptions)}(),{t}=(0,react_i18next__WEBPACK_IMPORTED_MODULE_8__.Bd)(),cardSize="small"===(0,react__WEBPACK_IMPORTED_MODULE_3__.useContext)(grommet__WEBPACK_IMPORTED_MODULE_1__.u)?"medium":"xlarge";return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(grommet__WEBPACK_IMPORTED_MODULE_2__.a,{fill:!0,children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_zooniverse_react_components__WEBPACK_IMPORTED_MODULE_6__.A,{level:2,size:"1.5rem",color:{light:"neutral-1",dark:"accent-1"},textAlign:"center",fill:!0,margin:{bottom:"medium",top:"0"},children:t("Home.DefaultHome.FeaturedProjects.heading")}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_HorizontalRuleLogo_HorizontalRuleLogo__WEBPACK_IMPORTED_MODULE_9__.A,{}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(grommet__WEBPACK_IMPORTED_MODULE_2__.a,{as:"ul",direction:"row",justify:"between",margin:{top:"medium",bottom:"0"},gap:"small",pad:{horizontal:"xxsmall",bottom:"xsmall"},overflow:{horizontal:"auto"},style:{listStyle:"none"},children:(null==featuredProjects?void 0:featuredProjects.length)?featuredProjects.map(project=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_zooniverse_react_components__WEBPACK_IMPORTED_MODULE_7__.A,{description:project.description,displayName:project.display_name,href:`https://www.zooniverse.org/projects/${project.slug}`,imageSrc:project.avatar_src,size:cardSize},project.slug)):(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(grommet__WEBPACK_IMPORTED_MODULE_2__.a,{as:"li",align:"center",fill:!0,children:t("Home.DefaultHome.FeaturedProjects.none")})})]})}FeaturedProjects.__docgenInfo={description:"",methods:[],displayName:"FeaturedProjects"}},"./src/screens/Home/DefaultHome/components/FeaturedProjects.stories.jsx"(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/react/jsx-runtime.js"),grommet__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../node_modules/grommet/es6/components/Box/Box.js"),_FeaturedProjects__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/screens/Home/DefaultHome/components/FeaturedProjects.jsx");const __WEBPACK_DEFAULT_EXPORT__={title:"Home  / FeaturedProjects",component:_FeaturedProjects__WEBPACK_IMPORTED_MODULE_2__.A},Default=()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(grommet__WEBPACK_IMPORTED_MODULE_1__.a,{pad:{horizontal:"medium"},children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_FeaturedProjects__WEBPACK_IMPORTED_MODULE_2__.A,{})}),__namedExportsOrder=["Default"]}}]);
//# sourceMappingURL=screens-Home-DefaultHome-components-FeaturedProjects-stories.e9bf9a8a.iframe.bundle.js.map