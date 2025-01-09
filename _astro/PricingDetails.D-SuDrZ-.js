import{j as s}from"./jsx-runtime.D_zvdyIk.js";import{c as B}from"./config.xOc55E9G.js";import{C as Pe}from"./CheckArrowIcon.D3qUGcbQ.js";import{r as a,R as E}from"./index.CqrSl2Gl.js";import{c as N,a as Ee}from"./utils.BEHD0UYf.js";import{r as Me}from"./index.DRAX8e_D.js";/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const De=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),Z=(...e)=>e.filter((t,r,n)=>!!t&&t.trim()!==""&&n.indexOf(t)===r).join(" ").trim();/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var Ae={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ke=a.forwardRef(({color:e="currentColor",size:t=24,strokeWidth:r=2,absoluteStrokeWidth:n,className:o="",children:i,iconNode:l,...c},u)=>a.createElement("svg",{ref:u,...Ae,width:t,height:t,stroke:e,strokeWidth:n?Number(r)*24/Number(t):r,className:Z("lucide",o),...c},[...l.map(([f,b])=>a.createElement(f,b)),...Array.isArray(i)?i:[i]]));/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _e=(e,t)=>{const r=a.forwardRef(({className:n,...o},i)=>a.createElement(ke,{ref:i,iconNode:t,className:Z(`lucide-${De(e)}`,n),...o}));return r.displayName=`${e}`,r};/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ie=_e("Calculator",[["rect",{width:"16",height:"20",x:"4",y:"2",rx:"2",key:"1nb95v"}],["line",{x1:"8",x2:"16",y1:"6",y2:"6",key:"x4nwl0"}],["line",{x1:"16",x2:"16",y1:"14",y2:"18",key:"wjye3r"}],["path",{d:"M16 10h.01",key:"1m94wz"}],["path",{d:"M12 10h.01",key:"1nrarc"}],["path",{d:"M8 10h.01",key:"19clt8"}],["path",{d:"M12 14h.01",key:"1etili"}],["path",{d:"M8 14h.01",key:"6423bh"}],["path",{d:"M12 18h.01",key:"mhygvu"}],["path",{d:"M8 18h.01",key:"lrp35t"}]]),J=a.forwardRef(({className:e,...t},r)=>s.jsx("div",{ref:r,className:N("rounded-xl border bg-card text-card-foreground shadow",e),...t}));J.displayName="Card";const Q=a.forwardRef(({className:e,...t},r)=>s.jsx("div",{ref:r,className:N("flex flex-col space-y-1.5 p-6",e),...t}));Q.displayName="CardHeader";const ee=a.forwardRef(({className:e,...t},r)=>s.jsx("div",{ref:r,className:N("font-semibold leading-none tracking-tight",e),...t}));ee.displayName="CardTitle";const te=a.forwardRef(({className:e,...t},r)=>s.jsx("div",{ref:r,className:N("text-sm text-muted-foreground",e),...t}));te.displayName="CardDescription";const re=a.forwardRef(({className:e,...t},r)=>s.jsx("div",{ref:r,className:N("p-6 pt-0",e),...t}));re.displayName="CardContent";const Be=a.forwardRef(({className:e,...t},r)=>s.jsx("div",{ref:r,className:N("flex items-center p-6 pt-0",e),...t}));Be.displayName="CardFooter";Me();function X(e,t){if(typeof e=="function")return e(t);e!=null&&(e.current=t)}function ne(...e){return t=>{let r=!1;const n=e.map(o=>{const i=X(o,t);return!r&&typeof i=="function"&&(r=!0),i});if(r)return()=>{for(let o=0;o<n.length;o++){const i=n[o];typeof i=="function"?i():X(e[o],null)}}}}function M(...e){return a.useCallback(ne(...e),e)}var $=a.forwardRef((e,t)=>{const{children:r,...n}=e,o=a.Children.toArray(r),i=o.find($e);if(i){const l=i.props.children,c=o.map(u=>u===i?a.Children.count(l)>1?a.Children.only(null):a.isValidElement(l)?l.props.children:null:u);return s.jsx(H,{...n,ref:t,children:a.isValidElement(l)?a.cloneElement(l,void 0,c):null})}return s.jsx(H,{...n,ref:t,children:r})});$.displayName="Slot";var H=a.forwardRef((e,t)=>{const{children:r,...n}=e;if(a.isValidElement(r)){const o=Le(r);return a.cloneElement(r,{...ze(n,r.props),ref:t?ne(t,o):o})}return a.Children.count(r)>1?a.Children.only(null):null});H.displayName="SlotClone";var Te=({children:e})=>s.jsx(s.Fragment,{children:e});function $e(e){return a.isValidElement(e)&&e.type===Te}function ze(e,t){const r={...t};for(const n in t){const o=e[n],i=t[n];/^on[A-Z]/.test(n)?o&&i?r[n]=(...c)=>{i(...c),o(...c)}:o&&(r[n]=o):n==="style"?r[n]={...o,...i}:n==="className"&&(r[n]=[o,i].filter(Boolean).join(" "))}return{...e,...r}}function Le(e){let t=Object.getOwnPropertyDescriptor(e.props,"ref")?.get,r=t&&"isReactWarning"in t&&t.isReactWarning;return r?e.ref:(t=Object.getOwnPropertyDescriptor(e,"ref")?.get,r=t&&"isReactWarning"in t&&t.isReactWarning,r?e.props.ref:e.props.ref||e.ref)}var Ve=["a","button","div","form","h2","h3","img","input","label","li","nav","ol","p","span","svg","ul"],T=Ve.reduce((e,t)=>{const r=a.forwardRef((n,o)=>{const{asChild:i,...l}=n,c=i?$:t;return typeof window<"u"&&(window[Symbol.for("radix-ui")]=!0),s.jsx(c,{...l,ref:o})});return r.displayName=`Primitive.${t}`,{...e,[t]:r}},{}),Oe="Label",oe=a.forwardRef((e,t)=>s.jsx(T.label,{...e,ref:t,onMouseDown:r=>{r.target.closest("button, input, select, textarea")||(e.onMouseDown?.(r),!r.defaultPrevented&&r.detail>1&&r.preventDefault())}}));oe.displayName=Oe;var se=oe;const Ke=Ee,He=(e,t)=>r=>Ke(e,r?.class,r?.className),Ue=He("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"),ie=a.forwardRef(({className:e,...t},r)=>s.jsx(se,{ref:r,className:N(Ue(),e),...t}));ie.displayName=se.displayName;function ae(e,[t,r]){return Math.min(r,Math.max(t,e))}function A(e,t,{checkForDefaultPrevented:r=!0}={}){return function(o){if(e?.(o),r===!1||!o.defaultPrevented)return t?.(o)}}function le(e,t=[]){let r=[];function n(i,l){const c=a.createContext(l),u=r.length;r=[...r,l];const f=d=>{const{scope:g,children:x,...m}=d,v=g?.[e]?.[u]||c,p=a.useMemo(()=>m,Object.values(m));return s.jsx(v.Provider,{value:p,children:x})};f.displayName=i+"Provider";function b(d,g){const x=g?.[e]?.[u]||c,m=a.useContext(x);if(m)return m;if(l!==void 0)return l;throw new Error(`\`${d}\` must be used within \`${i}\``)}return[f,b]}const o=()=>{const i=r.map(l=>a.createContext(l));return function(c){const u=c?.[e]||i;return a.useMemo(()=>({[`__scope${e}`]:{...c,[e]:u}}),[c,u])}};return o.scopeName=e,[n,Fe(o,...t)]}function Fe(...e){const t=e[0];if(e.length===1)return t;const r=()=>{const n=e.map(o=>({useScope:o(),scopeName:o.scopeName}));return function(i){const l=n.reduce((c,{useScope:u,scopeName:f})=>{const d=u(i)[`__scope${f}`];return{...c,...d}},{});return a.useMemo(()=>({[`__scope${t.scopeName}`]:l}),[l])}};return r.scopeName=t.scopeName,r}function ce(e){const t=a.useRef(e);return a.useEffect(()=>{t.current=e}),a.useMemo(()=>(...r)=>t.current?.(...r),[])}function We({prop:e,defaultProp:t,onChange:r=()=>{}}){const[n,o]=Ge({defaultProp:t,onChange:r}),i=e!==void 0,l=i?e:n,c=ce(r),u=a.useCallback(f=>{if(i){const d=typeof f=="function"?f(e):f;d!==e&&c(d)}else o(f)},[i,e,o,c]);return[l,u]}function Ge({defaultProp:e,onChange:t}){const r=a.useState(e),[n]=r,o=a.useRef(n),i=ce(t);return a.useEffect(()=>{o.current!==n&&(i(n),o.current=n)},[n,o,i]),r}var Ye=a.createContext(void 0);function qe(e){const t=a.useContext(Ye);return e||t||"ltr"}function Xe(e){const t=a.useRef({value:e,previous:e});return a.useMemo(()=>(t.current.value!==e&&(t.current.previous=t.current.value,t.current.value=e),t.current.previous),[e])}var Ze=globalThis?.document?a.useLayoutEffect:()=>{};function Je(e){const[t,r]=a.useState(void 0);return Ze(()=>{if(e){r({width:e.offsetWidth,height:e.offsetHeight});const n=new ResizeObserver(o=>{if(!Array.isArray(o)||!o.length)return;const i=o[0];let l,c;if("borderBoxSize"in i){const u=i.borderBoxSize,f=Array.isArray(u)?u[0]:u;l=f.inlineSize,c=f.blockSize}else l=e.offsetWidth,c=e.offsetHeight;r({width:l,height:c})});return n.observe(e,{box:"border-box"}),()=>n.unobserve(e)}else r(void 0)},[e]),t}function Qe(e){const t=e+"CollectionProvider",[r,n]=le(t),[o,i]=r(t,{collectionRef:{current:null},itemMap:new Map}),l=x=>{const{scope:m,children:v}=x,p=E.useRef(null),h=E.useRef(new Map).current;return s.jsx(o,{scope:m,itemMap:h,collectionRef:p,children:v})};l.displayName=t;const c=e+"CollectionSlot",u=E.forwardRef((x,m)=>{const{scope:v,children:p}=x,h=i(c,v),w=M(m,h.collectionRef);return s.jsx($,{ref:w,children:p})});u.displayName=c;const f=e+"CollectionItemSlot",b="data-radix-collection-item",d=E.forwardRef((x,m)=>{const{scope:v,children:p,...h}=x,w=E.useRef(null),S=M(m,w),y=i(f,v);return E.useEffect(()=>(y.itemMap.set(w,{ref:w,...h}),()=>void y.itemMap.delete(w))),s.jsx($,{[b]:"",ref:S,children:p})});d.displayName=f;function g(x){const m=i(e+"CollectionConsumer",x);return E.useCallback(()=>{const p=m.collectionRef.current;if(!p)return[];const h=Array.from(p.querySelectorAll(`[${b}]`));return Array.from(m.itemMap.values()).sort((y,j)=>h.indexOf(y.ref.current)-h.indexOf(j.ref.current))},[m.collectionRef,m.itemMap])}return[{Provider:l,Slot:u,ItemSlot:d},g,n]}var de=["PageUp","PageDown"],ue=["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"],fe={"from-left":["Home","PageDown","ArrowDown","ArrowLeft"],"from-right":["Home","PageDown","ArrowDown","ArrowRight"],"from-bottom":["Home","PageDown","ArrowDown","ArrowLeft"],"from-top":["Home","PageDown","ArrowUp","ArrowLeft"]},k="Slider",[U,et,tt]=Qe(k),[me,Pt]=le(k,[tt]),[rt,z]=me(k),pe=a.forwardRef((e,t)=>{const{name:r,min:n=0,max:o=100,step:i=1,orientation:l="horizontal",disabled:c=!1,minStepsBetweenThumbs:u=0,defaultValue:f=[n],value:b,onValueChange:d=()=>{},onValueCommit:g=()=>{},inverted:x=!1,form:m,...v}=e,p=a.useRef(new Set),h=a.useRef(0),S=l==="horizontal"?nt:ot,[y=[],j]=We({prop:b,defaultProp:f,onChange:C=>{[...p.current][h.current]?.focus(),d(C)}}),L=a.useRef(y);function V(C){const R=ct(y,C);_(C,R)}function je(C){_(C,h.current)}function Re(){const C=L.current[h.current];y[h.current]!==C&&g(y)}function _(C,R,{commit:O}={commit:!1}){const Y=mt(i),K=pt(Math.round((C-n)/i)*i+n,Y),I=ae(K,[n,o]);j((D=[])=>{const P=at(D,I,R);if(ft(P,u*i)){h.current=P.indexOf(I);const q=String(P)!==String(D);return q&&O&&g(P),q?P:D}else return D})}return s.jsx(rt,{scope:e.__scopeSlider,name:r,disabled:c,min:n,max:o,valueIndexToChangeRef:h,thumbs:p.current,values:y,orientation:l,form:m,children:s.jsx(U.Provider,{scope:e.__scopeSlider,children:s.jsx(U.Slot,{scope:e.__scopeSlider,children:s.jsx(S,{"aria-disabled":c,"data-disabled":c?"":void 0,...v,ref:t,onPointerDown:A(v.onPointerDown,()=>{c||(L.current=y)}),min:n,max:o,inverted:x,onSlideStart:c?void 0:V,onSlideMove:c?void 0:je,onSlideEnd:c?void 0:Re,onHomeKeyDown:()=>!c&&_(n,0,{commit:!0}),onEndKeyDown:()=>!c&&_(o,y.length-1,{commit:!0}),onStepKeyDown:({event:C,direction:R})=>{if(!c){const K=de.includes(C.key)||C.shiftKey&&ue.includes(C.key)?10:1,I=h.current,D=y[I],P=i*K*R;_(D+P,I,{commit:!0})}}})})})})});pe.displayName=k;var[he,xe]=me(k,{startEdge:"left",endEdge:"right",size:"width",direction:1}),nt=a.forwardRef((e,t)=>{const{min:r,max:n,dir:o,inverted:i,onSlideStart:l,onSlideMove:c,onSlideEnd:u,onStepKeyDown:f,...b}=e,[d,g]=a.useState(null),x=M(t,S=>g(S)),m=a.useRef(void 0),v=qe(o),p=v==="ltr",h=p&&!i||!p&&i;function w(S){const y=m.current||d.getBoundingClientRect(),j=[0,y.width],V=G(j,h?[r,n]:[n,r]);return m.current=y,V(S-y.left)}return s.jsx(he,{scope:e.__scopeSlider,startEdge:h?"left":"right",endEdge:h?"right":"left",direction:h?1:-1,size:"width",children:s.jsx(ge,{dir:v,"data-orientation":"horizontal",...b,ref:x,style:{...b.style,"--radix-slider-thumb-transform":"translateX(-50%)"},onSlideStart:S=>{const y=w(S.clientX);l?.(y)},onSlideMove:S=>{const y=w(S.clientX);c?.(y)},onSlideEnd:()=>{m.current=void 0,u?.()},onStepKeyDown:S=>{const j=fe[h?"from-left":"from-right"].includes(S.key);f?.({event:S,direction:j?-1:1})}})})}),ot=a.forwardRef((e,t)=>{const{min:r,max:n,inverted:o,onSlideStart:i,onSlideMove:l,onSlideEnd:c,onStepKeyDown:u,...f}=e,b=a.useRef(null),d=M(t,b),g=a.useRef(void 0),x=!o;function m(v){const p=g.current||b.current.getBoundingClientRect(),h=[0,p.height],S=G(h,x?[n,r]:[r,n]);return g.current=p,S(v-p.top)}return s.jsx(he,{scope:e.__scopeSlider,startEdge:x?"bottom":"top",endEdge:x?"top":"bottom",size:"height",direction:x?1:-1,children:s.jsx(ge,{"data-orientation":"vertical",...f,ref:d,style:{...f.style,"--radix-slider-thumb-transform":"translateY(50%)"},onSlideStart:v=>{const p=m(v.clientY);i?.(p)},onSlideMove:v=>{const p=m(v.clientY);l?.(p)},onSlideEnd:()=>{g.current=void 0,c?.()},onStepKeyDown:v=>{const h=fe[x?"from-bottom":"from-top"].includes(v.key);u?.({event:v,direction:h?-1:1})}})})}),ge=a.forwardRef((e,t)=>{const{__scopeSlider:r,onSlideStart:n,onSlideMove:o,onSlideEnd:i,onHomeKeyDown:l,onEndKeyDown:c,onStepKeyDown:u,...f}=e,b=z(k,r);return s.jsx(T.span,{...f,ref:t,onKeyDown:A(e.onKeyDown,d=>{d.key==="Home"?(l(d),d.preventDefault()):d.key==="End"?(c(d),d.preventDefault()):de.concat(ue).includes(d.key)&&(u(d),d.preventDefault())}),onPointerDown:A(e.onPointerDown,d=>{const g=d.target;g.setPointerCapture(d.pointerId),d.preventDefault(),b.thumbs.has(g)?g.focus():n(d)}),onPointerMove:A(e.onPointerMove,d=>{d.target.hasPointerCapture(d.pointerId)&&o(d)}),onPointerUp:A(e.onPointerUp,d=>{const g=d.target;g.hasPointerCapture(d.pointerId)&&(g.releasePointerCapture(d.pointerId),i(d))})})}),ve="SliderTrack",be=a.forwardRef((e,t)=>{const{__scopeSlider:r,...n}=e,o=z(ve,r);return s.jsx(T.span,{"data-disabled":o.disabled?"":void 0,"data-orientation":o.orientation,...n,ref:t})});be.displayName=ve;var F="SliderRange",ye=a.forwardRef((e,t)=>{const{__scopeSlider:r,...n}=e,o=z(F,r),i=xe(F,r),l=a.useRef(null),c=M(t,l),u=o.values.length,f=o.values.map(g=>we(g,o.min,o.max)),b=u>1?Math.min(...f):0,d=100-Math.max(...f);return s.jsx(T.span,{"data-orientation":o.orientation,"data-disabled":o.disabled?"":void 0,...n,ref:c,style:{...e.style,[i.startEdge]:b+"%",[i.endEdge]:d+"%"}})});ye.displayName=F;var W="SliderThumb",Se=a.forwardRef((e,t)=>{const r=et(e.__scopeSlider),[n,o]=a.useState(null),i=M(t,c=>o(c)),l=a.useMemo(()=>n?r().findIndex(c=>c.ref.current===n):-1,[r,n]);return s.jsx(st,{...e,ref:i,index:l})}),st=a.forwardRef((e,t)=>{const{__scopeSlider:r,index:n,name:o,...i}=e,l=z(W,r),c=xe(W,r),[u,f]=a.useState(null),b=M(t,w=>f(w)),d=u?l.form||!!u.closest("form"):!0,g=Je(u),x=l.values[n],m=x===void 0?0:we(x,l.min,l.max),v=lt(n,l.values.length),p=g?.[c.size],h=p?dt(p,m,c.direction):0;return a.useEffect(()=>{if(u)return l.thumbs.add(u),()=>{l.thumbs.delete(u)}},[u,l.thumbs]),s.jsxs("span",{style:{transform:"var(--radix-slider-thumb-transform)",position:"absolute",[c.startEdge]:`calc(${m}% + ${h}px)`},children:[s.jsx(U.ItemSlot,{scope:e.__scopeSlider,children:s.jsx(T.span,{role:"slider","aria-label":e["aria-label"]||v,"aria-valuemin":l.min,"aria-valuenow":x,"aria-valuemax":l.max,"aria-orientation":l.orientation,"data-orientation":l.orientation,"data-disabled":l.disabled?"":void 0,tabIndex:l.disabled?void 0:0,...i,ref:b,style:x===void 0?{display:"none"}:e.style,onFocus:A(e.onFocus,()=>{l.valueIndexToChangeRef.current=n})})}),d&&s.jsx(it,{name:o??(l.name?l.name+(l.values.length>1?"[]":""):void 0),form:l.form,value:x},n)]})});Se.displayName=W;var it=e=>{const{value:t,...r}=e,n=a.useRef(null),o=Xe(t);return a.useEffect(()=>{const i=n.current,l=window.HTMLInputElement.prototype,u=Object.getOwnPropertyDescriptor(l,"value").set;if(o!==t&&u){const f=new Event("input",{bubbles:!0});u.call(i,t),i.dispatchEvent(f)}},[o,t]),s.jsx("input",{style:{display:"none"},...r,ref:n,defaultValue:t})};function at(e=[],t,r){const n=[...e];return n[r]=t,n.sort((o,i)=>o-i)}function we(e,t,r){const i=100/(r-t)*(e-t);return ae(i,[0,100])}function lt(e,t){return t>2?`Value ${e+1} of ${t}`:t===2?["Minimum","Maximum"][e]:void 0}function ct(e,t){if(e.length===1)return 0;const r=e.map(o=>Math.abs(o-t)),n=Math.min(...r);return r.indexOf(n)}function dt(e,t,r){const n=e/2,i=G([0,50],[0,n]);return(n-i(t)*r)*r}function ut(e){return e.slice(0,-1).map((t,r)=>e[r+1]-t)}function ft(e,t){if(t>0){const r=ut(e);return Math.min(...r)>=t}return!0}function G(e,t){return r=>{if(e[0]===e[1]||t[0]===t[1])return t[0];const n=(t[1]-t[0])/(e[1]-e[0]);return t[0]+n*(r-e[0])}}function mt(e){return(String(e).split(".")[1]||"").length}function pt(e,t){const r=Math.pow(10,t);return Math.round(e*r)/r}var Ce=pe,ht=be,xt=ye,gt=Se;const Ne=a.forwardRef(({className:e,...t},r)=>s.jsxs(Ce,{ref:r,className:N("relative flex w-full touch-none select-none items-center",e),...t,children:[s.jsx(ht,{className:"relative h-1.5 w-full grow overflow-hidden rounded-full bg-primary/20",children:s.jsx(xt,{className:"absolute h-full bg-primary"})}),s.jsx(gt,{className:"block h-4 w-4 rounded-full border border-primary/50 bg-background shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"})]}));Ne.displayName=Ce.displayName;const vt=(e,t,r)=>Math.min(Math.max(e,t),r),bt=()=>{const[e,t]=a.useState(5e3),n=(()=>{const i=1*e,l=i>5e3?"Pro":"Free",c=i>5e3?20:0,f=vt(Math.ceil((i-(l==="Pro"?5e4:5e3))*(1/2500)),0,1/0);return{total:e>2e6?null:`$${(c+f).toLocaleString()}`}})(),o=e>2e6?"2,000,000+":e.toLocaleString();return s.jsxs(J,{className:"mx-auto mt-8 w-full border-zinc-800 bg-shorebirdBg3",children:[s.jsxs(Q,{children:[s.jsxs("div",{className:"flex items-center gap-2",children:[s.jsx(Ie,{className:"h-5 w-5 text-white"}),s.jsx(ee,{className:"text-xl text-white",children:"Cost Per Patch"})]}),s.jsx(te,{className:"text-zinc-400",children:"Estimate the cost to send a patch to your users."})]}),s.jsxs(re,{className:"space-y-6",children:[s.jsxs("div",{className:"space-y-2",children:[s.jsxs(ie,{htmlFor:"users",className:"text-lg font-bold text-white",children:["Active Users: ",o]}),s.jsx(Ne,{id:"users",min:0,max:2000001,step:1e3,value:[e],onValueChange:i=>t(i[0]),className:"py-2 [&>.relative]:h-2 [&>.relative]:rounded-full [&>.relative]:bg-zinc-800 [&_[role=slider]]:h-4 [&_[role=slider]]:w-4 [&_[role=slider]]:bg-shorebirdPrimary"})]}),s.jsx("div",{className:"border-t border-zinc-800 pt-2",children:s.jsxs("div",{className:"mb-2 mt-2 flex items-center justify-between",children:[s.jsx("span",{className:"text-lg font-bold text-white",children:"Estimated Cost:"}),n.total&&s.jsxs("span",{className:"text-2xl font-extrabold text-white",children:[n.total,s.jsx("span",{className:"ml-1 text-sm text-zinc-400"})]}),n.total===null&&s.jsx("a",{className:"text-xl font-extrabold text-white hover:text-[#0196C0] hover:underline hover:underline-offset-2",href:B.contactSales,children:"Contact Us"})]})})]})]})},yt=[{title:"Monthly Base Cost",free:"Free",pro:"$20",business:"$400",enterprise:"Custom"},{title:"Included Patch Installs",free:"5,000",pro:"50,000",business:"1,000,000",enterprise:"Custom"},{title:"Overage Billing",pro:"$1 per 2,500 installs",business:"$1 per 2,500 installs",enterprise:"Custom"},{title:"Unlimited Apps & Releases",free:"✓",pro:"✓",business:"✓",enterprise:"✓"},{title:"Console",free:"✓",pro:"✓",business:"✓",enterprise:"✓"},{title:"Collaboration",pro:"✓",business:"✓",enterprise:"✓"},{title:"Patch Rollbacks",free:"✓",pro:"✓",business:"✓",enterprise:"✓"},{title:"Signed Patches",free:"✓",pro:"✓",business:"✓",enterprise:"✓"},{title:"Usage Notifications",free:"✓",pro:"✓",business:"✓",enterprise:"✓"},{title:"Staging",free:"✓",pro:"✓",business:"✓",enterprise:"✓"},{title:"Analytics",free:"✓",pro:"✓",business:"✓",enterprise:"Custom"},{title:"Support",free:"Community Discord",pro:"Semi-Private",business:"Private",enterprise:"Private"},{title:"User Roles",free:"Admin, Developer",pro:"Admin, Developer",business:"Admin, Developer",enterprise:"Custom"},{title:"Invoice Billing",enterprise:"✓"},{title:"Annual Billing",enterprise:"✓"},{title:"SAML",enterprise:"Custom"}],Et=()=>{const e=[{name:"Free",price:"Free",description:"Great for hobbyists, small apps, and demos.",cta:{link:B.consoleUrl,title:"Try It"}},{name:"Pro",price:"$20",description:"Great for medium sized apps with scalable pricing.",cta:{link:B.proPlanCheckoutUrl,title:"Buy Now"}},{name:"Business",price:"$400",description:"Great for large apps with advanced needs.",cta:{link:B.businessPlanCheckoutUrl,title:"Buy Now"}},{name:"Enterprise",price:"Custom",description:"Great for enterprise apps with custom needs.",cta:{link:B.contactSales,title:"Talk to Sales"}}];return s.jsx("div",{className:"bg-shorebirdBg2 py-12 text-white",children:s.jsxs("div",{className:"mx-auto max-w-7xl px-4 sm:px-6 lg:px-8",children:[s.jsxs("div",{className:"text-center",children:[s.jsx("h2",{className:"mt-20 text-4xl font-extrabold text-white lg:text-5xl",children:"Choose the right plan for you"}),s.jsx("p",{className:"mt-4 text-xl text-shorebirdTextGray",children:"Whether you're just starting out or scaling up, find the plan that fits your needs."})]}),s.jsx("div",{className:"mx-auto my-auto mt-12 space-y-4 sm:mt-16 sm:grid sm:grid-cols-2 sm:gap-6 sm:space-y-0 lg:max-w-4xl xl:max-w-none xl:grid-cols-4",children:e.map(t=>s.jsx("div",{className:`border200 divide-y divide-gray-200 rounded-lg bg-shorebirdBg3 shadow-sm ${t.name.toLowerCase()=="pro"?"animate-gradient-xy rounded-3xl bg-gradient-to-r from-blue-400 via-purple-500 to-teal-500 p-1":""}`,children:s.jsxs("div",{className:"rounded-lg bg-shorebirdBg3 p-6",children:[s.jsx("h3",{className:"text-xl font-bold text-white",children:t.name}),s.jsx("p",{className:"mt-4 text-gray-500",children:t.description}),s.jsxs("p",{className:"mt-8",children:[s.jsx("span",{className:"text-4xl font-extrabold",children:t.price}),t.price.startsWith("$")&&s.jsx("span",{className:"text-base font-medium text-gray-500",children:" / month"})]}),s.jsx("a",{className:"shorebird-button-primary mt-8 inline-block w-full rounded-xl rounded-t-xl bg-indigo-600 px-4 py-2 text-center font-bold leading-loose text-white",href:t.cta.link,children:t.cta.title})]})},t.name))}),s.jsx(bt,{}),s.jsx("div",{className:"mx-auto mb-8 mt-12 px-8 text-sm text-shorebirdTextGray",children:s.jsx("p",{children:'*Prices are quoted in USD and sold as "patch installs per month", reflecting successful installs of a given patch. For example, 1 patch pushed to 10 devices is 10 installs. 2 patches pushed to 5 devices is also 10 installs.'})}),s.jsx("div",{className:"mt-16 overflow-x-auto rounded-lg bg-shorebirdBg3 shadow",children:s.jsxs("table",{className:"w-full",children:[s.jsx("thead",{children:s.jsxs("tr",{className:"bg-shorebirdBg1",children:[s.jsx("th",{className:"px-6 py-3 text-left text-xs font-medium uppercase tracking-wider",children:"Feature"}),e.map(t=>s.jsx("th",{className:"px-6 py-3 text-center text-xs font-medium uppercase tracking-wider",children:t.name},t.name))]})}),s.jsx("tbody",{className:"divide-y divide-shorebirdDivider",children:yt.map(t=>s.jsxs("tr",{children:[s.jsx("td",{className:"px-6 py-4 text-sm font-medium",children:s.jsx("div",{className:"flex items-center",children:t.title})}),e.map(r=>s.jsx("td",{className:"px-6 py-4 text-center text-sm",children:t[r.name.toLowerCase()]?t[r.name.toLowerCase()]==="✓"?s.jsx(Pe,{className:"mx-auto h-5 w-5 text-green-500"}):t[r.name.toLowerCase()]:s.jsx("span",{className:"mx-auto h-5 w-5 text-gray-300",children:"—"})},`${t.title}-${r.name}`))]},t.title))})]})})]})})};export{Et as PricingDetails};