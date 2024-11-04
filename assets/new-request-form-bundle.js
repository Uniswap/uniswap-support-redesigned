<<<<<<< HEAD
import{j as e,F as n,S as t,H as s,I as r,M as a,r as o,u as i,a as l,N as u,T as c,C as d,s as m,L as f,b as h,d as p,e as j,O as g,f as b,h as x,i as w,k as v,l as q,p as y,m as k,n as _,o as C,P as S,A as I,q as T,t as F,v as P,D as R,w as L,K as $,x as E,y as D,z as M,B as V,E as A,G as N,$ as z,J as G,Q as H,R as X,U as O,V as U,W as B,X as W,Y as K,Z as Y,_ as J,a0 as Z,a1 as Q,a2 as ee,a3 as ne,a4 as te,a5 as se,a6 as re,a7 as ae,a8 as oe,a9 as ie}from"shared";function le({field:o,onChange:i}){const{label:l,error:u,value:c,name:d,required:m,description:f,type:h}=o,p={},j="integer"===h||"decimal"===h?"number":"text";"integer"===h&&(p.step="1"),"decimal"===h&&(p.step="any");const g="anonymous_requester_email"===h?"email":void 0;return e.jsxs(n,{children:[e.jsxs("div",{children:[l,m&&e.jsx(t,{"aria-hidden":"true",children:"*"})]}),f&&e.jsx(s,{dangerouslySetInnerHTML:{__html:f}}),e.jsx(r,{name:d,type:j,defaultValue:c,validation:u?"error":void 0,required:m,onChange:e=>{i&&i(e.target.value)},autoComplete:g,...p}),u&&e.jsx(a,{validation:"error",children:u})]})}const ue=m(a)`
=======
import {
  j as jsxRuntimeExports,
  F as Field,
  S as Span,
  H as Hint,
  I as Input$1,
  M as Message,
  r as reactExports,
  u as useToast,
  a as useTranslation,
  N as Notification,
  T as Title,
  C as Close,
  s as styled,
  L as Label,
  b as Textarea,
  d as Field$1,
  e as Combobox,
  O as Option,
  f as Message$1,
  h as Hint$1,
  i as Checkbox$1,
  k as Label$1,
  l as OptGroup,
  p as purify,
  m as FileList,
  n as File,
  o as Tooltip,
  P as Progress,
  A as Anchor,
  q as mime,
  t as useDropzone,
  v as FileUpload,
  D as Datepicker,
  w as useGrid,
  K as KEYS,
  x as focusStyles,
  y as FauxInput,
  z as Tag,
  B as SvgAlertWarningStroke,
  E as MediaInput,
  G as SvgCreditCardStroke,
  $ as $e,
  J as getColorV8,
  Q as Header,
  R as SvgCheckCircleStroke,
  U as useModalContainer,
  V as Modal,
  W as Body,
  X as Accordion,
  Y as Paragraph,
  Z as Footer$1,
  _ as FooterItem,
  a0 as Button,
  a1 as Close$1,
  a2 as addFlashNotification,
  a3 as debounce,
  a4 as Alert,
  a5 as initI18next,
  a6 as loadTranslations,
  a7 as reactDomExports,
  a8 as ThemeProviders,
  a9 as createTheme,
} from "shared";

function Input({ field, onChange }) {
  const { label, error, value, name, required, description, type } = field;
  const stepProp = {};
  const inputType =
    type === "integer" || type === "decimal" ? "number" : "text";
  if (type === "integer") stepProp.step = "1";
  if (type === "decimal") stepProp.step = "any";
  const autocomplete =
    type === "anonymous_requester_email" ? "email" : undefined;
  return jsxRuntimeExports.jsxs(Field, {
    children: [
      jsxRuntimeExports.jsxs("div", {
        children: [
          label,
          required &&
            jsxRuntimeExports.jsx(Span, {
              "aria-hidden": "true",
              children: "*",
            }),
        ],
      }),
      description &&
        jsxRuntimeExports.jsx(Hint, {
          dangerouslySetInnerHTML: { __html: description },
        }),
      jsxRuntimeExports.jsx(Input$1, {
        name: name,
        type: inputType,
        defaultValue: value,
        validation: error ? "error" : undefined,
        required: required,
        onChange: (e) => {
          onChange && onChange(e.target.value);
        },
        autoComplete: autocomplete,
        ...stepProp,
      }),
      error &&
        jsxRuntimeExports.jsx(Message, {
          validation: "error",
          children: error,
        }),
    ],
  });
}

function useWysiwyg({
  hasWysiwyg,
  baseLocale,
  hasAtMentions,
  userRole,
  brandId,
}) {
  const isInitializedRef = reactExports.useRef(false);
  const { addToast } = useToast();
  const { t } = useTranslation();
  return reactExports.useCallback(
    async (ref) => {
      if (hasWysiwyg && ref && !isInitializedRef.current) {
        isInitializedRef.current = true;
        const { createEditor } = await import("wysiwyg").then(function (n) {
          return n.m;
        });
        const editor = await createEditor(ref, {
          editorType: "supportRequests",
          hasAtMentions,
          userRole,
          brandId,
          baseLocale,
        });
        const notifications = editor.plugins.get("Notification");
        // Handle generic notifications and errors with "toast" notifications
        notifications.on("show", (event, data) => {
          event.stop(); // Prevent the default notification from being shown via window.alert
          const message =
            data.message instanceof Error ? data.message.message : data.message;
          const { type, title } = data;
          addToast(({ close }) =>
            jsxRuntimeExports.jsxs(Notification, {
              type: type,
              children: [
                jsxRuntimeExports.jsx(Title, { children: title }),
                message,
                jsxRuntimeExports.jsx(Close, {
                  "aria-label": t("new-request-form.close-label", "Close"),
                  onClick: close,
                }),
              ],
            })
          );
        });
      }
    },
    [hasWysiwyg, baseLocale, hasAtMentions, userRole, brandId, addToast, t]
  );
}

const StyledMessage = styled(Message)`
>>>>>>> e0a3a53 (apply prettier)
  .ck.ck-editor + & {
    margin-top: ${e=>e.theme.space.xs};
  }
<<<<<<< HEAD
`;function ce({field:n,hasWysiwyg:r,baseLocale:a,hasAtMentions:m,userRole:p,brandId:j,onChange:g}){const{label:b,error:x,value:w,name:v,required:q,description:y}=n,k=function({hasWysiwyg:n,baseLocale:t,hasAtMentions:s,userRole:r,brandId:a}){const m=o.useRef(!1),{addToast:f}=i(),{t:h}=l();return o.useCallback((async o=>{if(n&&o&&!m.current){m.current=!0;const{createEditor:n}=await import("wysiwyg").then((function(e){return e.m}));(await n(o,{editorType:"supportRequests",hasAtMentions:s,userRole:r,brandId:a,baseLocale:t})).plugins.get("Notification").on("show",((n,t)=>{n.stop();const s=t.message instanceof Error?t.message.message:t.message,{type:r,title:a}=t;f((({close:n})=>e.jsxs(u,{type:r,children:[e.jsx(c,{children:a}),s,e.jsx(d,{"aria-label":h("new-request-form.close-label","Close"),onClick:n})]})))}))}}),[n,t,s,r,a,f,h])}({hasWysiwyg:r,baseLocale:a,hasAtMentions:m,userRole:p,brandId:j});return e.jsxs("div",{className:"custom-form-field-layout",children:[e.jsxs(f,{className:"custom-title",children:[b,q&&e.jsx(t,{"aria-hidden":"true",children:"*"})]}),e.jsx(h,{ref:k,name:v,defaultValue:w&&""!==w?w:"Describe your issue.",validation:x?"error":void 0,required:q,onChange:e=>g(e.target.value),rows:6,isResizable:!0}),x&&e.jsx(ue,{validation:"error",children:x}),y&&e.jsx(s,{className:"custom-hint",dangerouslySetInnerHTML:{__html:y}})]})}function de(){const{t:n}=l();return e.jsxs(e.Fragment,{children:[e.jsx(t,{"aria-hidden":"true",children:"-"}),e.jsx(t,{hidden:!0,children:n("new-request-form.dropdown.empty-option","Select an option")})]})}function me({field:n,onChange:t}){const{label:s,options:r,error:a,value:i,name:l,required:u,description:c}=n,d=null==i?"":i.toString(),m=o.useRef(null);return o.useEffect((()=>{if(m.current&&u){const e=m.current.querySelector("[role=combobox]");e?.setAttribute("aria-required","true")}}),[m,u]),e.jsxs(p,{className:"custom-form-field-layout",children:[e.jsxs(j,{ref:m,inputProps:{name:l,required:u},isEditable:!1,validation:a?"error":void 0,inputValue:d,selectionValue:d,renderValue:({selection:n})=>n?.label||e.jsx(de,{}),onChange:({selectionValue:e})=>{void 0!==e&&t(e)},children:[!u&&e.jsx(g,{value:"",label:"-",children:e.jsx(de,{})}),r.map((n=>e.jsx(g,{value:n.value.toString(),label:n.name},n.value)))]}),a&&e.jsx(b,{validation:"error",children:a}),c&&e.jsx(x,{dangerouslySetInnerHTML:{__html:c}})]})}function fe({field:r,onChange:i}){const{label:l,error:u,value:c,name:d,required:m,description:h}=r,[p,j]=o.useState(c);return e.jsxs(n,{children:[e.jsx("input",{type:"hidden",name:d,value:"off"}),e.jsxs(w,{name:d,required:m,defaultChecked:c,value:p?"on":"off",onChange:e=>{const{checked:n}=e.target;j(n),i(n)},children:[e.jsxs(f,{children:[l,m&&e.jsx(t,{"aria-hidden":"true",children:"*"})]}),h&&e.jsx(s,{dangerouslySetInnerHTML:{__html:h}})]}),u&&e.jsx(a,{validation:"error",children:u})]})}const he="[]";function pe(e){return`[${e.join("::")}]`}function je(e){return e.startsWith("[")&&e.endsWith("]")}function ge(e){const n=pe(e.slice(0,-1));return{type:"SubGroup",name:e[e.length-1],backOption:{type:"previous",label:"Back",value:n},options:[]}}function be({options:e,hasEmptyOption:n}){const t=o.useMemo((()=>function(e,n){const t={[he]:{type:"RootGroup",options:n?[{label:"-",value:""}]:[]}};return e.forEach((e=>{const{name:n,value:s}=e;if(n.includes("::")){const[e,r]=function(e){const n=e.split("::");return[n.slice(0,-1),n.slice(-1)[0]]}(n),a=pe(e);t[a]||(t[a]=ge(e)),t[a]?.options.push({value:s,label:n.split("::").join(" > "),menuLabel:r});for(let n=0;n<e.length;n++){const s=e.slice(0,n),r=e.slice(0,n+1),a=pe(s),o=pe(r);t[a]||(t[a]=ge(s)),void 0===t[a]?.options.find((e=>e.value===o))&&t[a]?.options.push({type:"next",label:r[r.length-1],value:o})}}else t[he].options.push({value:s,label:n})})),t}(e,n)),[e,n]),[s,r]=o.useState(function(e){const n={type:"RootGroup",options:[]};return Object.values(e).forEach((({options:e})=>{n.options.push(...e.filter((({type:e})=>void 0===e)))})),n}(t));o.useEffect((()=>{r(t[he])}),[t]);return{currentGroup:s,isGroupIdentifier:je,setCurrentGroupByIdentifier:e=>{const n=t[e];n&&r(n)}}}function xe({field:n}){const{label:s,options:r,error:a,value:i,name:l,required:u,description:c}=n,{currentGroup:d,isGroupIdentifier:m,setCurrentGroupByIdentifier:f}=be({options:r,hasEmptyOption:!1}),[h,w]=o.useState(i||[]),y=o.useRef(null);o.useEffect((()=>{if(y.current&&u){const e=y.current.querySelector("[role=combobox]");e?.setAttribute("aria-required","true")}}),[y,u]);return e.jsxs(p,{children:[h.map((n=>e.jsx("input",{type:"hidden",name:`${l}[]`,value:n},n))),e.jsxs(v,{children:[s,u&&e.jsx(t,{"aria-hidden":"true",children:"*"})]}),c&&e.jsx(x,{dangerouslySetInnerHTML:{__html:c}}),e.jsxs(j,{ref:y,isMultiselectable:!0,inputProps:{required:u},isEditable:!1,validation:a?"error":void 0,onChange:e=>{if(Array.isArray(e.selectionValue)){const n=e.selectionValue.slice(-1).toString();m(n)?f(n):w(e.selectionValue)}},selectionValue:h,maxHeight:"auto",children:["SubGroup"===d.type&&e.jsx(g,{...d.backOption}),"SubGroup"===d.type?e.jsx(q,{"aria-label":d.name,children:d.options.map((n=>e.jsx(g,{...n,children:n.menuLabel??n.label},n.value)))}):d.options.map((n=>e.jsx(g,{...n},n.value)))]}),a&&e.jsx(b,{validation:"error",children:a})]})}const we="return-focus-to-ticket-form-field";function ve({field:n,newRequestPath:t}){const s=o.createRef();return o.useEffect((()=>{sessionStorage.getItem(we)&&(sessionStorage.removeItem(we),s.current?.firstChild?.focus())}),[]),e.jsxs(e.Fragment,{children:[e.jsx("input",{type:"hidden",name:n.name,value:n.value}),n.options.length>1&&e.jsxs(p,{children:[e.jsx(v,{children:n.label}),e.jsx(j,{isEditable:!1,onChange:({selectionValue:e})=>{if(e&&"number"==typeof e){const n=new URL(window.location.href);n.searchParams.set("ticket_form_id",e),sessionStorage.setItem(we,"true"),window.location.assign(`${t}${n.search}`)}},ref:s,children:n.options.map((t=>e.jsx(g,{value:t.value,label:t.name,isSelected:n.value===t.value,children:t.name},t.value)))})]})]})}function qe({field:n}){const{value:t,name:s}=n;return e.jsx("input",{type:"hidden",name:s,value:t})}function ye(e){const n=o.useRef(!1),t=o.useRef(!1);return{formRefCallback:o.useCallback((s=>{s&&!n.current&&(n.current=!0,s.submit=async()=>{if(!1===t.current){t.current=!0;const n=await async function(){const e=await fetch("/api/v2/help_center/sessions.json"),{current_session:n}=await e.json();return n.csrf_token}(),r=document.createElement("input");r.type="hidden",r.name="authenticity_token",r.value=n,s.appendChild(r);const a=e.filter((e=>"partialcreditcard"===e.type));for(const e of a){const n=s.querySelector(`input[name="${e.name}"]`);n&&n instanceof HTMLInputElement&&4===n.value.length&&(n.value=`XXXXXXXXX${n.value}`)}HTMLFormElement.prototype.submit.call(s)}})}),[e]),handleSubmit:e=>{e.preventDefault(),e.target.submit()}}}const ke=["true","false"],_e=["pre","strong","b","p","blockquote","ul","ol","li","h2","h3","h4","i","em","br"];function Ce(e,n){if(!Number.isNaN(Number(e))){const t=`request[custom_fields][${e}]`;return n.ticketFields.find((e=>e.name===t))}switch(e){case"anonymous_requester_email":return n.emailField;case"due_at":return n.dueDateField;case"collaborators":return n.ccField;case"organization_id":return n.organizationField;default:return n.ticketFields.find((n=>n.name===`request[${e}]`))}}function Se({ticketFields:e,ccField:n,dueDateField:t,emailField:s,organizationField:r}){return o.useMemo((()=>function(e){const{href:n}=location,t=new URL(n).searchParams,s={...e,ticketFields:[...e.ticketFields]};if(n.length>2048)return e;if(t.get("parent_id"))return e;for(const[e,n]of t){if(!e.startsWith("tf_"))continue;const t=Ce(e.substring(3),s);if(!t)continue;const r=y.sanitize(n,{ALLOWED_TAGS:_e});switch(t.type){case"partialcreditcard":continue;case"multiselect":t.value=r.split(",").filter((e=>t.options.some((n=>n.value===e))));break;case"checkbox":ke.includes(r)&&(t.value="true"===r?"on":"false"===r?"off":"");break;default:t.value=r}}return s}({ticketFields:e,ccField:n,dueDateField:t,emailField:s,organizationField:r})),[e,n,t,s,r])}const Ie=m.div`
  flex: 1;
