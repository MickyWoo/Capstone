(function(t){function e(e){for(var s,i,o=e[0],l=e[1],c=e[2],u=0,v=[];u<o.length;u++)i=o[u],Object.prototype.hasOwnProperty.call(n,i)&&n[i]&&v.push(n[i][0]),n[i]=0;for(s in l)Object.prototype.hasOwnProperty.call(l,s)&&(t[s]=l[s]);d&&d(e);while(v.length)v.shift()();return r.push.apply(r,c||[]),a()}function a(){for(var t,e=0;e<r.length;e++){for(var a=r[e],s=!0,i=1;i<a.length;i++){var l=a[i];0!==n[l]&&(s=!1)}s&&(r.splice(e--,1),t=o(o.s=a[0]))}return t}var s={},n={app:0},r=[];function i(t){return o.p+"js/"+({canvg:"canvg",pdfmake:"pdfmake",xlsx:"xlsx"}[t]||t)+"."+{canvg:"509c083a",pdfmake:"b17ba0e4",xlsx:"f44b8509"}[t]+".js"}function o(e){if(s[e])return s[e].exports;var a=s[e]={i:e,l:!1,exports:{}};return t[e].call(a.exports,a,a.exports,o),a.l=!0,a.exports}o.e=function(t){var e=[],a=n[t];if(0!==a)if(a)e.push(a[2]);else{var s=new Promise((function(e,s){a=n[t]=[e,s]}));e.push(a[2]=s);var r,l=document.createElement("script");l.charset="utf-8",l.timeout=120,o.nc&&l.setAttribute("nonce",o.nc),l.src=i(t);var c=new Error;r=function(e){l.onerror=l.onload=null,clearTimeout(u);var a=n[t];if(0!==a){if(a){var s=e&&("load"===e.type?"missing":e.type),r=e&&e.target&&e.target.src;c.message="Loading chunk "+t+" failed.\n("+s+": "+r+")",c.name="ChunkLoadError",c.type=s,c.request=r,a[1](c)}n[t]=void 0}};var u=setTimeout((function(){r({type:"timeout",target:l})}),12e4);l.onerror=l.onload=r,document.head.appendChild(l)}return Promise.all(e)},o.m=t,o.c=s,o.d=function(t,e,a){o.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:a})},o.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.t=function(t,e){if(1&e&&(t=o(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var a=Object.create(null);if(o.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var s in t)o.d(a,s,function(e){return t[e]}.bind(null,s));return a},o.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o.p="",o.oe=function(t){throw console.error(t),t};var l=window["webpackJsonp"]=window["webpackJsonp"]||[],c=l.push.bind(l);l.push=e,l=l.slice();for(var u=0;u<l.length;u++)e(l[u]);var d=c;r.push([0,"chunk-vendors"]),a()})({0:function(t,e,a){t.exports=a("56d7")},"0050":function(t,e,a){},"034f":function(t,e,a){"use strict";var s=a("85ec"),n=a.n(s);n.a},"0524":function(t,e,a){"use strict";var s=a("0b34"),n=a.n(s);n.a},"0b34":function(t,e,a){},"199c":function(t,e){},"23be":function(t,e,a){"use strict";var s=a("199c"),n=a.n(s);e["default"]=n.a},2985:function(t,e,a){"use strict";var s=a("0050"),n=a.n(s);n.a},"31b5":function(t,e,a){"use strict";var s=a("bac2"),n=a.n(s);n.a},"3dfd":function(t,e,a){"use strict";var s=a("c8c3"),n=a("23be"),r=(a("034f"),a("2877")),i=Object(r["a"])(n["default"],s["a"],s["b"],!1,null,null,null);e["default"]=i.exports},5459:function(t,e,a){},5503:function(t,e,a){"use strict";var s=a("dcd8"),n=a.n(s);n.a},"56d7":function(t,e,a){"use strict";a.r(e);a("e260"),a("e6cfa"),a("cca6"),a("a79d");var s=a("2b0e"),n=a("3dfd"),r=a("8c4f"),i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"Head",attrs:{id:"Home"}},[a("div",{attrs:{id:"Nav-Bar"}},[a("nav",{staticClass:"main-nav"},[t._m(0),a("Burger-nav")],1),a("Sidebar-nav",[a("ul",{staticClass:"sidebar-panel-nav"},[a("li",[a("a",{attrs:{href:"#Home"}},[t._v("Home")])]),a("li",[a("a",{attrs:{href:"#Charts"}},[t._v("Charts")])]),a("li",[a("a",{attrs:{href:"#Contact"}},[t._v("Contact")])])])])],1),a("div",{staticClass:"container"},[a("div",{staticClass:"messages"},[a("message-container",{attrs:{messages:t.messages}})],1),a("Top-News",{attrs:{latestNews:this.latestNews}}),a("div",{staticClass:"stockSearch"},[a("h2",[t._v(" Please Enter Stock Ticker ")]),a("form",{staticClass:"searchbar",on:{submit:function(e){return e.preventDefault(),t.getTicker(e)}}},[a("div",{staticClass:"searchbar-input"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.ticker,expression:"ticker"}],staticClass:"search",attrs:{type:"search",placeholder:"AAPL"},domProps:{value:t.ticker},on:{input:function(e){e.target.composing||(t.ticker=e.target.value)}}})]),a("button",{attrs:{type:"submit"}},[t._v(" submit ")])]),t.showLoading?a("Loading-Spinner"):t._e(),t.loaded?a("StockBasic-Info",{attrs:{dailyChartData:this.dailyChartData},on:{showPanels:function(e){return t.show()}}}):t._e(),t.noText?a("div",{staticClass:"no-results"},[a("h2",[t._v("Please Enter a Ticker")]),a("p",[t._v(" OR Please adjust your search")])]):t._e()],1)],1),t.display?a("Overview-Panels",{attrs:{results:this.results}}):t._e(),a("div",{staticClass:"chartContainer",attrs:{id:"Charts"}},[a("h2",[t._v(" ["+t._s(t.ticker)+"] Stock Chart: "+t._s(this.chosenValue)+" ")]),t.loaded?a("div",{staticClass:"timeSeries"},t._l(t.setsAvaliable,(function(e){return a("button",{key:e.name,attrs:{value:e.value},on:{click:function(a){t.selected(e.value),t.switchTimeSeries()}}},[t._v(" "+t._s(e.text)+" ")])})),0):t._e(),a("div",{class:{hidden:!t.loaded},attrs:{id:"chartdiv"}})]),a("div",{attrs:{id:"Contact"}},[a("div",{staticClass:"footer"},[a("v-card-text",t._l(t.icons,(function(e){return a("v-btn",{key:e,staticClass:"mx-4 white--text",attrs:{icon:""}},[a("v-icon",{attrs:{size:"30px"}},[t._v(t._s(e))])],1)})),1),a("v-divider"),a("v-card-text",{staticClass:"year",staticStyle:{"font-size":"1.25em"}},[t._v(" "+t._s((new Date).getFullYear())+" — "),a("strong",[t._v("Micky Woo")])])],1)])],1)},o=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"logo"},[a("a",{attrs:{href:"#"}},[t._v(" Market View")])])}],l=(a("b0c0"),function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{class:{active:t.isBurgerActive},attrs:{id:"burger"},on:{click:function(e){return e.preventDefault(),t.toggle(e)}}},[t._t("default",[t._m(0)])],2)}),c=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("button",{staticClass:"burger-button",attrs:{type:"button",title:"Menu"}},[a("span",{staticClass:"burger-bar burger-bar--1"}),a("span",{staticClass:"burger-bar burger-bar--2"}),a("span",{staticClass:"burger-bar burger-bar--3"})])}],u=s["a"].observable({isNavOpen:!1}),d={toggleNav:function(){u.isNavOpen=!u.isNavOpen}},v={name:"Burger",computed:{isBurgerActive:function(){return u.isNavOpen}},methods:{toggle:function(){d.toggleNav()}}},h=v,f=(a("f3ac"),a("2877")),p=Object(f["a"])(h,l,c,!1,null,null,null),m=p.exports,b=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"sidebar"},[t.isPanelOpen?a("div",{staticClass:"sidebar-backdrop",on:{click:t.closeSidebarPanel}}):t._e(),a("transition",{attrs:{name:"slide"}},[t.isPanelOpen?a("div",{staticClass:"sidebar-panel"},[t._t("default")],2):t._e()])],1)},g=[],_={name:"Sidebar",methods:{closeSidebarPanel:d.toggleNav},computed:{isPanelOpen:function(){return u.isNavOpen}}},y=_,w=(a("5503"),Object(f["a"])(y,b,g,!1,null,null,null)),C=w.exports,k=a("bc3a"),x=a.n(k),O=a("71c9"),P=a("c497"),T=a("5a54"),S=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[t.messages.length>0?a("ul",t._l(t.messages,(function(t){return a("message-item",{key:t.text,attrs:{message:t}})})),1):t._e()])},E=[],j=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("transition",{attrs:{name:"fade",appear:"",tag:"div"}},[a("li",{directives:[{name:"show",rawName:"v-show",value:t.showMessage,expression:"showMessage"}],class:[t.message.type,"message"]},[t._v(" "+t._s(t.message.text)+" "),a("button",{on:{click:t.close}},[t._v("close")])])])},N=[];a("9ddc");var $={name:"MessageContainer",props:{message:Object},data:function(){return{showMessage:!0}},methods:{close:function(){this.showMessage=!1}}},D=$,V=(a("0524"),Object(f["a"])(D,j,N,!1,null,"353fa968",null)),M=V.exports;a("9ddc");var Y={name:"MessageContainer",props:{messages:Array},components:{"message-item":M}},A=Y,F=(a("31b5"),Object(f["a"])(A,S,E,!1,null,"55061970",null)),L=F.exports,B=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"topNews"},[a("h2",[t._v(" Latest Market News ")]),t._l(t.latestNews.articles,(function(e){return a("div",{key:e.title,staticClass:"News"},[a("li",{staticClass:"storyTitle"},[a("a",{attrs:{href:e.url}},[t._v(" "+t._s(e.title)+" ")])]),a("li",{staticClass:"time"},[t._v(" published Date/Time: "),a("br"),t._v(" "+t._s(e.publishedAt)+" ")])])}))],2)},R=[],H={name:"TopNews",props:{latestNews:{}},data:function(){return{}}},I=H,z=(a("b070"),Object(f["a"])(I,B,R,!1,null,"0359fecb",null)),q=z.exports,J=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"panelContainer"},[a("div",{staticClass:"panel-1"},[a("h3",[t._v(" Valuation ")]),a("div",[t._v(" PERatio: "+t._s(t.results.PERatio)+" ")]),a("div",[t._v(" DividendPerShare "+t._s(t.results.DividendPerShare)+" ")]),a("div",[t._v("DividendYield: "+t._s(t.results.DividendYiel)+" ")]),a("div",[t._v(" AnalystTargetPrice: "+t._s(t.results.AnalystTargetPrice)+" ")])]),a("div",{staticClass:"panel-2"},[a("h3",[t._v(" Company Profile ")]),a("div",[t._v(" "+t._s(t.results.Description)+" ")]),a("div",[t._v(" Address: "+t._s(t.results.Address)+" ")]),a("div",[t._v(" FullTimeEmployees: "+t._s(t.results.FullTimeEmployees)+" ")])]),a("div",{staticClass:"panel-3"},[a("h3",[t._v(" Balance Sheet ")]),a("div",[t._v(" MarketCapitalization: "+t._s(t.results.MarketCapitalization)+" ")]),a("div",[t._v("TrailingPE: "+t._s(t.results.TrailingPE)+" ")]),a("div",[t._v(" ForwardPE: "+t._s(t.results.ForwardPE)+" ")]),a("div",[t._v("PriceToBookRatio: "+t._s(t.results.PriceToBookRatio)+" ")])])])},K=[],W={name:"OverviewPanels",props:{results:{}},data:function(){return{}}},X=W,Q=(a("c051"),Object(f["a"])(X,J,K,!1,null,"22df743a",null)),G=Q.exports,U=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"stockInfo"},[t._l(t.dailyChartData,(function(e,s){return a("div",{key:s.open,staticClass:"stockContainer"},[a("div",[t._v(" "+t._s(s)+": "+t._s(e))])])})),a("div",{staticClass:"overview"},[a("button",{staticClass:"dropbtn",on:{click:t.show}},[t._v(" Stock OverView ")])])],2)},Z=[],tt={name:"StockBasicInfo",props:{dailyChartData:{}},data:function(){return{}},methods:{show:function(){this.$emit("showPanels")}}},et=tt,at=(a("f1d1"),Object(f["a"])(et,U,Z,!1,null,"4c1b9c8e",null)),st=at.exports,nt=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"loader"})},rt=[],it={name:"LoadingSpinner"},ot=it,lt=(a("7dbb"),Object(f["a"])(ot,nt,rt,!1,null,"ac5f823e",null)),ct=lt.exports;a("9ddc"),O["c"](T["a"]);var ut={name:"frontpage",components:{"message-container":L,"Top-News":q,"Overview-Panels":G,"StockBasic-Info":st,"Loading-Spinner":ct,"Burger-nav":m,"Sidebar-nav":C},data:function(){return{ticker:"",results:[],latestNews:[],noText:!1,messages:[],loaded:!1,display:!1,showLoading:!1,dailyChartData:[],chart:"",chartdata:[],chosenValue:"",setsAvaliable:[{text:"Daily",value:"daily"},{text:"Weekly",value:"weekly"},{text:"Monthly",value:"monthly"},{text:"Yearly",value:"yearly"}],icons:["mdi-github","mdi-twitter","mdi-linkedin","mdi-instagram"]}},mounted:function(){this.stockChart(),this.getNews(),console.log("Latest news updates every 5 mins!!")},methods:{getNews:function(){var t=this;x.a.get("http://newsapi.org/v2/top-headlines?country=us",{params:{"Access-Control-Allow-Origin":"*",pageSize:"5",category:"business",apiKey:"f702b0d64e0f48b5809e0c8db7c9a399"}}).then((function(e){t.latestNews=e.data})).catch((function(e){t.errors.push(e)}))},getTicker:function(){var t=this;this.noText=!1,this.showLoading=!0,this.chartdata=[],this.results=[],""!==this.ticker?(x.a.get("https://marketdata.websol.barchart.com/getHistory.json?apikey=faf40b2f41f0480230752ec47aacc00f&type=dailyContinue&startDate=20100101&maxRecords=10&interval=60&order=asc&sessionFilter=EFK&splits=true&dividends=true&volume=sum&nearby=1&jerq=true",{params:{symbol:this.ticker}}).then((function(e){t.chartdata=e.data,t.chart.data=t.chartdata.results,t.loaded=!0,document.getElementsByClassName("hidden").visibility="visable",t.checkResults(),t.dailyData()})),x.a.get("https://www.alphavantage.co/query?function=OVERVIEW&apikey=JSAD44QMQ8EVHSX7",{params:{symbol:this.ticker}}).then((function(e){t.results=e.data,t.showLoading=!1})).catch((function(e){t.messages.push({type:"error",text:e.message})}))):(this.noText=!0,this.loaded=!1)},switchTimeSeries:function(){var t=this;this.chartdata=[],x.a.get("https://marketdata.websol.barchart.com/getHistory.json?startDate=20100101&maxRecords=10&interval=60&order=asc&sessionFilter=EFK&splits=true&dividends=true&volume=sum&nearby=1&jerq=true",{params:{symbol:this.ticker,type:this.chosenValue,apikey:"faf40b2f41f0480230752ec47aacc00f"}}).then((function(e){t.chartdata=e.data,t.chart.data=t.chartdata.results})).catch((function(e){t.errors.push(e)}))},checkResults:function(){null===this.chartdata.results&&(this.noText=!0,this.loaded=!1,this.chartdata.results=[],this.chart=[])},stockChart:function(){O["c"](T["a"]),this.chart=O["b"]("chartdiv",P["e"]),this.chart.paddingRight=20,this.chart.dateFormatter.inputDateFormat="yyyy-MM-dd";var t=this.chart.xAxes.push(new P["b"]);t.renderer.grid.template.location=0,t.renderer.minGridDistance=60;var e=this.chart.yAxes.push(new P["d"]);e.tooltip.disabled=!0;var a=this.chart.series.push(new P["a"]);a.name=this.ticker,a.dataFields.dateX="tradingDay",a.dataFields.valueY="close",a.dataFields.openValueY="open",a.dataFields.lowValueY="low",a.dataFields.highValueY="high",a.tooltipText="Open: [bold]${openValueY.value}[/]\nLow: [bold]${lowValueY.value}[/]\nHigh: [bold]${highValueY.value}[/]\nClose: [bold]${valueY.value}[/]",this.chart.cursor=new P["f"],this.chart.scrollbarX=new O["a"],this.chart.data=this.chartdata.results,a.legendSettings.labelText="[{column.fill}]Open: ${valueY.open} Low: ${valueY.low} High: ${valueY.high} Close: ${valueY.close}[/]",a.legendSettings.itemLabelText="[{column.fill}]Open: ${openValueY.value} Low: ${lowValueY.value} High: ${highValueY.value} Close: ${valueY.value}[/]",this.chart.legend=new P["c"]},selected:function(t){this.chosenValue=t},show:function(){this.display=!this.display},dailyData:function(){this.dailyChartData=this.chartdata.results[this.chartdata.results.length-1]}}},dt=ut,vt=(a("2985"),a("6544")),ht=a.n(vt),ft=a("8336"),pt=a("99d9"),mt=a("ce7e"),bt=a("132d"),gt=Object(f["a"])(dt,i,o,!1,null,"31cde976",null),_t=gt.exports;ht()(gt,{VBtn:ft["a"],VCardText:pt["a"],VDivider:mt["a"],VIcon:bt["a"]}),s["a"].use(r["a"]);var yt=[{path:"/",name:"frontpage",component:_t}],wt=new r["a"]({routes:yt}),Ct=wt,kt=a("f309");s["a"].use(kt["a"]);var xt=new kt["a"]({});s["a"].config.productionTip=!1,new s["a"]({router:Ct,vuetify:xt,render:function(t){return t(n["default"])}}).$mount("#app")},"7dbb":function(t,e,a){"use strict";var s=a("b1e6"),n=a.n(s);n.a},"85ec":function(t,e,a){},b070:function(t,e,a){"use strict";var s=a("dcb5"),n=a.n(s);n.a},b1e6:function(t,e,a){},bac2:function(t,e,a){},c051:function(t,e,a){"use strict";var s=a("eb3d"),n=a.n(s);n.a},c8c3:function(t,e,a){"use strict";a.d(e,"a",(function(){return s})),a.d(e,"b",(function(){return n}));var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"app"}},[a("router-view")],1)},n=[]},d2d5:function(t,e,a){},dcb5:function(t,e,a){},dcd8:function(t,e,a){},eb3d:function(t,e,a){},f1d1:function(t,e,a){"use strict";var s=a("d2d5"),n=a.n(s);n.a},f3ac:function(t,e,a){"use strict";var s=a("5459"),n=a.n(s);n.a}});
//# sourceMappingURL=app.5a0a42be.js.map