<template>
  <div id="Home" class="Head" >

    <div id="Nav-Bar">
      <nav class="main-nav">
        <div class="logo">
          <a href="#"> Market View</a>
        </div>
            <Burger-nav></Burger-nav>
      </nav>

    </div>

    <div class="container" > 

      <div class="messages">
        <message-container v-bind:messages="messages"> </message-container>
      </div>

      <!-- Market News -->
      <Top-News v-bind:latestNews="this.latestNews"> </Top-News>

      <!-- Stock ticker -->
      <div class=stockSearch>
        <h2> Please Enter Stock Ticker </h2>
        <form
          class="searchbar"
          v-on:submit.prevent="getTicker"
        >

        <!-- @input as trigger to get list  and @focus to show List to filter through
        @click="modal = false" https://developer.mozilla.org/en-US/docs/Web/API/Element/blur_event Opposite of @focus -->
          <div class="overlay" >
   
            <input
              class="search"
              v-model="ticker"
              type="search"
              placeholder="AAPL"
              @input="filterTickers()"
              @focus="modal = true, blocker = true" 


            >

            <!-- if model statement so that list dissapears upon selection -->
              <div class="tickerFilter" v-if="filterTickerList && modal " > 
                <div class="blocker" @click="closeList()" v-if="blocker">
                  <ul> 
                    <!-- due to the JSON having a Number to start the Object I have to use brackets with Quoted Name to Display on page -->
                    <li  class="contents" v-for="tickers in tickerList.bestMatches" :key="tickers.symbol" @click="chosenTicker(tickers)" > {{tickers["1. symbol"] }} : {{tickers["2. name"] }}</li>
                  </ul>
                </div>
              </div>
          </div>

          <button class="submit" type="submit"> submit </button>
        </form>


        <Loading-Spinner v-if="showLoading"> </Loading-Spinner>

        <!-- v-on continuation of emit Child Function > and set it to a new function in Parent component which is definded
           in parent component. -->
        <StockBasic-Info
          v-bind:dailyChartData="this.dailyChartData"
          v-on:showPanels="show()"
          v-if="loaded"
        > </StockBasic-Info>

        <div
          class="no-results"
          v-if="noText "
        >

          <h2>Please Enter a Ticker</h2>
          <p> OR Please adjust your search</p>
        </div>

      </div>

    </div>
 <!-- End of News/Tick Search combo -->

 <!-- STOCK OverView Panels -->

    <Overview-Panels
      v-bind:results="this.results"
      v-if="display"
    > </Overview-Panels>

<!-- StockChart -->
    <div
      class="chartContainer"
      id="Charts"
    >
      <h2> [{{ticker}}] Stock Chart: {{this.chosenValue}} </h2>

      <div
        class="timeSeries"
        v-if="loaded"
      >

        <button 
          class="chartButton"
          v-for="sets in setsAvaliable"
          :key="sets.name"
          v-bind:value="sets.value"
          v-on:click="selected(sets.value); switchTimeSeries();"
        > {{ sets.text }} </button>

      </div>

      <!-- https://codepen.io/team/amcharts/pen/ZEYXEJV -->

      <div
        id="chartdiv"
        v-bind:class="{hidden: !loaded}"
      ></div>

      <!-- v-bind:style="{visibility: !loaded ? 'visable' : 'hidden' }"  ALSO works-->

      <!-- Stock Chart Container END -->
    </div>

    <!-- SVGs don't have a z-index property. 
    They're displayed in the order they're rendered on the page.
    theforefore sidebar-nav is moved all the way down here after "chardiv" creation
       -->
     <Sidebar-nav>
        <ul class="sidebar-panel-nav">
          <li><a href="#Home">Home</a></li>
          <li><a href="#Charts">Charts</a></li>
          <li><a href="#Contact">Contact</a></li>
        </ul>
      </Sidebar-nav>


    <!-- FOOTER -->
    <div id="Contact">

      <div class="footer">
        <v-card-text>
          <v-btn
            v-for="icon in icons"
            :key="icon.name"
            class="mx-4 white--text iconButtons" 
            icon
          >
          <a :href="icon.url" :target="icon.target"><v-icon size="35px">{{ icon.name }}</v-icon></a>
          </v-btn>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-text class="year" style="font-size:1.25em">
          {{ new Date().getFullYear() }} — <strong>Micky Woo</strong>
        </v-card-text>

      </div>
    </div>

  </div>