`;function Te({file:n,onRemove:t}){const{t:s}=l(),r=e=>{"Enter"!==e.code&&"Space"!==e.code&&"Delete"!==e.code&&"Backspace"!==e.code||(e.preventDefault(),t())},a="pending"===n.status?n.file_name:n.value.file_name,o=s("new-request-form.attachments.stop-upload","Stop upload"),i=s("new-request-form.attachments.remove-file","Remove file");return e.jsx(k.Item,{children:e.jsx(_,{type:"generic",title:a,onKeyDown:e=>{"Delete"!==e.code&&"Backspace"!==e.code||(e.preventDefault(),t())},children:"pending"===n.status?e.jsxs(e.Fragment,{children:[e.jsx(Ie,{children:a}),e.jsx(C,{content:o,children:e.jsx(_.Close,{"aria-label":o,onClick:()=>{t()},onKeyDown:r})}),e.jsx(S,{value:n.progress,"aria-label":s("new-request-form.attachments.uploading","Uploading {{fileName}}",{fileName:a})})]}):e.jsxs(e.Fragment,{children:[e.jsx(Ie,{children:e.jsx(I,{isExternal:!0,href:n.value.url,target:"_blank",children:a})}),e.jsx(C,{content:i,children:e.jsx(_.Delete,{"aria-label":i,onClick:()=>{t()},onKeyDown:r})}),e.jsx(S,{value:100,"aria-hidden":"true"})]})})})}async function Fe(){const e=await fetch("/api/v2/users/me.json"),{user:{authenticity_token:n}}=await e.json();return n}function Pe({field:n}){const{label:t,error:s,name:m,attachments:h}=n,{files:p,addPendingFile:j,setPendingFileProgress:g,setUploaded:b,removePendingFile:x,removeUploadedFile:w}=function(e){const[n,t]=o.useState(e);return{files:n,addPendingFile:o.useCallback(((e,n,s)=>{t((t=>[...t,{status:"pending",id:e,file_name:n,progress:0,xhr:s}]))}),[]),setPendingFileProgress:o.useCallback(((e,n)=>{t((t=>t.map((t=>"pending"===t.status&&t.id===e?{...t,progress:n}:t))))}),[]),removePendingFile:o.useCallback((e=>{t((n=>n.filter((n=>"pending"!==n.status||n.id!==e))))}),[]),removeUploadedFile:o.useCallback((e=>{t((n=>n.filter((n=>"uploaded"!==n.status||n.value.id!==e))))}),[]),setUploaded:o.useCallback(((e,n)=>{t((t=>t.map((t=>"pending"===t.status&&t.id===e?{status:"uploaded",value:n}:t))))}),[])}}(h.map((e=>({status:"uploaded",value:e})))??[]),{addToast:v}=i(),{t:q}=l(),y=o.useCallback((n=>{v((({close:t})=>e.jsxs(u,{type:"error",children:[e.jsx(c,{children:q("new-request-form.attachments.upload-error-title","Upload error")}),q("new-request-form.attachments.upload-error-description","There was an error uploading {{fileName}}. Try again or upload another file.",{fileName:n}),e.jsx(d,{"aria-label":q("new-request-form.close-label","Close"),onClick:t})]})))}),[v,q]),k=o.useCallback((async e=>{const n=await Fe();for(const t of e){const e=new XMLHttpRequest,s=new URL(`${window.location.origin}/api/v2/uploads.json`);if(s.searchParams.append("filename",t.name),e.open("POST",s),t.type)e.setRequestHeader("Content-Type",t.type);else{const n=T.getType(t.name);e.setRequestHeader("Content-Type",n||"application/octet-stream")}e.setRequestHeader("X-CSRF-Token",n),e.responseType="json";const r=crypto.randomUUID();j(r,t.name,e),e.upload.addEventListener("progress",(({loaded:e,total:n})=>{const t=Math.round(e/n*100);t<=90&&g(r,t)})),e.addEventListener("load",(()=>{if(e.status>=200&&e.status<300){const{upload:{attachment:{file_name:n,content_url:t},token:s}}=e.response;b(r,{id:s,file_name:n,url:t})}else y(t.name),x(r)})),e.addEventListener("error",(()=>{y(t.name),x(r)})),e.send(t)}}),[j,x,g,b,y]),{getRootProps:_,getInputProps:C,isDragActive:S}=F({onDrop:k});return e.jsxs("div",{className:"custom-form-field-layout",children:[e.jsx(f,{className:"custom-title",children:t}),s&&e.jsx(a,{validation:"error",children:s}),e.jsxs(P,{..._(),isDragging:S,className:"!border-0 !bg-light-surface-3 dark:!bg-light-surface-3",children:[S?e.jsx("span",{children:q("new-request-form.attachments.drop-files-label","Drop files here")}):e.jsx("span",{className:"label-2 !text-light-neutral-1 dark:!text-dark-neutral-1",children:q("new-request-form.attachments.choose-file-label","Add file or drop files here")}),e.jsx(r,{...C()})]}),p.map((n=>e.jsx(Te,{file:n,onRemove:()=>{(async e=>{if("pending"===e.status)e.xhr.abort(),x(e.id);else{const n=await Fe(),t=e.value.id;w(e.value.id),await fetch(`/api/v2/uploads/${t}.json`,{method:"DELETE",headers:{"X-CSRF-Token":n}})}})(n)}},"pending"===n.status?n.id:n.value.id))),p.map((n=>"uploaded"===n.status&&e.jsx("input",{type:"hidden",name:m,value:JSON.stringify(n.value)},n.value.id)))]})}function Re(e,n){return n.filter((n=>n.child_fields.some((n=>n.id===e))))}function Le(e,n,t){return e.filter((e=>{const s=t.find((n=>n.id===e.parent_field_id));if(!s)return!1;const r=Re(s.id,n);return s.value===e.value&&(0===r.length||Le(r,n,t).length>0)}))}function $e(e,n){return 0===n.length?e:e.reduce(((t,s)=>{const r=Re(s.id,n);if(0===r.length)return[...t,s];const a=Le(r,n,e);return a.length>0?[...t,{...s,required:a.some((e=>e.child_fields.some((e=>e.id==s.id&&e.is_required))))}]:t}),[])}function Ee({field:i,locale:l,valueFormat:u,onChange:c}){const{label:d,error:m,value:h,name:p,required:j,description:g}=i,[b,x]=o.useState(h?new Date(h):void 0),w=e=>{if(void 0===e)return"";const n=e.toISOString();return"dateTime"===u?n:n.split("T")[0]};return e.jsxs(n,{children:[e.jsxs(f,{children:[d,j&&e.jsx(t,{"aria-hidden":"true",children:"*"})]}),g&&e.jsx(s,{dangerouslySetInnerHTML:{__html:g}}),e.jsx(R,{value:b,onChange:e=>{const n=new Date(Date.UTC(e.getFullYear(),e.getMonth(),e.getDate(),12,0,0));x(n);const t=w(n);void 0!==t&&c(t)},locale:l,children:e.jsx(r,{required:j,lang:l,onChange:e=>{""===e.target.value&&(x(void 0),c(""))},validation:m?"error":void 0})}),m&&e.jsx(a,{validation:"error",children:m}),e.jsx("input",{type:"hidden",name:p,value:w(b)})]})}const De=/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,Me=m(D)`
  padding: ${e=>`${e.theme.space.xxs} ${e.theme.space.sm}`};
=======
`;
function TextArea({
  field,
  hasWysiwyg,
  baseLocale,
  hasAtMentions,
  userRole,
  brandId,
  onChange,
}) {
  const { label, error, value, name, required, description } = field;
  const ref = useWysiwyg({
    hasWysiwyg,
    baseLocale,
    hasAtMentions,
    userRole,
    brandId,
  });
  return jsxRuntimeExports.jsxs("div", {
    className: "custom-form-field-layout",
    children: [
      jsxRuntimeExports.jsxs(Label, {
        className: "custom-title",
        children: [
          label,
          required &&
            jsxRuntimeExports.jsx(Span, {
              "aria-hidden": "true",
              children: "*",
            }),
        ],
      }),
      jsxRuntimeExports.jsx(Textarea, {
        ref: ref,
        name: name,
        defaultValue: value && value !== "" ? value : "Describe your issue.",
        validation: error ? "error" : undefined,
        required: required,
        onChange: (e) => onChange(e.target.value),
        rows: 6,
        isResizable: true,
      }),
      error &&
        jsxRuntimeExports.jsx(StyledMessage, {
          validation: "error",
          children: error,
        }),
      description &&
        jsxRuntimeExports.jsx(Hint, {
          className: "custom-hint",
          dangerouslySetInnerHTML: { __html: description },
        }),
    ],
  });
}

function EmptyValueOption() {
  const { t } = useTranslation();
  return jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, {
    children: [
      jsxRuntimeExports.jsx(Span, { "aria-hidden": "true", children: "-" }),
      jsxRuntimeExports.jsx(Span, {
        hidden: true,
        children: t(
          "new-request-form.dropdown.empty-option",
          "Select an option"
        ),
      }),
    ],
  });
}

function DropDown({ field, onChange }) {
  const { label, options, error, value, name, required, description } = field;
  const selectionValue = value == null ? "" : value.toString();
  const wrapperRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    if (wrapperRef.current && required) {
      const combobox = wrapperRef.current.querySelector("[role=combobox]");
      combobox?.setAttribute("aria-required", "true");
    }
  }, [wrapperRef, required]);
  return jsxRuntimeExports.jsxs(Field$1, {
    className: "custom-form-field-layout",
    children: [
      jsxRuntimeExports.jsxs(Combobox, {
        ref: wrapperRef,
        inputProps: { name, required },
        isEditable: false,
        validation: error ? "error" : undefined,
        inputValue: selectionValue,
        selectionValue: selectionValue,
        renderValue: ({ selection }) =>
          selection?.label || jsxRuntimeExports.jsx(EmptyValueOption, {}),
        onChange: ({ selectionValue }) => {
          if (selectionValue !== undefined) {
            onChange(selectionValue);
          }
        },
        children: [
          !required &&
            jsxRuntimeExports.jsx(Option, {
              value: "",
              label: "-",
              children: jsxRuntimeExports.jsx(EmptyValueOption, {}),
            }),
          options.map((option) =>
            jsxRuntimeExports.jsx(
              Option,
              { value: option.value.toString(), label: option.name },
              option.value
            )
          ),
        ],
      }),
      error &&
        jsxRuntimeExports.jsx(Message$1, {
          validation: "error",
          children: error,
        }),
      description &&
        jsxRuntimeExports.jsx(Hint$1, {
          dangerouslySetInnerHTML: { __html: description },
        }),
    ],
  });
}

function Checkbox({ field, onChange }) {
  const { label, error, value, name, required, description } = field;
  const [checkboxValue, setCheckboxValue] = reactExports.useState(value);
  const handleChange = (e) => {
    const { checked } = e.target;
    setCheckboxValue(checked);
    onChange(checked);
  };
  return jsxRuntimeExports.jsxs(Field, {
    children: [
      jsxRuntimeExports.jsx("input", {
        type: "hidden",
        name: name,
        value: "off",
      }),
      jsxRuntimeExports.jsxs(Checkbox$1, {
        name: name,
        required: required,
        defaultChecked: value,
        value: checkboxValue ? "on" : "off",
        onChange: handleChange,
        children: [
          jsxRuntimeExports.jsxs(Label, {
            children: [
              label,
              required &&
                jsxRuntimeExports.jsx(Span, {
                  "aria-hidden": "true",
                  children: "*",
                }),
            ],
          }),
          description &&
            jsxRuntimeExports.jsx(Hint, {
              dangerouslySetInnerHTML: { __html: description },
            }),
        ],
      }),
      error &&
        jsxRuntimeExports.jsx(Message, {
          validation: "error",
          children: error,
        }),
    ],
  });
}

/**
 * The root group is identified by an empty string, to avoid possible clashes with a level with
 * a "Root" name.
 */
const ROOT_GROUP_IDENTIFIER = "[]";
function getGroupIdentifier(names) {
  return `[${names.join("::")}]`;
}
function isGroupIdentifier(name) {
  return name.startsWith("[") && name.endsWith("]");
}
function getGroupAndOptionNames(input) {
  const namesList = input.split("::");
  return [namesList.slice(0, -1), namesList.slice(-1)[0]];
}
function buildSubGroupOptions(groupNames) {
  const parentGroupNames = groupNames.slice(0, -1);
  const parentGroupIdentifier = getGroupIdentifier(parentGroupNames);
  const name = groupNames[groupNames.length - 1];
  return {
    type: "SubGroup",
    name,
    backOption: {
      type: "previous",
      label: "Back",
      value: parentGroupIdentifier,
    },
    options: [],
  };
}
/**
 * Maps a flat list of options to a nested structure
 *
 * For example, given the following options:
 * [
 *  { "name": "Bass::Fender::Precision", "value": "bass__fender__precision" },
 *  { "name": "Bass::Fender::Jazz", "value": "bass__fender__jazz" }
 *  { "name": "Drums", "value": "drums" },
 * ]
 *
 * The following nested structure will be returned:
 * {
 *  "[]": {
 *   "type": "RootGroup",
 *   "options": [
 *    { "label": "Bass", "value": "[Bass]", type: "next" },
 *    { "label": "Drums", "value": "drums" },
 *   ]
 *  },
 *  "[Bass]": {
 *   "type": "SubGroup",
 *   "name": "Bass",
 *   "backOption": { "type": "previous", "label": "Back", "value": "[]" },
 *   "options": [
 *    { "label": "Fender", "value": "[Bass::Fender]", type: "next" },
 *   ]
 *  },
 *  "[Bass::Fender]": {
 *   "type": "SubGroup",
 *   "name": "Fender",
 *   "backOption": { "type": "previous", "label": "Back", "value": "[Bass]" },
 *   "options": [
 *    { "menuLabel": "Precision", "label": "Bass > Fender > Precision", "value": "bass__fender__precision" },
 *    { "menuLabel": "Jazz", "label": "Bass > Fender > Jazz", "value": "bass__fender__jazz" },
 *   ]
 *  }
 * }
 *
 * @param options original field options
 * @param hasEmptyOption if true, adds an empty option to the root group
 * @returns nested options
 */
function buildNestedOptions(options, hasEmptyOption) {
  const result = {
    [ROOT_GROUP_IDENTIFIER]: {
      type: "RootGroup",
      options: hasEmptyOption ? [{ label: "-", value: "" }] : [],
    },
  };
  options.forEach((option) => {
    const { name, value } = option;
    if (!name.includes("::")) {
      result[ROOT_GROUP_IDENTIFIER].options.push({
        value,
        label: name,
      });
    } else {
      const [groupNames, optionName] = getGroupAndOptionNames(name);
      const groupIdentifier = getGroupIdentifier(groupNames);
      if (!result[groupIdentifier]) {
        result[groupIdentifier] = buildSubGroupOptions(groupNames);
      }
      result[groupIdentifier]?.options.push({
        value,
        label: name.split("::").join(" > "),
        menuLabel: optionName,
      });
      // creates next options for each parent group, if they don't already exists
      for (let i = 0; i < groupNames.length; i++) {
        const parentGroupNames = groupNames.slice(0, i);
        const nextGroupNames = groupNames.slice(0, i + 1);
        const parentGroupIdentifier = getGroupIdentifier(parentGroupNames);
        const nextGroupIdentifier = getGroupIdentifier(nextGroupNames);
        if (!result[parentGroupIdentifier]) {
          result[parentGroupIdentifier] =
            buildSubGroupOptions(parentGroupNames);
        }
        if (
          result[parentGroupIdentifier]?.options.find(
            (o) => o.value === nextGroupIdentifier
          ) === undefined
        ) {
          result[parentGroupIdentifier]?.options.push({
            type: "next",
            label: nextGroupNames[nextGroupNames.length - 1],
            value: nextGroupIdentifier,
          });
        }
      }
    }
  });
  return result;
}
/**
 * When one or more options are selected, the Combobox component renders the label
 * for an option in the input, searching for an option passed as a child with the
 * same value as the selected option.
 *
 * In the first render we are passing only the root group options as children,
 * and if we already have some selected values from a SubGroup, the component is not
 * able to find the label for the selected option.
 *
 * We therefore need to pass all the non-navigation options as children in the first render.
 * The passed options are cached by the Combobox component, so we can safely remove them
 * after the first render and pass only the root group options.
 */
function getInitialGroup(nestedOptions) {
  const result = {
    type: "RootGroup",
    options: [],
  };
  Object.values(nestedOptions).forEach(({ options }) => {
    result.options.push(...options.filter(({ type }) => type === undefined));
  });
  return result;
}
function useNestedOptions({ options, hasEmptyOption }) {
  const nestedOptions = reactExports.useMemo(
    () => buildNestedOptions(options, hasEmptyOption),
    [options, hasEmptyOption]
  );
  const [currentGroup, setCurrentGroup] = reactExports.useState(
    getInitialGroup(nestedOptions)
  );
  reactExports.useEffect(() => {
    setCurrentGroup(nestedOptions[ROOT_GROUP_IDENTIFIER]);
  }, [nestedOptions]);
  const setCurrentGroupByIdentifier = (identifier) => {
    const group = nestedOptions[identifier];
    if (group) {
      setCurrentGroup(group);
    }
  };
  return {
    currentGroup,
    isGroupIdentifier,
    setCurrentGroupByIdentifier,
  };
}

function MultiSelect({ field }) {
  const { label, options, error, value, name, required, description } = field;
  const { currentGroup, isGroupIdentifier, setCurrentGroupByIdentifier } =
    useNestedOptions({
      options,
      hasEmptyOption: false,
    });
  const [selectedValues, setSelectValues] = reactExports.useState(value || []);
  const wrapperRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    if (wrapperRef.current && required) {
      const combobox = wrapperRef.current.querySelector("[role=combobox]");
      combobox?.setAttribute("aria-required", "true");
    }
  }, [wrapperRef, required]);
  const handleChange = (changes) => {
    if (Array.isArray(changes.selectionValue)) {
      const lastSelectedItem = changes.selectionValue.slice(-1).toString();
      if (isGroupIdentifier(lastSelectedItem)) {
        setCurrentGroupByIdentifier(lastSelectedItem);
      } else {
        setSelectValues(changes.selectionValue);
      }
    }
  };
  return jsxRuntimeExports.jsxs(Field$1, {
    children: [
      selectedValues.map((selectedValue) =>
        jsxRuntimeExports.jsx(
          "input",
          { type: "hidden", name: `${name}[]`, value: selectedValue },
          selectedValue
        )
      ),
      jsxRuntimeExports.jsxs(Label$1, {
        children: [
          label,
          required &&
            jsxRuntimeExports.jsx(Span, {
              "aria-hidden": "true",
              children: "*",
            }),
        ],
      }),
      description &&
        jsxRuntimeExports.jsx(Hint$1, {
          dangerouslySetInnerHTML: { __html: description },
        }),
      jsxRuntimeExports.jsxs(Combobox, {
        ref: wrapperRef,
        isMultiselectable: true,
        inputProps: { required },
        isEditable: false,
        validation: error ? "error" : undefined,
        onChange: handleChange,
        selectionValue: selectedValues,
        maxHeight: "auto",
        children: [
          currentGroup.type === "SubGroup" &&
            jsxRuntimeExports.jsx(Option, { ...currentGroup.backOption }),
          currentGroup.type === "SubGroup"
            ? jsxRuntimeExports.jsx(OptGroup, {
                "aria-label": currentGroup.name,
                children: currentGroup.options.map((option) =>
                  jsxRuntimeExports.jsx(
                    Option,
                    { ...option, children: option.menuLabel ?? option.label },
                    option.value
                  )
                ),
              })
            : currentGroup.options.map((option) =>
                jsxRuntimeExports.jsx(Option, { ...option }, option.value)
              ),
        ],
      }),
      error &&
        jsxRuntimeExports.jsx(Message$1, {
          validation: "error",
          children: error,
        }),
    ],
  });
}

const key = "return-focus-to-ticket-form-field";
function TicketFormField({ field, newRequestPath }) {
  const ref = reactExports.createRef();
  const handleChange = ({ selectionValue }) => {
    if (selectionValue && typeof selectionValue === "number") {
      const url = new URL(window.location.href);
      const searchParams = url.searchParams;
      searchParams.set("ticket_form_id", selectionValue);
      sessionStorage.setItem(key, "true");
      window.location.assign(`${newRequestPath}${url.search}`);
    }
  };
  reactExports.useEffect(() => {
    if (sessionStorage.getItem(key)) {
      sessionStorage.removeItem(key);
      // return focus to the ticket form field dropdown
      // after the page reloads for better a11y
      ref.current?.firstChild?.focus();
    }
  }, []);
  return jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, {
    children: [
      jsxRuntimeExports.jsx("input", {
        type: "hidden",
        name: field.name,
        value: field.value,
      }),
      field.options.length > 1 &&
        jsxRuntimeExports.jsxs(Field$1, {
          children: [
            jsxRuntimeExports.jsx(Label$1, { children: field.label }),
            jsxRuntimeExports.jsx(Combobox, {
              isEditable: false,
              onChange: handleChange,
              ref: ref,
              children: field.options.map((option) =>
                jsxRuntimeExports.jsx(
                  Option,
                  {
                    value: option.value,
                    label: option.name,
                    isSelected: field.value === option.value,
                    children: option.name,
                  },
                  option.value
                )
              ),
            }),
          ],
        }),
    ],
  });
}

function ParentTicketField({ field }) {
  const { value, name } = field;
  return jsxRuntimeExports.jsx("input", {
    type: "hidden",
    name: name,
    value: value,
  });
}

// NOTE: This is a temporary handling of the CSRF token
async function fetchCsrfToken$1() {
  const response = await fetch("/api/v2/help_center/sessions.json");
  const { current_session } = await response.json();
  return current_session.csrf_token;
}

/**
 * This hook creates a ref callback used to override the submit method of the form
 * that uses the callback.
 * Before submitting the form, it fetches the CSRF token from the backend and appends it to the form,
 * and redacts the value of the eventual credit card field
 * @param ticketFields array of ticket fields for the form
 * @returns a Ref callback and a submit handler
 */
function useFormSubmit(ticketFields) {
  const initialized = reactExports.useRef(false);
  const isSubmitting = reactExports.useRef(false);
  const formRefCallback = reactExports.useCallback(
    (ref) => {
      if (ref && !initialized.current) {
        initialized.current = true;
        /* We are monkey patching the submit method of the form, since this behavior is what
               other scripts in Help Center are intercepting the submit event, stopping the event propagation and
               calling the submit method directly */
        ref.submit = async () => {
          /* We are performing an async call to fetch the CSRF token and for this reason
                 the submit is not immediate, and the user can click the submit button multiple times.
                 We don't want to disable the submit button for A11Y, so we use the isSubmitting ref
                 to stop subsequent submits after the first one. */
          if (isSubmitting.current === false) {
            isSubmitting.current = true;
            const token = await fetchCsrfToken$1();
            const hiddenInput = document.createElement("input");
            hiddenInput.type = "hidden";
            hiddenInput.name = "authenticity_token";
            hiddenInput.value = token;
            ref.appendChild(hiddenInput);
            // The backend expects the credit card field to have a length at least of 13 characters.
            // We are prefixing the 4 digits with 9 Xs to make sure the value has the expected length
            const creditCardFields = ticketFields.filter(
              (field) => field.type === "partialcreditcard"
            );
            for (const creditCardField of creditCardFields) {
              const creditCardInput = ref.querySelector(
                `input[name="${creditCardField.name}"]`
              );
              if (
                creditCardInput &&
                creditCardInput instanceof HTMLInputElement &&
                creditCardInput.value.length === 4
              ) {
                creditCardInput.value = `XXXXXXXXX${creditCardInput.value}`;
              }
            }
            HTMLFormElement.prototype.submit.call(ref);
          }
        };
      }
    },
    [ticketFields]
  );
  const handleSubmit = (e) => {
    e.preventDefault();
    e.target.submit();
  };
  return { formRefCallback, handleSubmit };
}

const MAX_URL_LENGTH = 2048;
const TICKET_FIELD_PREFIX = "tf_";
const ALLOWED_BOOLEAN_VALUES = ["true", "false"];
const ALLOWED_HTML_TAGS = [
  "pre",
  "strong",
  "b",
  "p",
  "blockquote",
  "ul",
  "ol",
  "li",
  "h2",
  "h3",
  "h4",
  "i",
  "em",
  "br",
];
function getFieldFromId(id, prefilledTicketFields) {
  const isCustomField = !Number.isNaN(Number(id));
  if (isCustomField) {
    const name = `request[custom_fields][${id}]`;
    return prefilledTicketFields.ticketFields.find(
      (field) => field.name === name
    );
  }
  switch (id) {
    case "anonymous_requester_email":
      return prefilledTicketFields.emailField;
    case "due_at":
      return prefilledTicketFields.dueDateField;
    case "collaborators":
      return prefilledTicketFields.ccField;
    case "organization_id":
      return prefilledTicketFields.organizationField;
    default:
      return prefilledTicketFields.ticketFields.find(
        (field) => field.name === `request[${id}]`
      );
  }
}
function getPrefilledTicketFields(fields) {
  const { href } = location;
  const params = new URL(href).searchParams;
  const prefilledFields = {
    ...fields,
    ticketFields: [...fields.ticketFields],
  };
  if (href.length > MAX_URL_LENGTH) return fields;
  if (params.get("parent_id")) return fields;
  for (const [key, value] of params) {
    if (!key.startsWith(TICKET_FIELD_PREFIX)) continue;
    const ticketFieldId = key.substring(TICKET_FIELD_PREFIX.length);
    const field = getFieldFromId(ticketFieldId, prefilledFields);
    if (!field) continue;
    const sanitizedValue = purify.sanitize(value, {
      ALLOWED_TAGS: ALLOWED_HTML_TAGS,
    });
    switch (field.type) {
      case "partialcreditcard":
        continue;
      case "multiselect":
        field.value = sanitizedValue
          .split(",")
          // filter out prefilled options that don't exist
          .filter((value) =>
            field.options.some((option) => option.value === value)
          );
        break;
      case "checkbox":
        if (ALLOWED_BOOLEAN_VALUES.includes(sanitizedValue)) {
          field.value =
            sanitizedValue === "true"
              ? "on"
              : sanitizedValue === "false"
              ? "off"
              : "";
        }
        break;
      default:
        field.value = sanitizedValue;
    }
  }
  return prefilledFields;
}
function usePrefilledTicketFields({
  ticketFields,
  ccField,
  dueDateField,
  emailField,
  organizationField,
}) {
  return reactExports.useMemo(
    () =>
      getPrefilledTicketFields({
        ticketFields,
        ccField,
        dueDateField,
        emailField,
        organizationField,
      }),
    [ticketFields, ccField, dueDateField, emailField, organizationField]
  );
}

const FileNameWrapper = styled.div`
  flex: 1;
