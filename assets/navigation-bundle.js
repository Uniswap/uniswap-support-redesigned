<<<<<<< HEAD
import{ab as e,r as s,j as t,ac as a,ad as r,ae as l,af as n,a7 as i,a8 as d,a9 as c}from"shared";import{T as o,S as m,M as h,C as u,P as x,L as g,a as f,B as p,b as j}from"index";const b=new class{key;constructor(e){this.key=e}set(s){const t=JSON.stringify(s);e.set(this.key,t,{expires:365,domain:"zendesk.com"})}get(){const s=e.get(this.key);if(s)return JSON.parse(s)}remove(){e.remove(this.key,{domain:"zendesk.com"})}}("uniswap-ui-theme"),w=s.createContext(void 0),k=()=>{const e=s.useContext(w);if(void 0===e)throw new Error("useUIProvider must be used within a UIProvider");return e},N=({children:e})=>{const[a,r]=s.useState("light");s.useEffect((()=>{if("undefined"!=typeof window){const e=b.get();e?r(e):b.set("light")}}),[]);return t.jsx(w.Provider,{value:{theme:a,toggleTheme:()=>{r((e=>{const s="dark"===e?"light":"dark";return b.set(s),document.documentElement.classList.toggle("dark","dark"===s),s}))}},children:e})},y=()=>{const{toggleTheme:e,theme:s}=k();return t.jsxs(a,{checked:"dark"===s,onChange:e,className:r("group relative inline-flex h-8 w-[3.75rem] items-center rounded-full",{"bg-light-surface-3":"light"===s,"bg-dark-surface-3":"dark"===s}),"aria-label":"Toggle theme",children:[t.jsx("span",{className:"flex h-6 w-6 translate-x-1 items-center justify-center rounded-full bg-white transition group-data-[checked]:translate-x-8",children:t.jsx(o,{className:"h-4 w-4",icon:"dark"===s?"moon":"sun"})}),t.jsx(m,{className:"absolute left-2 h-4 w-4"}),t.jsx(h,{className:"absolute right-2 h-4 w-4"})]})},v=({isOpen:e,close:a})=>{const{theme:i}=k(),[d,c]=s.useState(!1),o=()=>{c(!1),setTimeout(a,100)};return s.useEffect((()=>{e&&setTimeout((()=>c(!0)),100)}),[e]),t.jsx(l,{open:e,onClose:o,className:"MobileMenuModal relative z-modal md:hidden",children:t.jsx("div",{className:r("fixed bottom-0 left-0 right-0 flex w-screen translate-y-0 items-center transition-all",{"opacity-1 translate-y-0":d,"translate-y-4 opacity-0":!d}),children:t.jsxs(n,{className:r("w-full rounded-t-large border-t px-margin-mobile",{"border-dark-surface-3 bg-dark-surface-1":"dark"===i,"border-light-surface-3 bg-light-surface-1":"light"===i}),children:[t.jsxs("div",{className:"pt-padding-x-large",children:[t.jsx("button",{onClick:o,className:"group absolute right-0 top-0 px-margin-mobile py-padding-x-large",children:t.jsx(u,{className:"h-3.5 w-3.5"})}),t.jsx("nav",{}),t.jsx("div",{className:r("my-3 border-t",{"border-dark-surface-3":"dark"===i,"border-light-surface-3":"light"===i})}),t.jsxs("div",{className:"flex flex-row items-center justify-between",children:[t.jsx("h3",{className:r("body-1",{"text-light-neutral-1":"light"===i,"text-dark-neutral-1":"dark"===i}),children:"Theme"}),t.jsx(y,{})]})]}),t.jsx("div",{className:"py-padding-large",children:t.jsx(x,{onClick:o,className:"ml-padding-small-dense",label:"Submit Request",href:"https://support.uniswap.org/hc/en-us/requests/new",size:"large",theme:i,color:"accent-2",fullWidth:!0})})]})})})},S=()=>{const[e,a]=s.useState(!1),[l,n]=s.useState(!1);return s.useEffect((()=>{const e=()=>{const e=window.scrollY;a(0===e)};return e(),window.addEventListener("scroll",e,{passive:!0}),()=>{window.removeEventListener("scroll",e)}}),[a]),t.jsxs(N,{children:[t.jsx("nav",{className:r("flex justify-center",{"border-b":!e}),children:t.jsxs("div",{className:"flex w-full flex-row items-center justify-between border-light-surface-3 px-4 py-[1.15625rem] md:px-[0.9375rem] md:py-3 md:h-[4.5rem]",children:[t.jsx("div",{className:"flex flex-row items-center",children:t.jsxs(g,{href:"/",className:"flex flex-row items-center",children:[t.jsx(f,{className:"mb-[0.1875rem] h-8 w-8"}),t.jsx("p",{className:"body-3 md:button-label-2 ml-2 text-light-accent-1 dark:text-dark-accent-1",children:"Uniswap Support"})]})}),t.jsx("div",{className:"md:hidden",children:t.jsx(p,{onClick:()=>{n((e=>!e))},children:t.jsx(j,{className:"h-padding-large w-padding-large"})})}),t.jsxs("div",{className:"hidden md:flex",children:[t.jsx(y,{}),t.jsx(x,{className:"ml-padding-small-dense !my-auto !py-0 !h-8",label:"Submit Request",href:"https://support.uniswap.org/hc/en-us/requests/new",color:"accent-2"})]})]})}),t.jsx("div",{className:r("fixed inset-0 z-scrim bg-scrim transition duration-500",{"pointer-events-none opacity-0":!l,"opacity-1":l})}),t.jsx(v,{isOpen:l,close:()=>{n(!1)}})]})};async function C(e,s){i.render(t.jsx(d,{theme:c(e),children:t.jsx(S,{})}),s)}export{C as renderNavigation};
=======
import {
  ab as api,
  r as reactExports,
  j as jsxRuntimeExports,
  ac as Ye,
  ad as cn,
  ae as yt,
  af as je,
  a7 as reactDomExports,
  a8 as ThemeProviders,
  a9 as createTheme,
} from "shared";
import {
  T as ThemeIconMap,
  S as Sun,
  M as Moon,
  C as Close,
  P as PrimaryButton,
  L as LinkBase,
  a as MiniUnicon,
  B as ButtonBase,
  b as Menu,
} from "index";