</template>


<script>


import Burger from "@/components/menu/Burger.vue";
import Sidebar from "@/components/menu/Sidebar.vue";

import axios from "axios";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import MessageContainer from "@/components/MessageContainer.vue";
require("vue2-animate/dist/vue2-animate.min.css");

import TopNews from "@/components/TopNews.vue";
import OverviewPanels from "@/components/OverviewPanels.vue";
import StockBasicInfo from "@/components/StockBasicInfo.vue";
import LoadingSpinner from "@/components/LoadingSpinner.vue";



am4core.useTheme(am4themes_animated); //https://www.amcharts.com/docs/v4/getting-started/integrations/using-vue-js/

export default {
  name: "frontpage",
  components: {
    "message-container": MessageContainer,
    "Top-News": TopNews,
    "Overview-Panels": OverviewPanels,
    "StockBasic-Info": StockBasicInfo,
    "Loading-Spinner": LoadingSpinner,
    "Burger-nav": Burger,
    "Sidebar-nav": Sidebar,
  },

  data() {
    return {
      ticker: "",
      results: [],
      latestNews: [],
      noText: false,
      messages: [],

      loaded: false,
      display: false,
      showLoading: false,

      dailyChartData: [],
      chart: "",
      chartdata: [],

      chosenValue: "",
      setsAvaliable: [
        { text: "Daily", value: "daily" },
        { text: "Weekly", value: "weekly" },
        { text: "Monthly", value: "monthly" },
        { text: "Yearly", value: "yearly" },
      ],
      icons: [
        {
            name:"mdi-github",
            url: "https://github.com/MickyWoo",
            target: '_blank'
        },
            {
            name:"mdi-twitter",
            url: "#",
            target: '_blank'
        },
            {
            name:"mdi-account-box",
            url: "http://mickywoo.com/",
            target: '_blank'
        },
            {
            name:"mdi-linkedin",
            url: "https://www.linkedin.com/in/micky-woo-9a47981b0/",
            target: '_blank'
        },
        
           ],
      blocker: false,
      modal: false,
       tickerList: [],
      filterTickerList: [],
    };
  },
  

  mounted() {
    this.stockChart();
    this.getNews(); // inital retreive
    // setInterval( ()=> this.getNews(), 5*60*1000); // and continous update every 5mins https://www.w3schools.com/js/js_timing.asp
    // I have LIMITED API calls, so i commented it out.
    console.log("Latest news updates every 5 mins!!");


  },


  methods: {
    getNews: function () {
      axios
        .get(`https://newsapi.org/v2/top-headlines?country=us`, {
          params: {

            pageSize: "5",
            category: "business",
            apiKey: "f702b0d64e0f48b5809e0c8db7c9a399",
          },
        })
        .then((response) => {
          this.latestNews = response.data;
        })
         .catch(error => {
        this.messages.push({
          type: 'error',
          text: error.message
        });
      })
    },

    getTicker: function () {
      this.noText = false;
      this.showLoading = true;
      this.chartdata = [];
      this.results = [];

      if (this.ticker !== "") {
        // check if search has any text
        axios
          .get(
            `https://marketdata.websol.barchart.com/getHistory.json?apikey=faf40b2f41f0480230752ec47aacc00f&type=dailyContinue&startDate=20100101&maxRecords=10&interval=60&order=asc&sessionFilter=EFK&splits=true&dividends=true&volume=sum&nearby=1&jerq=true`, // Stock Dialy Close
            {
              params: {
                symbol: this.ticker,
              },
            }
          )
          .then((response) => {
            this.chartdata = response.data;
            this.chart.data = this.chartdata.results;
            this.loaded = true;
            (document.getElementsByClassName("hidden").visibility = "visable"),
              this.checkResults();

            this.dailyData();
            this.modal = false;
          

          });

        axios
          .get(
            `https://www.alphavantage.co/query?function=OVERVIEW&apikey=JSAD44QMQ8EVHSX7`, // Stock OverVIEW
            {
              params: {
                symbol: this.ticker,
              },
            }
          )
          .then((response) => {
            this.results = response.data;
            this.showLoading = false;
          })

          .catch((error) => {
            this.messages.push({
              type: "error",
              text: error.message,
            });
          });
      } else {
        this.noText = true;
        this.loaded = false;
      }
    },

    switchTimeSeries: function () {
      this.chartdata = [];

      axios
        .get(
          `https://marketdata.websol.barchart.com/getHistory.json?startDate=20100101&maxRecords=10&interval=60&order=asc&sessionFilter=EFK&splits=true&dividends=true&volume=sum&nearby=1&jerq=true`,
          {
            params: {
              symbol: this.ticker,
              type: this.chosenValue,
              apikey: "faf40b2f41f0480230752ec47aacc00f",
            },
          }
        )
        .then((response) => {
          this.chartdata = response.data;
          this.chart.data = this.chartdata.results;
        })
         .catch(error => {
        this.messages.push({
          type: 'error',
          text: error.message
        });
      })
    },

    checkResults: function () {
      if (this.chartdata.results === null) {
        this.noText = true;
        this.loaded = false;
        this.chartdata.results = [];
        this.chart = [];
      }
    },

    //https://www.amcharts.com/docs/v4/tutorials/taming-candlestick-series/
    stockChart: function () {
      am4core.useTheme(am4themes_animated);
      this.chart = am4core.create("chartdiv", am4charts.XYChart);

      this.chart.paddingRight = 20;

      this.chart.dateFormatter.inputDateFormat = "yyyy-MM-dd";

      var dateAxis = this.chart.xAxes.push(new am4charts.DateAxis());
      dateAxis.renderer.grid.template.location = 0;
      dateAxis.renderer.minGridDistance = 60;

      var valueAxis = this.chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.tooltip.disabled = true;

      var series = this.chart.series.push(new am4charts.CandlestickSeries());
      series.name = this.ticker;
      series.dataFields.dateX = "tradingDay";
      series.dataFields.valueY = "close";
      series.dataFields.openValueY = "open";
      series.dataFields.lowValueY = "low";
      series.dataFields.highValueY = "high";
      series.tooltipText =
        "Open: [bold]${openValueY.value}[/]\nLow: [bold]${lowValueY.value}[/]\nHigh: [bold]${highValueY.value}[/]\nClose: [bold]${valueY.value}[/]";

      this.chart.cursor = new am4charts.XYCursor();

      this.chart.scrollbarX = new am4core.Scrollbar();

      this.chart.data = this.chartdata.results;

      series.legendSettings.labelText =
        "[{column.fill}]Open: ${valueY.open} Low: ${valueY.low} High: ${valueY.high} Close: ${valueY.close}[/]";

      series.legendSettings.itemLabelText =
        "[{column.fill}]Open: ${openValueY.value} Low: ${lowValueY.value} High: ${highValueY.value} Close: ${valueY.value}[/]";

      // Legend
      this.chart.legend = new am4charts.Legend();
    },

    // timeSeriesSelection
    selected: function (value) {
      this.chosenValue = value;
    },

    show: function () {
      this.display = !this.display;
    },

    dailyData: function () {
      this.dailyChartData = this.chartdata.results[
        this.chartdata.results.length - 1
      ];
    },

   filterTickers: function() {
     if (this.ticker !== "") {
        axios
        .get(
          `https://www.alphavantage.co/query?function=SYMBOL_SEARCH`,
          {
            params: {
              keywords: this.ticker,
         
              apikey: "JSAD44QMQ8EVHSX7",
            },
          }
        )
        .then((response) => {
          this.tickerList = response.data;

      //      this.filterTickerList = this.tickerList.filter( ticker => {
      //   return ticker.toLowerCase().startsWith(this.ticker.toLowerCase());
      // })

     
        })
        .catch(error => {
        this.messages.push({
          type: 'error',
          text: error.message
        });
      })

     }
    },

   chosenTicker: function(tickers) {
     this.ticker = tickers["1. symbol"];
      this.modal = false;
   },

   closeList: function(){
     this.modal = false;
     this.blocker = false;


   },

    
  },
};



