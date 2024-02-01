import{j as t}from"./jsx-runtime.7d759e48.js";import{r as e}from"./index.8365acb2.js";import{c as x}from"./config.8fd66e2e.js";import{S as F,D as O,T as _,G as K}from"./TwitterIcon.8c044554.js";import{u as z,f as S,a as T,P as $,L as A,m as v}from"./motion.604dbbf1.js";function B(){const n=e.useRef(!1);return z(()=>(n.current=!0,()=>{n.current=!1}),[]),n}function D(){const n=B(),[i,r]=e.useState(0),s=e.useCallback(()=>{n.current&&r(i+1)},[i]);return[e.useCallback(()=>S.postRender(s),[s]),i]}class G extends e.Component{getSnapshotBeforeUpdate(i){const r=this.props.childRef.current;if(r&&i.isPresent&&!this.props.isPresent){const s=this.props.sizeRef.current;s.height=r.offsetHeight||0,s.width=r.offsetWidth||0,s.top=r.offsetTop,s.left=r.offsetLeft}return null}componentDidUpdate(){}render(){return this.props.children}}function H({children:n,isPresent:i}){const r=e.useId(),s=e.useRef(null),c=e.useRef({width:0,height:0,top:0,left:0});return e.useInsertionEffect(()=>{const{width:d,height:h,top:f,left:b}=c.current;if(i||!s.current||!d||!h)return;s.current.dataset.motionPopId=r;const m=document.createElement("style");return document.head.appendChild(m),m.sheet&&m.sheet.insertRule(`
          [data-motion-pop-id="${r}"] {
            position: absolute !important;
            width: ${d}px !important;
            height: ${h}px !important;
            top: ${f}px !important;
            left: ${b}px !important;
          }
        `),()=>{document.head.removeChild(m)}},[i]),e.createElement(G,{isPresent:i,childRef:s,sizeRef:c},e.cloneElement(n,{ref:s}))}const N=({children:n,initial:i,isPresent:r,onExitComplete:s,custom:c,presenceAffectsLayout:d,mode:h})=>{const f=T(V),b=e.useId(),m=e.useMemo(()=>({id:b,initial:i,isPresent:r,custom:c,onExitComplete:a=>{f.set(a,!0);for(const l of f.values())if(!l)return;s&&s()},register:a=>(f.set(a,!1),()=>f.delete(a))}),d?void 0:[r]);return e.useMemo(()=>{f.forEach((a,l)=>f.set(l,!1))},[r]),e.useEffect(()=>{!r&&!f.size&&s&&s()},[r]),h==="popLayout"&&(n=e.createElement(H,{isPresent:r},n)),e.createElement($.Provider,{value:m},n)};function V(){return new Map}function W(n){return e.useEffect(()=>()=>n(),[])}const p=n=>n.key||"";function q(n,i){n.forEach(r=>{const s=p(r);i.set(s,r)})}function J(n){const i=[];return e.Children.forEach(n,r=>{e.isValidElement(r)&&i.push(r)}),i}const Q=({children:n,custom:i,initial:r=!0,onExitComplete:s,exitBeforeEnter:c,presenceAffectsLayout:d=!0,mode:h="sync"})=>{const f=e.useContext(A).forceRender||D()[0],b=B(),m=J(n);let a=m;const l=e.useRef(new Map).current,w=e.useRef(a),g=e.useRef(new Map).current,C=e.useRef(!0);if(z(()=>{C.current=!1,q(m,g),w.current=a}),W(()=>{C.current=!0,g.clear(),l.clear()}),C.current)return e.createElement(e.Fragment,null,a.map(o=>e.createElement(N,{key:p(o),isPresent:!0,initial:r?void 0:!1,presenceAffectsLayout:d,mode:h},o)));a=[...a];const E=w.current.map(p),R=m.map(p),P=E.length;for(let o=0;o<P;o++){const u=E[o];R.indexOf(u)===-1&&!l.has(u)&&l.set(u,void 0)}return h==="wait"&&l.size&&(a=[]),l.forEach((o,u)=>{if(R.indexOf(u)!==-1)return;const k=g.get(u);if(!k)return;const U=E.indexOf(u);let j=o;if(!j){const L=()=>{l.delete(u);const I=Array.from(g.keys()).filter(y=>!R.includes(y));if(I.forEach(y=>g.delete(y)),w.current=m.filter(y=>{const M=p(y);return M===u||I.includes(M)}),!l.size){if(b.current===!1)return;f(),s&&s()}};j=e.createElement(N,{key:p(k),isPresent:!1,onExitComplete:L,custom:i,presenceAffectsLayout:d,mode:h},k),l.set(u,j)}a.splice(U,0,j)}),a=a.map(o=>{const u=o.key;return l.has(u)?o:e.createElement(N,{key:p(o),isPresent:!0,presenceAffectsLayout:d,mode:h},o)}),e.createElement(e.Fragment,null,l.size?a:a.map(o=>e.cloneElement(o)))},re=n=>{const[i,r]=e.useState(!1);return t.jsxs("nav",{className:"w-full h-20 flex flex-col justify-center items-center fixed bg-shorebirdBg1 lg:bg-shorebirdBgTransparent z-40 lg:backdrop-blur-xl",children:[t.jsxs("div",{className:"2xl:w-[1280px] xl:w-10/12 w-11/12 flex justify-between items-center relative",children:[t.jsx(v.div,{initial:{opacity:0},animate:{opacity:1},transition:{duration:.3},exit:{opacity:0},children:t.jsx("a",{className:"navbar-link",href:"/","aria-label":"Home",children:t.jsxs("div",{className:"flex justify-start items-center grow basis-0",children:[t.jsx("div",{className:"text-white mr-2 text-6xl",children:t.jsx(F,{})}),t.jsx("div",{className:"text-white font-['Inter'] font-bold text-xl",children:x.app})]})})}),t.jsx(v.div,{initial:{opacity:0},animate:{opacity:1},transition:{duration:.3},exit:{opacity:0},children:t.jsx("div",{className:"hidden lg:flex h-full pl-12 pb-2",children:n.links?.map(({href:s,label:c,ariaLabel:d})=>t.jsx("a",{className:"navbar-link",href:s,"aria-label":d,children:c},c))})}),t.jsx(v.div,{initial:{opacity:0},animate:{opacity:1},transition:{duration:.3},exit:{opacity:0},children:t.jsxs("div",{className:"grow basis-0 justify-end items-center hidden lg:flex",children:[t.jsx("a",{className:`text-white rounded-xl
           bg-shorebirdBg2 text-sm flex`,href:x.discordUrl,target:"_blank","aria-label":"discord",children:t.jsx(O,{})}),t.jsx("a",{className:`text-white rounded-xl
           bg-shorebirdBg2 text-sm flex ml-4`,href:x.twitterUrl,target:"_blank","aria-label":"twitter",children:t.jsx(_,{})}),t.jsx("a",{className:`text-white rounded-xl
           bg-shorebirdBg2 text-sm flex ml-4`,href:x.githubUrl,target:"_blank","aria-label":"source code",children:t.jsx(K,{})}),t.jsx("a",{className:"text-white ml-4 border-2 border-slate-600 rounded-md p-2 hover:border-slate-400",href:x.consoleUrl,target:"_blank","aria-label":"source code",children:"Console"})]})}),n.links?t.jsxs("div",{className:"lg:hidden flex flex-col  px-2 py-3 border-solid border border-gray-600 rounded-md cursor-pointer hover:bg-shorebirdBg2",onClick:()=>r(!i),children:[t.jsx("div",{className:"w-5 h-0.5 bg-gray-500  mb-1"}),t.jsx("div",{className:"w-5 h-0.5 bg-gray-500  mb-1"}),t.jsx("div",{className:"w-5 h-0.5 bg-gray-500 "})]}):t.jsx(t.Fragment,{})]}),t.jsx(Q,{children:i&&t.jsx(v.div,{initial:{opacity:0},animate:{opacity:1},transition:{duration:.3},exit:{opacity:0},children:t.jsxs("div",{className:`flex flex-col mt-16 lg:hidden absolute top-4 left-0  bg-shorebirdBg1 z-50 w-full 
        items-center gap-10 pb-10 border-y border-solid border-shorebirdBg3 pt-10
        `,children:[t.jsx("a",{className:"navbar-link",href:x.consoleUrl,target:"_blank","aria-label":"source code",children:"Console"}),n.links?.map(({label:s,href:c,ariaLabel:d})=>t.jsx("a",{className:"navbar-link",href:c,onClick:()=>r(!1),"aria-label":d,children:s},c))]})})})]})};export{re as Navbar};