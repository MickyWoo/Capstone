<template>
  <div class="container">
    <div class="topNews" >
        <div class="News" v-for="story in latestNews" :key="story.id"> 
            <li class="newsSource" >
            <li class="newsTitle" >
            <li class="newsLink" >
              <!-- sdinetigub -->

        </div>

    </div>

    <form
      class="searchbar"
      v-on:submit.prevent="getTicker"
    >
      <div class="searchbar-input">
        <!-- Input -->
        <input
          type="search"
          placeholder="Search in items"
        >
        <!-- Clear button -->
        <a
          href="#"
          class="searchbar-clear"
        ></a>
      </div>
      <!-- Cancel Link -->
      <div class="searchbar-cancel">Cancel</div>
    </form>


     <div
      class="no-results"
      v-if="noText"
    >
      
      <h2>Please Enter a Ticker</h2>
      <p> OR Please adjust your search</p>
    </div>


  </div>
</template>






<script>
import { API } from "@/common/api";

export default {
     name:"",
        components: {
            "loading-spinner": loadingSpinner
                    },

    data() {
        return {
         results: [],
         latestNews: [],
         ticker: [],
         noText: false,
         

                 }
         },

    methods: {
              getNews: function() {
              axios.get(`http://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=f702b0d64e0f48b5809e0c8db7c9a399`)
                .then(response => {
                 this.latestNews = response.data;

                 //i have to push some data out
                 getNews(); // immediatly grbbing news and populating upon visit of site.
         
        })
                .catch(error => {
                this.errors.push(error);
                 this.showLoading = false; // this.showLoading = false was outside of the tryCatch block, so no matter what i did it is registering showLoading as false
        });
      
        
        },
        



             getTicker: function() {
                 this.showLoading = true;
                 this.results = [];
                    if (this.ticker !== "") {
                        // check if search has any text
                        axios
                        .get(`https://marketdata.websol.barchart.com/getHistory.json?apikey=faf40b2f41f0480230752ec47aacc00f&type=daily&`, {
                            params: {
                            symbol: this.ticker
                            }
                        })
                        .then(response => {
                            this.results = response.data;
                            this.showLoading = false;
                    
                        })
                        .catch(error => {
                            this.messages.push({
                            type: "error",
                            text: error.message
                            });
                            this.showLoading = false;
                        });

                        }else {
                        this.noText = true;
                         }
                        
                    }

                    
     
 
    },
}



</script>

<style scoped>
</style>