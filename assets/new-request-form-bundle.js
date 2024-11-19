import {
  j as e,
  F as n,
  L as t,
  S as s,
  I as r,
  M as a,
  H as o,
  r as l,
  u as i,
  a as u,
  N as c,
  T as d,
  C as m,
  s as f,
  b as h,
  d as p,
  e as j,
  O as b,
  f as g,
  h as x,
  i as w,
  k as v,
  l as q,
  $ as y,
  A as k,
  p as C,
  m as _,
  n as S,
  o as I,
  P as T,
  q as F,
  t as R,
  v as P,
  D as N,
  w as L,
  K as $,
  x as E,
  y as V,
  z as M,
  B as D,
  E as A,
  G as z,
  J as G,
  Q as H,
  R as B,
  U as X,
  V as O,
  W as U,
  X as W,
  Y as Z,
  Z as K,
  _ as Y,
  a0 as J,
  a1 as Q,
  a2 as ee,
  a3 as ne,
  a4 as te,
  a5 as se,
  a6 as re,
  a7 as ae,
  a8 as oe,
  a9 as le,
} from 'shared';
function ie({ field: l, onChange: i }) {
  const { label: u, error: c, value: d, name: m, required: f, description: h, type: p } = l,
    j = {},
    b = 'integer' === p || 'decimal' === p ? 'number' : 'text';
  'integer' === p && (j.step = '1'), 'decimal' === p && (j.step = 'any');
  const g = 'anonymous_requester_email' === p ? 'email' : void 0;
  return e.jsxs(n, {
    className: 'custom-form-field-layout',
    children: [
      e.jsxs(t, {
        className: 'custom-title',
        children: [u, f && e.jsx(s, { 'aria-hidden': 'true', children: '*' })],
      }),
      e.jsx(r, {
        name: m,
        type: b,
        defaultValue: d && '' !== d ? d : `Enter ${u}`,
        validation: c ? 'error' : void 0,
        required: f,
        onChange: (e) => {
          i && i(e.target.value);
        },
        autoComplete: g,
        className: 'custom-input',
        ...j,
      }),
      c && e.jsx(a, { validation: 'error', children: c }),
      h && e.jsx(o, { dangerouslySetInnerHTML: { __html: h } }),
    ],
  });
}
const ue = f(a)`
  .ck.ck-editor + & {
    margin-top: ${(e) => e.theme.space.xs};
  }
`;
function ce({
  field: r,
  hasWysiwyg: a,
  baseLocale: f,
  hasAtMentions: p,
  userRole: j,
  brandId: b,
  onChange: g,
}) {
  const { label: x, error: w, value: v, name: q, required: y, description: k } = r,
    C = (function ({ hasWysiwyg: n, baseLocale: t, hasAtMentions: s, userRole: r, brandId: a }) {
      const o = l.useRef(!1),
        { addToast: f } = i(),
        { t: h } = u();
      return l.useCallback(
        async (l) => {
          if (n && l && !o.current) {
            o.current = !0;
            const { createEditor: n } = await import('wysiwyg').then(function (e) {
              return e.m;
            });
            (
              await n(l, {
                editorType: 'supportRequests',
                hasAtMentions: s,
                userRole: r,
                brandId: a,
                baseLocale: t,
              })
            ).plugins
              .get('Notification')
              .on('show', (n, t) => {
                n.stop();
                const s = t.message instanceof Error ? t.message.message : t.message,
                  { type: r, title: a } = t;
                f(({ close: n }) =>
                  e.jsxs(c, {
                    type: r,
                    children: [
                      e.jsx(d, { children: a }),
                      s,
                      e.jsx(m, {
                        'aria-label': h('new-request-form.close-label', 'Close'),
                        onClick: n,
                      }),
                    ],
                  })
                );
              });
          }
        },
        [n, t, s, r, a, f, h]
      );
    })({ hasWysiwyg: a, baseLocale: f, hasAtMentions: p, userRole: j, brandId: b });
  return e.jsxs(n, {
    className: 'custom-form-field-layout',
    children: [
      e.jsxs(t, {
        className: 'custom-title',
        children: [x, y && e.jsx(s, { 'aria-hidden': 'true', children: '*' })],
      }),
      e.jsx(h, {
        ref: C,
        name: q,
        defaultValue: v && '' !== v ? v : 'Describe your issue.',
        validation: w ? 'error' : void 0,
        required: y,
        onChange: (e) => g(e.target.value),
        rows: 6,
        isResizable: !0,
      }),
      w && e.jsx(ue, { validation: 'error', children: w }),
      k && e.jsx(o, { className: 'custom-hint', dangerouslySetInnerHTML: { __html: k } }),
    ],
  });
}
function de() {
  const { t: n } = u();
  return e.jsxs(e.Fragment, {
    children: [
      e.jsx(s, { 'aria-hidden': 'true', children: 'Select an option' }),
      e.jsx(s, {
        hidden: !0,
        children: n('new-request-form.dropdown.empty-option', 'Select an option'),
      }),
    ],
  });
}
function me({ field: n, onChange: t }) {
  const { label: s, options: r, error: a, value: o, name: i, required: u, description: c } = n,
    d = null == o ? '' : o.toString(),
    m = l.useRef(null);
  return (
    l.useEffect(() => {
      if (m.current && u) {
        const e = m.current.querySelector('[role=combobox]');
        e?.setAttribute('aria-required', 'true');
      }
    }, [m, u]),
    e.jsxs(p, {
      className: 'custom-form-field-layout',
      children: [
        e.jsxs(j, {
          ref: m,
          inputProps: { name: i, required: u },
          isEditable: !1,
          validation: a ? 'error' : void 0,
          inputValue: d,
          selectionValue: d,
          renderValue: ({ selection: n }) => n?.label || e.jsx(de, {}),
          onChange: ({ selectionValue: e }) => {
            void 0 !== e && t(e);
          },
          className: 'custom-combobox',
          children: [
            !u && e.jsx(b, { value: '', label: '-', children: e.jsx(de, {}) }),
            r.map((n) => e.jsx(b, { value: n.value.toString(), label: n.name }, n.value)),
          ],
        }),
        a && e.jsx(g, { validation: 'error', children: a }),
        c && e.jsx(x, { dangerouslySetInnerHTML: { __html: c } }),
      ],
    })
  );
}
function fe({ field: r, onChange: i }) {
  const { label: u, error: c, value: d, name: m, required: f, description: h } = r,
    [p, j] = l.useState(d);
  return e.jsxs(n, {
    children: [
      e.jsx('input', { type: 'hidden', name: m, value: 'off' }),
      e.jsxs(w, {
        name: m,
        required: f,
        defaultChecked: d,
        value: p ? 'on' : 'off',
        onChange: (e) => {
          const { checked: n } = e.target;
          j(n), i(n);
        },
        children: [
          e.jsxs(t, { children: [u, f && e.jsx(s, { 'aria-hidden': 'true', children: '*' })] }),
          h && e.jsx(o, { dangerouslySetInnerHTML: { __html: h } }),
        ],
      }),
      c && e.jsx(a, { validation: 'error', children: c }),
    ],
  });
}
const he = '[]';
function pe(e) {
  return `[${e.join('::')}]`;
}
function je(e) {
  return e.startsWith('[') && e.endsWith(']');
}
function be(e) {
  const n = pe(e.slice(0, -1));
  return {
    type: 'SubGroup',
    name: e[e.length - 1],
    backOption: { type: 'previous', label: 'Back', value: n },
    options: [],
  };
}
function ge({ options: e, hasEmptyOption: n }) {
  const t = l.useMemo(
      () =>
        (function (e, n) {
          const t = { [he]: { type: 'RootGroup', options: n ? [{ label: '-', value: '' }] : [] } };
          return (
            e.forEach((e) => {
              const { name: n, value: s } = e;
              if (n.includes('::')) {
                const [e, r] = (function (e) {
                    const n = e.split('::');
                    return [n.slice(0, -1), n.slice(-1)[0]];
                  })(n),
                  a = pe(e);
                t[a] || (t[a] = be(e)),
                  t[a]?.options.push({ value: s, label: n.split('::').join(' > '), menuLabel: r });
                for (let n = 0; n < e.length; n++) {
                  const s = e.slice(0, n),
                    r = e.slice(0, n + 1),
                    a = pe(s),
                    o = pe(r);
                  t[a] || (t[a] = be(s)),
                    void 0 === t[a]?.options.find((e) => e.value === o) &&
                      t[a]?.options.push({ type: 'next', label: r[r.length - 1], value: o });
                }
              } else t[he].options.push({ value: s, label: n });
            }),
            t
          );
        })(e, n),
      [e, n]
    ),
    [s, r] = l.useState(
      (function (e) {
        const n = { type: 'RootGroup', options: [] };
        return (
          Object.values(e).forEach(({ options: e }) => {
            n.options.push(...e.filter(({ type: e }) => void 0 === e));
          }),
          n
        );
      })(t)
    );
  l.useEffect(() => {
    r(t[he]);
  }, [t]);
  return {
    currentGroup: s,
    isGroupIdentifier: je,
    setCurrentGroupByIdentifier: (e) => {
      const n = t[e];
      n && r(n);
    },
  };
}
function xe({ field: n }) {
  const { label: t, options: r, error: a, value: o, name: i, required: u, description: c } = n,
    {
      currentGroup: d,
      isGroupIdentifier: m,
      setCurrentGroupByIdentifier: f,
    } = ge({ options: r, hasEmptyOption: !1 }),
    [h, w] = l.useState(o || []),
    y = l.useRef(null);
  l.useEffect(() => {
    if (y.current && u) {
      const e = y.current.querySelector('[role=combobox]');
      e?.setAttribute('aria-required', 'true');
    }
  }, [y, u]);
  return e.jsxs(p, {
    className: 'custom-form-field-layout',
    children: [
      h.map((n) => e.jsx('input', { type: 'hidden', name: `${i}[]`, value: n }, n)),
      e.jsxs(v, {
        className: 'custom-title',
        children: [t, u && e.jsx(s, { 'aria-hidden': 'true', children: '*' })],
      }),
      e.jsxs(j, {
        ref: y,
        isMultiselectable: !0,
        inputProps: { required: u },
        isEditable: !1,
        validation: a ? 'error' : void 0,
        onChange: (e) => {
          if (Array.isArray(e.selectionValue)) {
            const n = e.selectionValue.slice(-1).toString();
            m(n) ? f(n) : w(e.selectionValue);
          }
        },
        selectionValue: h,
        maxHeight: 'auto',
        className: 'custom-combobox',
        children: [
          'SubGroup' === d.type && e.jsx(b, { ...d.backOption }),
          'SubGroup' === d.type
            ? e.jsx(q, {
                'aria-label': d.name,
                children: d.options.map((n) =>
                  e.jsx(b, { ...n, children: n.menuLabel ?? n.label }, n.value)
                ),
              })
            : d.options.map((n) => e.jsx(b, { ...n }, n.value)),
        ],
      }),
      a && e.jsx(g, { validation: 'error', children: a }),
      c && e.jsx(x, { dangerouslySetInnerHTML: { __html: c } }),
    ],
  });
}
const we = y`
  from {
    grid-template-rows: 0fr;
  }
  to {
    grid-template-rows: 1fr;
  }
`,
  ve = f.div`
  display: grid;
  animation: ${we} 200ms forwards;
`,
  qe = f.div`
  overflow: hidden;
`,
  ye = f.li`
  margin: ${(e) => e.theme.space.sm} 0;
`;
function ke({ field: n }) {
  const { options: r, required: a, description: l } = n;
  return r.length > 0
    ? e.jsx(ve, {
        'data-test-id': 'suggested-articles',
        className: '!mt-6',
        children: e.jsxs(qe, {
          children: [
            e.jsxs(t, {
              className: 'custom-title',
              children: [
                e.jsx('span', { children: 'Related Articles' }),
                a && e.jsx(s, { 'aria-hidden': 'true', children: '*' }),
              ],
            }),
            l && e.jsx(o, { className: 'custom-hint', dangerouslySetInnerHTML: { __html: l } }),
            e.jsx('div', {
              className:
                'sm:grid grid-cols-3 gap-4 mt-3 flex flex-row flex-nowrap overflow-x-scroll sm:overflow-x-hidden',
              children: r.map((n, t) =>
                t <= 2
                  ? e.jsx(
                      ye,
                      {
                        className:
                          'col-span-1 !min-h-[7.5rem] list-none !rounded-[1.25rem] w-3/4 shrink-0 sm:w-full',
                        children: e.jsx(k, {
                          href: n.value,
                          className: 'hover:!no-underline',
                          target: '_blank',
                          children: e.jsxs('div', {
                            className:
                              'col-span-1 !bg-light-accent-2 dark:!bg-dark-accent-2 hover:!bg-light-accent-2-hovered hover:dark:!bg-dark-accent-2-hovered !body-2 !text-light-accent-1 hover:!text-light-accent-1-hovered hover:dark:!text-dark-accent-1-hovered dark:!text-dark-accent-1 !min-h-[7.5rem] list-none !p-4 !rounded-[1.25rem] flex flex-col justify-between hover:!no-underline',
                            children: [e.jsx(Ce, {}), e.jsx('p', { children: n.name })],
                          }),
                        }),
                      },
                      n.value
                    )
                  : null
              ),
            }),
          ],
        }),
      })
    : null;
}
const Ce = () =>
    e.jsx('svg', {
      className: 'mx-0.5 min-w-4 min-h-4',
      xmlns: 'http://www.w3.org/2000/svg',
      width: '25',
      height: '24',
      viewBox: '0 0 25 24',
      fill: 'none',
      children: e.jsx('path', {
        d: 'M21.334 5.31967V18.3297C21.334 18.6597 21.0141 18.8898 20.6841 18.7998C18.3001 18.1208 15.907 18.1177 13.521 19.3077C13.32 19.4077 13.083 19.2717 13.083 19.0467V5.85276C13.083 5.78576 13.1041 5.71877 13.1431 5.66477C13.7661 4.80977 14.73 4.21471 15.853 4.07871C17.665 3.85871 19.4071 4.07879 21.0481 4.86179C21.2231 4.94479 21.334 5.12667 21.334 5.31967ZM8.81396 4.07968C7.00196 3.85968 5.2599 4.07976 3.6189 4.86276C3.4449 4.94576 3.33398 5.12777 3.33398 5.32077V18.3308C3.33398 18.6608 3.65389 18.8908 3.98389 18.8008C6.36789 18.1218 8.76097 18.1187 11.147 19.3087C11.348 19.4087 11.585 19.2727 11.585 19.0477V5.85373C11.585 5.78673 11.5639 5.71974 11.5249 5.66574C10.9009 4.81074 9.93796 4.21568 8.81396 4.07968Z',
        className: 'fill-light-accent-1 dark:fill-dark-accent-1',
      }),
    }),
  _e = 'return-focus-to-ticket-form-field';
