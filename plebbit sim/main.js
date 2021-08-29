Vue.component("comment", {
  props : ["score", "content"],
  template: `
  <div class="comment">
    <div class="buttons">
      <div class="unselectable upvote"
        @click="increment($event)">
        ^
      </div>
      <div class="score"> {{score}} </div>
      <div class="unselectable downvote"
        @click="decrement($event)">
        v
      </div>
    </div>
    <div class="content">
      {{content}}
    </div>
  </div>
  `,
  methods: {
    increment(e) {
      this.$emit("increase-score", e);
    },
    decrement(e) {
      this.$emit("decrease-score", e);
    }
  }
});

let fuee = new Vue({
  el: "#app",
  data: {
    items:  [
      {
        score : 10,
        content : "Onodera is best girl"
      },
      {
        score : 0,
        content : "Chitoge is best girl"
      },
      {
        score : -10,
        content : "What are you talking about? They're both shit"
      }
    ]
  },
  methods: {
    increaseScore(e) {
      commentList = document.getElementById("app").children;

      /* e.target is the button. The comment div is the grandparent.
      Adjust as necessary to make this work */
      selectedComment = e.target.parentElement.parentElement;

      index = Array.prototype.indexOf.call(commentList, selectedComment);
      this.items[index].score++;
      this.sortData()
    },
    decreaseScore(e) {
      commentList = document.getElementById("app").children;

      /* e.target is the button. The comment div is the grandparent.
      Adjust as necessary to make this work */
      selectedComment = e.target.parentElement.parentElement;

      index = Array.prototype.indexOf.call(commentList, selectedComment);
      this.items[index].score--;
      this.sortData()
    },
    /* array.sort takes in a comparator that takes
    two items and returns 1, 0 and -1 if the first
    item is greater, equal or less than the second
    item respectively. It then sorts in ascending
    order */
    sortData() {
      this.items.sort((item1, item2) => {
        if (item1.score === item2.score) {
          return 0;
        } else if (item1.score > item2.score) {
          return -1;
        } else return 1;
      });
    }
  }
})
