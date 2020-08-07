<template>
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

</template>

<script>
export default {
    name: "TopNews",
    props: {
        latestNews: {},
    },
    data () {
        return {

        }
    },
    
}
</script>

<style scoped>
.News {
  max-width: 500px;
  
  border: 2px solid black;
  padding: 10px;
  list-style-type: none;
  margin: 10px;
   box-shadow: 5px 5px #888888;
  background-color: rgb(245, 204, 229);
  
}

.News a{
  color:rgb(3, 50, 138);
   font-weight: bold;
 
}
</style>