`;
function FileListItem({ file, onRemove }) {
  const { t } = useTranslation();
  const handleFileKeyDown = (e) => {
    if (e.code === "Delete" || e.code === "Backspace") {
      e.preventDefault();
      onRemove();
    }
  };
  const handleCloseKeyDown = (e) => {
    if (
      e.code === "Enter" ||
      e.code === "Space" ||
      e.code === "Delete" ||
      e.code === "Backspace"
    ) {
      e.preventDefault();
      onRemove();
    }
  };
  const fileName =
    file.status === "pending" ? file.file_name : file.value.file_name;
  const stopUploadLabel = t(
    "new-request-form.attachments.stop-upload",
    "Stop upload"
  );
  const removeFileLabel = t(
    "new-request-form.attachments.remove-file",
    "Remove file"
  );
  return jsxRuntimeExports.jsx(FileList.Item, {
    children: jsxRuntimeExports.jsx(File, {
      type: "generic",
      title: fileName,
      onKeyDown: handleFileKeyDown,
      children:
        file.status === "pending"
          ? jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, {
              children: [
                jsxRuntimeExports.jsx(FileNameWrapper, { children: fileName }),
                jsxRuntimeExports.jsx(Tooltip, {
                  content: stopUploadLabel,
                  children: jsxRuntimeExports.jsx(File.Close, {
                    "aria-label": stopUploadLabel,
                    onClick: () => {
                      onRemove();
                    },
                    onKeyDown: handleCloseKeyDown,
                  }),
                }),
                jsxRuntimeExports.jsx(Progress, {
                  value: file.progress,
                  "aria-label": t(
                    "new-request-form.attachments.uploading",
                    "Uploading {{fileName}}",
                    { fileName }
                  ),
                }),
              ],
            })
          : jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, {
              children: [
                jsxRuntimeExports.jsx(FileNameWrapper, {
                  children: jsxRuntimeExports.jsx(Anchor, {
                    isExternal: true,
                    href: file.value.url,
                    target: "_blank",
                    children: fileName,
                  }),
                }),
                jsxRuntimeExports.jsx(Tooltip, {
                  content: removeFileLabel,
                  children: jsxRuntimeExports.jsx(File.Delete, {
                    "aria-label": removeFileLabel,
                    onClick: () => {
                      onRemove();
                    },
                    onKeyDown: handleCloseKeyDown,
                  }),
                }),
                jsxRuntimeExports.jsx(Progress, {
                  value: 100,
                  "aria-hidden": "true",
                }),
              ],
            }),
    }),
  });
}

function useAttachedFiles(initialValue) {
  const [files, setFiles] = reactExports.useState(initialValue);
  const addPendingFile = reactExports.useCallback((id, file_name, xhr) => {
    setFiles((current) => [
      ...current,
      { status: "pending", id, file_name, progress: 0, xhr },
    ]);
  }, []);
  const setPendingFileProgress = reactExports.useCallback((id, progress) => {
    setFiles((current) =>
      current.map((file) =>
        file.status === "pending" && file.id === id
          ? { ...file, progress }
          : file
      )
    );
  }, []);
  const removePendingFile = reactExports.useCallback((id) => {
    setFiles((current) =>
      current.filter((file) => file.status !== "pending" || file.id !== id)
    );
  }, []);
  const removeUploadedFile = reactExports.useCallback((id) => {
    setFiles((current) =>
      current.filter(
        (file) => file.status !== "uploaded" || file.value.id !== id
      )
    );
  }, []);
  const setUploaded = reactExports.useCallback((pendingId, value) => {
    setFiles((current) =>
      current.map((file) =>
        file.status === "pending" && file.id === pendingId
          ? { status: "uploaded", value }
          : file
      )
    );
  }, []);
  return {
    files,
    addPendingFile,
    setPendingFileProgress,
    removePendingFile,
    removeUploadedFile,
    setUploaded,
  };
}

async function fetchCsrfToken() {
  const response = await fetch("/api/v2/users/me.json");
  const {
    user: { authenticity_token },
  } = await response.json();
  return authenticity_token;
}
function Attachments({ field }) {
  const { label, error, name, attachments } = field;
  const {
    files,
    addPendingFile,
    setPendingFileProgress,
    setUploaded,
    removePendingFile,
    removeUploadedFile,
  } = useAttachedFiles(
    attachments.map((value) => ({
      status: "uploaded",
      value,
    })) ?? []
  );
  const { addToast } = useToast();
  const { t } = useTranslation();
  const notifyError = reactExports.useCallback(
    (fileName) => {
      addToast(({ close }) =>
        jsxRuntimeExports.jsxs(Notification, {
          type: "error",
          children: [
            jsxRuntimeExports.jsx(Title, {
              children: t(
                "new-request-form.attachments.upload-error-title",
                "Upload error"
              ),
            }),
            t(
              "new-request-form.attachments.upload-error-description",
              "There was an error uploading {{fileName}}. Try again or upload another file.",
              { fileName }
            ),
            jsxRuntimeExports.jsx(Close, {
              "aria-label": t("new-request-form.close-label", "Close"),
              onClick: close,
            }),
          ],
        })
      );
    },
    [addToast, t]
  );
  const onDrop = reactExports.useCallback(
    async (acceptedFiles) => {
      const csrfToken = await fetchCsrfToken();
      for (const file of acceptedFiles) {
        // fetch doesn't support upload progress, so we use XMLHttpRequest
        const xhr = new XMLHttpRequest();
        const url = new URL(`${window.location.origin}/api/v2/uploads.json`);
        url.searchParams.append("filename", file.name);
        xhr.open("POST", url);
        // If the browser returns a type for the file, use it as the Content-Type header,
        // otherwise try to determine the mime type from the file extension using the mime
        // library. If we can't determine the mime type, we'll fall back to a generic
        // application/octet-stream.
        if (file.type) {
          xhr.setRequestHeader("Content-Type", file.type);
        } else {
          const mimeType = mime.getType(file.name);
          xhr.setRequestHeader(
            "Content-Type",
            mimeType || "application/octet-stream"
          );
        }
        xhr.setRequestHeader("X-CSRF-Token", csrfToken);
        xhr.responseType = "json";
        const pendingId = crypto.randomUUID();
        addPendingFile(pendingId, file.name, xhr);
        xhr.upload.addEventListener("progress", ({ loaded, total }) => {
          const progress = Math.round((loaded / total) * 100);
          // There is a bit of delay between the upload ending and the
          // load event firing, so we don't want to set the progress to 100
          // otherwise it is not clear that the upload is still in progress.
          if (progress <= 90) {
            setPendingFileProgress(pendingId, progress);
          }
        });
        xhr.addEventListener("load", () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            const {
              upload: {
                attachment: { file_name, content_url },
                token,
              },
            } = xhr.response;
            setUploaded(pendingId, { id: token, file_name, url: content_url });
          } else {
            notifyError(file.name);
            removePendingFile(pendingId);
          }
        });
        xhr.addEventListener("error", () => {
          notifyError(file.name);
          removePendingFile(pendingId);
        });
        xhr.send(file);
      }
    },
    [
      addPendingFile,
      removePendingFile,
      setPendingFileProgress,
      setUploaded,
      notifyError,
    ]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });
  const handleRemove = async (file) => {
    if (file.status === "pending") {
      file.xhr.abort();
      removePendingFile(file.id);
    } else {
      const csrfToken = await fetchCsrfToken();
      const token = file.value.id;
      removeUploadedFile(file.value.id);
      await fetch(`/api/v2/uploads/${token}.json`, {
        method: "DELETE",
        headers: { "X-CSRF-Token": csrfToken },
      });
    }
  };
  return jsxRuntimeExports.jsxs("div", {
    className: "custom-form-field-layout",
    children: [
      jsxRuntimeExports.jsx(Label, {
        className: "custom-title",
        children: label,
      }),
      error &&
        jsxRuntimeExports.jsx(Message, {
          validation: "error",
          children: error,
        }),
      jsxRuntimeExports.jsxs(FileUpload, {
        ...getRootProps(),
        isDragging: isDragActive,
        className: "!border-0 !bg-light-surface-3 dark:!bg-light-surface-3",
        children: [
          isDragActive
            ? jsxRuntimeExports.jsx("span", {
                children: t(
                  "new-request-form.attachments.drop-files-label",
                  "Drop files here"
                ),
              })
            : jsxRuntimeExports.jsx("span", {
                className:
                  "label-2 !text-light-neutral-1 dark:!text-dark-neutral-1",
                children: t(
                  "new-request-form.attachments.choose-file-label",
                  "Add file or drop files here"
                ),
              }),
          jsxRuntimeExports.jsx(Input$1, { ...getInputProps() }),
        ],
      }),
      files.map((file) =>
        jsxRuntimeExports.jsx(
          FileListItem,
          {
            file: file,
            onRemove: () => {
              handleRemove(file);
            },
          },
          file.status === "pending" ? file.id : file.value.id
        )
      ),
      files.map(
        (file) =>
          file.status === "uploaded" &&
          jsxRuntimeExports.jsx(
            "input",
            { type: "hidden", name: name, value: JSON.stringify(file.value) },
            file.value.id
          )
      ),
    ],
  });
}

function getFieldConditions(fieldId, endUserConditions) {
  return endUserConditions.filter((condition) => {
    return condition.child_fields.some((child) => child.id === fieldId);
  });
}
function getAppliedConditions(fieldConditions, allConditions, fields) {
  return fieldConditions.filter((condition) => {
    const parentField = fields.find(
      (field) => field.id === condition.parent_field_id
    );
    if (!parentField) {
      return false;
    }
    const parentFieldConditions = getFieldConditions(
      parentField.id,
      allConditions
    );
    // the condition is applied if the parent field value matches the condition value
    // and if the parent field has no conditions or if the parent field conditions are met
    return (
      parentField.value === condition.value &&
      (parentFieldConditions.length === 0 ||
        getAppliedConditions(parentFieldConditions, allConditions, fields)
          .length > 0)
    );
  });
}
function getVisibleFields(fields, endUserConditions) {
  if (endUserConditions.length === 0) {
    return fields;
  }
  return fields.reduce((acc, field) => {
    const fieldConditions = getFieldConditions(field.id, endUserConditions);
    if (fieldConditions.length === 0) {
      return [...acc, field];
    }
    const appliedConditions = getAppliedConditions(
      fieldConditions,
      endUserConditions,
      fields
    );
    if (appliedConditions.length > 0) {
      return [
        ...acc,
        {
          ...field,
          required: appliedConditions.some((condition) =>
            condition.child_fields.some(
              (child) => child.id == field.id && child.is_required
            )
          ),
        },
      ];
    }
    return acc;
  }, []);
}

function DatePicker({ field, locale, valueFormat, onChange }) {
  const { label, error, value, name, required, description } = field;
  const [date, setDate] = reactExports.useState(
    value ? new Date(value) : undefined
  );
  const formatDate = (value) => {
    if (value === undefined) {
      return "";
    }
    const isoString = value.toISOString();
    return valueFormat === "dateTime" ? isoString : isoString.split("T")[0];
  };
  const handleChange = (date) => {
    // Set the time to 12:00:00 as this is also the expected behavior across Support and the API
    const newDate = new Date(
      Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), 12, 0, 0)
    );
    setDate(newDate);
    const dateString = formatDate(newDate);
    if (dateString !== undefined) {
      onChange(dateString);
    }
  };
  const handleInputChange = (e) => {
    // Allow field to be cleared
    if (e.target.value === "") {
      setDate(undefined);
      onChange("");
    }
  };
  return jsxRuntimeExports.jsxs(Field, {
    children: [
      jsxRuntimeExports.jsxs(Label, {
        children: [
          label,
          required &&
            jsxRuntimeExports.jsx(Span, {
              "aria-hidden": "true",
              children: "*",
            }),
        ],
      }),
      description &&
        jsxRuntimeExports.jsx(Hint, {
          dangerouslySetInnerHTML: { __html: description },
        }),
      jsxRuntimeExports.jsx(Datepicker, {
        value: date,
        onChange: handleChange,
        locale: locale,
        children: jsxRuntimeExports.jsx(Input$1, {
          required: required,
          lang: locale,
          onChange: handleInputChange,
          validation: error ? "error" : undefined,
        }),
      }),
      error &&
        jsxRuntimeExports.jsx(Message, {
          validation: "error",
          children: error,
        }),
      jsxRuntimeExports.jsx("input", {
        type: "hidden",
        name: name,
        value: formatDate(date),
      }),
    ],
  });
}

function useTagsInputContainer({
  tags,
  onTagsChange,
  inputValue,
  onInputValueChange,
  inputRef,
  gridRowRef,
  i18n,
}) {
  const [selectedIndex, setSelectedIndex] = reactExports.useState(0);
  const [announcement, setAnnouncement] = reactExports.useState("");
  const gridOnChange = reactExports.useCallback(
    (_, colIndex) => {
      setSelectedIndex(colIndex);
    },
    [setSelectedIndex]
  );
  const { getGridProps, getGridCellProps } = useGrid({
    matrix: [tags],
    rowIndex: 0,
    colIndex: selectedIndex,
    onChange: gridOnChange,
  });
  const hasTag = (tag) => {
    return tags.includes(tag);
  };
  const addTag = (tag) => {
    onTagsChange([...tags, tag]);
    setAnnouncement(i18n.addedTag(tag));
  };
  const removeTagAt = (at) => {
    const tag = tags[at];
    onTagsChange(tags.filter((_, index) => index !== at));
    setAnnouncement(i18n.removedTag(tag));
    setSelectedIndex(0);
    /* Move focus to the first tag once a tag has been removed, after 100ms to let screen reader read the
           announcement first */
    setTimeout(() => {
      const selectedTag = gridRowRef.current?.querySelector(`[tabindex="0"]`);
      selectedTag?.focus();
    }, 100);
  };
  const handleContainerClick = (e) => {
    if (e.target === e.currentTarget) {
      inputRef.current?.focus();
    }
  };
  const handleContainerBlur = () => {
    setSelectedIndex(0);
  };
  const handleInputKeyDown = (e) => {
    const target = e.target;
    const tag = target.value;
    if (
      tag &&
      (e.key === KEYS.SPACE ||
        e.key === KEYS.ENTER ||
        e.key === KEYS.TAB ||
        e.key === KEYS.COMMA)
    ) {
      e.preventDefault();
      if (!hasTag(tag)) {
        addTag(tag);
      }
      onInputValueChange("");
    }
  };
  const handleInputChange = (e) => {
    const currentValue = e.target.value;
    /* On mobile browsers, the keyDown event doesn't provide the code
          of the pressed key: https://www.w3.org/TR/uievents/#determine-keydown-keyup-keyCode,
          so we need to check for spaces or commas on the change event to let the user
          adds a tag  */
    const [tag, separator] = [
      currentValue.slice(0, -1),
      currentValue.slice(-1),
    ];
    if (separator === " " || separator === ",") {
      if (tag.length > 0 && !hasTag(tag)) {
        addTag(tag);
      }
      onInputValueChange("");
    } else {
      onInputValueChange(currentValue);
    }
  };
  const handleInputPaste = (e) => {
    e.preventDefault();
    const data = e.clipboardData.getData("text");
    const values = new Set(
      data.split(/[\s,;]+/).filter((value) => !tags.includes(value))
    );
    onTagsChange([...tags, ...values]);
    setAnnouncement(i18n.addedTags([...values]));
  };
  const handleInputOnBlur = (e) => {
    const target = e.target;
    const tag = target.value;
    if (tag) {
      if (!hasTag(tag)) {
        addTag(tag);
      }
      onInputValueChange("");
    }
  };
  const handleTagKeyDown = (index) => (e) => {
    if (e.code === "Backspace") {
      e.preventDefault();
      removeTagAt(index);
    }
  };
  const handleTagCloseClick = (index) => () => {
    removeTagAt(index);
  };
  const getContainerProps = () => ({
    onClick: handleContainerClick,
    onBlur: handleContainerBlur,
    tabIndex: -1,
  });
  const getGridRowProps = () => ({
    role: "row",
  });
  const getTagCloseProps = (index) => ({
    onClick: handleTagCloseClick(index),
  });
  const getInputProps = () => ({
    value: inputValue,
    onChange: handleInputChange,
    onKeyDown: handleInputKeyDown,
    onPaste: handleInputPaste,
    onBlur: handleInputOnBlur,
  });
  const getAnnouncementProps = () => ({
    "aria-live": "polite",
    "aria-relevant": "text",
  });
  return {
    getContainerProps,
    getGridProps,
    getGridRowProps,
    getGridCellProps: (index) =>
      getGridCellProps({
        rowIndex: 0,
        colIndex: index,
        onKeyDown: handleTagKeyDown(index),
      }),
    getTagCloseProps,
    getInputProps,
    announcement,
    getAnnouncementProps,
  };
}

const EMAIL_REGEX =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const Container$1 = styled(FauxInput)`
  padding: ${(props) => `${props.theme.space.xxs} ${props.theme.space.sm}`};
