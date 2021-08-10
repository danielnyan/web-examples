let app = new Vue({
  el: "#app",
  data: {
    counter: 0,
    images: ["images/1.png",
      "images/2.png",
      "images/3.png",
      "images/4.png",
      "images/5.png",
      "images/6.png"],
    showAll: false
  },
  methods: {
    incrementCounter() {
      this.counter++;
      if (this.counter >= this.images.length) {
        this.counter -= this.images.length;
      }
    }, /* NOTE! There's a comma here */
    decrementCounter() {
      this.counter--;
      if (this.counter < 0) {
        this.counter += this.images.length;
      }
    },
    showImages() {
      this.showAll = !this.showAll;
    }
  },
  computed: {
    imageSource() {
      return this.images[this.counter];
    }
  }
})