import{c as r}from"./config.305efa8d.js";import{C as a}from"./CheckArrowIcon.53a308e6.js";import{j as e}from"./jsx-runtime.109e40f8.js";import{m as c}from"./motion.8321705d.js";import"./index.f1bc5ebf.js";const o=[{title:"Open Beta",description:"For early adopters with a sense of adventure.",price:20,features:["Unlimited apps","Unlimited updates","Access to private Discord","Live support"]}],h=()=>e.jsxs("section",{className:"w-screen flex justify-center bg-shorebirdBg2 relative",children:[e.jsx("div",{className:"absolute -top-16",id:"pricing"}),e.jsx("div",{className:"pb-20 pt-12 bg-shorebirdBg2  2xl:w-[1150px] lg:w-[1050px]  md:w-4/5 ",children:e.jsx(c.div,{initial:{opacity:0},whileInView:{opacity:1},viewport:{once:!0},transition:{duration:.5,delay:.2},children:e.jsxs("div",{className:"container mx-auto px-4",children:[e.jsxs("div",{className:"max-w-2xl mx-auto text-center mb-16",children:[e.jsx("span",{className:"shorebird-block-subtitle",children:"Pricing"}),e.jsx("h2",{className:"mt-6 mb-6 text-4xl lg:text-5xl font-bold font-heading text-white",children:"Join the flock"}),e.jsx("p",{className:"mb-6 text-shorebirdTextGray",children:"As a paying customer, you will get access to code push, our private discord, live support, and more!"})]}),e.jsx("div",{className:"flex flex-wrap flex-col lg:flex-row -mx-4 items-center justify-center mt-20",children:o.map((t,i)=>e.jsx("div",{className:"w-[350px] sm:w-[380px] lg:w-1/3 px-4 mb-8 lg:mb-0",children:e.jsxs("div",{className:"p-8 bg-shorebirdBg3 rounded-3xl",children:[e.jsx("p",{className:"mb-2 text-xl font-bold font-heading text-white text-left",children:t.title}),e.jsxs("div",{className:"flex justify-start items-end",children:[e.jsxs("div",{className:"text-4xl sm:text-5xl font-bold text-white text-left mt-4 mr-2",children:["$",t.price]}),e.jsx("div",{className:"text-gray-500",children:"/ month"})]}),e.jsx("p",{className:"mt-4 mb-6 2xl:mb-10 text-gray-500 leading-loose text-left",children:t.description}),e.jsx("ul",{className:"mb-2 2xl:mb-6 text-white",children:t.features.map((s,l)=>e.jsxs("li",{className:"mb-4 flex",children:[e.jsx(a,{}),e.jsx("span",{children:s})]},`${s}-${l}`))}),e.jsx("a",{target:"_blank",href:r.docsUrl,className:"inline-block text-center py-2 px-4 w-full rounded-xl rounded-t-xl shorebird-button-colored font-bold leading-loose mt-8",children:"Get Started"})]})},`pricing-card-${i}`))})]})})})]});export{h as Pricing};