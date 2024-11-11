import {
  aa as e,
  r as s,
  j as a,
  ab as t,
  ac as r,
  ad as l,
  ae as n,
  a6 as i,
  a7 as c,
  a8 as d,
} from 'shared';
import {
  T as o,
  S as m,
  M as u,
  C as h,
  P as x,
  a as f,
  B as g,
  L as b,
  b as j,
  c as p,
} from 'index';
const w = new (class {
    key;
    constructor(e) {
      this.key = e;
    }
    set(s) {
      const a = JSON.stringify(s);
      e.set(this.key, a, { expires: 365, domain: 'zendesk.com' });
    }
    get() {
      const s = e.get(this.key);
      if (s) return JSON.parse(s);
    }
    remove() {
      e.remove(this.key, { domain: 'zendesk.com' });
    }
  })('uniswap-ui-theme'),
  k = s.createContext(void 0),
  N = () => {
    const e = s.useContext(k);
    if (void 0 === e) throw new Error('useUIProvider must be used within a UIProvider');
    return e;
  },
  v = ({ children: e }) => {
    const [t, r] = s.useState('light');
    s.useEffect(() => {
      if ('undefined' != typeof window) {
        const e = w.get();
        e ? r(e) : w.set('light'), document.documentElement.classList.toggle('dark', 'dark' === e);
      }
    }, []);
    return a.jsx(k.Provider, {
      value: {
        theme: t,
        toggleTheme: () => {
          r((e) => {
            const s = 'dark' === e ? 'light' : 'dark';
            return w.set(s), document.documentElement.classList.toggle('dark', 'dark' === s), s;
          });
        },
      },
      children: e,
    });
  },
  y = () => {
    const { toggleTheme: e, theme: s } = N();
    return a.jsxs(t, {
      checked: 'dark' === s,
      onChange: e,
      className: r(
        'group relative inline-flex h-8 w-[3.75rem] items-center rounded-full bg-light-surface-3 dark:!bg-dark-surface-3'
      ),
      'aria-label': 'Toggle theme',
      children: [
        a.jsx('span', {
          className:
            'flex h-6 w-6 translate-x-1 items-center justify-center rounded-full bg-white transition group-data-[checked]:translate-x-8',
          children: a.jsx(o, { className: 'h-4 w-4', icon: 'dark' === s ? 'moon' : 'sun' }),
        }),
        a.jsx(m, { className: 'absolute left-2 h-4 w-4' }),
        a.jsx(u, { className: 'absolute right-2 h-4 w-4' }),
      ],
    });
  },
  C = ({ isOpen: e, close: t }) => {
    const { theme: i } = N(),
      [c, d] = s.useState(!1),
      o = () => {
        d(!1), setTimeout(t, 100);
      };
    return (
      s.useEffect(() => {
        e && setTimeout(() => d(!0), 100);
      }, [e]),
      a.jsx(a.Fragment, {
        children: a.jsxs(l, {
          open: e,
          onClose: o,
          className: 'MobileMenuModal relative z-modal md:hidden',
          children: [
            a.jsx('button', {
              className: r('fixed inset-0 z-[790] bg-scrim transition duration-500', {
                'pointer-events-none opacity-0': !e,
                'opacity-1': e,
              }),
              onClick: o,
            }),
            a.jsx('div', {
              className: r(
                'fixed bottom-0 left-0 right-0 flex w-screen translate-y-0 items-center transition-all z-[900]',
                { 'opacity-1 translate-y-0': c, 'translate-y-4 opacity-0': !c }
              ),
              children: a.jsxs(n, {
                className: r('w-full rounded-t-large border-t px-margin-mobile', {
                  'border-dark-surface-3 bg-dark-surface-1': 'dark' === i,
                  'border-light-surface-3 bg-light-surface-1': 'light' === i,
                }),
                children: [
                  a.jsxs('div', {
                    className: 'pt-margin-mobile',
                    children: [
                      a.jsxs('div', {
                        className: 'relative',
                        children: [
                          a.jsx('div', {
                            className: 'flex flex-row-reverse mb-margin-mobile',
                            children: a.jsx('button', {
                              onClick: o,
                              className: 'group',
                              children: a.jsx(h, { className: 'h-3.5 w-3.5' }),
                            }),
                          }),
                          a.jsx('nav', { id: 'new-mobile-nav' }),
                        ],
                      }),
                      a.jsxs('div', {
                        className: 'flex flex-row items-center justify-between',
                        children: [
                          a.jsx('h3', {
                            className: r('body-1', {
                              'text-light-neutral-1': 'light' === i,
                              'text-dark-neutral-1': 'dark' === i,
                            }),
                            children: 'Theme',
                          }),
                          a.jsx(y, {}),
                        ],
                      }),
                    ],
                  }),
                  a.jsx('div', {
                    className: 'py-margin-mobile',
                    children: a.jsx(x, {
                      onClick: o,
                      className: 'ml-padding-small-dense',
                      label: 'Submit Request',
                      href: '/hc/en-us/requests/new',
                      size: 'large',
                      theme: i,
                      color: 'accent-2',
                      fullWidth: !0,
                    }),
                  }),
                ],
              }),
            }),
          ],
        }),
      })
    );
  },
  S = () => {
    const [e, t] = s.useState(!1),
      [l, n] = s.useState(!1),
      [i, c] = s.useState(!1),
      d = s.useRef(null);
    return (
      s.useEffect(() => {
        const e = () => {
          const e = window.scrollY;
          t(0 === e);
        };
        return (
          e(),
          window.addEventListener('scroll', e, { passive: !0 }),
          () => {
            window.removeEventListener('scroll', e);
          }
        );
      }, [t]),
      s.useEffect(() => {
        const e = setTimeout(() => {
          const e = document.getElementById('search-bar-placeholder-nav-mobile');
          e && d.current && (d.current.appendChild(e), (e.style.opacity = '1'));
        }, 100);
        return () => clearTimeout(e);
      }, []),
      a.jsxs(v, {
        children: [
          a.jsxs('nav', {
            className: r(
              'Navigation fixed top-0 left-0 right-0 z-nav flex w-screen justify-center bg-light-surface-1 dark:border-dark-surface-3 dark:bg-dark-surface-1',
              { 'border-b': !e }
            ),
            children: [
              a.jsxs('div', {
                className: r(
                  'absolute w-full h-full top-0 left-0 !bg-light-surface-1 dark:!bg-dark-surface-1 px-4 py-[1.15625rem] flex flex-row justify-between items-center',
                  { hidden: !i }
                ),
                children: [
                  a.jsxs('div', {
                    className: 'flex flex-row items-center grow',
                    children: [
                      a.jsx(f, { className: 'h-padding-large w-padding-large' }),
                      a.jsx('div', { ref: d, className: 'grow' }),
                    ],
                  }),
                  a.jsx(g, {
                    onClick: () => {
                      c((e) => !e);
                    },
                    className: 'body-2 text-light-neutral-2 dark:text-dark-neutral-2 shrink-0',
                    children: 'Cancel',
                  }),
                ],
              }),
              a.jsxs('div', {
                className:
                  'flex w-full flex-row items-center justify-between border-light-surface-3 px-4 py-[1.15625rem] md:px-[0.9375rem] md:py-3 md:h-[4.5rem]',
                children: [
                  a.jsx('div', {
                    className: 'flex flex-row items-center',
                    children: a.jsxs(b, {
                      href: '/hc/en-us',
                      className: 'flex flex-row items-center',
                      children: [
                        a.jsx(j, { className: 'mb-[0.1875rem] h-8 w-8' }),
                        a.jsx('p', {
                          className:
                            'body-3 md:button-label-2 ml-2 text-light-accent-1 dark:text-dark-accent-1',
                          children: 'Uniswap Support',
                        }),
                      ],
                    }),
                  }),
                  a.jsxs('div', {
                    className: 'md:hidden',
                    children: [
                      a.jsx(g, {
                        onClick: () => {
                          c((e) => !e);
                        },
                        className: 'mr-3',
                        children: a.jsx(f, { className: 'h-padding-large w-padding-large' }),
                      }),
                      a.jsx(g, {
                        id: 'mobile-menu-button',
                        onClick: () => {
                          n((e) => !e);
                        },
                        children: a.jsx(p, { className: 'h-padding-large w-padding-large' }),
                      }),
                    ],
                  }),
                  a.jsxs('div', {
                    className: 'hidden md:flex',
                    children: [
                      a.jsx(y, {}),
                      a.jsx(x, {
                        className: 'ml-padding-small-dense !my-auto !py-0 !h-8',
                        label: 'Submit Request',
                        href: '/hc/en-us/requests/new',
                        color: 'accent-2',
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
          a.jsx(C, {
            isOpen: l,
            close: () => {
              n(!1);
            },
          }),
        ],
      })
    );
  };
async function E(e, s) {
  i.render(a.jsx(c, { theme: d(e), children: a.jsx(S, {}) }), s);
}
export { E as renderNavigation };