class StorageManager {
  key;
  constructor(key) {
    this.key = key;
  }
  set(value) {
    const valueToSet = JSON.stringify(value);
    api.set(this.key, valueToSet, { expires: 365, domain: "zendesk.com" });
  }
  get() {
    const value = api.get(this.key);
    if (value) {
      return JSON.parse(value);
    }
    return undefined;
  }
  remove() {
    api.remove(this.key, { domain: "zendesk.com" });
  }
}
const THEME_STORAGE_NAME = "uniswap-ui-theme";
const ThemeManager = new StorageManager(THEME_STORAGE_NAME);

const UIContext = reactExports.createContext(undefined);
const useUIProvider = () => {
  const context = reactExports.useContext(UIContext);
  if (context === undefined) {
    throw new Error("useUIProvider must be used within a UIProvider");
  }
  return context;
};
const UIProvider = ({ children }) => {
  const [theme, setTheme] = reactExports.useState("light");
  reactExports.useEffect(() => {
    if (typeof window !== "undefined") {
      const currentTheme = ThemeManager.get();
      if (!currentTheme) {
        ThemeManager.set("light");
      } else {
        setTheme(currentTheme);
      }
    }
  }, []);
  const toggleTheme = () => {
    setTheme((prev) => {
      const newTheme = prev === "dark" ? "light" : "dark";
      ThemeManager.set(newTheme);
      document.documentElement.classList.toggle("dark", newTheme === "dark"); // Toggles the dark class
      return newTheme;
    });
  };
  return jsxRuntimeExports.jsx(UIContext.Provider, {
    value: {
      theme,
      toggleTheme,
    },
    children: children,
  });
};

const ThemeSwitch = () => {
  const { toggleTheme, theme } = useUIProvider();
  return jsxRuntimeExports.jsxs(Ye, {
    checked: theme === "dark",
    onChange: toggleTheme,
    className: cn(
      "group relative inline-flex h-8 w-[3.75rem] items-center rounded-full",
      {
        "bg-light-surface-3": theme === "light",
        "bg-dark-surface-3": theme === "dark",
      }
    ),
    "aria-label": "Toggle theme",
    children: [
      jsxRuntimeExports.jsx("span", {
        className:
          "flex h-6 w-6 translate-x-1 items-center justify-center rounded-full bg-white transition group-data-[checked]:translate-x-8",
        children: jsxRuntimeExports.jsx(ThemeIconMap, {
          className: "h-4 w-4",
          icon: theme === "dark" ? "moon" : "sun",
        }),
      }),
      jsxRuntimeExports.jsx(Sun, { className: "absolute left-2 h-4 w-4" }),
      jsxRuntimeExports.jsx(Moon, { className: "absolute right-2 h-4 w-4" }),
    ],
  });
};