>>>>>>> e0a3a53 (apply prettier)

  // Removes white spaces for inline elements
  font-size: 0;

  // Same as height of Tag size="large" + base space (4px)
  // to give some vertical space between tags
<<<<<<< HEAD
  --line-height: ${e=>8*e.theme.space.base+e.theme.space.base}px;
  line-height: var(--line-height);
`,Ve=m.span`
  display: inline-block;
  margin-right: ${e=>e.theme.space.sm};
`,Ae=m(M)`
  ${e=>E({theme:e.theme,shadowWidth:"sm",selector:"&:focus"})}
`,Ne=m.div`
  display: inline-block;
  position: relative;
`,ze=m(D)`
=======
  --line-height: ${(props) =>
    props.theme.space.base * 8 + props.theme.space.base}px;
  line-height: var(--line-height);
`;
const GridCell = styled.span`
  display: inline-block;
  margin-right: ${(props) => props.theme.space.sm};
`;
const StyledTag = styled(Tag)`
  ${(props) =>
    focusStyles({
      theme: props.theme,
      shadowWidth: "sm",
      selector: "&:focus",
    })}
`;
const InputWrapper = styled.div`
  display: inline-block;
  position: relative;
`;
const InputMirror = styled(FauxInput)`
>>>>>>> e0a3a53 (apply prettier)
  display: inline-block;
  min-width: 200px;
  opacity: 0;
  user-select: none;
  height: var(--line-height);
  line-height: var(--line-height);
<<<<<<< HEAD
`,Ge=m(r)`
=======
`;
const StyledInput = styled(Input$1)`
>>>>>>> e0a3a53 (apply prettier)
  position: absolute;
  top: 0;
  left: 0;
  height: var(--line-height);
  line-height: var(--line-height);
<<<<<<< HEAD
`;function He({field:r}){const{label:i,value:u,name:c,error:d,description:m}=r,{t:h}=l(),p=u?u.split(",").map((e=>e.trim())):[],[j,g]=o.useState(p),[b,x]=o.useState(""),w=o.useRef(null),v=o.useRef(null),{getContainerProps:q,getGridProps:y,getGridRowProps:k,getGridCellProps:_,getTagCloseProps:S,getInputProps:I,getAnnouncementProps:T,announcement:F}=function({tags:e,onTagsChange:n,inputValue:t,onInputValueChange:s,inputRef:r,gridRowRef:a,i18n:i}){const[l,u]=o.useState(0),[c,d]=o.useState(""),m=o.useCallback(((e,n)=>{u(n)}),[u]),{getGridProps:f,getGridCellProps:h}=L({matrix:[e],rowIndex:0,colIndex:l,onChange:m}),p=n=>e.includes(n),j=t=>{n([...e,t]),d(i.addedTag(t))},g=t=>{const s=e[t];n(e.filter(((e,n)=>n!==t))),d(i.removedTag(s)),u(0),setTimeout((()=>{const e=a.current?.querySelector('[tabindex="0"]');e?.focus()}),100)},b=e=>{e.target===e.currentTarget&&r.current?.focus()},x=()=>{u(0)},w=e=>{const n=e.target.value;!n||e.key!==$.SPACE&&e.key!==$.ENTER&&e.key!==$.TAB&&e.key!==$.COMMA||(e.preventDefault(),p(n)||j(n),s(""))},v=e=>{const n=e.target.value,[t,r]=[n.slice(0,-1),n.slice(-1)];" "===r||","===r?(t.length>0&&!p(t)&&j(t),s("")):s(n)},q=t=>{t.preventDefault();const s=t.clipboardData.getData("text"),r=new Set(s.split(/[\s,;]+/).filter((n=>!e.includes(n))));n([...e,...r]),d(i.addedTags([...r]))},y=e=>{const n=e.target.value;n&&(p(n)||j(n),s(""))},k=e=>n=>{"Backspace"===n.code&&(n.preventDefault(),g(e))},_=e=>()=>{g(e)};return{getContainerProps:()=>({onClick:b,onBlur:x,tabIndex:-1}),getGridProps:f,getGridRowProps:()=>({role:"row"}),getGridCellProps:e=>h({rowIndex:0,colIndex:e,onKeyDown:k(e)}),getTagCloseProps:e=>({onClick:_(e)}),getInputProps:()=>({value:t,onChange:v,onKeyDown:w,onPaste:q,onBlur:y}),announcement:c,getAnnouncementProps:()=>({"aria-live":"polite","aria-relevant":"text"})}}({tags:j,onTagsChange:g,inputValue:b,onInputValueChange:x,inputRef:w,gridRowRef:v,i18n:{addedTag:e=>h("new-request-form.cc-field.email-added","{{email}} has been added",{email:e}),removedTag:e=>h("new-request-form.cc-field.email-removed","{{email}} has been removed",{email:e}),addedTags:e=>h("new-request-form.cc-field.emails-added","{{emails}} have been added",{emails:e})}}),P=(n,t,s)=>e.jsxs(Ae,{size:"large","aria-label":h("new-request-form.cc-field.email-label","{{email}} - Press Backspace to remove",{email:s}),hue:t?void 0:"red",children:[!t&&e.jsx(M.Avatar,{children:e.jsx(V,{})}),e.jsx("span",{children:s}),e.jsx(M.Close,{...S(n)})]});return e.jsxs(n,{children:[e.jsx(f,{children:i}),m&&e.jsx(s,{children:m}),e.jsxs(Me,{...q(),children:[j.length>0&&e.jsx("span",{...y({"aria-label":h("new-request-form.cc-field.container-label","Selected CC emails")}),children:e.jsx("span",{ref:v,...k(),children:j.map(((n,t)=>{const s=De.test(n);return s?e.jsx(Ve,{..._(t),children:P(t,s,n)},t):e.jsx(C,{content:h("new-request-form.cc-field.invalid-email","Invalid email address"),children:e.jsx(Ve,{..._(t),children:P(t,s,n)})},t)}))})}),e.jsxs(Ne,{children:[e.jsx(ze,{isBare:!0,"aria-hidden":"true",tabIndex:-1,children:b}),e.jsx(Ge,{ref:w,isBare:!0,...I()})]})]}),d&&e.jsx(a,{validation:"error",children:d}),j.map((n=>e.jsx("input",{type:"hidden",name:c,value:n},n))),e.jsx(t,{hidden:!0,...T(),children:F})]})}const Xe=m(t)`
  margin-left: ${e=>e.theme.space.xxs};
  font-weight: ${e=>e.theme.fontWeights.medium};
