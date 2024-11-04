<<<<<<< HEAD
import{u as e,r as s,j as o,N as a,T as n,C as t,aa as r,a7 as i,a8 as c,a9 as l}from"shared";function d({notifications:r,closeLabel:i}){const{addToast:c}=e();return s.useEffect((()=>{for(const e of r){const{type:s,title:r,message:l}=e;c((({close:e})=>o.jsxs(a,{type:s,children:[r&&o.jsx(n,{children:r}),l,o.jsx(t,{"aria-label":i,onClick:e})]})))}}),[c,r,i]),o.jsx(o.Fragment,{})}function f(e,s){const a=window.sessionStorage.getItem(r);if(null!==a){window.sessionStorage.removeItem(r);try{const n=JSON.parse(a),t=document.createElement("div");document.body.appendChild(t),i.render(o.jsx(c,{theme:l(e),children:o.jsx(d,{notifications:n,closeLabel:s})}),t)}catch(e){console.error("Cannot render flash notifications",e)}}}export{f as renderFlashNotifications};
=======
import {
  u as useToast,
  r as reactExports,
  j as jsxRuntimeExports,
  N as Notification,
  T as Title,
  C as Close,
  aa as FLASH_NOTIFICATIONS_KEY,
  a7 as reactDomExports,
  a8 as ThemeProviders,
  a9 as createTheme,
} from "shared";

function FlashNotifications({ notifications, closeLabel }) {
  const { addToast } = useToast();
  reactExports.useEffect(() => {
    for (const notification of notifications) {
      const { type, title, message } = notification;
      addToast(({ close }) =>
        jsxRuntimeExports.jsxs(Notification, {
          type: type,
          children: [
            title && jsxRuntimeExports.jsx(Title, { children: title }),
            message,
            jsxRuntimeExports.jsx(Close, {
              "aria-label": closeLabel,
              onClick: close,
            }),
          ],
        })
      );
    }
  }, [addToast, notifications, closeLabel]);
  return jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, {});
}

function renderFlashNotifications(settings, closeLabel) {
  const flashNotifications = window.sessionStorage.getItem(
    FLASH_NOTIFICATIONS_KEY
  );
  if (flashNotifications === null) {
    return;
  }
  window.sessionStorage.removeItem(FLASH_NOTIFICATIONS_KEY);
  try {
    const parsedNotifications = JSON.parse(flashNotifications);
    const container = document.createElement("div");
    document.body.appendChild(container);
    reactDomExports.render(
      jsxRuntimeExports.jsx(ThemeProviders, {
        theme: createTheme(settings),
        children: jsxRuntimeExports.jsx(FlashNotifications, {
          notifications: parsedNotifications,
          closeLabel: closeLabel,
        }),
      }),
      container
    );
  } catch (e) {
    console.error("Cannot render flash notifications", e);
  }
}

export { renderFlashNotifications };
>>>>>>> e0a3a53 (apply prettier)
