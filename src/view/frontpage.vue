<template>
  <div class="Head">
    <h1> Financial View (working title) </h1>

    <div class="container">
      <div class="topNews">
        <h2> Latest Market News </h2>
        <div
          class="News"
          v-for="story in latestNews.articles"
          :key="story.title"
        >

          <li class="storyTitle"> <a v-bind:href="story.url"> {{story.title}} </a> </li>

          <li class="time"> published Date/Time: <br> {{story.publishedAt}} </li>

        </div>
      </div>

      <!-- END Market News -->

      <!-- Stock ticker -->
      <div class=stockSearch>
        <h2> Please Enter Stock Ticker </h2>
        <form
          class="searchbar"
          v-on:submit.prevent="getTicker"
        >
          <div class="searchbar-input">
            <!-- Input -->
            <input v-model="ticker"
              type="search"
              placeholder="AAPL"
            >
            
          </div>
        
           <button type="submit"> submit </button>
        </form>

        <div
          class="no-results"
          v-if="noText"
        >

          <h2>Please Enter a Ticker</h2>
          <p> OR Please adjust your search</p>
        </div>

      </div>

    </div>
    <!-- End of News/Tick Search combo -->
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "frontpage",
  components: {
    // "loading-spinner": loadingSpinner
  },

  data() {
    return {
      ticker:"",
      results: [],
      latestNews: [],
     

      noText: false,
      messages: [],
    };
  },

  // I think i could have use created(){ } as well
  //mounted is used because its after html is set so I can actually use the Methods via GET. if it was before Mounted, its before DOM was loaded so nothing is there.
  mounted() {
    // allows me to Get Latest News without going into Methods and calling on it form there. which i cant.  https://vuejs.org/v2/api/#created

    this.getNews(); // inital retreive
    // setInterval( ()=> this.getNews(), 5*60*1000); // and continous update every 5mins https://www.w3schools.com/js/js_timing.asp
    console.log("Latest news updates every 5 mins!!");
  },

  methods: {
    getNews: function () {
      axios
        .get(
          `http://newsapi.org/v2/top-headlines?country=us&pageSize=5&category=business&apiKey=f702b0d64e0f48b5809e0c8db7c9a399`
        )
        .then((response) => {
          this.latestNews = response.data;
          //  setTimeout(() => {

          //  }, timeout);

          //i have to push some data out
        })
        .catch((error) => {
          this.errors.push(error);
          //  this.showLoading = false; // this.showLoading = false was outside of the tryCatch block, so no matter what i did it is registering showLoading as false
        });
    },

    getTicker: function () {
      this.noText = false;
      this.showLoading = true;
      this.results = [];
      
      if (this.ticker !== "") {
        // check if search has any text
        axios
          .get(
            `https://marketdata.websol.barchart.com/getHistory.json?apikey=faf40b2f41f0480230752ec47aacc00f&type=daily`,
            {
              params: {
                symbol: this.ticker,
              },
            }
          )
          .then((response) => {
            this.results = response.data;
            // this.showLoading = false;
          })
          .catch((error) => {
            this.messages.push({
              type: "error",
              text: error.message,
            });
            // this.showLoading = false;
          });
      } else {
        this.noText = true;
      }
    },
  },
};
</script>

<style scoped>
.container {
  display: flex;
}
.News {
  flex: 0 0 50%;
  justify-content: center;
  max-width: 600px;

  border: 2px solid black;
  padding: 10px;
  list-style-type: none;
  margin: 10px;
}
</style>