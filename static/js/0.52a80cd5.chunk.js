(this.webpackJsonpminor=this.webpackJsonpminor||[]).push([[0],{837:function(e,t,n){"use strict";n.r(t);var a=n(17),c=n.n(a),s=n(54),l=n(201),o=n(0),r=n(117),i=n(19),d=n(3);t.default=function(){var e=Object(o.useState)(!1),t=Object(l.a)(e,2),n=t[0],a=t[1],b=Object(o.useContext)(r.a),u=b.state,x=b.setState,j=Object(i.g)().id,m=Object(o.useState)("loading"),h=Object(l.a)(m,2),f=h[0],p=h[1],O=Object(o.useState)("Software Developer"),v=Object(l.a)(O,2),g=v[0],y=v[1],N=Object(o.useState)(0),w=Object(l.a)(N,2),k=w[0],C=w[1],S=Object(o.useState)("India"),_=Object(l.a)(S,2),z=_[0],D=_[1],E=Object(i.f)(),G=Object(o.useState)(""),J=Object(l.a)(G,2),I=J[0],L=J[1];return Object(o.useEffect)((function(){u.connected||L("authenticated"),Object(s.a)(c.a.mark((function e(){var t,n;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(e.prev=0,!E.location.pathname.includes("company")){e.next=17;break}return e.next=4,u.contract.methods.companies(j).call();case 4:return t=e.sent,n=0,e.t0=n,e.next=9,u.contract.methods.curr_emp_of_company(j).call();case 9:return n=e.t0+=e.sent.length,e.t1=n,e.next=13,u.contract.methods.prev_emp_of_company(j).call();case 13:n=e.t1+=e.sent.length,C(n),e.next=20;break;case 17:return e.next=19,u.contract.methods.employees(j).call();case 19:t=e.sent;case 20:p(t.name),e.next=26;break;case 23:e.prev=23,e.t2=e.catch(0),console.log(e.t2);case 26:case"end":return e.stop()}}),e,null,[[0,23]])})))()}),[j,u.contract,E.location,x]),Object(d.jsxs)("div",{className:"flex flex-row h-full w-full p-3 items-center justify-items-stretch text-gray-600",children:[Object(d.jsxs)("div",{className:"w-4/6 h-full",children:[Object(d.jsx)("h1",{className:"text-2xl text-black",children:f}),Object(d.jsx)("div",{className:"text-3xl",children:E.location.pathname.includes("user")&&g}),Object(d.jsx)("div",{children:Object(d.jsx)("h1",{children:z})}),E.location.pathname.includes("company")&&Object(d.jsxs)("div",{className:"pt-5 text-lg",children:[k," Employees"]})]}),Object(d.jsxs)("div",{className:"w-2/6 h-full flex flex-row justify-end",children:[Object(d.jsx)("div",{className:"border-black w-36 h-36 border-solid rounded-full bg-gray-500",children:Object(d.jsx)("div",{className:"text-7xl text-center p-6",children:Object(d.jsx)("i",{className:"fas fa-user"})})}),Object(d.jsx)("div",{className:I,children:Object(d.jsx)("button",{className:"bg-red-800 inline text-white active:bg-red-800 font-bold uppercase text-sm px-4 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150",type:"button",onClick:function(){return a(!0)},children:Object(d.jsx)("i",{class:"fas fa-edit"})})})]}),n?Object(d.jsxs)("div",{children:[" ",Object(d.jsx)("div",{className:"justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none",children:Object(d.jsx)("div",{className:"relative w-auto my-6 mx-auto max-w-3xl",children:Object(d.jsxs)("div",{className:"border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none",children:[Object(d.jsxs)("div",{className:"flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t",children:[Object(d.jsx)("h4",{className:"text-3xl font-semibold text-black text-center",children:"Profile"}),Object(d.jsx)("button",{className:"p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none",onClick:function(){return a(!1)},children:Object(d.jsx)("span",{className:"bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none",children:"\xd7"})})]}),Object(d.jsx)("div",{className:"relative p-6 flex-auto my-4 text-black text-lg leading-relaxed",children:Object(d.jsxs)("form",{className:"mx-auto",children:[Object(d.jsx)("label",{className:"px-1",children:"Role:"}),Object(d.jsx)("input",{className:"border-solid border-black px-2",type:"text",value:g,onChange:function(e){y(e.target.value)}}),Object(d.jsx)("br",{}),Object(d.jsx)("label",{className:"px-1",children:"Location:"}),Object(d.jsx)("input",{className:"border-solid border-black px-2",type:"text",value:z,onChange:function(e){D(e.target.value)}})]})}),Object(d.jsxs)("div",{className:"flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b",children:[Object(d.jsx)("button",{className:"text-red-500 background-transparent font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150",type:"button",onClick:function(){return a(!1)},children:"Close"}),Object(d.jsx)("button",{className:"bg-emerald-500 text-black active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150",type:"button",onClick:function(){a(!1)},children:"Done"})]})]})})}),Object(d.jsx)("div",{className:"opacity-25 fixed inset-0 z-40 bg-black"})]}):Object(d.jsx)("div",{})]})}}}]);
//# sourceMappingURL=0.52a80cd5.chunk.js.map