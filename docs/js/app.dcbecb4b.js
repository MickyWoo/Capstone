(function(e){function t(t){for(var s,n,o=t[0],l=t[1],c=t[2],u=0,v=[];u<o.length;u++)n=o[u],Object.prototype.hasOwnProperty.call(r,n)&&r[n]&&v.push(r[n][0]),r[n]=0;for(s in l)Object.prototype.hasOwnProperty.call(l,s)&&(e[s]=l[s]);d&&d(t);while(v.length)v.shift()();return i.push.apply(i,c||[]),a()}function a(){for(var e,t=0;t<i.length;t++){for(var a=i[t],s=!0,n=1;n<a.length;n++){var l=a[n];0!==r[l]&&(s=!1)}s&&(i.splice(t--,1),e=o(o.s=a[0]))}return e}var s={},r={app:0},i=[];function n(e){return o.p+"js/"+({canvg:"canvg",pdfmake:"pdfmake",xlsx:"xlsx"}[e]||e)+"."+{canvg:"b27dac91",pdfmake:"1bdfd416",xlsx:"c044722e"}[e]+".js"}function o(t){if(s[t])return s[t].exports;var a=s[t]={i:t,l:!1,exports:{}};return e[t].call(a.exports,a,a.exports,o),a.l=!0,a.exports}o.e=function(e){var t=[],a=r[e];if(0!==a)if(a)t.push(a[2]);else{var s=new Promise((function(t,s){a=r[e]=[t,s]}));t.push(a[2]=s);var i,l=document.createElement("script");l.charset="utf-8",l.timeout=120,o.nc&&l.setAttribute("nonce",o.nc),l.src=n(e);var c=new Error;i=function(t){l.onerror=l.onload=null,clearTimeout(u);var a=r[e];if(0!==a){if(a){var s=t&&("load"===t.type?"missing":t.type),i=t&&t.target&&t.target.src;c.message="Loading chunk "+e+" failed.\n("+s+": "+i+")",c.name="ChunkLoadError",c.type=s,c.request=i,a[1](c)}r[e]=void 0}};var u=setTimeout((function(){i({type:"timeout",target:l})}),12e4);l.onerror=l.onload=i,document.head.appendChild(l)}return Promise.all(t)},o.m=e,o.c=s,o.d=function(e,t,a){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},o.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(o.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var s in e)o.d(a,s,function(t){return e[t]}.bind(null,s));return a},o.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="",o.oe=function(e){throw console.error(e),e};var l=window["webpackJsonp"]=window["webpackJsonp"]||[],c=l.push.bind(l);l.push=t,l=l.slice();for(var u=0;u<l.length;u++)t(l[u]);var d=c;i.push([0,"chunk-vendors"]),a()})({0:function(e,t,a){e.exports=a("56d7")},"034f":function(e,t,a){"use strict";var s=a("85ec"),r=a.n(s);r.a},"199c":function(e,t){},"23be":function(e,t,a){"use strict";var s=a("199c"),r=a.n(s);t["default"]=r.a},"3dfd":function(e,t,a){"use strict";var s=a("d197"),r=a("23be"),i=(a("034f"),a("2877")),n=Object(i["a"])(r["default"],s["a"],s["b"],!1,null,null,null);t["default"]=n.exports},"488c":function(e,t,a){"use strict";var s=a("e1aa"),r=a.n(s);r.a},"56d7":function(e,t,a){"use strict";a.r(t);a("e260"),a("e6cfa"),a("cca6"),a("a79d");var s=a("2b0e"),r=a("3dfd"),i=a("8c4f"),n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"Head"},[a("h1",[e._v(" Financial View (working title) ")]),a("div",{staticClass:"container"},[a("div",{staticClass:"topNews"},[a("h2",[e._v(" Latest Market News ")]),e._l(e.latestNews.articles,(function(t){return a("div",{key:t.title,staticClass:"News"},[a("li",{staticClass:"storyTitle"},[a("a",{attrs:{href:t.url}},[e._v(" "+e._s(t.title)+" ")])]),a("li",{staticClass:"time"},[e._v(" published Date/Time: "),a("br"),e._v(" "+e._s(t.publishedAt)+" ")])])}))],2),a("div",{staticClass:"stockSearch"},[a("h2",[e._v(" Please Enter Stock Ticker ")]),a("form",{staticClass:"searchbar",on:{submit:function(t){return t.preventDefault(),e.getTicker(t)}}},[a("div",{staticClass:"searchbar-input"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.ticker,expression:"ticker"}],staticClass:"search",attrs:{type:"search",placeholder:"AAPL"},domProps:{value:e.ticker},on:{input:function(t){t.target.composing||(e.ticker=t.target.value)}}})]),a("button",{attrs:{type:"submit"}},[e._v(" submit ")])]),e.loaded?a("div",{staticClass:"stockInfo"},[e._l(e.dailyChartData,(function(t,s){return a("div",{key:s.open,staticClass:"stockContainer"},[a("div",[e._v(" "+e._s(s)+": "+e._s(t))])])})),a("div",{staticClass:"dropdown"},[a("button",{staticClass:"dropbtn",on:{click:e.show}},[e._v("Complete OverView")]),e.display?a("div",[a("div",{staticClass:"dropdown-content",attrs:{id:"myDropdown"}})]):e._e()])],2):e._e(),e.noText?a("div",{staticClass:"no-results"},[a("h2",[e._v("Please Enter a Ticker")]),a("p",[e._v(" OR Please adjust your search")])]):e._e()])]),e.display?a("div",{staticClass:"panelContainer"},[a("div",{staticClass:"panel-1"},[a("h3",[e._v(" Panel 1 ")]),a("div",[e._v(" PERatio: "+e._s(e.results.PERatio)+" ")]),a("div",[e._v(" DividendPerShare "+e._s(e.results.DividendPerShare)+" ")]),a("div",[e._v("DividendYield: "+e._s(e.results.DividendYiel)+" ")]),a("div",[e._v(" AnalystTargetPrice: "+e._s(e.results.AnalystTargetPrice)+" ")])]),a("div",{staticClass:"panel-2"},[a("h3",[e._v(" Panel 2 ")]),a("div",[e._v(" "+e._s(e.results.Description)+" ")]),a("div",[e._v(" Address: "+e._s(e.results.Address)+" ")]),a("div",[e._v(" FullTimeEmployees: "+e._s(e.results.FullTimeEmployees)+" ")])]),a("div",{staticClass:"panel-3"},[a("h3",[e._v(" Panel 3 ")]),a("div",[e._v(" MarketCapitalization: "+e._s(e.results.MarketCapitalization)+" ")]),a("div",[e._v("TrailingPE: "+e._s(e.results.TrailingPE)+" ")]),a("div",[e._v(" ForwardPE: "+e._s(e.results.ForwardPE)+" ")]),a("div",[e._v("PriceToBookRatio: "+e._s(e.results.PriceToBookRatio)+" ")])])]):e._e(),a("div",[a("h2",[e._v(" StockChart: "+e._s(e.ticker)+" ")])]),e.loaded?a("div",{staticClass:"timeSeries"},e._l(e.setsAvaliable,(function(t){return a("button",{key:t.name,attrs:{value:t.value},on:{click:function(a){e.selected(t.value),e.switchTimeSeries()}}},[e._v(" "+e._s(t.text)+" ")])})),0):e._e(),a("div",{attrs:{id:"chartdiv"}})])},o=[],l=(a("b0c0"),a("bc3a")),c=a.n(l),u=a("71c9"),d=a("c497"),v=a("5a54");u["c"](v["a"]);var p={name:"frontpage",components:{},data:function(){return{ticker:"",results:[],latestNews:[],noText:!1,messages:[],loaded:!1,chartdata:[],display:!1,dailyChartData:[],chosenValue:"",setsAvaliable:[{text:"Daily",value:"daily"},{text:"Weekly",value:"weekly"},{text:"Monthly",value:"monthly"},{text:"Yearly",value:"yearly"}]}},mounted:function(){this.getNews(),console.log("Latest news updates every 5 mins!!")},methods:{getNews:function(){var e=this;c.a.get("http://newsapi.org/v2/top-headlines?country=us&pageSize=5&category=business&apiKey=f702b0d64e0f48b5809e0c8db7c9a399",{params:{"Access-Control-Allow-Origin":"http://newsapi.org/v2/"}}).then((function(t){e.latestNews=t.data})).catch((function(t){e.errors.push(t)}))},getTicker:function(){var e=this;this.noText=!1,this.chartdata=[],this.results=[],""!==this.ticker?(c.a.get("https://marketdata.websol.barchart.com/getHistory.json?apikey=faf40b2f41f0480230752ec47aacc00f&type=dailyContinue&startDate=20100101&maxRecords=10&interval=60&order=asc&sessionFilter=EFK&splits=true&dividends=true&volume=sum&nearby=1&jerq=true",{params:{symbol:this.ticker}}).then((function(t){e.chartdata=t.data,e.loaded=!0,e.dailyData(),e.stockChart()})),c.a.get("https://www.alphavantage.co/query?function=OVERVIEW&apikey=JSAD44QMQ8EVHSX7",{params:{symbol:this.ticker}}).then((function(t){e.results=t.data})).catch((function(t){e.messages.push({type:"error",text:t.message})}))):this.noText=!0},switchTimeSeries:function(){var e=this;this.chartdata=[],c.a.get("https://marketdata.websol.barchart.com/getHistory.json?apikey=faf40b2f41f0480230752ec47aacc00f&startDate=20100101&maxRecords=10&interval=60&order=asc&sessionFilter=EFK&splits=true&dividends=true&volume=sum&nearby=1&jerq=true",{params:{symbol:this.ticker,type:this.chosenValue}}).then((function(t){e.chartdata=t.data})).catch((function(t){e.errors.push(t)}))},show:function(){this.display=!this.display},dailyData:function(){this.dailyChartData=this.chartdata.results[this.chartdata.results.length-1]},stockChart:function(){u["c"](v["a"]);var e=u["b"]("chartdiv",d["e"]);e.paddingRight=20,e.dateFormatter.inputDateFormat="yyyy-MM-dd";var t=e.xAxes.push(new d["b"]);t.renderer.grid.template.location=0,t.renderer.minGridDistance=60;var a=e.yAxes.push(new d["d"]);a.tooltip.disabled=!0;var s=e.series.push(new d["a"]);s.name=this.ticker,s.dataFields.dateX="tradingDay",s.dataFields.valueY="close",s.dataFields.openValueY="open",s.dataFields.lowValueY="low",s.dataFields.highValueY="high",s.tooltipText="Open: [bold]${openValueY.value}[/]\nLow: [bold]${lowValueY.value}[/]\nHigh: [bold]${highValueY.value}[/]\nClose: [bold]${valueY.value}[/]",e.cursor=new d["f"],e.scrollbarX=new u["a"],e.data=this.chartdata.results,s.legendSettings.labelText="[{column.fill}]Open: ${valueY.open} Low: ${valueY.low} High: ${valueY.high} Close: ${valueY.close}[/]",s.legendSettings.itemLabelText="[{column.fill}]Open: ${openValueY.value} Low: ${lowValueY.value} High: ${highValueY.value} Close: ${valueY.value}[/]",e.legend=new d["c"]},selected:function(e){this.chosenValue=e}}},h=p,f=(a("488c"),a("2877")),m=Object(f["a"])(h,n,o,!1,null,"71a6d29e",null),y=m.exports;s["a"].use(i["a"]);var b=[{path:"/",name:"frontpage",component:y}],g=new i["a"]({routes:b}),_=g;s["a"].config.productionTip=!1,new s["a"]({router:_,render:function(e){return e(r["default"])}}).$mount("#app")},"85ec":function(e,t,a){},d197:function(e,t,a){"use strict";a.d(t,"a",(function(){return s})),a.d(t,"b",(function(){return r}));var s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{attrs:{id:"app"}},[a("router-view")],1)},r=[]},e1aa:function(e,t,a){}});
//# sourceMappingURL=app.dcbecb4b.js.map