`;function Oe({field:r,onChange:o}){const{t:i}=l(),{label:u,error:c,value:d,name:m,required:h,description:p}=r,j=function(e){return e?e.replaceAll("X",""):""}(d);return e.jsxs(n,{children:[e.jsxs(f,{children:[u,h&&e.jsx(t,{"aria-hidden":"true",children:"*"}),e.jsx(Xe,{children:i("new-request-form.credit-card-digits-hint","(Last 4 digits)")})]}),p&&e.jsx(s,{dangerouslySetInnerHTML:{__html:p}}),e.jsx(A,{start:e.jsx(N,{}),name:m,type:"text",value:j,onChange:e=>o(e.target.value),validation:c?"error":void 0,required:h,maxLength:4,placeholder:"XXXX"}),c&&e.jsx(a,{validation:"error",children:c})]})}function Ue({field:n,onChange:s}){const{label:r,options:a,error:i,value:l,name:u,required:c,description:d}=n,{currentGroup:m,isGroupIdentifier:f,setCurrentGroupByIdentifier:h}=be({options:a,hasEmptyOption:!0}),w=l??"",[y,k]=o.useState(!1),_=o.useRef(null);o.useEffect((()=>{if(_.current&&c){const e=_.current.querySelector("[role=combobox]");e?.setAttribute("aria-required","true")}}),[_,c]);return e.jsxs(p,{className:"custom-form-field-layout",children:[e.jsxs(v,{className:"custom-title",children:[r,c&&e.jsx(t,{"aria-hidden":"true",children:"*"})]}),e.jsxs(j,{ref:_,inputProps:{required:c,name:u},isEditable:!1,validation:i?"error":void 0,onChange:e=>{"string"==typeof e.selectionValue&&f(e.selectionValue)?h(e.selectionValue):("string"==typeof e.selectionValue&&s(e.selectionValue),void 0!==e.isExpanded&&k(e.isExpanded))},selectionValue:w,inputValue:w,renderValue:({selection:n})=>n?.label??e.jsx(de,{}),isExpanded:y,children:["SubGroup"===m.type&&e.jsx(g,{...m.backOption}),"SubGroup"===m.type?e.jsx(q,{"aria-label":m.name,children:m.options.map((n=>e.jsx(g,{...n,children:n.menuLabel??n.label},n.value)))}):m.options.map((n=>""===n.value?e.jsx(g,{...n,children:e.jsx(de,{})},n.value):e.jsx(g,{...n},n.value)))]}),i&&e.jsx(b,{validation:"error",children:i}),d&&e.jsx(x,{className:"custom-hint",dangerouslySetInnerHTML:{__html:d}})]})}const Be=z`
=======
`;
function CcField({ field }) {
  const { label, value, name, error, description } = field;
  const { t } = useTranslation();
  const initialValue = value
    ? value.split(",").map((email) => email.trim())
    : [];
  const [tags, setTags] = reactExports.useState(initialValue);
  const [inputValue, setInputValue] = reactExports.useState("");
  const inputRef = reactExports.useRef(null);
  const gridRowRef = reactExports.useRef(null);
  const {
    getContainerProps,
    getGridProps,
    getGridRowProps,
    getGridCellProps,
    getTagCloseProps,
    getInputProps,
    getAnnouncementProps,
    announcement,
  } = useTagsInputContainer({
    tags,
    onTagsChange: setTags,
    inputValue,
    onInputValueChange: setInputValue,
    inputRef,
    gridRowRef,
    i18n: {
      addedTag: (email) =>
        t("new-request-form.cc-field.email-added", "{{email}} has been added", {
          email,
        }),
      removedTag: (email) =>
        t(
          "new-request-form.cc-field.email-removed",
          "{{email}} has been removed",
          { email }
        ),
      addedTags: (emails) =>
        t(
          "new-request-form.cc-field.emails-added",
          "{{emails}} have been added",
          { emails }
        ),
    },
  });
  const renderTag = (index, isValid, email) =>
    jsxRuntimeExports.jsxs(StyledTag, {
      size: "large",
      "aria-label": t(
        "new-request-form.cc-field.email-label",
        "{{email}} - Press Backspace to remove",
        { email }
      ),
      hue: isValid ? undefined : "red",
      children: [
        !isValid &&
          jsxRuntimeExports.jsx(Tag.Avatar, {
            children: jsxRuntimeExports.jsx(SvgAlertWarningStroke, {}),
          }),
        jsxRuntimeExports.jsx("span", { children: email }),
        jsxRuntimeExports.jsx(Tag.Close, { ...getTagCloseProps(index) }),
      ],
    });
  return jsxRuntimeExports.jsxs(Field, {
    children: [
      jsxRuntimeExports.jsx(Label, { children: label }),
      description && jsxRuntimeExports.jsx(Hint, { children: description }),
      jsxRuntimeExports.jsxs(Container$1, {
        ...getContainerProps(),
        children: [
          tags.length > 0 &&
            jsxRuntimeExports.jsx("span", {
              ...getGridProps({
                "aria-label": t(
                  "new-request-form.cc-field.container-label",
                  "Selected CC emails"
                ),
              }),
              children: jsxRuntimeExports.jsx("span", {
                ref: gridRowRef,
                ...getGridRowProps(),
                children: tags.map((email, index) => {
                  const isValid = EMAIL_REGEX.test(email);
                  return isValid
                    ? jsxRuntimeExports.jsx(
                        GridCell,
                        {
                          ...getGridCellProps(index),
                          children: renderTag(index, isValid, email),
                        },
                        index
                      )
                    : jsxRuntimeExports.jsx(
                        Tooltip,
                        {
                          content: t(
                            "new-request-form.cc-field.invalid-email",
                            "Invalid email address"
                          ),
                          children: jsxRuntimeExports.jsx(GridCell, {
                            ...getGridCellProps(index),
                            children: renderTag(index, isValid, email),
                          }),
                        },
                        index
                      );
                }),
              }),
            }),
          jsxRuntimeExports.jsxs(InputWrapper, {
            children: [
              jsxRuntimeExports.jsx(InputMirror, {
                isBare: true,
                "aria-hidden": "true",
                tabIndex: -1,
                children: inputValue,
              }),
              jsxRuntimeExports.jsx(StyledInput, {
                ref: inputRef,
                isBare: true,
                ...getInputProps(),
              }),
            ],
          }),
        ],
      }),
      error &&
        jsxRuntimeExports.jsx(Message, {
          validation: "error",
          children: error,
        }),
      tags.map((email) =>
        jsxRuntimeExports.jsx(
          "input",
          { type: "hidden", name: name, value: email },
          email
        )
      ),
      jsxRuntimeExports.jsx(Span, {
        hidden: true,
        ...getAnnouncementProps(),
        children: announcement,
      }),
    ],
  });
}

/**
 * When there is an error in the credit card field, the backend returns a redacted value with the last 4 digits prefixed with some Xs.
 * This function removes the Xs from the value and returns the last 4 digits of the credit card
 *
 * @param value The value returned by the backend with last 4 digits prefixed with some Xs
 * @returns The last 4 digits of the credit card
 */
function getLastDigits(value) {
  return value ? value.replaceAll("X", "") : "";
}
const DigitsHintSpan = styled(Span)`
  margin-left: ${(props) => props.theme.space.xxs};
  font-weight: ${(props) => props.theme.fontWeights.medium};
`;
function CreditCard({ field, onChange }) {
  const { t } = useTranslation();
  const { label, error, value, name, required, description } = field;
  const digits = getLastDigits(value);
  return jsxRuntimeExports.jsxs(Field, {
    children: [
      jsxRuntimeExports.jsxs(Label, {
        children: [
          label,
          required &&
            jsxRuntimeExports.jsx(Span, {
              "aria-hidden": "true",
              children: "*",
            }),
          jsxRuntimeExports.jsx(DigitsHintSpan, {
            children: t(
              "new-request-form.credit-card-digits-hint",
              "(Last 4 digits)"
            ),
          }),
        ],
      }),
      description &&
        jsxRuntimeExports.jsx(Hint, {
          dangerouslySetInnerHTML: { __html: description },
        }),
      jsxRuntimeExports.jsx(MediaInput, {
        start: jsxRuntimeExports.jsx(SvgCreditCardStroke, {}),
        name: name,
        type: "text",
        value: digits,
        onChange: (e) => onChange(e.target.value),
        validation: error ? "error" : undefined,
        required: required,
        maxLength: 4,
        placeholder: "XXXX",
      }),
      error &&
        jsxRuntimeExports.jsx(Message, {
          validation: "error",
          children: error,
        }),
    ],
  });
}

function Tagger({ field, onChange }) {
  const { label, options, error, value, name, required, description } = field;
  const { currentGroup, isGroupIdentifier, setCurrentGroupByIdentifier } =
    useNestedOptions({
      options,
      hasEmptyOption: true,
    });
  const selectionValue = value ?? "";
  const [isExpanded, setIsExpanded] = reactExports.useState(false);
  const wrapperRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    if (wrapperRef.current && required) {
      const combobox = wrapperRef.current.querySelector("[role=combobox]");
      combobox?.setAttribute("aria-required", "true");
    }
  }, [wrapperRef, required]);
  const handleChange = (changes) => {
    if (
      typeof changes.selectionValue === "string" &&
      isGroupIdentifier(changes.selectionValue)
    ) {
      setCurrentGroupByIdentifier(changes.selectionValue);
      return;
    }
    if (typeof changes.selectionValue === "string") {
      onChange(changes.selectionValue);
    }
    if (changes.isExpanded !== undefined) {
      setIsExpanded(changes.isExpanded);
    }
  };
  return jsxRuntimeExports.jsxs(Field$1, {
    className: "custom-form-field-layout",
    children: [
      jsxRuntimeExports.jsxs(Label$1, {
        className: "custom-title",
        children: [
          label,
          required &&
            jsxRuntimeExports.jsx(Span, {
              "aria-hidden": "true",
              children: "*",
            }),
        ],
      }),
      jsxRuntimeExports.jsxs(Combobox, {
        ref: wrapperRef,
        inputProps: { required, name },
        isEditable: false,
        validation: error ? "error" : undefined,
        onChange: handleChange,
        selectionValue: selectionValue,
        inputValue: selectionValue,
        renderValue: ({ selection }) =>
          selection?.label ?? jsxRuntimeExports.jsx(EmptyValueOption, {}),
        isExpanded: isExpanded,
        children: [
          currentGroup.type === "SubGroup" &&
            jsxRuntimeExports.jsx(Option, { ...currentGroup.backOption }),
          currentGroup.type === "SubGroup"
            ? jsxRuntimeExports.jsx(OptGroup, {
                "aria-label": currentGroup.name,
                children: currentGroup.options.map((option) =>
                  jsxRuntimeExports.jsx(
                    Option,
                    { ...option, children: option.menuLabel ?? option.label },
                    option.value
                  )
                ),
              })
            : currentGroup.options.map((option) =>
                option.value === ""
                  ? jsxRuntimeExports.jsx(
                      Option,
                      {
                        ...option,
                        children: jsxRuntimeExports.jsx(EmptyValueOption, {}),
                      },
                      option.value
                    )
                  : jsxRuntimeExports.jsx(Option, { ...option }, option.value)
              ),
        ],
      }),
      error &&
        jsxRuntimeExports.jsx(Message$1, {
          validation: "error",
          children: error,
        }),
      description &&
        jsxRuntimeExports.jsx(Hint$1, {
          className: "custom-hint",
          dangerouslySetInnerHTML: { __html: description },
        }),
    ],
  });
}

function useDebounce(value, delayMs) {
  const [debouncedValue, setDebouncedValue] = reactExports.useState(value);
  reactExports.useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delayMs);
    return () => {
      clearTimeout(timer);
    };
  }, [value, delayMs]);
  return debouncedValue;
}

const slideIn = $e`
>>>>>>> e0a3a53 (apply prettier)
  from {
    grid-template-rows: 0fr;
  }
  to {
    grid-template-rows: 1fr;
  }
<<<<<<< HEAD
`,We=m.div`
  display: grid;
  animation: ${Be} 200ms forwards;
`,Ke=m.div`
  overflow: hidden;