function Se({ field: n, newRequestPath: t }) {
  const s = l.createRef();
  return (
    l.useEffect(() => {
      sessionStorage.getItem(_e) && (sessionStorage.removeItem(_e), s.current?.firstChild?.focus());
    }, []),
    e.jsxs(e.Fragment, {
      children: [
        e.jsx('input', { type: 'hidden', name: n.name, value: n.value }),
        n.options.length > 1 &&
          e.jsxs(p, {
            children: [
              e.jsx(v, { children: n.label }),
              e.jsx(j, {
                isEditable: !1,
                onChange: ({ selectionValue: e }) => {
                  if (e && 'number' == typeof e) {
                    const n = new URL(window.location.href);
                    n.searchParams.set('ticket_form_id', e),
                      sessionStorage.setItem(_e, 'true'),
                      window.location.assign(`${t}${n.search}`);
                  }
                },
                ref: s,
                children: n.options.map((t) =>
                  e.jsx(
                    b,
                    {
                      value: t.value,
                      label: t.name,
                      isSelected: n.value === t.value,
                      children: t.name,
                    },
                    t.value
                  )
                ),
              }),
            ],
          }),
      ],
    })
  );
}
function Ie({ field: n }) {
  const { value: t, name: s } = n;
  return e.jsx('input', { type: 'hidden', name: s, value: t });
}
function Te(e) {
  const n = l.useRef(!1),
    t = l.useRef(!1);
  return {
    formRefCallback: l.useCallback(
      (s) => {
        s &&
          !n.current &&
          ((n.current = !0),
          (s.submit = async () => {
            if (!1 === t.current) {
              t.current = !0;
              const n = await (async function () {
                  const e = await fetch('/api/v2/help_center/sessions.json'),
                    { current_session: n } = await e.json();
                  return n.csrf_token;
                })(),
                r = document.createElement('input');
              (r.type = 'hidden'), (r.name = 'authenticity_token'), (r.value = n), s.appendChild(r);
              const a = e.filter((e) => 'partialcreditcard' === e.type);
              for (const e of a) {
                const n = s.querySelector(`input[name="${e.name}"]`);
                n &&
                  n instanceof HTMLInputElement &&
                  4 === n.value.length &&
                  (n.value = `XXXXXXXXX${n.value}`);
              }
              HTMLFormElement.prototype.submit.call(s);
            }
          }));
      },
      [e]
    ),
    handleSubmit: (e) => {
      e.preventDefault(), e.target.submit();
    },
  };
}
const Fe = ['true', 'false'],
  Re = [
    'pre',
    'strong',
    'b',
    'p',
    'blockquote',
    'ul',
    'ol',
    'li',
    'h2',
    'h3',
    'h4',
    'i',
    'em',
    'br',
  ];