</script>

<style scoped>
.container {
  display: flex;

  justify-content: center;
  flex-wrap: wrap;
}

.search {
  padding: 6px;
  margin-top: 8px;
  font-size: 17px;
  border: 5px solid ;
  border-radius: 50px;
  border-image-source: linear-gradient( 45deg,
    rgba(101, 31, 87, 1) 0%,
    rgba(225, 113, 87, 1) 48%,
    rgba(249, 248, 113, 1) 100%);

  border-image-slice: 1;
 background-color: rgb(255, 255, 255) ;


/* https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Positioning/Understanding_z_index/Stacking_without_z-index 
position needs to be relative to be ABOVE the Stack of the Blocker div which is  abs a "lower stack* with index of 1 */
  position: relative;
      /*  index of 10 to display above blocker with index of -1 */
  z-index: 10; 

}

.overlay {
    padding: 0;
    margin: 5px;
    width: 100%;
    font-weight: bold;
}

 .tickerFilter li {
    list-style: none ;
  
    border: 1px solid #000000;
    padding: 4px 2px;
 
    border-radius: 5px;
 
    align-items: center;
    justify-content: center;
    background: #FFF;   
     position: relative;
     max-width: 75%;
    top: 50vh;
    left: 50vw;
    transform: translate(-50%, -50%);
    z-index: 10;


}
.tickerFilter li:hover{
      background-color: #692853;
    color: white;
        z-index: 10;
  
}

