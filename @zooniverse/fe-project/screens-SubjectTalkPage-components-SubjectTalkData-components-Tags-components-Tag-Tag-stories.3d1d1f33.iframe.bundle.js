"use strict";(self.webpackChunk_zooniverse_fe_project=self.webpackChunk_zooniverse_fe_project||[]).push([[220],{"./src/screens/SubjectTalkPage/components/SubjectTalkData/components/Tags/components/Tag/Tag.jsx"(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/react/jsx-runtime.js"),grommet__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../node_modules/grommet/es6/components/Button/Button.js"),grommet__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("../../node_modules/grommet/es6/components/Text/Text.js"),grommet__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("../../node_modules/grommet/es6/components/Box/Box.js"),grommet__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("../../node_modules/grommet/es6/components/Tip/Tip.js"),next_i18next__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("../../node_modules/react-i18next/dist/es/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("../../node_modules/prop-types/index.js"),styled_components__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__("../../node_modules/styled-components/dist/styled-components.browser.esm.js");let t,t1,t2,t3,_=t=>t;const StyledButton=(0,styled_components__WEBPACK_IMPORTED_MODULE_7__.default)(grommet__WEBPACK_IMPORTED_MODULE_1__.$)(t||(t=_`
  background: ${0};
  border: none;
  border-radius: 32px;
  box-shadow: 1px 1px 4px 0 rgba(0, 0, 0, 0.25);
  color: ${0};
  width: fit-content;


  &:disabled {
    cursor: not-allowed;
    opacity: 1;
  }

  &:hover:not(:disabled),
  &:focus:not(:disabled) {
    background: ${0};
    border: none;
    box-shadow: 1px 1px 4px 0 rgba(0, 0, 0, 0.25);
    color: ${0};
    padding: 14px 15px;
  }
`),props=>props.$userVoted?"linear-gradient(180deg, #4D2A8E 0%, #3C2F53 100%);":props.theme.dark?props.theme.global.colors["dark-4"]:props.theme.global.colors["neutral-6"],props=>props.$userVoted||props.theme.dark?props.theme.global.colors["neutral-6"]:props.theme.global.colors["dark-3"],props=>props.$userVoted?"linear-gradient(180deg, #4D2A8E 0%, #3C2F53 100%);":"#E0D4F6",props=>props.$userVoted?props.theme.global.colors["neutral-6"]:props.theme.global.colors["dark-3"]),StyledText=(0,styled_components__WEBPACK_IMPORTED_MODULE_7__.default)(grommet__WEBPACK_IMPORTED_MODULE_2__.E)(t1||(t1=_`
  display: none;
  min-width: 10px;

  ${0}:hover:not(:disabled) &,
  ${0}:focus:not(:disabled) & {
    display: inline-block;
    margin-left: 10px;
  }
`),StyledButton,StyledButton),StyledVoteCount=(0,styled_components__WEBPACK_IMPORTED_MODULE_7__.default)(grommet__WEBPACK_IMPORTED_MODULE_2__.E)(t2||(t2=_`
  display: inline-block;
  margin-left: 10px;
  min-width: 10px;

  ${0}:hover:not(:disabled) &,
  ${0}:focus:not(:disabled) & {
    display: none;
  }
`),StyledButton,StyledButton),HoverContent=(0,styled_components__WEBPACK_IMPORTED_MODULE_7__.default)(grommet__WEBPACK_IMPORTED_MODULE_3__.a)(t3||(t3=_`
  // When hover is not supported, such as a touchscreen
  display: none;

  @media (hover: hover) {
    /* when hover is supported */
    display: flex;
  }
`)),TipContent=({message=""})=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(HoverContent,{direction:"row",align:"center",width:"100%",animation:{type:"fadeIn"},children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(grommet__WEBPACK_IMPORTED_MODULE_3__.a,{background:"dark-4",round:"5px",pad:"5px",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(grommet__WEBPACK_IMPORTED_MODULE_2__.E,{children:message})})}),DEFAULT_HANDLER=()=>!0;function Tag({disabled=!1,onClick=DEFAULT_HANDLER,tag}){const{t}=(0,next_i18next__WEBPACK_IMPORTED_MODULE_5__.Bd)("screens"),message=tag.userVoted?t("Talk.Tags.removeVote"):t("Talk.Tags.addVote"),padHorizontal=tag.vote_count>0?"15px":"25px";return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(grommet__WEBPACK_IMPORTED_MODULE_4__.Y,{content:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(TipContent,{message}),plain:!0,dropProps:{align:{bottom:"top"}},children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(StyledButton,{align:"center",disabled,gap:"xsmall",justify:"center",label:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(grommet__WEBPACK_IMPORTED_MODULE_2__.E,{size:"1rem",weight:500,children:tag.name}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(StyledText,{size:"1rem",weight:"bold",children:tag.userVoted?"x":"+"}),tag.vote_count?(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(StyledVoteCount,{size:"1rem",weight:"bold",children:tag.vote_count}):null]}),onClick:function handleClick(){onClick(tag)},pad:{horizontal:padHorizontal,vertical:"14px"},$userVoted:tag.userVoted})})}Tag.propTypes={disabled:prop_types__WEBPACK_IMPORTED_MODULE_6__.bool,onClick:prop_types__WEBPACK_IMPORTED_MODULE_6__.func,tag:(0,prop_types__WEBPACK_IMPORTED_MODULE_6__.shape)({id:prop_types__WEBPACK_IMPORTED_MODULE_6__.string,name:prop_types__WEBPACK_IMPORTED_MODULE_6__.string}).isRequired};const __WEBPACK_DEFAULT_EXPORT__=Tag;Tag.__docgenInfo={description:"",methods:[],displayName:"Tag",props:{disabled:{defaultValue:{value:"false",computed:!1},description:"",type:{name:"custom",raw:"bool"},required:!1},onClick:{defaultValue:{value:"() => true",computed:!1},description:"",type:{name:"custom",raw:"func"},required:!1},tag:{description:"",type:{name:"shape",value:{id:{name:"string",required:!1},name:{name:"string",required:!1}}},required:!0}}}},"./src/screens/SubjectTalkPage/components/SubjectTalkData/components/Tags/components/Tag/Tag.stories.jsx"(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,Disabled:()=>Disabled,DisabledUserVoted:()=>DisabledUserVoted,UserVoted:()=>UserVoted,WithVoteCount:()=>WithVoteCount,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/react/jsx-runtime.js"),grommet__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../node_modules/grommet/es6/components/Box/Box.js");const __WEBPACK_DEFAULT_EXPORT__={title:"Project App / Screens / Subject Talk / Talk Data / Tag",component:__webpack_require__("./src/screens/SubjectTalkPage/components/SubjectTalkData/components/Tags/components/Tag/Tag.jsx").A,decorators:[Story=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(grommet__WEBPACK_IMPORTED_MODULE_1__.a,{pad:"large",background:{dark:"dark-3",light:"white"},children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(Story,{})})]},Default={args:{tag:{id:"1",name:"blue_jay"}}},WithVoteCount={args:{tag:{id:"1",name:"blue_jay",vote_count:3}}},UserVoted={args:{tag:{id:"1",name:"blue_jay",userVoted:!0,vote_count:5}}},Disabled={args:{disabled:!0,tag:{id:"1",name:"blue_jay",vote_count:2}}},DisabledUserVoted={args:{disabled:!0,tag:{id:"1",name:"blue_jay",userVoted:!0,vote_count:2}}},__namedExportsOrder=["Default","WithVoteCount","UserVoted","Disabled","DisabledUserVoted"]}}]);
//# sourceMappingURL=screens-SubjectTalkPage-components-SubjectTalkData-components-Tags-components-Tag-Tag-stories.3d1d1f33.iframe.bundle.js.map