function Pe(e, n) {
  if (!Number.isNaN(Number(e))) {
    const t = `request[custom_fields][${e}]`;
    return n.ticketFields.find((e) => e.name === t);
  }
  switch (e) {
    case 'anonymous_requester_email':
      return n.emailField;
    case 'due_at':
      return n.dueDateField;
    case 'collaborators':
      return n.ccField;
    case 'organization_id':
      return n.organizationField;
    default:
      return n.ticketFields.find((n) => n.name === `request[${e}]`);
  }
}
function Ne({ ticketFields: e, ccField: n, dueDateField: t, emailField: s, organizationField: r }) {
  return l.useMemo(
    () =>
      (function (e) {
        const { href: n } = location,
          t = new URL(n).searchParams,
          s = { ...e, ticketFields: [...e.ticketFields] };
        if (n.length > 2048) return e;
        if (t.get('parent_id')) return e;
        for (const [e, n] of t) {
          if (!e.startsWith('tf_')) continue;
          const t = Pe(e.substring(3), s);
          if (!t) continue;
          const r = C.sanitize(n, { ALLOWED_TAGS: Re });
          switch (t.type) {
            case 'partialcreditcard':
              continue;
            case 'multiselect':
              t.value = r.split(',').filter((e) => t.options.some((n) => n.value === e));
              break;
            case 'checkbox':
              Fe.includes(r) && (t.value = 'true' === r ? 'on' : 'false' === r ? 'off' : '');
              break;
            default:
              t.value = r;
          }
        }
        return s;
      })({ ticketFields: e, ccField: n, dueDateField: t, emailField: s, organizationField: r }),
    [e, n, t, s, r]
  );
}
const Le = f.div`
  flex: 1;
`;
function $e({ file: n, onRemove: t }) {
  const { t: s } = u(),
    r = (e) => {
      ('Enter' !== e.code && 'Space' !== e.code && 'Delete' !== e.code && 'Backspace' !== e.code) ||
        (e.preventDefault(), t());
    },
    a = 'pending' === n.status ? n.file_name : n.value.file_name,
    o = s('new-request-form.attachments.stop-upload', 'Stop upload'),
    l = s('new-request-form.attachments.remove-file', 'Remove file');
  return e.jsx(_.Item, {
    children: e.jsx(S, {
      type: 'generic',
      title: a,
      onKeyDown: (e) => {
        ('Delete' !== e.code && 'Backspace' !== e.code) || (e.preventDefault(), t());
      },
      children:
        'pending' === n.status
          ? e.jsxs(e.Fragment, {
              children: [
                e.jsx(Le, { children: a }),
                e.jsx(I, {
                  content: o,
                  children: e.jsx(S.Close, {
                    'aria-label': o,
                    onClick: () => {
                      t();
                    },
                    onKeyDown: r,
                  }),
                }),
                e.jsx(T, {
                  value: n.progress,
                  'aria-label': s(
                    'new-request-form.attachments.uploading',
                    'Uploading {{fileName}}',
                    { fileName: a }
                  ),
                }),
              ],
            })
          : e.jsxs(e.Fragment, {
              children: [
                e.jsx(Le, {
                  children: e.jsx(k, {
                    isExternal: !0,
                    href: n.value.url,
                    target: '_blank',
                    children: a,
                  }),
                }),
                e.jsx(I, {
                  content: l,
                  children: e.jsx(S.Delete, {
                    'aria-label': l,
                    onClick: () => {
                      t();
                    },
                    onKeyDown: r,
                  }),
                }),
                e.jsx(T, { value: 100, 'aria-hidden': 'true' }),
              ],
            }),
    }),
  });
}
async function Ee() {
  const e = await fetch('/api/v2/users/me.json'),
    {
      user: { authenticity_token: n },
    } = await e.json();
  return n;
}
function Ve({ field: s }) {
  const { label: o, error: f, name: h, attachments: p } = s,
    {
      files: j,
      addPendingFile: b,
      setPendingFileProgress: g,
      setUploaded: x,
      removePendingFile: w,
      removeUploadedFile: v,
    } = (function (e) {
      const [n, t] = l.useState(e);
      return {
        files: n,
        addPendingFile: l.useCallback((e, n, s) => {
          t((t) => [...t, { status: 'pending', id: e, file_name: n, progress: 0, xhr: s }]);
        }, []),
        setPendingFileProgress: l.useCallback((e, n) => {
          t((t) =>
            t.map((t) => ('pending' === t.status && t.id === e ? { ...t, progress: n } : t))
          );
        }, []),
        removePendingFile: l.useCallback((e) => {
          t((n) => n.filter((n) => 'pending' !== n.status || n.id !== e));
        }, []),
        removeUploadedFile: l.useCallback((e) => {
          t((n) => n.filter((n) => 'uploaded' !== n.status || n.value.id !== e));
        }, []),
        setUploaded: l.useCallback((e, n) => {
          t((t) =>
            t.map((t) =>
              'pending' === t.status && t.id === e ? { status: 'uploaded', value: n } : t
            )
          );
        }, []),
      };
    })(p.map((e) => ({ status: 'uploaded', value: e })) ?? []),
    { addToast: q } = i(),
    { t: y } = u(),
    k = l.useCallback(
      (n) => {
        q(({ close: t }) =>
          e.jsxs(c, {
            type: 'error',
            children: [
              e.jsx(d, {
                children: y('new-request-form.attachments.upload-error-title', 'Upload error'),
              }),
              y(
                'new-request-form.attachments.upload-error-description',
                'There was an error uploading {{fileName}}. Try again or upload another file.',
                { fileName: n }
              ),
              e.jsx(m, { 'aria-label': y('new-request-form.close-label', 'Close'), onClick: t }),
            ],
          })
        );
      },
      [q, y]
    ),
    C = l.useCallback(
      async (e) => {
        const n = await Ee();
        for (const t of e) {
          const e = new XMLHttpRequest(),
            s = new URL(`${window.location.origin}/api/v2/uploads.json`);
          if ((s.searchParams.append('filename', t.name), e.open('POST', s), t.type))
            e.setRequestHeader('Content-Type', t.type);
          else {
            const n = F.getType(t.name);
            e.setRequestHeader('Content-Type', n || 'application/octet-stream');
          }
          e.setRequestHeader('X-CSRF-Token', n), (e.responseType = 'json');
          const r = crypto.randomUUID();
          b(r, t.name, e),
            e.upload.addEventListener('progress', ({ loaded: e, total: n }) => {
              const t = Math.round((e / n) * 100);
              t <= 90 && g(r, t);
            }),
            e.addEventListener('load', () => {
              if (e.status >= 200 && e.status < 300) {
                const {
                  upload: {
                    attachment: { file_name: n, content_url: t },
                    token: s,
                  },
                } = e.response;
                x(r, { id: s, file_name: n, url: t });
              } else k(t.name), w(r);
            }),
            e.addEventListener('error', () => {
              k(t.name), w(r);
            }),
            e.send(t);
        }
      },
      [b, w, g, x, k]
    ),
    { getRootProps: _, getInputProps: S, isDragActive: I } = R({ onDrop: C });
  return e.jsxs(n, {
    className: 'custom-form-field-layout',
    children: [
      e.jsx(t, { className: 'custom-title', children: o }),
      f && e.jsx(a, { validation: 'error', children: f }),
      e.jsxs(P, {
        ..._(),
        isDragging: I,
        className:
          '!border-0 !bg-light-surface-3 dark:!bg-dark-surface-3 !rounded-xl !py-3 flex flex-row space-x-4 !px-4',
        children: [
          e.jsx(Me, {}),
          I
            ? e.jsx('span', {
                children: y('new-request-form.attachments.drop-files-label', 'Drop files here'),
              })
            : e.jsx('span', {
                className: 'button-label-2 !text-light-neutral-1 dark:!text-dark-neutral-1',
                children: y(
                  'new-request-form.attachments.choose-file-label',
                  'Add file or drop files here'
                ),
              }),
          e.jsx(r, { ...S() }),
        ],
      }),
      j.map((n) =>
        e.jsx(
          $e,
          {
            file: n,
            onRemove: () => {
              (async (e) => {
                if ('pending' === e.status) e.xhr.abort(), w(e.id);
                else {
                  const n = await Ee(),
                    t = e.value.id;
                  v(e.value.id),
                    await fetch(`/api/v2/uploads/${t}.json`, {
                      method: 'DELETE',
                      headers: { 'X-CSRF-Token': n },
                    });
                }
              })(n);
            },
          },
          'pending' === n.status ? n.id : n.value.id
        )
      ),
      j.map(
        (n) =>
          'uploaded' === n.status &&
          e.jsx('input', { type: 'hidden', name: h, value: JSON.stringify(n.value) }, n.value.id)
      ),
    ],
  });
}
const Me = () =>
  e.jsx('svg', {
    className: 'mx-0.5 min-w-4 min-h-4',
    xmlns: 'http://www.w3.org/2000/svg',
    width: '25',
    height: '24',
    viewBox: '0 0 25 24',
    fill: 'none',
    children: e.jsx('path', {
      d: 'M15.25 6V3.75L19.75 8.25H17.5C15.92 8.25 15.25 7.58 15.25 6ZM17.5 9.75C15.08 9.75 13.75 8.42 13.75 6V3H8.5C6.5 3 5.5 4 5.5 6V18C5.5 20 6.5 21 8.5 21H17.5C19.5 21 20.5 20 20.5 18V9.75H17.5Z',
      className: 'fill-light-neutral-1 dark:fill-dark-neutral-1',
    }),
  });