`,Ye=m.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`,Je=m.li`
  margin: ${e=>e.theme.space.sm} 0;
`;function Ze({query:n,locale:t}){const s=function(e,n){const[t,s]=o.useState(e);return o.useEffect((()=>{const t=setTimeout((()=>s(e)),n);return()=>{clearTimeout(t)}}),[e,n]),t}(n,500),[r,a]=o.useState([]),i=o.useRef({}),{t:u}=l();return o.useEffect((()=>{const e=s?.trim().toLocaleLowerCase();if(!e||!function(e){const n=e.charCodeAt(0);return n>=19968&&n<=195103?e.length>=2:e.length>=3}(e))return void a([]);const n=new URL(`${window.location.origin}/api/v2/help_center/deflection/suggestions.json`);n.searchParams.append("locale",t),n.searchParams.append("query",e);const r=i.current[n.toString()];r?a(r):fetch(n).then((e=>e.json())).then((({results:e})=>{i.current[n.toString()]=e,a(e)}))}),[s,t]),r.length>0?e.jsx(We,{"data-test-id":"suggested-articles",children:e.jsxs(Ke,{children:[e.jsx("h2",{children:u("new-request-form.suggested-articles","Suggested articles")}),e.jsx(Ye,{children:r.map((n=>e.jsx(Je,{children:e.jsx(I,{href:n.html_url,children:n.name})},n.html_url)))})]})}):null}const Qe=m.h3`
  font-size: ${e=>e.theme.fontSizes.md};
  font-weight: ${e=>e.theme.fontWeights.bold};
`,en=m(H)`
  color: ${e=>G("successHue",700,e.theme)};
`,nn=m(X)`
  position: absolute;
  top: ${e=>5.5*e.theme.space.base}px;
  inset-inline-start: ${e=>4*e.theme.space.base+"px"};
`,tn=m(I)`
  display: inline-block;
  margin-top: ${e=>e.theme.space.sm};
`;function sn({authToken:n,interactionAccessToken:t,articles:s,requestId:r,hasRequestManagement:a,isSignedIn:i,helpCenterPath:u,requestsPath:c,requestPath:d}){const[m,f]=o.useState(0),h=O(),{t:p}=l(),j=()=>String(s[m]?.article_id),g=()=>{ee({type:"success",message:p("new-request-form.answer-bot-modal.request-submitted","Your request was successfully submitted")}),window.location.assign((()=>{if(i)return a?d:u;{const e=new URLSearchParams;return e.set("return_to",c),`${u}?${e.toString()}`}})())};return e.jsxs(U,{appendToNode:h,onClose:()=>{g()},children:[e.jsxs(en,{tag:"h2",children:[e.jsx(nn,{}),p("new-request-form.answer-bot-modal.request-submitted","Your request was successfully submitted")]}),e.jsxs(B,{children:[e.jsx(Qe,{children:p("new-request-form.answer-bot-modal.title","While you wait, do any of these articles answer your question?")}),e.jsx("p",{children:p("new-request-form.answer-bot-modal.footer-content","If it does, we can close your recent request {{requestId}}",{requestId:`‭#${r}‬`})}),e.jsx(W,{level:4,expandedSections:[m],onChange:e=>{f(e)},children:s.map((({article_id:t,html_url:s,snippet:r,title:a})=>e.jsxs(W.Section,{children:[e.jsx(W.Header,{children:e.jsx(W.Label,{children:a})}),e.jsxs(W.Panel,{children:[e.jsx(K,{dangerouslySetInnerHTML:{__html:r}}),e.jsx(tn,{isExternal:!0,href:`${s}?auth_token=${n}`,target:"_blank",children:p("new-request-form.answer-bot-modal.view-article","View article")})]})]},t)))})]}),e.jsxs(Y,{children:[e.jsx(J,{children:e.jsx(Z,{onClick:()=>{(async()=>{await fetch("/api/v2/answer_bot/rejection",{method:"POST",body:JSON.stringify({article_id:j(),interaction_access_token:t,reason_id:0}),headers:{"Content-Type":"application/json"}}),g()})()},children:p("new-request-form.answer-bot-modal.mark-irrelevant","No, I need help")})}),e.jsx(J,{children:e.jsx(Z,{isPrimary:!0,onClick:()=>{(async()=>{(await fetch("/api/v2/answer_bot/resolution",{method:"POST",body:JSON.stringify({article_id:j(),interaction_access_token:t}),headers:{"Content-Type":"application/json"}})).ok?ee({type:"success",message:p("new-request-form.answer-bot-modal.request-closed","Nice. Your request has been closed.")}):ee({type:"error",message:p("new-request-form.answer-bot-modal.solve-error","There was an error closing your request")}),window.location.href=u})()},children:p("new-request-form.answer-bot-modal.solve-request","Yes, close my request")})})]}),e.jsx(Q,{"aria-label":p("new-request-form.close-label","Close")})]})}const rn={value:"",name:"-"};function an({field:n,userId:s,organizationId:r,onChange:a}){const{id:i,label:u,error:c,value:d,name:m,required:f,description:h,relationship_target_type:w}=n,[q,y]=o.useState([]),[k,_]=o.useState(null),[C,S]=o.useState(d),[I,T]=o.useState(!1),{t:F}=l(),P=w.replace("zen:custom_object:","");const R={name:F("new-request-form.lookup-field.loading-options","Loading items..."),id:"loading"},L={name:F("new-request-form.lookup-field.no-matches-found","No matches found"),id:"no-results"},$=o.useCallback((async e=>{try{const n=await fetch(`/api/v2/custom_objects/${P}/records/${e}`);if(n.ok){const{custom_object_record:e}=await n.json(),t={name:e.name,value:e.id};_(t),S(e.name)}}catch(e){console.error(e)}}),[P]),E=o.useCallback((async e=>{const n=new URLSearchParams;n.set("name",e.toLocaleLowerCase()),n.set("source","zen:ticket"),n.set("field_id",i.toString()),n.set("requester_id",s.toString()),null!==r&&n.set("organization_id",r),T(!0);try{const e=await fetch(`/api/v2/custom_objects/${P}/records/autocomplete?${n.toString()}`),t=await e.json();if(e.ok){let e=t.custom_object_records.map((({name:e,id:n})=>({name:e,value:n})));k&&(e=e.filter((e=>e.value!==k.value)),e=[k,...e]),y(e)}else y([])}catch(e){console.error(e)}finally{T(!1)}}),[P,i,r,k,s]),D=o.useMemo((()=>ne(E,300)),[E]);o.useEffect((()=>()=>D.cancel()),[D]);const M=o.useCallback((({inputValue:e,selectionValue:n})=>{if(void 0!==n)if(""==n)_(rn),S(rn.name),y([]),a(rn.value);else{const e=q.find((e=>e.value===n));e&&(S(e.name),_(e),y([e]),a(e.value))}void 0!==e&&(S(e),D(e))}),[D,a,q]);o.useEffect((()=>{d&&$(d)}),[]);return e.jsxs(p,{children:[e.jsxs(v,{children:[u,f&&e.jsx(t,{"aria-hidden":"true",children:"*"})]}),h&&e.jsx(x,{dangerouslySetInnerHTML:{__html:h}}),e.jsxs(j,{inputProps:{required:f},"data-test-id":"lookup-field-combobox",validation:c?"error":void 0,inputValue:C,selectionValue:k?.value,isAutocomplete:!0,placeholder:F("new-request-form.lookup-field.placeholder","Search {{label}}",{label:u.toLowerCase()}),onFocus:()=>{S(""),E("*")},onChange:M,renderValue:()=>k?k?.name:rn.name,children:[k?.name!==rn.name&&e.jsx(g,{value:"",label:"-",children:e.jsx(de,{})}),I&&e.jsx(g,{isDisabled:!0,value:R.name},R.id),!I&&C?.length>0&&0===q.length&&e.jsx(g,{isDisabled:!0,value:L.name},L.id),!I&&0!==q.length&&q.map((n=>e.jsx(g,{value:n.value,label:n.name,"data-test-id":`option-${n.name}`},n.value)))]}),c&&e.jsx(b,{validation:"error",children:c}),e.jsx("input",{type:"hidden",name:m,value:k?.value})]})}const on=m(K)`
  margin: ${e=>e.theme.space.md} 0;
`,ln=m.form`
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.space.md};
`,un=m.div`
  margin-top: ${e=>e.theme.space.md};
`;function cn({requestForm:n,wysiwyg:t,newRequestPath:s,parentId:r,parentIdPath:a,locale:i,baseLocale:u,hasAtMentions:c,userRole:d,userId:m,brandId:f,organizations:h,answerBotModal:p}){const{ticket_fields:j,action:g,http_method:b,accept_charset:x,errors:w,parent_id_field:v,ticket_form_field:q,email_field:y,cc_field:k,organization_field:_,due_date_field:C,end_user_conditions:S,attachments_field:T,inline_attachments_fields:F,description_mimetype_field:P}=n,{answerBot:R}=p,{ticketFields:L,emailField:$,ccField:E,organizationField:D,dueDateField:M}=Se({ticketFields:j,emailField:y,ccField:k,organizationField:_,dueDateField:C}),[V,A]=o.useState(L),[N,z]=o.useState(D),[G,H]=o.useState(M),X=$e(V,S),{formRefCallback:O,handleSubmit:U}=ye(V),{t:B}=l(),W=h.length>0&&h[0]?.id?h[0]?.id?.toString():null,K=o.useCallback(((e,n)=>{A(V.map((t=>t.name===e.name?{...t,value:n}:t)))}),[V]);return e.jsxs(e.Fragment,{children:[r&&e.jsx(on,{children:e.jsx(I,{href:a,children:B("new-request-form.parent-request-link","Follow-up to request {{parentId}}",{parentId:`‭#${r}‬`})})}),e.jsxs(ln,{ref:O,action:g,method:b,acceptCharset:x,noValidate:!0,onSubmit:U,children:[w&&e.jsx(te,{type:"error",children:w}),v&&e.jsx(qe,{field:v}),q.options.length>0&&e.jsx(ve,{field:q,newRequestPath:s}),$&&e.jsx(le,{field:$},$.name),E&&e.jsx(He,{field:E}),N&&e.jsx(me,{field:N,onChange:e=>{!function(e){null!==N&&z({...N,value:e})}(e)}},N.name),X.map((n=>{switch(n.type){case"subject":return e.jsxs(e.Fragment,{children:[e.jsx(le,{field:n,onChange:e=>K(n,e)},n.name),e.jsx(Ze,{query:n.value,locale:i})]});case"text":case"integer":case"decimal":case"regexp":return e.jsx(le,{field:n,onChange:e=>K(n,e)},n.name);case"partialcreditcard":return e.jsx(Oe,{field:n,onChange:e=>K(n,e)});case"description":return e.jsxs(e.Fragment,{children:[e.jsx(ce,{field:n,hasWysiwyg:t,baseLocale:u,hasAtMentions:c,userRole:d,brandId:f,onChange:e=>K(n,e)},n.name),e.jsx("input",{type:"hidden",name:P.name,value:t?"text/html":"text/plain"})]});case"textarea":return e.jsx(ce,{field:n,hasWysiwyg:!1,baseLocale:u,hasAtMentions:c,userRole:d,brandId:f,onChange:e=>K(n,e)},n.name);case"priority":case"basic_priority":case"tickettype":return e.jsxs(e.Fragment,{children:[e.jsx(me,{field:n,onChange:e=>K(n,e)},n.name),"task"===n.value&&e.jsx(Ee,{field:G,locale:u,valueFormat:"dateTime",onChange:e=>{!function(e){null!==G&&H({...G,value:e})}(e)}})]});case"checkbox":return e.jsx(fe,{field:n,onChange:e=>K(n,e)});case"date":return e.jsx(Ee,{field:n,locale:u,valueFormat:"date",onChange:e=>K(n,e)});case"multiselect":return e.jsx(xe,{field:n});case"tagger":return e.jsx(Ue,{field:n,onChange:e=>K(n,e)},n.name);case"lookup":return e.jsx(an,{field:n,userId:m,organizationId:null!==N?N.value:W,onChange:e=>K(n,e)},n.name);default:return e.jsx(e.Fragment,{})}})),T&&e.jsx(Pe,{field:T}),F.map((({type:n,name:t,value:s},r)=>e.jsx("input",{type:n,name:t,value:s},r))),e.jsx(un,{children:(0===q.options.length||q.value)&&e.jsx(Z,{isPrimary:!0,type:"submit",children:B("new-request-form.submit","Submit")})})]}),R.auth_token&&R.interaction_access_token&&R.articles.length>0&&R.request_id&&e.jsx(sn,{authToken:R.auth_token,interactionAccessToken:R.interaction_access_token,articles:R.articles,requestId:R.request_id,...p})]})}async function dn(n,t,s){const{baseLocale:r}=t;se(r),await re(r,(()=>function(e){switch(e){case"./translations/locales/af.json":return import("new-request-form-translations").then((function(e){return e.a}));case"./translations/locales/ar-x-pseudo.json":return import("new-request-form-translations").then((function(e){return e.b}));case"./translations/locales/ar.json":return import("new-request-form-translations").then((function(e){return e.c}));case"./translations/locales/az.json":return import("new-request-form-translations").then((function(e){return e.d}));case"./translations/locales/be.json":return import("new-request-form-translations").then((function(e){return e.e}));case"./translations/locales/bg.json":return import("new-request-form-translations").then((function(e){return e.f}));case"./translations/locales/bn.json":return import("new-request-form-translations").then((function(e){return e.g}));case"./translations/locales/bs.json":return import("new-request-form-translations").then((function(e){return e.h}));case"./translations/locales/ca.json":return import("new-request-form-translations").then((function(e){return e.i}));case"./translations/locales/cs.json":return import("new-request-form-translations").then((function(e){return e.j}));case"./translations/locales/cy.json":return import("new-request-form-translations").then((function(e){return e.k}));case"./translations/locales/da.json":return import("new-request-form-translations").then((function(e){return e.l}));case"./translations/locales/de-de.json":return import("new-request-form-translations").then((function(e){return e.m}));case"./translations/locales/de-x-informal.json":return import("new-request-form-translations").then((function(e){return e.n}));case"./translations/locales/de.json":return import("new-request-form-translations").then((function(e){return e.o}));case"./translations/locales/el.json":return import("new-request-form-translations").then((function(e){return e.p}));case"./translations/locales/en-001.json":return import("new-request-form-translations").then((function(e){return e.q}));case"./translations/locales/en-150.json":return import("new-request-form-translations").then((function(e){return e.r}));case"./translations/locales/en-au.json":return import("new-request-form-translations").then((function(e){return e.s}));case"./translations/locales/en-ca.json":return import("new-request-form-translations").then((function(e){return e.t}));case"./translations/locales/en-gb.json":return import("new-request-form-translations").then((function(e){return e.u}));case"./translations/locales/en-my.json":return import("new-request-form-translations").then((function(e){return e.v}));case"./translations/locales/en-ph.json":return import("new-request-form-translations").then((function(e){return e.w}));case"./translations/locales/en-se.json":return import("new-request-form-translations").then((function(e){return e.x}));case"./translations/locales/en-us.json":return import("new-request-form-translations").then((function(e){return e.y}));case"./translations/locales/en-x-dev.json":return import("new-request-form-translations").then((function(e){return e.z}));case"./translations/locales/en-x-keys.json":return import("new-request-form-translations").then((function(e){return e.A}));case"./translations/locales/en-x-obsolete.json":return import("new-request-form-translations").then((function(e){return e.B}));case"./translations/locales/en-x-pseudo.json":return import("new-request-form-translations").then((function(e){return e.C}));case"./translations/locales/en-x-test.json":return import("new-request-form-translations").then((function(e){return e.D}));case"./translations/locales/es-419.json":return import("new-request-form-translations").then((function(e){return e.E}));case"./translations/locales/es-es.json":return import("new-request-form-translations").then((function(e){return e.F}));case"./translations/locales/es.json":return import("new-request-form-translations").then((function(e){return e.G}));case"./translations/locales/et.json":return import("new-request-form-translations").then((function(e){return e.H}));case"./translations/locales/eu.json":return import("new-request-form-translations").then((function(e){return e.I}));case"./translations/locales/fa-af.json":return import("new-request-form-translations").then((function(e){return e.J}));case"./translations/locales/fa.json":return import("new-request-form-translations").then((function(e){return e.K}));case"./translations/locales/fi.json":return import("new-request-form-translations").then((function(e){return e.L}));case"./translations/locales/fil.json":return import("new-request-form-translations").then((function(e){return e.M}));case"./translations/locales/fo.json":return import("new-request-form-translations").then((function(e){return e.N}));case"./translations/locales/fr-ca.json":return import("new-request-form-translations").then((function(e){return e.O}));case"./translations/locales/fr.json":return import("new-request-form-translations").then((function(e){return e.P}));case"./translations/locales/ga.json":return import("new-request-form-translations").then((function(e){return e.Q}));case"./translations/locales/he.json":return import("new-request-form-translations").then((function(e){return e.R}));case"./translations/locales/hi.json":return import("new-request-form-translations").then((function(e){return e.S}));case"./translations/locales/hr.json":return import("new-request-form-translations").then((function(e){return e.T}));case"./translations/locales/hu.json":return import("new-request-form-translations").then((function(e){return e.U}));case"./translations/locales/hy.json":return import("new-request-form-translations").then((function(e){return e.V}));case"./translations/locales/id.json":return import("new-request-form-translations").then((function(e){return e.W}));case"./translations/locales/is.json":return import("new-request-form-translations").then((function(e){return e.X}));case"./translations/locales/it-ch.json":return import("new-request-form-translations").then((function(e){return e.Y}));case"./translations/locales/it.json":return import("new-request-form-translations").then((function(e){return e.Z}));case"./translations/locales/ja.json":return import("new-request-form-translations").then((function(e){return e._}));case"./translations/locales/ka.json":return import("new-request-form-translations").then((function(e){return e.$}));case"./translations/locales/kk.json":return import("new-request-form-translations").then((function(e){return e.a0}));case"./translations/locales/kl-dk.json":return import("new-request-form-translations").then((function(e){return e.a1}));case"./translations/locales/ko.json":return import("new-request-form-translations").then((function(e){return e.a2}));case"./translations/locales/ku.json":return import("new-request-form-translations").then((function(e){return e.a3}));case"./translations/locales/lt.json":return import("new-request-form-translations").then((function(e){return e.a4}));case"./translations/locales/lv.json":return import("new-request-form-translations").then((function(e){return e.a5}));case"./translations/locales/mk.json":return import("new-request-form-translations").then((function(e){return e.a6}));case"./translations/locales/mn.json":return import("new-request-form-translations").then((function(e){return e.a7}));case"./translations/locales/ms.json":return import("new-request-form-translations").then((function(e){return e.a8}));case"./translations/locales/mt.json":return import("new-request-form-translations").then((function(e){return e.a9}));case"./translations/locales/my.json":return import("new-request-form-translations").then((function(e){return e.aa}));case"./translations/locales/nl-be.json":return import("new-request-form-translations").then((function(e){return e.ab}));case"./translations/locales/nl.json":return import("new-request-form-translations").then((function(e){return e.ac}));case"./translations/locales/no.json":return import("new-request-form-translations").then((function(e){return e.ad}));case"./translations/locales/pl.json":return import("new-request-form-translations").then((function(e){return e.ae}));case"./translations/locales/pt-br.json":return import("new-request-form-translations").then((function(e){return e.af}));case"./translations/locales/pt.json":return import("new-request-form-translations").then((function(e){return e.ag}));case"./translations/locales/ro.json":return import("new-request-form-translations").then((function(e){return e.ah}));case"./translations/locales/ru.json":return import("new-request-form-translations").then((function(e){return e.ai}));case"./translations/locales/sk.json":return import("new-request-form-translations").then((function(e){return e.aj}));case"./translations/locales/sl.json":return import("new-request-form-translations").then((function(e){return e.ak}));case"./translations/locales/sq.json":return import("new-request-form-translations").then((function(e){return e.al}));case"./translations/locales/sr-me.json":return import("new-request-form-translations").then((function(e){return e.am}));case"./translations/locales/sr.json":return import("new-request-form-translations").then((function(e){return e.an}));case"./translations/locales/sv.json":return import("new-request-form-translations").then((function(e){return e.ao}));case"./translations/locales/th.json":return import("new-request-form-translations").then((function(e){return e.ap}));case"./translations/locales/tr.json":return import("new-request-form-translations").then((function(e){return e.aq}));case"./translations/locales/uk.json":return import("new-request-form-translations").then((function(e){return e.ar}));case"./translations/locales/ur.json":return import("new-request-form-translations").then((function(e){return e.as}));case"./translations/locales/uz.json":return import("new-request-form-translations").then((function(e){return e.at}));case"./translations/locales/vi.json":return import("new-request-form-translations").then((function(e){return e.au}));case"./translations/locales/zh-cn.json":return import("new-request-form-translations").then((function(e){return e.av}));case"./translations/locales/zh-tw.json":return import("new-request-form-translations").then((function(e){return e.aw}));default:return new Promise((function(n,t){("function"==typeof queueMicrotask?queueMicrotask:setTimeout)(t.bind(null,new Error("Unknown variable dynamic import: "+e)))}))}}(`./translations/locales/${r}.json`))),ae.render(e.jsx(oe,{theme:ie(n),children:e.jsx(cn,{...t})}),s)}export{dn as renderNewRequestForm};
=======
`;
const Container = styled.div`
  display: grid;
  animation: ${slideIn} 200ms forwards;
`;
const InnerContainer = styled.div`
  overflow: hidden;
`;
const UnstyledList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;
const ListItem = styled.li`
  margin: ${(props) => props.theme.space.sm} 0;