const MobileMenuModal = ({ isOpen, close }) => {
  const { theme } = useUIProvider();
  const [modalTransition, setModalTransition] = reactExports.useState(false);
  const handleClose = () => {
    setModalTransition(false);
    setTimeout(close, 100);
  };
  reactExports.useEffect(() => {
    if (isOpen) {
      setTimeout(() => setModalTransition(true), 100);
    }
  }, [isOpen]);
  return jsxRuntimeExports.jsx(yt, {
    open: isOpen,
    onClose: handleClose,
    className: "MobileMenuModal relative z-modal sm:hidden",
    children: jsxRuntimeExports.jsx("div", {
      className: cn(
        "fixed bottom-0 left-0 right-0 flex w-screen translate-y-0 items-center transition-all",
        {
          "opacity-1 translate-y-0": modalTransition,
          "translate-y-4 opacity-0": !modalTransition,
        }
      ),
      children: jsxRuntimeExports.jsxs(je, {
        className: cn("w-full rounded-t-large border-t px-margin-mobile", {
          "border-dark-surface-3 bg-dark-surface-1": theme === "dark",
          "border-light-surface-3 bg-light-surface-1": theme === "light",
        }),
        children: [
          jsxRuntimeExports.jsxs("div", {
            className: "pt-padding-x-large",
            children: [
              jsxRuntimeExports.jsx("button", {
                onClick: handleClose,
                className:
                  "group absolute right-0 top-0 px-margin-mobile py-padding-x-large",
                children: jsxRuntimeExports.jsx(Close, {
                  className: "h-3.5 w-3.5",
                }),
              }),
              jsxRuntimeExports.jsx("nav", {}),
              jsxRuntimeExports.jsx("div", {
                className: cn("my-3 border-t", {
                  "border-dark-surface-3": theme === "dark",
                  "border-light-surface-3": theme === "light",
                }),
              }),
              jsxRuntimeExports.jsxs("div", {
                className: "flex flex-row items-center justify-between",
                children: [
                  jsxRuntimeExports.jsx("h3", {
                    className: cn("body-1", {
                      "text-light-neutral-1": theme === "light",
                      "text-dark-neutral-1": theme === "dark",
                    }),
                    children: "Theme",
                  }),
                  jsxRuntimeExports.jsx(ThemeSwitch, {}),
                ],
              }),
            ],
          }),
          jsxRuntimeExports.jsx("div", {
            className: "py-padding-large",
            children: jsxRuntimeExports.jsx(PrimaryButton, {
              onClick: handleClose,
              className: "ml-padding-small-dense",
              label: "Submit Request",
              href: "https://support.uniswap.org/hc/en-us/requests/new",
              size: "large",
              theme: theme,
              color: "accent-2",
              fullWidth: true,
            }),
          }),
        ],
      }),
    }),
  });
};

const Navigation = () => {
  const [scrollIsOnTop, setScrollIsOnTop] = reactExports.useState(false);
  const [menuIsOpen, setMenuIsOpen] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      if (position === 0) {
        setScrollIsOnTop(true);
      } else {
        setScrollIsOnTop(false);
      }
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [setScrollIsOnTop]);
  return jsxRuntimeExports.jsxs(UIProvider, {
    children: [
      jsxRuntimeExports.jsx("nav", {
        className: cn(
          "Navigation fixed top-0 left-0 right-0 z-nav flex w-screen justify-center bg-light-surface-1 dark:border-dark-surface-3 dark:bg-dark-surface-1",
          {
            "border-b": !scrollIsOnTop,
          }
        ),
        children: jsxRuntimeExports.jsxs("div", {
          className:
            "flex w-full flex-row items-center justify-between border-light-surface-3 px-4 py-[1.15625rem] sm:px-[0.9375rem] sm:py-3 md:h-[4.5rem]",
          children: [
            jsxRuntimeExports.jsx("div", {
              className: "flex flex-row items-center",
              children: jsxRuntimeExports.jsxs(LinkBase, {
                href: "/",
                className: "flex flex-row items-center",
                children: [
                  jsxRuntimeExports.jsx(MiniUnicon, {
                    className: "mb-[0.1875rem] h-8 w-8",
                  }),
                  jsxRuntimeExports.jsx("p", {
                    className:
                      "body-3 md:button-label-2 ml-2 text-light-accent-1 dark:text-dark-accent-1",
                    children: "Uniswap Support",
                  }),
                ],
              }),
            }),
            jsxRuntimeExports.jsx("div", {
              className: "sm:hidden",
              children: jsxRuntimeExports.jsx(ButtonBase, {
                onClick: () => {
                  setMenuIsOpen((prev) => !prev);
                },
                children: jsxRuntimeExports.jsx(Menu, {
                  className: "h-padding-large w-padding-large",
                }),
              }),
            }),
            jsxRuntimeExports.jsxs("div", {
              className: "hidden sm:flex",
              children: [
                jsxRuntimeExports.jsx(ThemeSwitch, {}),
                jsxRuntimeExports.jsx(PrimaryButton, {
                  className: "ml-padding-small-dense !my-auto !py-0 !h-8",
                  label: "Submit Request",
                  href: "https://support.uniswap.org/hc/en-us/requests/new",
                  color: "accent-2",
                }),
              ],
            }),
          ],
        }),
      }),
      jsxRuntimeExports.jsx("div", {
        className: cn(
          "fixed inset-0 z-scrim bg-scrim transition duration-500",
          {
            "pointer-events-none opacity-0": !menuIsOpen,
            "opacity-1": menuIsOpen,
          }
        ),
      }),
      jsxRuntimeExports.jsx(MobileMenuModal, {
        isOpen: menuIsOpen,
        close: () => {
          setMenuIsOpen(false);
        },
      }),
    ],
  });
};

async function renderNavigation(settings, container) {
  reactDomExports.render(
    jsxRuntimeExports.jsx(ThemeProviders, {
      theme: createTheme(settings),
      children: jsxRuntimeExports.jsx(Navigation, {}),
    }),
    container
  );
}

export { renderNavigation };
>>>>>>> e0a3a53 (apply prettier)