function De(e, n) {
  return n.filter((n) => n.child_fields.some((n) => n.id === e));
}
function Ae(e, n, t) {
  return e.filter((e) => {
    const s = t.find((n) => n.id === e.parent_field_id);
    if (!s) return !1;
    const r = De(s.id, n);
    return s.value === e.value && (0 === r.length || Ae(r, n, t).length > 0);
  });
}
function ze(e, n) {
  return 0 === n.length
    ? e
    : e.reduce((t, s) => {
        const r = De(s.id, n);
        if (0 === r.length) return [...t, s];
        const a = Ae(r, n, e);
        return a.length > 0
          ? [
              ...t,
              {
                ...s,
                required: a.some((e) => e.child_fields.some((e) => e.id == s.id && e.is_required)),
              },
            ]
          : t;
      }, []);
}
function Ge({ field: i, locale: u, valueFormat: c, onChange: d }) {
  const { label: m, error: f, value: h, name: p, required: j, description: b } = i,
    [g, x] = l.useState(h ? new Date(h) : void 0),
    w = (e) => {
      if (void 0 === e) return '';
      const n = e.toISOString();
      return 'dateTime' === c ? n : n.split('T')[0];
    };
  return e.jsxs(n, {
    children: [
      e.jsxs(t, { children: [m, j && e.jsx(s, { 'aria-hidden': 'true', children: '*' })] }),
      b && e.jsx(o, { dangerouslySetInnerHTML: { __html: b } }),
      e.jsx(N, {
        value: g,
        onChange: (e) => {
          const n = new Date(Date.UTC(e.getFullYear(), e.getMonth(), e.getDate(), 12, 0, 0));
          x(n);
          const t = w(n);
          void 0 !== t && d(t);
        },
        locale: u,
        children: e.jsx(r, {
          required: j,
          lang: u,
          onChange: (e) => {
            '' === e.target.value && (x(void 0), d(''));
          },
          validation: f ? 'error' : void 0,
        }),
      }),
      f && e.jsx(a, { validation: 'error', children: f }),
      e.jsx('input', { type: 'hidden', name: p, value: w(g) }),
    ],
  });
}
const He =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  Be = f(V)`
  padding: ${(e) => `${e.theme.space.xxs} ${e.theme.space.sm}`};

  // Removes white spaces for inline elements
  font-size: 0;

  // Same as height of Tag size="large" + base space (4px)
  // to give some vertical space between tags
  --line-height: ${(e) => 8 * e.theme.space.base + e.theme.space.base}px;
  line-height: var(--line-height);
`,
  Xe = f.span`
  display: inline-block;
  margin-right: ${(e) => e.theme.space.sm};
`,
  Oe = f(M)`
  ${(e) => E({ theme: e.theme, shadowWidth: 'sm', selector: '&:focus' })}
`,
  Ue = f.div`
  display: inline-block;
  position: relative;
`,
  We = f(V)`
  display: inline-block;
  min-width: 200px;
  opacity: 0;
  user-select: none;
  height: var(--line-height);
  line-height: var(--line-height);
`,
  Ze = f(r)`
  position: absolute;
  top: 0;
  left: 0;
  height: var(--line-height);
  line-height: var(--line-height);
`;
function Ke({ field: r }) {
  const { label: i, value: c, name: d, error: m, description: f } = r,
    { t: h } = u(),
    p = c ? c.split(',').map((e) => e.trim()) : [],
    [j, b] = l.useState(p),
    [g, x] = l.useState(''),
    w = l.useRef(null),
    v = l.useRef(null),
    {
      getContainerProps: q,
      getGridProps: y,
      getGridRowProps: k,
      getGridCellProps: C,
      getTagCloseProps: _,
      getInputProps: S,
      getAnnouncementProps: T,
      announcement: F,
    } = (function ({
      tags: e,
      onTagsChange: n,
      inputValue: t,
      onInputValueChange: s,
      inputRef: r,
      gridRowRef: a,
      i18n: o,
    }) {
      const [i, u] = l.useState(0),
        [c, d] = l.useState(''),
        m = l.useCallback(
          (e, n) => {
            u(n);
          },
          [u]
        ),
        { getGridProps: f, getGridCellProps: h } = L({
          matrix: [e],
          rowIndex: 0,
          colIndex: i,
          onChange: m,
        }),
        p = (n) => e.includes(n),
        j = (t) => {
          n([...e, t]), d(o.addedTag(t));
        },
        b = (t) => {
          const s = e[t];
          n(e.filter((e, n) => n !== t)),
            d(o.removedTag(s)),
            u(0),
            setTimeout(() => {
              const e = a.current?.querySelector('[tabindex="0"]');
              e?.focus();
            }, 100);
        },
        g = (e) => {
          e.target === e.currentTarget && r.current?.focus();
        },
        x = () => {
          u(0);
        },
        w = (e) => {
          const n = e.target.value;
          !n ||
            (e.key !== $.SPACE && e.key !== $.ENTER && e.key !== $.TAB && e.key !== $.COMMA) ||
            (e.preventDefault(), p(n) || j(n), s(''));
        },
        v = (e) => {
          const n = e.target.value,
            [t, r] = [n.slice(0, -1), n.slice(-1)];
          ' ' === r || ',' === r ? (t.length > 0 && !p(t) && j(t), s('')) : s(n);
        },
        q = (t) => {
          t.preventDefault();
          const s = t.clipboardData.getData('text'),
            r = new Set(s.split(/[\s,;]+/).filter((n) => !e.includes(n)));
          n([...e, ...r]), d(o.addedTags([...r]));
        },
        y = (e) => {
          const n = e.target.value;
          n && (p(n) || j(n), s(''));
        },
        k = (e) => (n) => {
          'Backspace' === n.code && (n.preventDefault(), b(e));
        },
        C = (e) => () => {
          b(e);
        };
      return {
        getContainerProps: () => ({ onClick: g, onBlur: x, tabIndex: -1 }),
        getGridProps: f,
        getGridRowProps: () => ({ role: 'row' }),
        getGridCellProps: (e) => h({ rowIndex: 0, colIndex: e, onKeyDown: k(e) }),
        getTagCloseProps: (e) => ({ onClick: C(e) }),
        getInputProps: () => ({ value: t, onChange: v, onKeyDown: w, onPaste: q, onBlur: y }),
        announcement: c,
        getAnnouncementProps: () => ({ 'aria-live': 'polite', 'aria-relevant': 'text' }),
      };
    })({
      tags: j,
      onTagsChange: b,
      inputValue: g,
      onInputValueChange: x,
      inputRef: w,
      gridRowRef: v,
      i18n: {
        addedTag: (e) =>
          h('new-request-form.cc-field.email-added', '{{email}} has been added', { email: e }),
        removedTag: (e) =>
          h('new-request-form.cc-field.email-removed', '{{email}} has been removed', { email: e }),
        addedTags: (e) =>
          h('new-request-form.cc-field.emails-added', '{{emails}} have been added', { emails: e }),
      },
    }),
    R = (n, t, s) =>
      e.jsxs(Oe, {
        size: 'large',
        'aria-label': h(
          'new-request-form.cc-field.email-label',
          '{{email}} - Press Backspace to remove',
          { email: s }
        ),
        hue: t ? void 0 : 'red',
        children: [
          !t && e.jsx(M.Avatar, { children: e.jsx(D, {}) }),
          e.jsx('span', { children: s }),
          e.jsx(M.Close, { ..._(n) }),
        ],
      });
  return e.jsxs(n, {
    children: [
      e.jsx(t, { children: i }),
      f && e.jsx(o, { children: f }),
      e.jsxs(Be, {
        ...q(),
        children: [
          j.length > 0 &&
            e.jsx('span', {
              ...y({
                'aria-label': h('new-request-form.cc-field.container-label', 'Selected CC emails'),
              }),
              children: e.jsx('span', {
                ref: v,
                ...k(),
                children: j.map((n, t) => {
                  const s = He.test(n);
                  return s
                    ? e.jsx(Xe, { ...C(t), children: R(t, s, n) }, t)
                    : e.jsx(
                        I,
                        {
                          content: h(
                            'new-request-form.cc-field.invalid-email',
                            'Invalid email address'
                          ),
                          children: e.jsx(Xe, { ...C(t), children: R(t, s, n) }),
                        },
                        t
                      );
                }),
              }),
            }),
          e.jsxs(Ue, {
            children: [
              e.jsx(We, { isBare: !0, 'aria-hidden': 'true', tabIndex: -1, children: g }),
              e.jsx(Ze, { ref: w, isBare: !0, ...S() }),
            ],
          }),
        ],
      }),
      m && e.jsx(a, { validation: 'error', children: m }),
      j.map((n) => e.jsx('input', { type: 'hidden', name: d, value: n }, n)),
      e.jsx(s, { hidden: !0, ...T(), children: F }),
    ],
  });
}
const Ye = f(s)`
  margin-left: ${(e) => e.theme.space.xxs};
  font-weight: ${(e) => e.theme.fontWeights.medium};
`;
function Je({ field: r, onChange: l }) {
  const { t: i } = u(),
    { label: c, error: d, value: m, name: f, required: h, description: p } = r,
    j = (function (e) {
      return e ? e.replaceAll('X', '') : '';
    })(m);
  return e.jsxs(n, {
    children: [
      e.jsxs(t, {
        children: [
          c,
          h && e.jsx(s, { 'aria-hidden': 'true', children: '*' }),
          e.jsx(Ye, { children: i('new-request-form.credit-card-digits-hint', '(Last 4 digits)') }),
        ],
      }),
      p && e.jsx(o, { dangerouslySetInnerHTML: { __html: p } }),
      e.jsx(A, {
        start: e.jsx(z, {}),
        name: f,
        type: 'text',
        value: j,
        onChange: (e) => l(e.target.value),
        validation: d ? 'error' : void 0,
        required: h,
        maxLength: 4,
        placeholder: 'XXXX',
      }),
      d && e.jsx(a, { validation: 'error', children: d }),
    ],
  });
}
function Qe({ field: n, onChange: t }) {
  const { label: r, options: a, error: o, value: i, name: u, required: c, description: d } = n;
  console.log('value', i);
  const {
      currentGroup: m,
      isGroupIdentifier: f,
      setCurrentGroupByIdentifier: h,
    } = ge({ options: a, hasEmptyOption: !0 }),
    w = i ?? '',
    [y, k] = l.useState(!1),
    C = l.useRef(null);
  l.useEffect(() => {
    if (C.current && c) {
      const e = C.current.querySelector('[role=combobox]');
      e?.setAttribute('aria-required', 'true');
    }
  }, [C, c]);
  return e.jsxs(p, {
    className: 'custom-form-field-layout',
    children: [
      e.jsxs(v, {
        className: 'custom-title',
        children: [r, c && e.jsx(s, { 'aria-hidden': 'true', children: '*' })],
      }),
      e.jsxs(j, {
        ref: C,
        inputProps: { required: c, name: u },
        isEditable: !1,
        validation: o ? 'error' : void 0,
        onChange: (e) => {
          'string' == typeof e.selectionValue && f(e.selectionValue)
            ? h(e.selectionValue)
            : ('string' == typeof e.selectionValue && t(e.selectionValue),
              void 0 !== e.isExpanded && k(e.isExpanded));
        },
        selectionValue: w,
        inputValue: w,
        renderValue: ({ selection: n }) => n?.label ?? e.jsx(de, {}),
        isExpanded: y,
        className: 'custom-combobox',
        children: [
          'SubGroup' === m.type && e.jsx(b, { ...m.backOption }),
          'SubGroup' === m.type
            ? e.jsx(q, {
                'aria-label': m.name,
                children: m.options.map((n) =>
                  e.jsx(b, { ...n, children: n.menuLabel ?? n.label }, n.value)
                ),
              })
            : m.options.map((n) =>
                '' === n.value
                  ? e.jsx(b, { ...n, children: e.jsx(de, {}) }, n.value)
                  : e.jsx(b, { ...n }, n.value)
              ),
        ],
      }),
      o && e.jsx(g, { validation: 'error', children: o }),
      d && e.jsx(x, { className: 'custom-hint', dangerouslySetInnerHTML: { __html: d } }),
    ],
  });
}
const en = f.h3`
  font-size: ${(e) => e.theme.fontSizes.md};
  font-weight: ${(e) => e.theme.fontWeights.bold};
`,
  nn = f(H)`
  color: ${(e) => G('successHue', 700, e.theme)};
`,
  tn = f(B)`
  position: absolute;
  top: ${(e) => 5.5 * e.theme.space.base}px;
  inset-inline-start: ${(e) => 4 * e.theme.space.base + 'px'};
`,
  sn = f(k)`
  display: inline-block;
  margin-top: ${(e) => e.theme.space.sm};
`;
function rn({
  authToken: n,
  interactionAccessToken: t,
  articles: s,
  requestId: r,
  hasRequestManagement: a,
  isSignedIn: o,
  helpCenterPath: i,
  requestsPath: c,
  requestPath: d,
}) {
  const [m, f] = l.useState(0),
    h = X(),
    { t: p } = u(),
    j = () => String(s[m]?.article_id),
    b = () => {
      ee({
        type: 'success',
        message: p(
          'new-request-form.answer-bot-modal.request-submitted',
          'Your request was successfully submitted'
        ),
      }),
        window.location.assign(
          (() => {
            if (o) return a ? d : i;
            {
              const e = new URLSearchParams();
              return e.set('return_to', c), `${i}?${e.toString()}`;
            }
          })()
        );
    };
  return e.jsxs(O, {
    appendToNode: h,
    onClose: () => {
      b();
    },
    children: [
      e.jsxs(nn, {
        tag: 'h2',
        children: [
          e.jsx(tn, {}),
          p(
            'new-request-form.answer-bot-modal.request-submitted',
            'Your request was successfully submitted'
          ),
        ],
      }),
      e.jsxs(U, {
        children: [
          e.jsx(en, {
            children: p(
              'new-request-form.answer-bot-modal.title',
              'While you wait, do any of these articles answer your question?'
            ),
          }),
          e.jsx('p', {
            children: p(
              'new-request-form.answer-bot-modal.footer-content',
              'If it does, we can close your recent request {{requestId}}',
              { requestId: `‭#${r}‬` }
            ),
          }),
          e.jsx(W, {
            level: 4,
            expandedSections: [m],
            onChange: (e) => {
              f(e);
            },
            children: s.map(({ article_id: t, html_url: s, snippet: r, title: a }) =>
              e.jsxs(
                W.Section,
                {
                  children: [
                    e.jsx(W.Header, { children: e.jsx(W.Label, { children: a }) }),
                    e.jsxs(W.Panel, {
                      children: [
                        e.jsx(Z, { dangerouslySetInnerHTML: { __html: r } }),
                        e.jsx(sn, {
                          isExternal: !0,
                          href: `${s}?auth_token=${n}`,
                          target: '_blank',
                          children: p(
                            'new-request-form.answer-bot-modal.view-article',
                            'View article'
                          ),
                        }),
                      ],
                    }),
                  ],
                },
                t
              )
            ),
          }),
        ],
      }),
      e.jsxs(K, {
        children: [
          e.jsx(Y, {
            children: e.jsx(J, {
              onClick: () => {
                (async () => {
                  await fetch('/api/v2/answer_bot/rejection', {
                    method: 'POST',
                    body: JSON.stringify({
                      article_id: j(),
                      interaction_access_token: t,
                      reason_id: 0,
                    }),
                    headers: { 'Content-Type': 'application/json' },
                  }),
                    b();
                })();
              },
              children: p('new-request-form.answer-bot-modal.mark-irrelevant', 'No, I need help'),
            }),
          }),
          e.jsx(Y, {
            children: e.jsx(J, {
              isPrimary: !0,
              onClick: () => {
                (async () => {
                  (
                    await fetch('/api/v2/answer_bot/resolution', {
                      method: 'POST',
                      body: JSON.stringify({ article_id: j(), interaction_access_token: t }),
                      headers: { 'Content-Type': 'application/json' },
                    })
                  ).ok
                    ? ee({
                        type: 'success',
                        message: p(
                          'new-request-form.answer-bot-modal.request-closed',
                          'Nice. Your request has been closed.'
                        ),
                      })
                    : ee({
                        type: 'error',
                        message: p(
                          'new-request-form.answer-bot-modal.solve-error',
                          'There was an error closing your request'
                        ),
                      }),
                    (window.location.href = i);
                })();
              },
              children: p(
                'new-request-form.answer-bot-modal.solve-request',
                'Yes, close my request'
              ),
            }),
          }),
        ],
      }),
      e.jsx(Q, { 'aria-label': p('new-request-form.close-label', 'Close') }),
    ],
  });
}
const an = { value: '', name: '-' };
function on({ field: n, userId: t, organizationId: r, onChange: a }) {
  const {
      id: o,
      label: i,
      error: c,
      value: d,
      name: m,
      required: f,
      description: h,
      relationship_target_type: w,
    } = n,
    [q, y] = l.useState([]),
    [k, C] = l.useState(null),
    [_, S] = l.useState(d),
    [I, T] = l.useState(!1),
    { t: F } = u(),
    R = w.replace('zen:custom_object:', '');
  const P = {
      name: F('new-request-form.lookup-field.loading-options', 'Loading items...'),
      id: 'loading',
    },
    N = {
      name: F('new-request-form.lookup-field.no-matches-found', 'No matches found'),
      id: 'no-results',
    },
    L = l.useCallback(
      async (e) => {
        try {
          const n = await fetch(`/api/v2/custom_objects/${R}/records/${e}`);
          if (n.ok) {
            const { custom_object_record: e } = await n.json(),
              t = { name: e.name, value: e.id };
            C(t), S(e.name);
          }
        } catch (e) {
          console.error(e);
        }
      },
      [R]
    ),
    $ = l.useCallback(
      async (e) => {
        const n = new URLSearchParams();
        n.set('name', e.toLocaleLowerCase()),
          n.set('source', 'zen:ticket'),
          n.set('field_id', o.toString()),
          n.set('requester_id', t.toString()),
          null !== r && n.set('organization_id', r),
          T(!0);
        try {
          const e = await fetch(`/api/v2/custom_objects/${R}/records/autocomplete?${n.toString()}`),
            t = await e.json();
          if (e.ok) {
            let e = t.custom_object_records.map(({ name: e, id: n }) => ({ name: e, value: n }));
            k && ((e = e.filter((e) => e.value !== k.value)), (e = [k, ...e])), y(e);
          } else y([]);
        } catch (e) {
          console.error(e);
        } finally {
          T(!1);
        }
      },
      [R, o, r, k, t]
    ),
    E = l.useMemo(() => ne($, 300), [$]);
  l.useEffect(() => () => E.cancel(), [E]);
  const V = l.useCallback(
    ({ inputValue: e, selectionValue: n }) => {
      if (void 0 !== n)
        if ('' == n) C(an), S(an.name), y([]), a(an.value);
        else {
          const e = q.find((e) => e.value === n);
          e && (S(e.name), C(e), y([e]), a(e.value));
        }
      void 0 !== e && (S(e), E(e));
    },
    [E, a, q]
  );
  l.useEffect(() => {
    d && L(d);
  }, []);
  return e.jsxs(p, {
    children: [
      e.jsxs(v, { children: [i, f && e.jsx(s, { 'aria-hidden': 'true', children: '*' })] }),
      h && e.jsx(x, { dangerouslySetInnerHTML: { __html: h } }),
      e.jsxs(j, {
        inputProps: { required: f },
        'data-test-id': 'lookup-field-combobox',
        validation: c ? 'error' : void 0,
        inputValue: _,
        selectionValue: k?.value,
        isAutocomplete: !0,
        placeholder: F('new-request-form.lookup-field.placeholder', 'Search {{label}}', {
          label: i.toLowerCase(),
        }),
        onFocus: () => {
          S(''), $('*');
        },
        onChange: V,
        renderValue: () => (k ? k?.name : an.name),
        children: [
          k?.name !== an.name && e.jsx(b, { value: '', label: '-', children: e.jsx(de, {}) }),
          I && e.jsx(b, { isDisabled: !0, value: P.name }, P.id),
          !I &&
            _?.length > 0 &&
            0 === q.length &&
            e.jsx(b, { isDisabled: !0, value: N.name }, N.id),
          !I &&
            0 !== q.length &&
            q.map((n) =>
              e.jsx(
                b,
                { value: n.value, label: n.name, 'data-test-id': `option-${n.name}` },
                n.value
              )
            ),
        ],
      }),
      c && e.jsx(g, { validation: 'error', children: c }),
      e.jsx('input', { type: 'hidden', name: m, value: k?.value }),
    ],
  });
}
const ln = f(Z)`
  margin: ${(e) => e.theme.space.md} 0;
`,
  un = f.form`
  display: flex;
  flex-direction: column;
  gap: ${(e) => e.theme.space.md};
`,
  cn = f.div`
  margin-top: ${(e) => e.theme.space.md};
`;
function dn({
  requestForm: n,
  wysiwyg: r,
  newRequestPath: a,
  parentId: o,
  parentIdPath: i,
  locale: c,
  baseLocale: d,
  hasAtMentions: m,
  userRole: f,
  userId: h,
  brandId: p,
  organizations: j,
  answerBotModal: b,
}) {
  const {
      ticket_fields: g,
      action: x,
      http_method: w,
      accept_charset: v,
      errors: q,
      parent_id_field: y,
      ticket_form_field: C,
      email_field: _,
      cc_field: S,
      organization_field: I,
      due_date_field: T,
      end_user_conditions: F,
      attachments_field: R,
      inline_attachments_fields: P,
      description_mimetype_field: N,
    } = n,
    { answerBot: L } = b,
    {
      ticketFields: $,
      emailField: E,
      ccField: V,
      organizationField: M,
      dueDateField: D,
    } = Ne({ ticketFields: g, emailField: _, ccField: S, organizationField: I, dueDateField: T });
  console.log('requestForm', n);
  const [A, z] = l.useState(''),
    [G, H] = l.useState($),
    [B, X] = l.useState(M),
    [O, U] = l.useState(D),
    W = ze(G, F),
    { formRefCallback: Z, handleSubmit: K } = Te(G),
    { t: Y } = u(),
    Q = j.length > 0 && j[0]?.id ? j[0]?.id?.toString() : null,
    ee = l.useCallback(
      (e, n) => {
        H(G.map((t) => (t.name === e.name ? { ...t, value: n } : t))), 'tagger' === e.name && z(n);
      },
      [G]
    );
  return e.jsxs(e.Fragment, {
    children: [
      o &&
        e.jsx(ln, {
          children: e.jsx(k, {
            href: i,
            children: Y(
              'new-request-form.parent-request-link',
              'Follow-up to request {{parentId}}',
              { parentId: `‭#${o}‬` }
            ),
          }),
        }),
      e.jsxs(un, {
        ref: Z,
        action: x,
        method: w,
        acceptCharset: v,
        noValidate: !0,
        onSubmit: K,
        children: [
          q && e.jsx(te, { type: 'error', children: q }),
          y && e.jsx(Ie, { field: y }),
          C.options.length > 0 && e.jsx(Se, { field: C, newRequestPath: a }),
          E && e.jsx(ie, { field: E }, E.name),
          V && e.jsx(Ke, { field: V }),
          B &&
            e.jsx(
              me,
              {
                field: B,
                onChange: (e) => {
                  !(function (e) {
                    null !== B && X({ ...B, value: e });
                  })(e);
                },
              },
              B.name
            ),
          W.map((n) => {
            switch (n.type) {
              case 'subject':
                return e.jsxs('div', {
                  className: 'custom-form-field-layout',
                  children: [
                    e.jsxs(t, {
                      className: 'custom-title',
                      children: ['Subject', e.jsx(s, { 'aria-hidden': 'true', children: '*' })],
                    }),
                    e.jsx(ie, { field: n, onChange: (e) => ee(n, e) }, n.name),
                  ],
                });
              case 'text':
              case 'integer':
              case 'decimal':
              case 'regexp':
                return e.jsx(ie, { field: n, onChange: (e) => ee(n, e) }, n.name);
              case 'partialcreditcard':
                return e.jsx(Je, { field: n, onChange: (e) => ee(n, e) });
              case 'description':
                return e.jsxs(e.Fragment, {
                  children: [
                    e.jsx(
                      ce,
                      {
                        field: n,
                        hasWysiwyg: r,
                        baseLocale: d,
                        hasAtMentions: m,
                        userRole: f,
                        brandId: p,
                        onChange: (e) => ee(n, e),
                      },
                      n.name
                    ),
                    e.jsx('input', {
                      type: 'hidden',
                      name: N.name,
                      value: r ? 'text/html' : 'text/plain',
                    }),
                  ],
                });
              case 'textarea':
                return e.jsx(
                  ce,
                  {
                    field: n,
                    hasWysiwyg: !1,
                    baseLocale: d,
                    hasAtMentions: m,
                    userRole: f,
                    brandId: p,
                    onChange: (e) => ee(n, e),
                  },
                  n.name
                );
              case 'priority':
              case 'basic_priority':
              case 'tickettype':
                return e.jsxs(e.Fragment, {
                  children: [
                    e.jsx(me, { field: n, onChange: (e) => ee(n, e) }, n.name),
                    'task' === n.value &&
                      e.jsx(Ge, {
                        field: O,
                        locale: d,
                        valueFormat: 'dateTime',
                        onChange: (e) => {
                          !(function (e) {
                            null !== O && U({ ...O, value: e });
                          })(e);
                        },
                      }),
                  ],
                });
              case 'checkbox':
                return e.jsx(fe, { field: n, onChange: (e) => ee(n, e) });
              case 'date':
                return e.jsx(Ge, {
                  field: n,
                  locale: d,
                  valueFormat: 'date',
                  onChange: (e) => ee(n, e),
                });
              case 'multiselect':
                if (n.label.includes('RA:')) {
                  const t = W.find((e) => 'tagger' === e.type);
                  return t && t.value && n.label.includes(t.value)
                    ? e.jsx(ke, { field: n })
                    : e.jsx(e.Fragment, {});
                }
                return e.jsx(xe, { field: n });
              case 'tagger':
                return e.jsx(Qe, { field: n, onChange: (e) => ee(n, e) }, n.name);
              case 'lookup':
                return e.jsx(
                  on,
                  {
                    field: n,
                    userId: h,
                    organizationId: null !== B ? B.value : Q,
                    onChange: (e) => ee(n, e),
                  },
                  n.name
                );
              default:
                return e.jsx(e.Fragment, {});
            }
          }),
          R && e.jsx(Ve, { field: R }),
          P.map(({ type: n, name: t, value: s }, r) =>
            e.jsx('input', { type: n, name: t, value: s }, r)
          ),
          e.jsx(cn, {
            className: '!mt-0',
            children:
              (0 === C.options.length || C.value) &&
              e.jsx(J, {
                isPrimary: !0,
                type: 'submit',
                className: 'custom-submit-button',
                children: Y('new-request-form.submit', 'Submit'),
              }),
          }),
        ],
      }),
      L.auth_token &&
        L.interaction_access_token &&
        L.articles.length > 0 &&
        L.request_id &&
        e.jsx(rn, {
          authToken: L.auth_token,
          interactionAccessToken: L.interaction_access_token,
          articles: L.articles,
          requestId: L.request_id,
          ...b,
        }),
    ],
  });
}
async function mn(n, t, s) {
  const { baseLocale: r } = t;
  se(r),
    await re(r, () =>
      (function (e) {
        switch (e) {
          case './translations/locales/af.json':
            return import('new-request-form-translations').then(function (e) {
              return e.a;
            });
          case './translations/locales/ar-x-pseudo.json':
            return import('new-request-form-translations').then(function (e) {
              return e.b;
            });
          case './translations/locales/ar.json':
            return import('new-request-form-translations').then(function (e) {
              return e.c;
            });
          case './translations/locales/az.json':
            return import('new-request-form-translations').then(function (e) {
              return e.d;
            });
          case './translations/locales/be.json':
            return import('new-request-form-translations').then(function (e) {
              return e.e;
            });
          case './translations/locales/bg.json':
            return import('new-request-form-translations').then(function (e) {
              return e.f;
            });
          case './translations/locales/bn.json':
            return import('new-request-form-translations').then(function (e) {
              return e.g;
            });
          case './translations/locales/bs.json':
            return import('new-request-form-translations').then(function (e) {
              return e.h;
            });
          case './translations/locales/ca.json':
            return import('new-request-form-translations').then(function (e) {
              return e.i;
            });
          case './translations/locales/cs.json':
            return import('new-request-form-translations').then(function (e) {
              return e.j;
            });
          case './translations/locales/cy.json':
            return import('new-request-form-translations').then(function (e) {
              return e.k;
            });
          case './translations/locales/da.json':
            return import('new-request-form-translations').then(function (e) {
              return e.l;
            });
          case './translations/locales/de-de.json':
            return import('new-request-form-translations').then(function (e) {
              return e.m;
            });
          case './translations/locales/de-x-informal.json':
            return import('new-request-form-translations').then(function (e) {
              return e.n;
            });
          case './translations/locales/de.json':
            return import('new-request-form-translations').then(function (e) {
              return e.o;
            });
          case './translations/locales/el.json':
            return import('new-request-form-translations').then(function (e) {
              return e.p;
            });
          case './translations/locales/en-001.json':
            return import('new-request-form-translations').then(function (e) {
              return e.q;
            });
          case './translations/locales/en-150.json':
            return import('new-request-form-translations').then(function (e) {
              return e.r;
            });
          case './translations/locales/en-au.json':
            return import('new-request-form-translations').then(function (e) {
              return e.s;
            });
          case './translations/locales/en-ca.json':
            return import('new-request-form-translations').then(function (e) {
              return e.t;
            });
          case './translations/locales/en-gb.json':
            return import('new-request-form-translations').then(function (e) {
              return e.u;
            });
          case './translations/locales/en-my.json':
            return import('new-request-form-translations').then(function (e) {
              return e.v;
            });
          case './translations/locales/en-ph.json':
            return import('new-request-form-translations').then(function (e) {
              return e.w;
            });
          case './translations/locales/en-se.json':
            return import('new-request-form-translations').then(function (e) {
              return e.x;
            });
          case './translations/locales/en-us.json':
            return import('new-request-form-translations').then(function (e) {
              return e.y;
            });
          case './translations/locales/en-x-dev.json':
            return import('new-request-form-translations').then(function (e) {
              return e.z;
            });
          case './translations/locales/en-x-keys.json':
            return import('new-request-form-translations').then(function (e) {
              return e.A;
            });
          case './translations/locales/en-x-obsolete.json':
            return import('new-request-form-translations').then(function (e) {
              return e.B;
            });
          case './translations/locales/en-x-pseudo.json':
            return import('new-request-form-translations').then(function (e) {
              return e.C;
            });
          case './translations/locales/en-x-test.json':
            return import('new-request-form-translations').then(function (e) {
              return e.D;
            });
          case './translations/locales/es-419.json':
            return import('new-request-form-translations').then(function (e) {
              return e.E;
            });
          case './translations/locales/es-es.json':
            return import('new-request-form-translations').then(function (e) {
              return e.F;
            });
          case './translations/locales/es.json':
            return import('new-request-form-translations').then(function (e) {
              return e.G;
            });
          case './translations/locales/et.json':
            return import('new-request-form-translations').then(function (e) {
              return e.H;
            });
          case './translations/locales/eu.json':
            return import('new-request-form-translations').then(function (e) {
              return e.I;
            });
          case './translations/locales/fa-af.json':
            return import('new-request-form-translations').then(function (e) {
              return e.J;
            });
          case './translations/locales/fa.json':
            return import('new-request-form-translations').then(function (e) {
              return e.K;
            });
          case './translations/locales/fi.json':
            return import('new-request-form-translations').then(function (e) {
              return e.L;
            });
          case './translations/locales/fil.json':
            return import('new-request-form-translations').then(function (e) {
              return e.M;
            });
          case './translations/locales/fo.json':
            return import('new-request-form-translations').then(function (e) {
              return e.N;
            });
          case './translations/locales/fr-ca.json':
            return import('new-request-form-translations').then(function (e) {
              return e.O;
            });
          case './translations/locales/fr.json':
            return import('new-request-form-translations').then(function (e) {
              return e.P;
            });
          case './translations/locales/ga.json':
            return import('new-request-form-translations').then(function (e) {
              return e.Q;
            });
          case './translations/locales/he.json':
            return import('new-request-form-translations').then(function (e) {
              return e.R;
            });
          case './translations/locales/hi.json':
            return import('new-request-form-translations').then(function (e) {
              return e.S;
            });
          case './translations/locales/hr.json':
            return import('new-request-form-translations').then(function (e) {
              return e.T;
            });
          case './translations/locales/hu.json':
            return import('new-request-form-translations').then(function (e) {
              return e.U;
            });
          case './translations/locales/hy.json':
            return import('new-request-form-translations').then(function (e) {
              return e.V;
            });
          case './translations/locales/id.json':
            return import('new-request-form-translations').then(function (e) {
              return e.W;
            });
          case './translations/locales/is.json':
            return import('new-request-form-translations').then(function (e) {
              return e.X;
            });
          case './translations/locales/it-ch.json':
            return import('new-request-form-translations').then(function (e) {
              return e.Y;
            });
          case './translations/locales/it.json':
            return import('new-request-form-translations').then(function (e) {
              return e.Z;
            });
          case './translations/locales/ja.json':
            return import('new-request-form-translations').then(function (e) {
              return e._;
            });
          case './translations/locales/ka.json':
            return import('new-request-form-translations').then(function (e) {
              return e.$;
            });
          case './translations/locales/kk.json':
            return import('new-request-form-translations').then(function (e) {
              return e.a0;
            });
          case './translations/locales/kl-dk.json':
            return import('new-request-form-translations').then(function (e) {
              return e.a1;
            });
          case './translations/locales/ko.json':
            return import('new-request-form-translations').then(function (e) {
              return e.a2;
            });
          case './translations/locales/ku.json':
            return import('new-request-form-translations').then(function (e) {
              return e.a3;
            });
          case './translations/locales/lt.json':
            return import('new-request-form-translations').then(function (e) {
              return e.a4;
            });
          case './translations/locales/lv.json':
            return import('new-request-form-translations').then(function (e) {
              return e.a5;
            });
          case './translations/locales/mk.json':
            return import('new-request-form-translations').then(function (e) {
              return e.a6;
            });
          case './translations/locales/mn.json':
            return import('new-request-form-translations').then(function (e) {
              return e.a7;
            });
          case './translations/locales/ms.json':
            return import('new-request-form-translations').then(function (e) {
              return e.a8;
            });
          case './translations/locales/mt.json':
            return import('new-request-form-translations').then(function (e) {
              return e.a9;
            });
          case './translations/locales/my.json':
            return import('new-request-form-translations').then(function (e) {
              return e.aa;
            });
          case './translations/locales/nl-be.json':
            return import('new-request-form-translations').then(function (e) {
              return e.ab;
            });
          case './translations/locales/nl.json':
            return import('new-request-form-translations').then(function (e) {
              return e.ac;
            });
          case './translations/locales/no.json':
            return import('new-request-form-translations').then(function (e) {
              return e.ad;
            });
          case './translations/locales/pl.json':
            return import('new-request-form-translations').then(function (e) {
              return e.ae;
            });
          case './translations/locales/pt-br.json':
            return import('new-request-form-translations').then(function (e) {
              return e.af;
            });
          case './translations/locales/pt.json':
            return import('new-request-form-translations').then(function (e) {
              return e.ag;
            });
          case './translations/locales/ro.json':
            return import('new-request-form-translations').then(function (e) {
              return e.ah;
            });
          case './translations/locales/ru.json':
            return import('new-request-form-translations').then(function (e) {
              return e.ai;
            });
          case './translations/locales/sk.json':
            return import('new-request-form-translations').then(function (e) {
              return e.aj;
            });
          case './translations/locales/sl.json':
            return import('new-request-form-translations').then(function (e) {
              return e.ak;
            });
          case './translations/locales/sq.json':
            return import('new-request-form-translations').then(function (e) {
              return e.al;
            });
          case './translations/locales/sr-me.json':
            return import('new-request-form-translations').then(function (e) {
              return e.am;
            });
          case './translations/locales/sr.json':
            return import('new-request-form-translations').then(function (e) {
              return e.an;
            });
          case './translations/locales/sv.json':
            return import('new-request-form-translations').then(function (e) {
              return e.ao;
            });
          case './translations/locales/th.json':
            return import('new-request-form-translations').then(function (e) {
              return e.ap;
            });
          case './translations/locales/tr.json':
            return import('new-request-form-translations').then(function (e) {
              return e.aq;
            });
          case './translations/locales/uk.json':
            return import('new-request-form-translations').then(function (e) {
              return e.ar;
            });
          case './translations/locales/ur.json':
            return import('new-request-form-translations').then(function (e) {
              return e.as;
            });
          case './translations/locales/uz.json':
            return import('new-request-form-translations').then(function (e) {
              return e.at;
            });
          case './translations/locales/vi.json':
            return import('new-request-form-translations').then(function (e) {
              return e.au;
            });
          case './translations/locales/zh-cn.json':
            return import('new-request-form-translations').then(function (e) {
              return e.av;
            });
          case './translations/locales/zh-tw.json':
            return import('new-request-form-translations').then(function (e) {
              return e.aw;
            });
          default:
            return new Promise(function (n, t) {
              ('function' == typeof queueMicrotask
                ? queueMicrotask
                : setTimeout)(t.bind(null, new Error('Unknown variable dynamic import: ' + e)));
            });
        }
      })(`./translations/locales/${r}.json`)
    ),
    ae.render(e.jsx(oe, { theme: le(n), children: e.jsx(dn, { ...t }) }), s);
}
export { mn as renderNewRequestForm };