`;
function hasMinLength(value) {
  const firstLetter = value.charCodeAt(0);
  /*
   * Special case considering CJK characters. Since ideographs represent
   * whole words, we want to start searching when just two has been typed.
   *
   * Unicode range reference:
   * http://www.unicode.org/versions/Unicode5.0.0/ch12.pdf#G16616
   */
  if (firstLetter >= 0x4e00 && firstLetter <= 0x2fa1f) {
    return value.length >= 2;
  } else {
    return value.length >= 3;
  }
}
function SuggestedArticles({ query: inputQuery, locale }) {
  const debouncedQuery = useDebounce(inputQuery, 500);
  const [articles, setArticles] = reactExports.useState([]);
  const requestsCache = reactExports.useRef({});
  const { t } = useTranslation();
  reactExports.useEffect(() => {
    const query = debouncedQuery?.trim().toLocaleLowerCase();
    if (!query || !hasMinLength(query)) {
      setArticles([]);
      return;
    }
    const requestUrl = new URL(
      `${window.location.origin}/api/v2/help_center/deflection/suggestions.json`
    );
    requestUrl.searchParams.append("locale", locale);
    requestUrl.searchParams.append("query", query);
    const cachedResponse = requestsCache.current[requestUrl.toString()];
    if (cachedResponse) {
      setArticles(cachedResponse);
      return;
    }
    fetch(requestUrl)
      .then((response) => response.json())
      .then(({ results }) => {
        requestsCache.current[requestUrl.toString()] = results;
        setArticles(results);
      });
  }, [debouncedQuery, locale]);
  return articles.length > 0
    ? jsxRuntimeExports.jsx(Container, {
        "data-test-id": "suggested-articles",
        children: jsxRuntimeExports.jsxs(InnerContainer, {
          children: [
            jsxRuntimeExports.jsx("h2", {
              children: t(
                "new-request-form.suggested-articles",
                "Suggested articles"
              ),
            }),
            jsxRuntimeExports.jsx(UnstyledList, {
              children: articles.map((article) =>
                jsxRuntimeExports.jsx(
                  ListItem,
                  {
                    children: jsxRuntimeExports.jsx(Anchor, {
                      href: article.html_url,
                      children: article.name,
                    }),
                  },
                  article.html_url
                )
              ),
            }),
          ],
        }),
      })
    : null;
}

const H3 = styled.h3`
  font-size: ${(props) => props.theme.fontSizes.md};
  font-weight: ${(props) => props.theme.fontWeights.bold};
`;
const StyledHeader = styled(Header)`
  color: ${(props) => getColorV8("successHue", 700, props.theme)};
`;
const StyledSuccessIcon = styled(SvgCheckCircleStroke)`
  position: absolute;
  top: ${(props) => props.theme.space.base * 5.5}px;
  inset-inline-start: ${(props) => `${props.theme.space.base * 4}px`};
`;
const ArticleLink = styled(Anchor)`
  display: inline-block;
  margin-top: ${(props) => props.theme.space.sm};
`;
function AnswerBotModal({
  authToken,
  interactionAccessToken,
  articles,
  requestId,
  hasRequestManagement,
  isSignedIn,
  helpCenterPath,
  requestsPath,
  requestPath,
}) {
  const [expandedIndex, setExpandedIndex] = reactExports.useState(0);
  const modalContainer = useModalContainer();
  const { t } = useTranslation();
  const getExpandedArticleId = () => {
    return String(articles[expandedIndex]?.article_id);
  };
  const getUnsolvedRedirectUrl = () => {
    if (!isSignedIn) {
      const searchParams = new URLSearchParams();
      searchParams.set("return_to", requestsPath);
      return `${helpCenterPath}?${searchParams.toString()}`;
    } else if (hasRequestManagement) {
      return requestPath;
    } else {
      return helpCenterPath;
    }
  };
  const addUnsolvedNotificationAndRedirect = () => {
    addFlashNotification({
      type: "success",
      message: t(
        "new-request-form.answer-bot-modal.request-submitted",
        "Your request was successfully submitted"
      ),
    });
    window.location.assign(getUnsolvedRedirectUrl());
  };
  const solveRequest = async () => {
    const response = await fetch("/api/v2/answer_bot/resolution", {
      method: "POST",
      body: JSON.stringify({
        article_id: getExpandedArticleId(),
        interaction_access_token: interactionAccessToken,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      addFlashNotification({
        type: "success",
        message: t(
          "new-request-form.answer-bot-modal.request-closed",
          "Nice. Your request has been closed."
        ),
      });
    } else {
      addFlashNotification({
        type: "error",
        message: t(
          "new-request-form.answer-bot-modal.solve-error",
          "There was an error closing your request"
        ),
      });
    }
    window.location.href = helpCenterPath;
  };
  const markArticleAsIrrelevant = async () => {
    await fetch("/api/v2/answer_bot/rejection", {
      method: "POST",
      body: JSON.stringify({
        article_id: getExpandedArticleId(),
        interaction_access_token: interactionAccessToken,
        reason_id: 0,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    addUnsolvedNotificationAndRedirect();
  };
  return jsxRuntimeExports.jsxs(Modal, {
    appendToNode: modalContainer,
    onClose: () => {
      addUnsolvedNotificationAndRedirect();
    },
    children: [
      jsxRuntimeExports.jsxs(StyledHeader, {
        tag: "h2",
        children: [
          jsxRuntimeExports.jsx(StyledSuccessIcon, {}),
          t(
            "new-request-form.answer-bot-modal.request-submitted",
            "Your request was successfully submitted"
          ),
        ],
      }),
      jsxRuntimeExports.jsxs(Body, {
        children: [
          jsxRuntimeExports.jsx(H3, {
            children: t(
              "new-request-form.answer-bot-modal.title",
              "While you wait, do any of these articles answer your question?"
            ),
          }),
          jsxRuntimeExports.jsx("p", {
            children: t(
              "new-request-form.answer-bot-modal.footer-content",
              "If it does, we can close your recent request {{requestId}}",
              {
                requestId: `\u202D#${requestId}\u202C`,
              }
            ),
          }),
          jsxRuntimeExports.jsx(Accordion, {
            level: 4,
            expandedSections: [expandedIndex],
            onChange: (index) => {
              setExpandedIndex(index);
            },
            children: articles.map(({ article_id, html_url, snippet, title }) =>
              jsxRuntimeExports.jsxs(
                Accordion.Section,
                {
                  children: [
                    jsxRuntimeExports.jsx(Accordion.Header, {
                      children: jsxRuntimeExports.jsx(Accordion.Label, {
                        children: title,
                      }),
                    }),
                    jsxRuntimeExports.jsxs(Accordion.Panel, {
                      children: [
                        jsxRuntimeExports.jsx(Paragraph, {
                          dangerouslySetInnerHTML: { __html: snippet },
                        }),
                        jsxRuntimeExports.jsx(ArticleLink, {
                          isExternal: true,
                          href: `${html_url}?auth_token=${authToken}`,
                          target: "_blank",
                          children: t(
                            "new-request-form.answer-bot-modal.view-article",
                            "View article"
                          ),
                        }),
                      ],
                    }),
                  ],
                },
                article_id
              )
            ),
          }),
        ],
      }),
      jsxRuntimeExports.jsxs(Footer$1, {
        children: [
          jsxRuntimeExports.jsx(FooterItem, {
            children: jsxRuntimeExports.jsx(Button, {
              onClick: () => {
                markArticleAsIrrelevant();
              },
              children: t(
                "new-request-form.answer-bot-modal.mark-irrelevant",
                "No, I need help"
              ),
            }),
          }),
          jsxRuntimeExports.jsx(FooterItem, {
            children: jsxRuntimeExports.jsx(Button, {
              isPrimary: true,
              onClick: () => {
                solveRequest();
              },
              children: t(
                "new-request-form.answer-bot-modal.solve-request",
                "Yes, close my request"
              ),
            }),
          }),
        ],
      }),
      jsxRuntimeExports.jsx(Close$1, {
        "aria-label": t("new-request-form.close-label", "Close"),
      }),
    ],
  });
}

function getCustomObjectKey(targetType) {
  return targetType.replace("zen:custom_object:", "");
}
const EMPTY_OPTION = {
  value: "",
  name: "-",
};
function LookupField({ field, userId, organizationId, onChange }) {
  const {
    id: fieldId,
    label,
    error,
    value,
    name,
    required,
    description,
    relationship_target_type,
  } = field;
  const [options, setOptions] = reactExports.useState([]);
  const [selectedOption, setSelectedOption] = reactExports.useState(null);
  const [inputValue, setInputValue] = reactExports.useState(value);
  const [isLoadingOptions, setIsLoadingOptions] = reactExports.useState(false);
  const { t } = useTranslation();
  const customObjectKey = getCustomObjectKey(relationship_target_type);
  const loadingOption = {
    name: t(
      "new-request-form.lookup-field.loading-options",
      "Loading items..."
    ),
    id: "loading",
  };
  const noResultsOption = {
    name: t(
      "new-request-form.lookup-field.no-matches-found",
      "No matches found"
    ),
    id: "no-results",
  };
  const fetchSelectedOption = reactExports.useCallback(
    async (selectionValue) => {
      try {
        const res = await fetch(
          `/api/v2/custom_objects/${customObjectKey}/records/${selectionValue}`
        );
        if (res.ok) {
          const { custom_object_record } = await res.json();
          const newSelectedOption = {
            name: custom_object_record.name,
            value: custom_object_record.id,
          };
          setSelectedOption(newSelectedOption);
          setInputValue(custom_object_record.name);
        }
      } catch (error) {
        console.error(error);
      }
    },
    [customObjectKey]
  );
  const fetchOptions = reactExports.useCallback(
    async (inputValue) => {
      const searchParams = new URLSearchParams();
      searchParams.set("name", inputValue.toLocaleLowerCase());
      searchParams.set("source", "zen:ticket");
      searchParams.set("field_id", fieldId.toString());
      searchParams.set("requester_id", userId.toString());
      if (organizationId !== null)
        searchParams.set("organization_id", organizationId);
      setIsLoadingOptions(true);
      try {
        const response = await fetch(
          `/api/v2/custom_objects/${customObjectKey}/records/autocomplete?${searchParams.toString()}`
        );
        const data = await response.json();
        if (response.ok) {
          let fetchedOptions = data.custom_object_records.map(
            ({ name, id }) => ({
              name,
              value: id,
            })
          );
          if (selectedOption) {
            fetchedOptions = fetchedOptions.filter(
              (option) => option.value !== selectedOption.value
            );
            fetchedOptions = [selectedOption, ...fetchedOptions];
          }
          setOptions(fetchedOptions);
        } else {
          setOptions([]);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoadingOptions(false);
      }
    },
    [customObjectKey, fieldId, organizationId, selectedOption, userId]
  );
  const debouncedFetchOptions = reactExports.useMemo(
    () => debounce(fetchOptions, 300),
    [fetchOptions]
  );
  reactExports.useEffect(() => {
    return () => debouncedFetchOptions.cancel();
  }, [debouncedFetchOptions]);
  const handleChange = reactExports.useCallback(
    ({ inputValue, selectionValue }) => {
      if (selectionValue !== undefined) {
        if (selectionValue == "") {
          setSelectedOption(EMPTY_OPTION);
          setInputValue(EMPTY_OPTION.name);
          setOptions([]);
          onChange(EMPTY_OPTION.value);
        } else {
          const selectedOption = options.find(
            (option) => option.value === selectionValue
          );
          if (selectedOption) {
            setInputValue(selectedOption.name);
            setSelectedOption(selectedOption);
            setOptions([selectedOption]);
            onChange(selectedOption.value);
          }
        }
      }
      if (inputValue !== undefined) {
        setInputValue(inputValue);
        debouncedFetchOptions(inputValue);
      }
    },
    [debouncedFetchOptions, onChange, options]
  );
  reactExports.useEffect(() => {
    if (value) {
      fetchSelectedOption(value);
    }
  }, []); //we don't set dependency array as we want this hook to be called only once
  const onFocus = () => {
    setInputValue("");
    fetchOptions("*");
  };
  return jsxRuntimeExports.jsxs(Field$1, {
    children: [
      jsxRuntimeExports.jsxs(Label$1, {
        children: [
          label,
          required &&
            jsxRuntimeExports.jsx(Span, {
              "aria-hidden": "true",
              children: "*",
            }),
        ],
      }),
      description &&
        jsxRuntimeExports.jsx(Hint$1, {
          dangerouslySetInnerHTML: { __html: description },
        }),
      jsxRuntimeExports.jsxs(Combobox, {
        inputProps: { required },
        "data-test-id": "lookup-field-combobox",
        validation: error ? "error" : undefined,
        inputValue: inputValue,
        selectionValue: selectedOption?.value,
        isAutocomplete: true,
        placeholder: t(
          "new-request-form.lookup-field.placeholder",
          "Search {{label}}",
          { label: label.toLowerCase() }
        ),
        onFocus: onFocus,
        onChange: handleChange,
        renderValue: () =>
          selectedOption ? selectedOption?.name : EMPTY_OPTION.name,
        children: [
          selectedOption?.name !== EMPTY_OPTION.name &&
            jsxRuntimeExports.jsx(Option, {
              value: "",
              label: "-",
              children: jsxRuntimeExports.jsx(EmptyValueOption, {}),
            }),
          isLoadingOptions &&
            jsxRuntimeExports.jsx(
              Option,
              { isDisabled: true, value: loadingOption.name },
              loadingOption.id
            ),
          !isLoadingOptions &&
            inputValue?.length > 0 &&
            options.length === 0 &&
            jsxRuntimeExports.jsx(
              Option,
              { isDisabled: true, value: noResultsOption.name },
              noResultsOption.id
            ),
          !isLoadingOptions &&
            options.length !== 0 &&
            options.map((option) =>
              jsxRuntimeExports.jsx(
                Option,
                {
                  value: option.value,
                  label: option.name,
                  "data-test-id": `option-${option.name}`,
                },
                option.value
              )
            ),
        ],
      }),
      error &&
        jsxRuntimeExports.jsx(Message$1, {
          validation: "error",
          children: error,
        }),
      jsxRuntimeExports.jsx("input", {
        type: "hidden",
        name: name,
        value: selectedOption?.value,
      }),
    ],
  });
}

const StyledParagraph = styled(Paragraph)`
  margin: ${(props) => props.theme.space.md} 0;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.space.md};
`;
const Footer = styled.div`
  margin-top: ${(props) => props.theme.space.md};
`;
function NewRequestForm({
  requestForm,
  wysiwyg,
  newRequestPath,
  parentId,
  parentIdPath,
  locale,
  baseLocale,
  hasAtMentions,
  userRole,
  userId,
  brandId,
  organizations,
  answerBotModal,
}) {
  const {
    ticket_fields,
    action,
    http_method,
    accept_charset,
    errors,
    parent_id_field,
    ticket_form_field,
    email_field,
    cc_field,
    organization_field,
    due_date_field,
    end_user_conditions,
    attachments_field,
    inline_attachments_fields,
    description_mimetype_field,
  } = requestForm;
  const { answerBot } = answerBotModal;
  const {
    ticketFields: prefilledTicketFields,
    emailField,
    ccField,
    organizationField: prefilledOrganizationField,
    dueDateField: prefilledDueDateField,
  } = usePrefilledTicketFields({
    ticketFields: ticket_fields,
    emailField: email_field,
    ccField: cc_field,
    organizationField: organization_field,
    dueDateField: due_date_field,
  });
  const [ticketFields, setTicketFields] = reactExports.useState(
    prefilledTicketFields
  );
  const [organizationField, setOrganizationField] = reactExports.useState(
    prefilledOrganizationField
  );
  const [dueDateField, setDueDateField] = reactExports.useState(
    prefilledDueDateField
  );
  const visibleFields = getVisibleFields(ticketFields, end_user_conditions);
  const { formRefCallback, handleSubmit } = useFormSubmit(ticketFields);
  const { t } = useTranslation();
  const defaultOrganizationId =
    organizations.length > 0 && organizations[0]?.id
      ? organizations[0]?.id?.toString()
      : null;
  const handleChange = reactExports.useCallback(
    (field, value) => {
      setTicketFields(
        ticketFields.map((ticketField) =>
          ticketField.name === field.name
            ? { ...ticketField, value }
            : ticketField
        )
      );
    },
    [ticketFields]
  );
  function handleOrganizationChange(value) {
    if (organizationField === null) {
      return;
    }
    setOrganizationField({ ...organizationField, value });
  }
  function handleDueDateChange(value) {
    if (dueDateField === null) {
      return;
    }
    setDueDateField({ ...dueDateField, value });
  }
  return jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, {
    children: [
      parentId &&
        jsxRuntimeExports.jsx(StyledParagraph, {
          children: jsxRuntimeExports.jsx(Anchor, {
            href: parentIdPath,
            children: t(
              "new-request-form.parent-request-link",
              "Follow-up to request {{parentId}}",
              {
                parentId: `\u202D#${parentId}\u202C`,
              }
            ),
          }),
        }),
      jsxRuntimeExports.jsxs(Form, {
        ref: formRefCallback,
        action: action,
        method: http_method,
        acceptCharset: accept_charset,
        noValidate: true,
        onSubmit: handleSubmit,
        children: [
          errors &&
            jsxRuntimeExports.jsx(Alert, { type: "error", children: errors }),
          parent_id_field &&
            jsxRuntimeExports.jsx(ParentTicketField, {
              field: parent_id_field,
            }),
          ticket_form_field.options.length > 0 &&
            jsxRuntimeExports.jsx(TicketFormField, {
              field: ticket_form_field,
              newRequestPath: newRequestPath,
            }),
          emailField &&
            jsxRuntimeExports.jsx(
              Input,
              { field: emailField },
              emailField.name
            ),
          ccField && jsxRuntimeExports.jsx(CcField, { field: ccField }),
          organizationField &&
            jsxRuntimeExports.jsx(
              DropDown,
              {
                field: organizationField,
                onChange: (value) => {
                  handleOrganizationChange(value);
                },
              },
              organizationField.name
            ),
          visibleFields.map((field) => {
            switch (field.type) {
              case "subject":
                return jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, {
                  children: [
                    jsxRuntimeExports.jsx(
                      Input,
                      {
                        field: field,
                        onChange: (value) => handleChange(field, value),
                      },
                      field.name
                    ),
                    jsxRuntimeExports.jsx(SuggestedArticles, {
                      query: field.value,
                      locale: locale,
                    }),
                  ],
                });
              case "text":
              case "integer":
              case "decimal":
              case "regexp":
                return jsxRuntimeExports.jsx(
                  Input,
                  {
                    field: field,
                    onChange: (value) => handleChange(field, value),
                  },
                  field.name
                );
              case "partialcreditcard":
                return jsxRuntimeExports.jsx(CreditCard, {
                  field: field,
                  onChange: (value) => handleChange(field, value),
                });
              // Issue description
              case "description":
                return jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, {
                  children: [
                    jsxRuntimeExports.jsx(
                      TextArea,
                      {
                        field: field,
                        hasWysiwyg: wysiwyg,
                        baseLocale: baseLocale,
                        hasAtMentions: hasAtMentions,
                        userRole: userRole,
                        brandId: brandId,
                        onChange: (value) => handleChange(field, value),
                      },
                      field.name
                    ),
                    jsxRuntimeExports.jsx("input", {
                      type: "hidden",
                      name: description_mimetype_field.name,
                      value: wysiwyg ? "text/html" : "text/plain",
                    }),
                  ],
                });
              case "textarea":
                return jsxRuntimeExports.jsx(
                  TextArea,
                  {
                    field: field,
                    hasWysiwyg: false,
                    baseLocale: baseLocale,
                    hasAtMentions: hasAtMentions,
                    userRole: userRole,
                    brandId: brandId,
                    onChange: (value) => handleChange(field, value),
                  },
                  field.name
                );
              case "priority":
              case "basic_priority":
              case "tickettype":
                return jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, {
                  children: [
                    jsxRuntimeExports.jsx(
                      DropDown,
                      {
                        field: field,
                        onChange: (value) => handleChange(field, value),
                      },
                      field.name
                    ),
                    field.value === "task" &&
                      jsxRuntimeExports.jsx(DatePicker, {
                        field: dueDateField,
                        locale: baseLocale,
                        valueFormat: "dateTime",
                        onChange: (value) => {
                          handleDueDateChange(value);
                        },
                      }),
                  ],
                });
              case "checkbox":
                return jsxRuntimeExports.jsx(Checkbox, {
                  field: field,
                  onChange: (value) => handleChange(field, value),
                });
              case "date":
                return jsxRuntimeExports.jsx(DatePicker, {
                  field: field,
                  locale: baseLocale,
                  valueFormat: "date",
                  onChange: (value) => handleChange(field, value),
                });
              case "multiselect":
                return jsxRuntimeExports.jsx(MultiSelect, { field: field });
              // Issue type
              case "tagger":
                return jsxRuntimeExports.jsx(
                  Tagger,
                  {
                    field: field,
                    onChange: (value) => handleChange(field, value),
                  },
                  field.name
                );
              case "lookup":
                return jsxRuntimeExports.jsx(
                  LookupField,
                  {
                    field: field,
                    userId: userId,
                    organizationId:
                      organizationField !== null
                        ? organizationField.value
                        : defaultOrganizationId,
                    onChange: (value) => handleChange(field, value),
                  },
                  field.name
                );
              default:
                return jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, {});
            }
          }),
          attachments_field &&
            jsxRuntimeExports.jsx(Attachments, { field: attachments_field }),
          inline_attachments_fields.map(({ type, name, value }, index) =>
            jsxRuntimeExports.jsx(
              "input",
              { type: type, name: name, value: value },
              index
            )
          ),
          jsxRuntimeExports.jsx(Footer, {
            children:
              (ticket_form_field.options.length === 0 ||
                ticket_form_field.value) &&
              jsxRuntimeExports.jsx(Button, {
                isPrimary: true,
                type: "submit",
                children: t("new-request-form.submit", "Submit"),
              }),
          }),
        ],
      }),
      answerBot.auth_token &&
        answerBot.interaction_access_token &&
        answerBot.articles.length > 0 &&
        answerBot.request_id &&
        jsxRuntimeExports.jsx(AnswerBotModal, {
          authToken: answerBot.auth_token,
          interactionAccessToken: answerBot.interaction_access_token,
          articles: answerBot.articles,
          requestId: answerBot.request_id,
          ...answerBotModal,
        }),
    ],
  });
}

