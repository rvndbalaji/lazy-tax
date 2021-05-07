(this["webpackJsonplazy-tax"]=this["webpackJsonplazy-tax"]||[]).push([[0],{27:function(e,t,a){},28:function(e,t,a){},34:function(e,t,a){"use strict";a.r(t);var c=a(1),s=a.n(c),n=a(20),r=a.n(n),l=(a(27),a(28),a(11)),i=a(10),j=a(12),d=a(13),h=a(15),o=a(14),b=a(21),u=a(9),x=a(0),O=function(e){Object(h.a)(a,e);var t=Object(o.a)(a);function a(){return Object(j.a)(this,a),t.apply(this,arguments)}return Object(d.a)(a,[{key:"render",value:function(){return Object(x.jsxs)(b.a,{fluid:!0,id:"jumbo",children:[Object(x.jsxs)(u.a,{children:[Object(x.jsx)("h1",{children:"Lazy Tax"}),Object(x.jsx)("p",{children:"Tax calculator - because you're bad at math"})]}),Object(x.jsxs)("span",{id:"myname",children:["- Aravind Balaji, ",(new Date).getFullYear()]})]})}}]),a}(s.a.Component),m=a(2),p=a(8),f=a(7),y=a(22),v=function(e){Object(h.a)(a,e);var t=Object(o.a)(a);function a(e){var c;return Object(j.a)(this,a),(c=t.call(this,e)).state={basic:0,hra:0,other:0,elss:0,lic:0,phomeloan:0,othereightyc:0,fd:0,rent:0,otherded:0,oldscheme:{s1:0,s2:0,s3:0,s4:0}},c}return Object(d.a)(a,[{key:"componentDidMount",value:function(){var e=localStorage.getItem("com.rvnd.lazytax:taxstate");if(null!=e){var t=JSON.parse(e);this.setState(Object(i.a)({},t))}else localStorage.removeItem("com.rvnd.lazytax:taxstate")}},{key:"update",value:function(e,t){this.setState(Object(i.a)(Object(i.a)({},this.state),{},Object(l.a)({},e,t))),localStorage.setItem("com.rvnd.lazytax:taxstate",JSON.stringify(Object(i.a)(Object(i.a)({},this.state),{},Object(l.a)({},e,t))))}},{key:"formatIndian",value:function(e){var t,a,c=(e=(e=Number(e)).toFixed(2))+""||"";return a=(t=c.split("."))[1]||null,t=t[0].replace(/(\d)(?=(\d\d)+\d$)/g,"$1,"),c=a?t+"."+a:t}},{key:"getGrossAnnualSalary",value:function(){return Number(this.state.basic)+Number(this.state.hra)+Number(this.state.other)}},{key:"getEightyCDeductions",value:function(){var e=Number(this.getEmployeePF()+Number(this.state.elss)+Number(this.state.lic)+Number(this.state.phomeloan)+Number(this.state.othereightyc)+Number(this.state.fd));return e>=15e4?Number(15e4):e}},{key:"getFormattedEightyCDeductions",value:function(){return Object(x.jsxs)("h5",{children:["Total 80C Deductions :",Object(x.jsxs)("b",{children:["\u20b9 ",this.formatIndian(this.getEightyCDeductions())+" of "+this.formatIndian(15e4)]})]})}},{key:"getTotalDeductions",value:function(){return 52400+this.getEightyCDeductions()+this.getRentDeduction()+Number(this.state.otherded)}},{key:"getRentDeduction",value:function(){if(0===this.state.rent)return 0;var e=.5*Number(this.state.basic),t=Number(this.state.rent)-.1*Number(this.state.basic);return Number(Math.min(this.state.hra,e,t))}},{key:"getEmployeePF",value:function(){return Number(.12*this.state.basic)}},{key:"getTotalTaxableIncome",value:function(){var e=this.getGrossAnnualSalary()-this.getTotalDeductions();return e<=0?0:e}},{key:"calculateSlabTax",value:function(e,t,a){return e>=t?t*(a/100):e*(a/100)}},{key:"calculateOldSchemeTax",value:function(){var e=this.getTotalTaxableIncome(),t=this.calculateSlabTax(e,25e4,0),a=e-25e4;a<=0&&(a=0);var c=this.calculateSlabTax(a,25e4,5),s=a-25e4;s<=0&&(s=0);var n=this.calculateSlabTax(a,5e5,20),r=s-5e5;r<=0&&(r=0);var l=this.calculateSlabTax(r,r,30),j=.04*(t+c+n+l),d={s1:Number(t),s2:Number(c),s3:Number(n),s4:Number(l),totaltax:Number(t+c+n+l+j)};JSON.stringify(this.state.oldscheme)!==JSON.stringify(d)&&this.setState(Object(i.a)(Object(i.a)({},this.state),{},{oldscheme:d}))}},{key:"render",value:function(){var e=this,t=Object(x.jsxs)("h5",{children:["Annual Gross Salary :",Object(x.jsxs)("b",{children:["\u20b9 ",this.formatIndian(Number(this.getGrossAnnualSalary()))]})]}),a=this.getEmployeePF(),c=Object(x.jsxs)("h5",{children:["Total Deductions : ",Object(x.jsxs)("b",{children:["\u20b9 ",this.formatIndian(Number(this.getTotalDeductions()))]})]}),s=this.getFormattedEightyCDeductions(),n=Object(x.jsx)("h5",{children:Object(x.jsxs)("b",{children:["Total Taxable Income : \u20b9 ",this.formatIndian(Number(this.getTotalTaxableIncome()))]})});return this.calculateOldSchemeTax(),Object(x.jsxs)("div",{children:[Object(x.jsx)(O,{}),Object(x.jsxs)(u.a,{fluid:!0,children:[Object(x.jsxs)(p.a,{children:[Object(x.jsx)(f.a,{children:Object(x.jsx)(m.a,{action:"#",children:Object(x.jsxs)(m.a.Group,{controlId:"basicSalary",children:[Object(x.jsx)(m.a.Label,{children:"Basic Salary"}),Object(x.jsx)(m.a.Control,{type:"number",placeholder:"Annual Basic Salary",value:this.state.basic,onChange:function(t){e.update("basic",t.target.value)}}),Object(x.jsx)(m.a.Text,{className:"text-muted",children:"Your annual basic salary"})]})})}),Object(x.jsx)(f.a,{children:Object(x.jsx)(m.a,{children:Object(x.jsxs)(m.a.Group,{controlId:"hra",children:[Object(x.jsx)(m.a.Label,{children:"Housing Allowance"}),Object(x.jsx)(m.a.Control,{type:"number",placeholder:"Annual HRA",value:this.state.hra,onChange:function(t){e.update("hra",t.target.value)}}),Object(x.jsx)(m.a.Text,{className:"text-muted",children:"Annual HRA your company provides"})]})})}),Object(x.jsx)(f.a,{children:Object(x.jsx)(m.a,{children:Object(x.jsxs)(m.a.Group,{controlId:"otherAllowance",children:[Object(x.jsx)(m.a.Label,{children:"Other Allowances/Bonuses"}),Object(x.jsx)(m.a.Control,{type:"number",placeholder:"Other allowances",value:this.state.other,onChange:function(t){e.update("other",t.target.value)}}),Object(x.jsx)(m.a.Text,{className:"text-muted",children:"Add up your other allowances/bonuses provided annually"})]})})})]}),Object(x.jsx)("br",{}),Object(x.jsx)(p.a,{children:Object(x.jsx)(f.a,{children:t})})]}),Object(x.jsx)("br",{}),Object(x.jsx)("br",{}),Object(x.jsxs)(u.a,{fluid:!0,children:[Object(x.jsxs)(p.a,{children:[Object(x.jsx)(f.a,{children:Object(x.jsx)(m.a,{children:Object(x.jsxs)(m.a.Group,{controlId:"Employee PF",children:[Object(x.jsx)(m.a.Label,{children:"Employee PF (80C)"}),Object(x.jsx)(m.a.Control,{type:"number",value:a,disabled:!0}),Object(x.jsx)(m.a.Text,{className:"text-muted",children:"Employee PF (12% of BASIC)"})]})})}),Object(x.jsx)(f.a,{children:Object(x.jsx)(m.a,{children:Object(x.jsxs)(m.a.Group,{controlId:"ELSS",children:[Object(x.jsx)(m.a.Label,{children:"ELSS Funds (80C)"}),Object(x.jsx)(m.a.Control,{type:"number",value:this.state.elss,onChange:function(t){return e.update("elss",t.target.value)}}),Object(x.jsx)(m.a.Text,{className:"text-muted",children:"Total invested amount for the year"})]})})}),Object(x.jsx)(f.a,{children:Object(x.jsx)(m.a,{children:Object(x.jsxs)(m.a.Group,{controlId:"lic",children:[Object(x.jsx)(m.a.Label,{children:"Life Insurance (80C)"}),Object(x.jsx)(m.a.Control,{type:"number",value:this.state.lic,onChange:function(t){return e.update("lic",t.target.value)}}),Object(x.jsx)(m.a.Text,{className:"text-muted",children:"Total insurance premium paid for the year"})]})})}),Object(x.jsx)(f.a,{children:Object(x.jsx)(m.a,{children:Object(x.jsxs)(m.a.Group,{controlId:"pghomeloan",children:[Object(x.jsx)(m.a.Label,{children:"Principal Home Loan(80C)"}),Object(x.jsx)(m.a.Control,{type:"number",value:this.state.phomeloan,onChange:function(t){return e.update("phomeloan",t.target.value)}}),Object(x.jsx)(m.a.Text,{className:"text-muted",children:"Principal portion of the EMI paid for home loan"})]})})}),Object(x.jsx)(f.a,{children:Object(x.jsx)(m.a,{children:Object(x.jsxs)(m.a.Group,{controlId:"fd",children:[Object(x.jsx)(m.a.Label,{children:"Tax-Saving FD (80C)"}),Object(x.jsx)(m.a.Control,{type:"number",value:this.state.fd,onChange:function(t){return e.update("fd",t.target.value)}}),Object(x.jsx)(m.a.Text,{className:"text-muted",children:"Total investment in Tax Saving FD for 5y"})]})})}),Object(x.jsx)(f.a,{children:Object(x.jsx)(m.a,{children:Object(x.jsxs)(m.a.Group,{controlId:"other",children:[Object(x.jsx)(m.a.Label,{children:"Other 80C Deductions"}),Object(x.jsx)(m.a.Control,{type:"number",value:this.state.othereightyc,onChange:function(t){return e.update("othereightyc",t.target.value)}}),Object(x.jsx)(m.a.Text,{className:"text-muted",children:"Total investment in other 80c deductions not declared here"})]})})})]}),Object(x.jsx)("br",{}),Object(x.jsx)(p.a,{children:Object(x.jsx)(f.a,{children:s})}),Object(x.jsx)("br",{}),Object(x.jsx)("br",{}),Object(x.jsxs)(p.a,{children:[Object(x.jsx)(f.a,{children:Object(x.jsx)(m.a,{children:Object(x.jsxs)(m.a.Group,{controlId:"stdded",children:[Object(x.jsx)(m.a.Label,{children:"Standard Deduction"}),Object(x.jsx)(m.a.Control,{type:"number",value:"50000",disabled:!0}),Object(x.jsx)(m.a.Text,{className:"text-muted",children:"Standard deduction offered "})]})})}),Object(x.jsx)(f.a,{children:Object(x.jsx)(m.a,{children:Object(x.jsxs)(m.a.Group,{controlId:"proftax",children:[Object(x.jsx)(m.a.Label,{children:"Professional Tax"}),Object(x.jsx)(m.a.Control,{type:"number",value:"2400",disabled:!0}),Object(x.jsx)(m.a.Text,{className:"text-muted",children:"Professional Tax (200 per month) "})]})})}),Object(x.jsx)(f.a,{children:Object(x.jsx)(m.a,{children:Object(x.jsxs)(m.a.Group,{controlId:"rent",children:[Object(x.jsx)(m.a.Label,{children:"House Rent (10 - 13A)"}),Object(x.jsx)(m.a.Control,{type:"number",value:this.state.rent,onChange:function(t){return e.update("rent",t.target.value)}}),Object(x.jsx)(m.a.Text,{className:"text-muted",children:"Yearly rent (Non-metro). Specifiy 0 if not in rented house"})]})})}),Object(x.jsx)(f.a,{children:Object(x.jsx)(m.a,{children:Object(x.jsxs)(m.a.Group,{controlId:"otherded",children:[Object(x.jsx)(m.a.Label,{children:"Other Deductions"}),Object(x.jsx)(m.a.Control,{type:"number",value:this.state.otherded,onChange:function(t){return e.update("otherded",t.target.value)}}),Object(x.jsx)(m.a.Text,{className:"text-muted",children:"Ex. Meal coupons or ANY other deduction"})]})})})]}),Object(x.jsx)("br",{}),Object(x.jsx)(p.a,{children:Object(x.jsx)(f.a,{children:c})})]}),Object(x.jsx)("br",{}),Object(x.jsx)("br",{}),Object(x.jsx)("hr",{}),Object(x.jsx)(u.a,{children:Object(x.jsx)(p.a,{children:Object(x.jsx)(f.a,{children:n})})}),Object(x.jsx)("hr",{}),Object(x.jsx)("br",{}),Object(x.jsx)("br",{}),Object(x.jsxs)(u.a,{fluid:!0,children:[Object(x.jsx)("h5",{align:"left",children:"Tax Calculation (Old Regime)"}),Object(x.jsx)("br",{}),Object(x.jsx)(p.a,{children:Object(x.jsxs)(y.a,{striped:!0,bordered:!0,hover:!0,size:"sm",children:[Object(x.jsx)("thead",{children:Object(x.jsxs)("tr",{children:[Object(x.jsx)("th",{children:"Slab"}),Object(x.jsx)("th",{children:"Tax Rate"}),Object(x.jsx)("th",{children:"Tax Payable"})]})}),Object(x.jsxs)("tbody",{children:[Object(x.jsxs)("tr",{children:[Object(x.jsx)("td",{children:"0 to \u20b92,50,000"}),Object(x.jsx)("td",{children:"0%"}),Object(x.jsxs)("td",{children:["\u20b9 ",this.formatIndian(this.state.oldscheme.s1)]})]}),Object(x.jsxs)("tr",{children:[Object(x.jsx)("td",{children:"\u20b92,50,001 to \u20b95,00,000 "}),Object(x.jsx)("td",{children:"5%"}),Object(x.jsxs)("td",{children:["\u20b9 ",this.formatIndian(this.state.oldscheme.s2)]})]}),Object(x.jsxs)("tr",{children:[Object(x.jsx)("td",{children:"\u20b95,00,001 to \u20b910,00,000"}),Object(x.jsx)("td",{children:"20%"}),Object(x.jsxs)("td",{children:["\u20b9 ",this.formatIndian(this.state.oldscheme.s3)]})]}),Object(x.jsxs)("tr",{children:[Object(x.jsx)("td",{children:"Above \u20b910,00,000"}),Object(x.jsx)("td",{children:"30%"}),Object(x.jsxs)("td",{children:["\u20b9 ",this.formatIndian(this.state.oldscheme.s4)]})]}),Object(x.jsxs)("tr",{children:[Object(x.jsx)("th",{colSpan:"2",children:"TOTAL TAX TO BE PAID THIS YEAR"}),Object(x.jsxs)("th",{children:["\u20b9 ",this.formatIndian(this.state.oldscheme.totaltax)]})]}),Object(x.jsxs)("tr",{children:[Object(x.jsx)("th",{colSpan:"2",children:"TOTAL TAX TO BE PAID PER MONTH"}),Object(x.jsxs)("th",{children:["\u20b9 ",this.formatIndian(this.state.oldscheme.totaltax/12)]})]})]})]})})]}),Object(x.jsx)("br",{}),Object(x.jsx)("br",{}),Object(x.jsx)(u.a,{})]})}}]),a}(s.a.Component);a(33);var g=function(){return Object(x.jsx)("div",{className:"App",children:Object(x.jsx)(v,{})})},T=function(e){e&&e instanceof Function&&a.e(3).then(a.bind(null,35)).then((function(t){var a=t.getCLS,c=t.getFID,s=t.getFCP,n=t.getLCP,r=t.getTTFB;a(e),c(e),s(e),n(e),r(e)}))};r.a.render(Object(x.jsx)(s.a.StrictMode,{children:Object(x.jsx)(g,{})}),document.getElementById("root")),T()}},[[34,1,2]]]);
//# sourceMappingURL=main.afffc630.chunk.js.map