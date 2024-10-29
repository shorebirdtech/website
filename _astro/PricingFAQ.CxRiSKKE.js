import{j as e}from"./jsx-runtime.7faW4zRM.js";import{r as i}from"./index.DhYZZe0J.js";import{c as n}from"./config.mbkNfKtz.js";import{m as l}from"./proxy.CM-RIm24.js";import{M as c}from"./index.DL2udzD1.js";const h=[{question:"How many patch installs will I use?",answer:"You are only billed for successful patch installs.      This occurs when the user opens your app with the new patch installed.      A rule of thumb is number of patches per month times number of monthly active users.      If you have 1000 MAU and you ship 4 patches per month, you will likely use about 4000 patch installs."},{question:"Do you offer discounts?",answer:"We offer committed use discounts for customers who commit to a certain number of patch installs per month.  We offer committed usage discounts starting at 2.5M patches per month."},{question:"How much are your Enterprise plans?",answer:"We offer our enterprise services starting at $2,000 per month.  Below that level we recommend our self-service plans."},{question:"Do patch installs expire?",answer:"Yes, patch install credits expire at the end of each billing period, typically one month.  We do not offer rollover credits."},{question:"Can I pay annually?",answer:"Customers using committed use discounts can choose to pay annually.  We do not offer annual billing for self-service plans."},{question:"What payment methods do you accept?",answer:"We accept any method of payment Stripe accepts in your region.  Enterprise customers can also pay by invoice."},{question:"When am I charged for patch installs?",answer:`At the start of each billing period, you are billed for your pre-paid patches.        In the case of a Pro plan, this includes 50,000 pre-paid patch installs.       "Overage" patch installs are billed at the end of each billing period.       The initial invoice (month 1) will only include the prepaid patches, however successive months will include       overage bills as well.  For example, if you are using the Pro plan       (includes 50,000 pre-paid patches), and you use 100,000 patch installs each month,       you will be charged $20 when you sign up, and then $40 at the beginning of month 2       ($20 for the 50,000 overage, and $20 for Month 2's Pro plan).       You can always check the status of your account and billing at       https://console.shorebird.dev/account.`}],w=()=>e.jsxs("section",{className:"bg-blueGray-50 relative overflow-hidden pb-16 pt-16",children:[e.jsx("div",{className:"absolute -top-10",id:"faq"}),e.jsx(l.div,{initial:{opacity:0},whileInView:{opacity:1},viewport:{once:!0},transition:{duration:.5,delay:.2},children:e.jsx("div",{className:"container relative z-10 mx-auto w-11/12 px-2 sm:w-full sm:px-8 lg:px-4",children:e.jsxs("div",{className:"mx-auto md:max-w-4xl",children:[e.jsx("h2",{className:"shorebird-block-big-title mb-16 text-center",children:"FAQs"}),e.jsx("div",{className:"-m-1 mb-11 flex flex-wrap",children:h.map((s,t)=>e.jsx("div",{className:"w-full p-1",children:e.jsx(d,{title:s.question,content:s.answer,defaultOpen:!1})},t))}),e.jsx("div",{children:e.jsxs("p",{className:"text-center text-white",children:["For additional questions,"," ",e.jsx("a",{target:"_blank",className:"underline",href:"https://docs.shorebird.dev/faq",children:"see our docs"})," ","or"," ",e.jsx("a",{target:"_blank",className:"underline",href:n.discordUrl,children:"ask us on Discord."})]})})]})})})]}),d=({defaultOpen:s,title:t,content:a})=>{const[o,r]=i.useState(s);return e.jsxs("div",{className:"shorebird-border-gray-darker relative mb-4 cursor-pointer rounded-3xl bg-shorebirdBg3 px-3 pb-2 pt-2 hover:bg-shorebirdBg3Hover sm:px-8 sm:pt-6",onClick:()=>r(!o),children:[e.jsxs("div",{className:"flex flex-col items-start justify-center p-2",children:[e.jsx("h3",{className:"shorebird-content-title pr-8 pt-3 sm:pr-0 sm:pt-0",children:t}),e.jsx(c,{className:`prose prose-invert overflow-hidden pt-4 text-shorebirdTextGray transition-all duration-300 ${o?"max-h-96":"max-h-0"}`,children:`${a}`})]}),e.jsx("div",{className:"absolute right-4 top-6 sm:right-8 sm:top-8",children:e.jsx("svg",{width:"28px",height:"30px",viewBox:"0 0 20 20",fill:"none",xmlns:"http://www.w3.org/2000/svg",className:`transition-all duration-500 ${o?"rotate-[180deg]":"rotate-[270deg]"}`,children:e.jsx("path",{d:"M4.16732 12.5L10.0007 6.66667L15.834 12.5",stroke:"#0196C0",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})})})]})};export{w as PricingFAQ};
