import{r as x}from"./index.BCtMShv3.js";var Q={exports:{}},W={};/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var pe;function Me(){if(pe)return W;pe=1;var e=Symbol.for("react.transitional.element"),o=Symbol.for("react.fragment");function t(r,n,l){var a=null;if(l!==void 0&&(a=""+l),n.key!==void 0&&(a=""+n.key),"key"in n){l={};for(var p in n)p!=="key"&&(l[p]=n[p])}else l=n;return n=l.ref,{$$typeof:e,type:r,key:a,ref:n!==void 0?n:null,props:l}}return W.Fragment=o,W.jsx=t,W.jsxs=t,W}var fe;function Ee(){return fe||(fe=1,Q.exports=Me()),Q.exports}var D=Ee();function be(e,o){if(typeof e=="function")return e(o);e!=null&&(e.current=o)}function xe(...e){return o=>{let t=!1;const r=e.map(n=>{const l=be(n,o);return!t&&typeof l=="function"&&(t=!0),l});if(t)return()=>{for(let n=0;n<r.length;n++){const l=r[n];typeof l=="function"?l():be(e[n],null)}}}}function zr(...e){return x.useCallback(xe(...e),e)}var Pe=x.forwardRef((e,o)=>{const{children:t,...r}=e,n=x.Children.toArray(t),l=n.find(Ge);if(l){const a=l.props.children,p=n.map(d=>d===l?x.Children.count(a)>1?x.Children.only(null):x.isValidElement(a)?a.props.children:null:d);return D.jsx(ee,{...r,ref:o,children:x.isValidElement(a)?x.cloneElement(a,void 0,p):null})}return D.jsx(ee,{...r,ref:o,children:t})});Pe.displayName="Slot";var ee=x.forwardRef((e,o)=>{const{children:t,...r}=e;if(x.isValidElement(t)){const n=je(t),l=Te(r,t.props);return t.type!==x.Fragment&&(l.ref=o?xe(o,n):n),x.cloneElement(t,l)}return x.Children.count(t)>1?x.Children.only(null):null});ee.displayName="SlotClone";var Ie=({children:e})=>D.jsx(D.Fragment,{children:e});function Ge(e){return x.isValidElement(e)&&e.type===Ie}function Te(e,o){const t={...o};for(const r in o){const n=e[r],l=o[r];/^on[A-Z]/.test(r)?n&&l?t[r]=(...p)=>{l(...p),n(...p)}:n&&(t[r]=n):r==="style"?t[r]={...n,...l}:r==="className"&&(t[r]=[n,l].filter(Boolean).join(" "))}return{...e,...t}}function je(e){let o=Object.getOwnPropertyDescriptor(e.props,"ref")?.get,t=o&&"isReactWarning"in o&&o.isReactWarning;return t?e.ref:(o=Object.getOwnPropertyDescriptor(e,"ref")?.get,t=o&&"isReactWarning"in o&&o.isReactWarning,t?e.props.ref:e.props.ref||e.ref)}function ye(e){var o,t,r="";if(typeof e=="string"||typeof e=="number")r+=e;else if(typeof e=="object")if(Array.isArray(e)){var n=e.length;for(o=0;o<n;o++)e[o]&&(t=ye(e[o]))&&(r&&(r+=" "),r+=t)}else for(t in e)e[t]&&(r&&(r+=" "),r+=t);return r}function Ne(){for(var e,o,t=0,r="",n=arguments.length;t<n;t++)(e=arguments[t])&&(o=ye(e))&&(r&&(r+=" "),r+=o);return r}const ne="-",Ve=e=>{const o=Oe(e),{conflictingClassGroups:t,conflictingClassGroupModifiers:r}=e;return{getClassGroupId:a=>{const p=a.split(ne);return p[0]===""&&p.length!==1&&p.shift(),we(p,o)||Le(a)},getConflictingClassGroupIds:(a,p)=>{const d=t[a]||[];return p&&r[a]?[...d,...r[a]]:d}}},we=(e,o)=>{if(e.length===0)return o.classGroupId;const t=e[0],r=o.nextPart.get(t),n=r?we(e.slice(1),r):void 0;if(n)return n;if(o.validators.length===0)return;const l=e.join(ne);return o.validators.find(({validator:a})=>a(l))?.classGroupId},ge=/^\[(.+)\]$/,Le=e=>{if(ge.test(e)){const o=ge.exec(e)[1],t=o?.substring(0,o.indexOf(":"));if(t)return"arbitrary.."+t}},Oe=e=>{const{theme:o,classGroups:t}=e,r={nextPart:new Map,validators:[]};for(const n in t)re(t[n],r,n,o);return r},re=(e,o,t,r)=>{e.forEach(n=>{if(typeof n=="string"){const l=n===""?o:me(o,n);l.classGroupId=t;return}if(typeof n=="function"){if(_e(n)){re(n(r),o,t,r);return}o.validators.push({validator:n,classGroupId:t});return}Object.entries(n).forEach(([l,a])=>{re(a,me(o,l),t,r)})})},me=(e,o)=>{let t=e;return o.split(ne).forEach(r=>{t.nextPart.has(r)||t.nextPart.set(r,{nextPart:new Map,validators:[]}),t=t.nextPart.get(r)}),t},_e=e=>e.isThemeGetter,Fe=e=>{if(e<1)return{get:()=>{},set:()=>{}};let o=0,t=new Map,r=new Map;const n=(l,a)=>{t.set(l,a),o++,o>e&&(o=0,r=t,t=new Map)};return{get(l){let a=t.get(l);if(a!==void 0)return a;if((a=r.get(l))!==void 0)return n(l,a),a},set(l,a){t.has(l)?t.set(l,a):n(l,a)}}},te="!",oe=":",We=oe.length,$e=e=>{const{prefix:o,experimentalParseClassName:t}=e;let r=n=>{const l=[];let a=0,p=0,d=0,g;for(let w=0;w<n.length;w++){let v=n[w];if(a===0&&p===0){if(v===oe){l.push(n.slice(d,w)),d=w+We;continue}if(v==="/"){g=w;continue}}v==="["?a++:v==="]"?a--:v==="("?p++:v===")"&&p--}const m=l.length===0?n:n.substring(d),z=Be(m),L=z!==m,O=g&&g>d?g-d:void 0;return{modifiers:l,hasImportantModifier:L,baseClassName:z,maybePostfixModifierPosition:O}};if(o){const n=o+oe,l=r;r=a=>a.startsWith(n)?l(a.substring(n.length)):{isExternal:!0,modifiers:[],hasImportantModifier:!1,baseClassName:a,maybePostfixModifierPosition:void 0}}if(t){const n=r;r=l=>t({className:l,parseClassName:n})}return r},Be=e=>e.endsWith(te)?e.substring(0,e.length-1):e.startsWith(te)?e.substring(1):e,qe=e=>{const o=Object.fromEntries(e.orderSensitiveModifiers.map(r=>[r,!0]));return r=>{if(r.length<=1)return r;const n=[];let l=[];return r.forEach(a=>{a[0]==="["||o[a]?(n.push(...l.sort(),a),l=[]):l.push(a)}),n.push(...l.sort()),n}},Je=e=>({cache:Fe(e.cacheSize),parseClassName:$e(e),sortModifiers:qe(e),...Ve(e)}),Ue=/\s+/,He=(e,o)=>{const{parseClassName:t,getClassGroupId:r,getConflictingClassGroupIds:n,sortModifiers:l}=o,a=[],p=e.trim().split(Ue);let d="";for(let g=p.length-1;g>=0;g-=1){const m=p[g],{isExternal:z,modifiers:L,hasImportantModifier:O,baseClassName:w,maybePostfixModifierPosition:v}=t(m);if(z){d=m+(d.length>0?" "+d:d);continue}let P=!!v,S=r(P?w.substring(0,v):w);if(!S){if(!P){d=m+(d.length>0?" "+d:d);continue}if(S=r(w),!S){d=m+(d.length>0?" "+d:d);continue}P=!1}const _=l(L).join(":"),F=O?_+te:_,I=F+S;if(a.includes(I))continue;a.push(I);const G=n(S,P);for(let c=0;c<G.length;++c){const k=G[c];a.push(F+k)}d=m+(d.length>0?" "+d:d)}return d};function De(){let e=0,o,t,r="";for(;e<arguments.length;)(o=arguments[e++])&&(t=ve(o))&&(r&&(r+=" "),r+=t);return r}const ve=e=>{if(typeof e=="string")return e;let o,t="";for(let r=0;r<e.length;r++)e[r]&&(o=ve(e[r]))&&(t&&(t+=" "),t+=o);return t};function Ye(e,...o){let t,r,n,l=a;function a(d){const g=o.reduce((m,z)=>z(m),e());return t=Je(g),r=t.cache.get,n=t.cache.set,l=p,p(d)}function p(d){const g=r(d);if(g)return g;const m=He(d,t);return n(d,m),m}return function(){return l(De.apply(null,arguments))}}const b=e=>{const o=t=>t[e]||[];return o.isThemeGetter=!0,o},ke=/^\[(?:(\w[\w-]*):)?(.+)\]$/i,Ce=/^\((?:(\w[\w-]*):)?(.+)\)$/i,Xe=/^\d+\/\d+$/,Ze=/^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/,Qe=/\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/,Ke=/^(rgba?|hsla?|hwb|(ok)?(lab|lch))\(.+\)$/,er=/^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/,rr=/^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/,j=e=>Xe.test(e),u=e=>!!e&&!Number.isNaN(Number(e)),M=e=>!!e&&Number.isInteger(Number(e)),he=e=>e.endsWith("%")&&u(e.slice(0,-1)),R=e=>Ze.test(e),tr=()=>!0,or=e=>Qe.test(e)&&!Ke.test(e),se=()=>!1,nr=e=>er.test(e),sr=e=>rr.test(e),ir=e=>!s(e)&&!i(e),lr=e=>N(e,Se,se),s=e=>ke.test(e),E=e=>N(e,Ae,or),K=e=>N(e,xr,u),ar=e=>N(e,ze,se),cr=e=>N(e,Re,sr),dr=e=>N(e,se,nr),i=e=>Ce.test(e),H=e=>V(e,Ae),ur=e=>V(e,yr),pr=e=>V(e,ze),fr=e=>V(e,Se),br=e=>V(e,Re),gr=e=>V(e,wr,!0),N=(e,o,t)=>{const r=ke.exec(e);return r?r[1]?o(r[1]):t(r[2]):!1},V=(e,o,t=!1)=>{const r=Ce.exec(e);return r?r[1]?o(r[1]):t:!1},ze=e=>e==="position",mr=new Set(["image","url"]),Re=e=>mr.has(e),hr=new Set(["length","size","percentage"]),Se=e=>hr.has(e),Ae=e=>e==="length",xr=e=>e==="number",yr=e=>e==="family-name",wr=e=>e==="shadow",vr=()=>{const e=b("color"),o=b("font"),t=b("text"),r=b("font-weight"),n=b("tracking"),l=b("leading"),a=b("breakpoint"),p=b("container"),d=b("spacing"),g=b("radius"),m=b("shadow"),z=b("inset-shadow"),L=b("drop-shadow"),O=b("blur"),w=b("perspective"),v=b("aspect"),P=b("ease"),S=b("animate"),_=()=>["auto","avoid","all","avoid-page","page","left","right","column"],F=()=>["bottom","center","left","left-bottom","left-top","right","right-bottom","right-top","top"],I=()=>["auto","hidden","clip","visible","scroll"],G=()=>["auto","contain","none"],c=()=>[i,s,d],k=()=>[j,"full","auto",...c()],ie=()=>[M,"none","subgrid",i,s],le=()=>["auto",{span:["full",M,i,s]},i,s],$=()=>[M,"auto",i,s],ae=()=>["auto","min","max","fr",i,s],Y=()=>["start","end","center","between","around","evenly","stretch","baseline"],T=()=>["start","end","center","stretch"],C=()=>["auto",...c()],A=()=>[j,"auto","full","dvw","dvh","lvw","lvh","svw","svh","min","max","fit",...c()],f=()=>[e,i,s],X=()=>[he,E],h=()=>["","none","full",g,i,s],y=()=>["",u,H,E],B=()=>["solid","dashed","dotted","double"],ce=()=>["normal","multiply","screen","overlay","darken","lighten","color-dodge","color-burn","hard-light","soft-light","difference","exclusion","hue","saturation","color","luminosity"],de=()=>["","none",O,i,s],ue=()=>["center","top","top-right","right","bottom-right","bottom","bottom-left","left","top-left",i,s],q=()=>["none",u,i,s],J=()=>["none",u,i,s],Z=()=>[u,i,s],U=()=>[j,"full",...c()];return{cacheSize:500,theme:{animate:["spin","ping","pulse","bounce"],aspect:["video"],blur:[R],breakpoint:[R],color:[tr],container:[R],"drop-shadow":[R],ease:["in","out","in-out"],font:[ir],"font-weight":["thin","extralight","light","normal","medium","semibold","bold","extrabold","black"],"inset-shadow":[R],leading:["none","tight","snug","normal","relaxed","loose"],perspective:["dramatic","near","normal","midrange","distant","none"],radius:[R],shadow:[R],spacing:["px",u],text:[R],tracking:["tighter","tight","normal","wide","wider","widest"]},classGroups:{aspect:[{aspect:["auto","square",j,s,i,v]}],container:["container"],columns:[{columns:[u,s,i,p]}],"break-after":[{"break-after":_()}],"break-before":[{"break-before":_()}],"break-inside":[{"break-inside":["auto","avoid","avoid-page","avoid-column"]}],"box-decoration":[{"box-decoration":["slice","clone"]}],box:[{box:["border","content"]}],display:["block","inline-block","inline","flex","inline-flex","table","inline-table","table-caption","table-cell","table-column","table-column-group","table-footer-group","table-header-group","table-row-group","table-row","flow-root","grid","inline-grid","contents","list-item","hidden"],sr:["sr-only","not-sr-only"],float:[{float:["right","left","none","start","end"]}],clear:[{clear:["left","right","both","none","start","end"]}],isolation:["isolate","isolation-auto"],"object-fit":[{object:["contain","cover","fill","none","scale-down"]}],"object-position":[{object:[...F(),s,i]}],overflow:[{overflow:I()}],"overflow-x":[{"overflow-x":I()}],"overflow-y":[{"overflow-y":I()}],overscroll:[{overscroll:G()}],"overscroll-x":[{"overscroll-x":G()}],"overscroll-y":[{"overscroll-y":G()}],position:["static","fixed","absolute","relative","sticky"],inset:[{inset:k()}],"inset-x":[{"inset-x":k()}],"inset-y":[{"inset-y":k()}],start:[{start:k()}],end:[{end:k()}],top:[{top:k()}],right:[{right:k()}],bottom:[{bottom:k()}],left:[{left:k()}],visibility:["visible","invisible","collapse"],z:[{z:[M,"auto",i,s]}],basis:[{basis:[j,"full","auto",p,...c()]}],"flex-direction":[{flex:["row","row-reverse","col","col-reverse"]}],"flex-wrap":[{flex:["nowrap","wrap","wrap-reverse"]}],flex:[{flex:[u,j,"auto","initial","none",s]}],grow:[{grow:["",u,i,s]}],shrink:[{shrink:["",u,i,s]}],order:[{order:[M,"first","last","none",i,s]}],"grid-cols":[{"grid-cols":ie()}],"col-start-end":[{col:le()}],"col-start":[{"col-start":$()}],"col-end":[{"col-end":$()}],"grid-rows":[{"grid-rows":ie()}],"row-start-end":[{row:le()}],"row-start":[{"row-start":$()}],"row-end":[{"row-end":$()}],"grid-flow":[{"grid-flow":["row","col","dense","row-dense","col-dense"]}],"auto-cols":[{"auto-cols":ae()}],"auto-rows":[{"auto-rows":ae()}],gap:[{gap:c()}],"gap-x":[{"gap-x":c()}],"gap-y":[{"gap-y":c()}],"justify-content":[{justify:[...Y(),"normal"]}],"justify-items":[{"justify-items":[...T(),"normal"]}],"justify-self":[{"justify-self":["auto",...T()]}],"align-content":[{content:["normal",...Y()]}],"align-items":[{items:[...T(),"baseline"]}],"align-self":[{self:["auto",...T(),"baseline"]}],"place-content":[{"place-content":Y()}],"place-items":[{"place-items":[...T(),"baseline"]}],"place-self":[{"place-self":["auto",...T()]}],p:[{p:c()}],px:[{px:c()}],py:[{py:c()}],ps:[{ps:c()}],pe:[{pe:c()}],pt:[{pt:c()}],pr:[{pr:c()}],pb:[{pb:c()}],pl:[{pl:c()}],m:[{m:C()}],mx:[{mx:C()}],my:[{my:C()}],ms:[{ms:C()}],me:[{me:C()}],mt:[{mt:C()}],mr:[{mr:C()}],mb:[{mb:C()}],ml:[{ml:C()}],"space-x":[{"space-x":c()}],"space-x-reverse":["space-x-reverse"],"space-y":[{"space-y":c()}],"space-y-reverse":["space-y-reverse"],size:[{size:A()}],w:[{w:[p,"screen",...A()]}],"min-w":[{"min-w":[p,"screen","none",...A()]}],"max-w":[{"max-w":[p,"screen","none","prose",{screen:[a]},...A()]}],h:[{h:["screen",...A()]}],"min-h":[{"min-h":["screen","none",...A()]}],"max-h":[{"max-h":["screen",...A()]}],"font-size":[{text:["base",t,H,E]}],"font-smoothing":["antialiased","subpixel-antialiased"],"font-style":["italic","not-italic"],"font-weight":[{font:[r,i,K]}],"font-stretch":[{"font-stretch":["ultra-condensed","extra-condensed","condensed","semi-condensed","normal","semi-expanded","expanded","extra-expanded","ultra-expanded",he,s]}],"font-family":[{font:[ur,s,o]}],"fvn-normal":["normal-nums"],"fvn-ordinal":["ordinal"],"fvn-slashed-zero":["slashed-zero"],"fvn-figure":["lining-nums","oldstyle-nums"],"fvn-spacing":["proportional-nums","tabular-nums"],"fvn-fraction":["diagonal-fractions","stacked-fractions"],tracking:[{tracking:[n,i,s]}],"line-clamp":[{"line-clamp":[u,"none",i,K]}],leading:[{leading:[l,...c()]}],"list-image":[{"list-image":["none",i,s]}],"list-style-position":[{list:["inside","outside"]}],"list-style-type":[{list:["disc","decimal","none",i,s]}],"text-alignment":[{text:["left","center","right","justify","start","end"]}],"placeholder-color":[{placeholder:f()}],"text-color":[{text:f()}],"text-decoration":["underline","overline","line-through","no-underline"],"text-decoration-style":[{decoration:[...B(),"wavy"]}],"text-decoration-thickness":[{decoration:[u,"from-font","auto",i,E]}],"text-decoration-color":[{decoration:f()}],"underline-offset":[{"underline-offset":[u,"auto",i,s]}],"text-transform":["uppercase","lowercase","capitalize","normal-case"],"text-overflow":["truncate","text-ellipsis","text-clip"],"text-wrap":[{text:["wrap","nowrap","balance","pretty"]}],indent:[{indent:c()}],"vertical-align":[{align:["baseline","top","middle","bottom","text-top","text-bottom","sub","super",i,s]}],whitespace:[{whitespace:["normal","nowrap","pre","pre-line","pre-wrap","break-spaces"]}],break:[{break:["normal","words","all","keep"]}],hyphens:[{hyphens:["none","manual","auto"]}],content:[{content:["none",i,s]}],"bg-attachment":[{bg:["fixed","local","scroll"]}],"bg-clip":[{"bg-clip":["border","padding","content","text"]}],"bg-origin":[{"bg-origin":["border","padding","content"]}],"bg-position":[{bg:[...F(),pr,ar]}],"bg-repeat":[{bg:["no-repeat",{repeat:["","x","y","space","round"]}]}],"bg-size":[{bg:["auto","cover","contain",fr,lr]}],"bg-image":[{bg:["none",{linear:[{to:["t","tr","r","br","b","bl","l","tl"]},M,i,s],radial:["",i,s],conic:[M,i,s]},br,cr]}],"bg-color":[{bg:f()}],"gradient-from-pos":[{from:X()}],"gradient-via-pos":[{via:X()}],"gradient-to-pos":[{to:X()}],"gradient-from":[{from:f()}],"gradient-via":[{via:f()}],"gradient-to":[{to:f()}],rounded:[{rounded:h()}],"rounded-s":[{"rounded-s":h()}],"rounded-e":[{"rounded-e":h()}],"rounded-t":[{"rounded-t":h()}],"rounded-r":[{"rounded-r":h()}],"rounded-b":[{"rounded-b":h()}],"rounded-l":[{"rounded-l":h()}],"rounded-ss":[{"rounded-ss":h()}],"rounded-se":[{"rounded-se":h()}],"rounded-ee":[{"rounded-ee":h()}],"rounded-es":[{"rounded-es":h()}],"rounded-tl":[{"rounded-tl":h()}],"rounded-tr":[{"rounded-tr":h()}],"rounded-br":[{"rounded-br":h()}],"rounded-bl":[{"rounded-bl":h()}],"border-w":[{border:y()}],"border-w-x":[{"border-x":y()}],"border-w-y":[{"border-y":y()}],"border-w-s":[{"border-s":y()}],"border-w-e":[{"border-e":y()}],"border-w-t":[{"border-t":y()}],"border-w-r":[{"border-r":y()}],"border-w-b":[{"border-b":y()}],"border-w-l":[{"border-l":y()}],"divide-x":[{"divide-x":y()}],"divide-x-reverse":["divide-x-reverse"],"divide-y":[{"divide-y":y()}],"divide-y-reverse":["divide-y-reverse"],"border-style":[{border:[...B(),"hidden","none"]}],"divide-style":[{divide:[...B(),"hidden","none"]}],"border-color":[{border:f()}],"border-color-x":[{"border-x":f()}],"border-color-y":[{"border-y":f()}],"border-color-s":[{"border-s":f()}],"border-color-e":[{"border-e":f()}],"border-color-t":[{"border-t":f()}],"border-color-r":[{"border-r":f()}],"border-color-b":[{"border-b":f()}],"border-color-l":[{"border-l":f()}],"divide-color":[{divide:f()}],"outline-style":[{outline:[...B(),"none","hidden"]}],"outline-offset":[{"outline-offset":[u,i,s]}],"outline-w":[{outline:["",u,H,E]}],"outline-color":[{outline:[e]}],shadow:[{shadow:["","none",m,gr,dr]}],"shadow-color":[{shadow:f()}],"inset-shadow":[{"inset-shadow":["none",i,s,z]}],"inset-shadow-color":[{"inset-shadow":f()}],"ring-w":[{ring:y()}],"ring-w-inset":["ring-inset"],"ring-color":[{ring:f()}],"ring-offset-w":[{"ring-offset":[u,E]}],"ring-offset-color":[{"ring-offset":f()}],"inset-ring-w":[{"inset-ring":y()}],"inset-ring-color":[{"inset-ring":f()}],opacity:[{opacity:[u,i,s]}],"mix-blend":[{"mix-blend":[...ce(),"plus-darker","plus-lighter"]}],"bg-blend":[{"bg-blend":ce()}],filter:[{filter:["","none",i,s]}],blur:[{blur:de()}],brightness:[{brightness:[u,i,s]}],contrast:[{contrast:[u,i,s]}],"drop-shadow":[{"drop-shadow":["","none",L,i,s]}],grayscale:[{grayscale:["",u,i,s]}],"hue-rotate":[{"hue-rotate":[u,i,s]}],invert:[{invert:["",u,i,s]}],saturate:[{saturate:[u,i,s]}],sepia:[{sepia:["",u,i,s]}],"backdrop-filter":[{"backdrop-filter":["","none",i,s]}],"backdrop-blur":[{"backdrop-blur":de()}],"backdrop-brightness":[{"backdrop-brightness":[u,i,s]}],"backdrop-contrast":[{"backdrop-contrast":[u,i,s]}],"backdrop-grayscale":[{"backdrop-grayscale":["",u,i,s]}],"backdrop-hue-rotate":[{"backdrop-hue-rotate":[u,i,s]}],"backdrop-invert":[{"backdrop-invert":["",u,i,s]}],"backdrop-opacity":[{"backdrop-opacity":[u,i,s]}],"backdrop-saturate":[{"backdrop-saturate":[u,i,s]}],"backdrop-sepia":[{"backdrop-sepia":["",u,i,s]}],"border-collapse":[{border:["collapse","separate"]}],"border-spacing":[{"border-spacing":c()}],"border-spacing-x":[{"border-spacing-x":c()}],"border-spacing-y":[{"border-spacing-y":c()}],"table-layout":[{table:["auto","fixed"]}],caption:[{caption:["top","bottom"]}],transition:[{transition:["","all","colors","opacity","shadow","transform","none",i,s]}],"transition-behavior":[{transition:["normal","discrete"]}],duration:[{duration:[u,"initial",i,s]}],ease:[{ease:["linear","initial",P,i,s]}],delay:[{delay:[u,i,s]}],animate:[{animate:["none",S,i,s]}],backface:[{backface:["hidden","visible"]}],perspective:[{perspective:[w,i,s]}],"perspective-origin":[{"perspective-origin":ue()}],rotate:[{rotate:q()}],"rotate-x":[{"rotate-x":q()}],"rotate-y":[{"rotate-y":q()}],"rotate-z":[{"rotate-z":q()}],scale:[{scale:J()}],"scale-x":[{"scale-x":J()}],"scale-y":[{"scale-y":J()}],"scale-z":[{"scale-z":J()}],"scale-3d":["scale-3d"],skew:[{skew:Z()}],"skew-x":[{"skew-x":Z()}],"skew-y":[{"skew-y":Z()}],transform:[{transform:[i,s,"","none","gpu","cpu"]}],"transform-origin":[{origin:ue()}],"transform-style":[{transform:["3d","flat"]}],translate:[{translate:U()}],"translate-x":[{"translate-x":U()}],"translate-y":[{"translate-y":U()}],"translate-z":[{"translate-z":U()}],"translate-none":["translate-none"],accent:[{accent:f()}],appearance:[{appearance:["none","auto"]}],"caret-color":[{caret:f()}],"color-scheme":[{scheme:["normal","dark","light","light-dark","only-dark","only-light"]}],cursor:[{cursor:["auto","default","pointer","wait","text","move","help","not-allowed","none","context-menu","progress","cell","crosshair","vertical-text","alias","copy","no-drop","grab","grabbing","all-scroll","col-resize","row-resize","n-resize","e-resize","s-resize","w-resize","ne-resize","nw-resize","se-resize","sw-resize","ew-resize","ns-resize","nesw-resize","nwse-resize","zoom-in","zoom-out",i,s]}],"field-sizing":[{"field-sizing":["fixed","content"]}],"pointer-events":[{"pointer-events":["auto","none"]}],resize:[{resize:["none","","y","x"]}],"scroll-behavior":[{scroll:["auto","smooth"]}],"scroll-m":[{"scroll-m":c()}],"scroll-mx":[{"scroll-mx":c()}],"scroll-my":[{"scroll-my":c()}],"scroll-ms":[{"scroll-ms":c()}],"scroll-me":[{"scroll-me":c()}],"scroll-mt":[{"scroll-mt":c()}],"scroll-mr":[{"scroll-mr":c()}],"scroll-mb":[{"scroll-mb":c()}],"scroll-ml":[{"scroll-ml":c()}],"scroll-p":[{"scroll-p":c()}],"scroll-px":[{"scroll-px":c()}],"scroll-py":[{"scroll-py":c()}],"scroll-ps":[{"scroll-ps":c()}],"scroll-pe":[{"scroll-pe":c()}],"scroll-pt":[{"scroll-pt":c()}],"scroll-pr":[{"scroll-pr":c()}],"scroll-pb":[{"scroll-pb":c()}],"scroll-pl":[{"scroll-pl":c()}],"snap-align":[{snap:["start","end","center","align-none"]}],"snap-stop":[{snap:["normal","always"]}],"snap-type":[{snap:["none","x","y","both"]}],"snap-strictness":[{snap:["mandatory","proximity"]}],touch:[{touch:["auto","none","manipulation"]}],"touch-x":[{"touch-pan":["x","left","right"]}],"touch-y":[{"touch-pan":["y","up","down"]}],"touch-pz":["touch-pinch-zoom"],select:[{select:["none","text","all","auto"]}],"will-change":[{"will-change":["auto","scroll","contents","transform",i,s]}],fill:[{fill:["none",...f()]}],"stroke-w":[{stroke:[u,H,E,K]}],stroke:[{stroke:["none",...f()]}],"forced-color-adjust":[{"forced-color-adjust":["auto","none"]}]},conflictingClassGroups:{overflow:["overflow-x","overflow-y"],overscroll:["overscroll-x","overscroll-y"],inset:["inset-x","inset-y","start","end","top","right","bottom","left"],"inset-x":["right","left"],"inset-y":["top","bottom"],flex:["basis","grow","shrink"],gap:["gap-x","gap-y"],p:["px","py","ps","pe","pt","pr","pb","pl"],px:["pr","pl"],py:["pt","pb"],m:["mx","my","ms","me","mt","mr","mb","ml"],mx:["mr","ml"],my:["mt","mb"],size:["w","h"],"font-size":["leading"],"fvn-normal":["fvn-ordinal","fvn-slashed-zero","fvn-figure","fvn-spacing","fvn-fraction"],"fvn-ordinal":["fvn-normal"],"fvn-slashed-zero":["fvn-normal"],"fvn-figure":["fvn-normal"],"fvn-spacing":["fvn-normal"],"fvn-fraction":["fvn-normal"],"line-clamp":["display","overflow"],rounded:["rounded-s","rounded-e","rounded-t","rounded-r","rounded-b","rounded-l","rounded-ss","rounded-se","rounded-ee","rounded-es","rounded-tl","rounded-tr","rounded-br","rounded-bl"],"rounded-s":["rounded-ss","rounded-es"],"rounded-e":["rounded-se","rounded-ee"],"rounded-t":["rounded-tl","rounded-tr"],"rounded-r":["rounded-tr","rounded-br"],"rounded-b":["rounded-br","rounded-bl"],"rounded-l":["rounded-tl","rounded-bl"],"border-spacing":["border-spacing-x","border-spacing-y"],"border-w":["border-w-s","border-w-e","border-w-t","border-w-r","border-w-b","border-w-l"],"border-w-x":["border-w-r","border-w-l"],"border-w-y":["border-w-t","border-w-b"],"border-color":["border-color-s","border-color-e","border-color-t","border-color-r","border-color-b","border-color-l"],"border-color-x":["border-color-r","border-color-l"],"border-color-y":["border-color-t","border-color-b"],translate:["translate-x","translate-y","translate-none"],"translate-none":["translate","translate-x","translate-y","translate-z"],"scroll-m":["scroll-mx","scroll-my","scroll-ms","scroll-me","scroll-mt","scroll-mr","scroll-mb","scroll-ml"],"scroll-mx":["scroll-mr","scroll-ml"],"scroll-my":["scroll-mt","scroll-mb"],"scroll-p":["scroll-px","scroll-py","scroll-ps","scroll-pe","scroll-pt","scroll-pr","scroll-pb","scroll-pl"],"scroll-px":["scroll-pr","scroll-pl"],"scroll-py":["scroll-pt","scroll-pb"],touch:["touch-x","touch-y","touch-pz"],"touch-x":["touch"],"touch-y":["touch"],"touch-pz":["touch"]},conflictingClassGroupModifiers:{"font-size":["leading"]},orderSensitiveModifiers:["before","after","placeholder","file","marker","selection","first-line","first-letter","backdrop","*","**"]}},kr=Ye(vr);function Rr(...e){return kr(Ne(e))}export{Pe as S,Ne as a,Rr as c,D as j,zr as u};