/* Key piece on "click outside div to close  Stock Filter List"   */
.blocker {

  /* position absolute or fixed must be used for this to work and index must be lower than list & input div */
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    content: ' ';
    background: rgba(0,0,0,.5);
    z-index: 1;
}

.hidden {
  visibility: hidden;
}

/* END of Search INPUT / List display */

#chartdiv {
  width: 100%;
  height: 500px;
  min-width: 500px;
  padding: 10px;

}


.chartContainer button, .submit {
  border: 2px solid black;
  margin: 5px;

  min-width: 80px;
  padding: 5px;
}
.chartContainer button:hover, .submit:hover {
background-color:rgb(166, 230, 255);

  transition: 1.25s;
}



/* SideBar CSS */

#Nav-Bar {
  position: sticky; top: 0px;
  border: 0;
  margin: 0;
  padding: 0;
  font-family: "Lato";
  height: 100%;
  background: rgb(101, 31, 87);
  background: linear-gradient(
    45deg,
    rgba(101, 31, 87, 1) 0%,
    rgba(225, 113, 87, 1) 48%,
    rgba(249, 248, 113, 1) 100%
  );
}

.logo a {
  color: rgb(253, 231, 231);
  font-weight: bold;
  font-family: "Lato";
  text-shadow: 0 0 3px black;
  font-size: 30px;
}

.main-nav {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0.8rem;
}

ul.sidebar-panel-nav {
  list-style-type: none;
}

ul.sidebar-panel-nav > li > a {
  color: rgb(255, 255, 255);
  text-decoration: none;
  font-size: 1.5rem;
  display: block;
  padding-bottom: 0.5em;
}


.footer {
  display: flex;
  background: rgb(101, 31, 87);
  background: linear-gradient(
    45deg,
    rgba(101, 31, 87, 1) 0%,
    rgba(225, 113, 87, 1) 48%,
    rgba(249, 248, 113, 1) 100%
  );
  justify-content: center;
  min-height: 150px;
  width: 100%;
  align-items: center;


}

.spacer {
  height: 100px;
}

.v-icon:hover, .sidebar-panel-nav li:hover  {
  background-color: rgb(0, 162, 255);
    transition: 1.2s;
}



</style>