function __variableDynamicImportRuntime0__(path) {
  switch (path) {
    case "./translations/locales/af.json":
      return import("new-request-form-translations").then(function (n) {
        return n.a;
      });
    case "./translations/locales/ar-x-pseudo.json":
      return import("new-request-form-translations").then(function (n) {
        return n.b;
      });
    case "./translations/locales/ar.json":
      return import("new-request-form-translations").then(function (n) {
        return n.c;
      });
    case "./translations/locales/az.json":
      return import("new-request-form-translations").then(function (n) {
        return n.d;
      });
    case "./translations/locales/be.json":
      return import("new-request-form-translations").then(function (n) {
        return n.e;
      });
    case "./translations/locales/bg.json":
      return import("new-request-form-translations").then(function (n) {
        return n.f;
      });
    case "./translations/locales/bn.json":
      return import("new-request-form-translations").then(function (n) {
        return n.g;
      });
    case "./translations/locales/bs.json":
      return import("new-request-form-translations").then(function (n) {
        return n.h;
      });
    case "./translations/locales/ca.json":
      return import("new-request-form-translations").then(function (n) {
        return n.i;
      });
    case "./translations/locales/cs.json":
      return import("new-request-form-translations").then(function (n) {
        return n.j;
      });
    case "./translations/locales/cy.json":
      return import("new-request-form-translations").then(function (n) {
        return n.k;
      });
    case "./translations/locales/da.json":
      return import("new-request-form-translations").then(function (n) {
        return n.l;
      });
    case "./translations/locales/de-de.json":
      return import("new-request-form-translations").then(function (n) {
        return n.m;
      });
    case "./translations/locales/de-x-informal.json":
      return import("new-request-form-translations").then(function (n) {
        return n.n;
      });
    case "./translations/locales/de.json":
      return import("new-request-form-translations").then(function (n) {
        return n.o;
      });
    case "./translations/locales/el.json":
      return import("new-request-form-translations").then(function (n) {
        return n.p;
      });
    case "./translations/locales/en-001.json":
      return import("new-request-form-translations").then(function (n) {
        return n.q;
      });
    case "./translations/locales/en-150.json":
      return import("new-request-form-translations").then(function (n) {
        return n.r;
      });
    case "./translations/locales/en-au.json":
      return import("new-request-form-translations").then(function (n) {
        return n.s;
      });
    case "./translations/locales/en-ca.json":
      return import("new-request-form-translations").then(function (n) {
        return n.t;
      });
    case "./translations/locales/en-gb.json":
      return import("new-request-form-translations").then(function (n) {
        return n.u;
      });
    case "./translations/locales/en-my.json":
      return import("new-request-form-translations").then(function (n) {
        return n.v;
      });
    case "./translations/locales/en-ph.json":
      return import("new-request-form-translations").then(function (n) {
        return n.w;
      });
    case "./translations/locales/en-se.json":
      return import("new-request-form-translations").then(function (n) {
        return n.x;
      });
    case "./translations/locales/en-us.json":
      return import("new-request-form-translations").then(function (n) {
        return n.y;
      });
    case "./translations/locales/en-x-dev.json":
      return import("new-request-form-translations").then(function (n) {
        return n.z;
      });
    case "./translations/locales/en-x-keys.json":
      return import("new-request-form-translations").then(function (n) {
        return n.A;
      });
    case "./translations/locales/en-x-obsolete.json":
      return import("new-request-form-translations").then(function (n) {
        return n.B;
      });
    case "./translations/locales/en-x-pseudo.json":
      return import("new-request-form-translations").then(function (n) {
        return n.C;
      });
    case "./translations/locales/en-x-test.json":
      return import("new-request-form-translations").then(function (n) {
        return n.D;
      });
    case "./translations/locales/es-419.json":
      return import("new-request-form-translations").then(function (n) {
        return n.E;
      });
    case "./translations/locales/es-es.json":
      return import("new-request-form-translations").then(function (n) {
        return n.F;
      });
    case "./translations/locales/es.json":
      return import("new-request-form-translations").then(function (n) {
        return n.G;
      });
    case "./translations/locales/et.json":
      return import("new-request-form-translations").then(function (n) {
        return n.H;
      });
    case "./translations/locales/eu.json":
      return import("new-request-form-translations").then(function (n) {
        return n.I;
      });
    case "./translations/locales/fa-af.json":
      return import("new-request-form-translations").then(function (n) {
        return n.J;
      });
    case "./translations/locales/fa.json":
      return import("new-request-form-translations").then(function (n) {
        return n.K;
      });
    case "./translations/locales/fi.json":
      return import("new-request-form-translations").then(function (n) {
        return n.L;
      });
    case "./translations/locales/fil.json":
      return import("new-request-form-translations").then(function (n) {
        return n.M;
      });
    case "./translations/locales/fo.json":
      return import("new-request-form-translations").then(function (n) {
        return n.N;
      });
    case "./translations/locales/fr-ca.json":
      return import("new-request-form-translations").then(function (n) {
        return n.O;
      });
    case "./translations/locales/fr.json":
      return import("new-request-form-translations").then(function (n) {
        return n.P;
      });
    case "./translations/locales/ga.json":
      return import("new-request-form-translations").then(function (n) {
        return n.Q;
      });
    case "./translations/locales/he.json":
      return import("new-request-form-translations").then(function (n) {
        return n.R;
      });
    case "./translations/locales/hi.json":
      return import("new-request-form-translations").then(function (n) {
        return n.S;
      });
    case "./translations/locales/hr.json":
      return import("new-request-form-translations").then(function (n) {
        return n.T;
      });
    case "./translations/locales/hu.json":
      return import("new-request-form-translations").then(function (n) {
        return n.U;
      });
    case "./translations/locales/hy.json":
      return import("new-request-form-translations").then(function (n) {
        return n.V;
      });
    case "./translations/locales/id.json":
      return import("new-request-form-translations").then(function (n) {
        return n.W;
      });
    case "./translations/locales/is.json":
      return import("new-request-form-translations").then(function (n) {
        return n.X;
      });
    case "./translations/locales/it-ch.json":
      return import("new-request-form-translations").then(function (n) {
        return n.Y;
      });
    case "./translations/locales/it.json":
      return import("new-request-form-translations").then(function (n) {
        return n.Z;
      });
    case "./translations/locales/ja.json":
      return import("new-request-form-translations").then(function (n) {
        return n._;
      });
    case "./translations/locales/ka.json":
      return import("new-request-form-translations").then(function (n) {
        return n.$;
      });
    case "./translations/locales/kk.json":
      return import("new-request-form-translations").then(function (n) {
        return n.a0;
      });
    case "./translations/locales/kl-dk.json":
      return import("new-request-form-translations").then(function (n) {
        return n.a1;
      });
    case "./translations/locales/ko.json":
      return import("new-request-form-translations").then(function (n) {
        return n.a2;
      });
    case "./translations/locales/ku.json":
      return import("new-request-form-translations").then(function (n) {
        return n.a3;
      });
    case "./translations/locales/lt.json":
      return import("new-request-form-translations").then(function (n) {
        return n.a4;
      });
    case "./translations/locales/lv.json":
      return import("new-request-form-translations").then(function (n) {
        return n.a5;
      });
    case "./translations/locales/mk.json":
      return import("new-request-form-translations").then(function (n) {
        return n.a6;
      });
    case "./translations/locales/mn.json":
      return import("new-request-form-translations").then(function (n) {
        return n.a7;
      });
    case "./translations/locales/ms.json":
      return import("new-request-form-translations").then(function (n) {
        return n.a8;
      });
    case "./translations/locales/mt.json":
      return import("new-request-form-translations").then(function (n) {
        return n.a9;
      });
    case "./translations/locales/my.json":
      return import("new-request-form-translations").then(function (n) {
        return n.aa;
      });
    case "./translations/locales/nl-be.json":
      return import("new-request-form-translations").then(function (n) {
        return n.ab;
      });
    case "./translations/locales/nl.json":
      return import("new-request-form-translations").then(function (n) {
        return n.ac;
      });
    case "./translations/locales/no.json":
      return import("new-request-form-translations").then(function (n) {
        return n.ad;
      });
    case "./translations/locales/pl.json":
      return import("new-request-form-translations").then(function (n) {
        return n.ae;
      });
    case "./translations/locales/pt-br.json":
      return import("new-request-form-translations").then(function (n) {
        return n.af;
      });
    case "./translations/locales/pt.json":
      return import("new-request-form-translations").then(function (n) {
        return n.ag;
      });
    case "./translations/locales/ro.json":
      return import("new-request-form-translations").then(function (n) {
        return n.ah;
      });
    case "./translations/locales/ru.json":
      return import("new-request-form-translations").then(function (n) {
        return n.ai;
      });
    case "./translations/locales/sk.json":
      return import("new-request-form-translations").then(function (n) {
        return n.aj;
      });
    case "./translations/locales/sl.json":
      return import("new-request-form-translations").then(function (n) {
        return n.ak;
      });
    case "./translations/locales/sq.json":
      return import("new-request-form-translations").then(function (n) {
        return n.al;
      });
    case "./translations/locales/sr-me.json":
      return import("new-request-form-translations").then(function (n) {
        return n.am;
      });
    case "./translations/locales/sr.json":
      return import("new-request-form-translations").then(function (n) {
        return n.an;
      });
    case "./translations/locales/sv.json":
      return import("new-request-form-translations").then(function (n) {
        return n.ao;
      });
    case "./translations/locales/th.json":
      return import("new-request-form-translations").then(function (n) {
        return n.ap;
      });
    case "./translations/locales/tr.json":
      return import("new-request-form-translations").then(function (n) {
        return n.aq;
      });
    case "./translations/locales/uk.json":
      return import("new-request-form-translations").then(function (n) {
        return n.ar;
      });
    case "./translations/locales/ur.json":
      return import("new-request-form-translations").then(function (n) {
        return n.as;
      });
    case "./translations/locales/uz.json":
      return import("new-request-form-translations").then(function (n) {
        return n.at;
      });
    case "./translations/locales/vi.json":
      return import("new-request-form-translations").then(function (n) {
        return n.au;
      });
    case "./translations/locales/zh-cn.json":
      return import("new-request-form-translations").then(function (n) {
        return n.av;
      });
    case "./translations/locales/zh-tw.json":
      return import("new-request-form-translations").then(function (n) {
        return n.aw;
      });
    default:
      return new Promise(function (resolve, reject) {
        (typeof queueMicrotask === "function"
          ? queueMicrotask
          : setTimeout)(reject.bind(null, new Error("Unknown variable dynamic import: " + path)));
      });
  }
}
async function renderNewRequestForm(settings, props, container) {
  const { baseLocale } = props;
  initI18next(baseLocale);
  await loadTranslations(baseLocale, () =>
    __variableDynamicImportRuntime0__(
      `./translations/locales/${baseLocale}.json`
    )
  );
  reactDomExports.render(
    jsxRuntimeExports.jsx(ThemeProviders, {
      theme: createTheme(settings),
      children: jsxRuntimeExports.jsx(NewRequestForm, { ...props }),
    }),
    container
  );
}

export { renderNewRequestForm };
>>>>>>> e0a3a53 (apply prettier)
