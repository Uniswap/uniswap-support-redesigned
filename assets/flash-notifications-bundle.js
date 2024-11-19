import {
  u as e,
  r as s,
  j as o,
  N as a,
  T as n,
  C as t,
  aa as r,
  a7 as i,
  a8 as c,
  a9 as l,
} from 'shared';
function d({ notifications: r, closeLabel: i }) {
  const { addToast: c } = e();
  return (
    s.useEffect(() => {
      for (const e of r) {
        const { type: s, title: r, message: l } = e;
        c(({ close: e }) =>
          o.jsxs(a, {
            type: s,
            children: [
              r && o.jsx(n, { children: r }),
              l,
              o.jsx(t, { 'aria-label': i, onClick: e }),
            ],
          })
        );
      }
    }, [c, r, i]),
    o.jsx(o.Fragment, {})
  );
}
function f(e, s) {
  const a = window.sessionStorage.getItem(r);
  if (null !== a) {
    window.sessionStorage.removeItem(r);
    try {
      const n = JSON.parse(a),
        t = document.createElement('div');
      document.body.appendChild(t),
        i.render(
          o.jsx(c, { theme: l(e), children: o.jsx(d, { notifications: n, closeLabel: s }) }),
          t
        );
    } catch (e) {
      console.error('Cannot render flash notifications', e);
    }
  }
}
export { f as renderFlashNotifications };
