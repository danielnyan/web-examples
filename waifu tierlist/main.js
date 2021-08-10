Vue.component("waifu", {
  template: `
    <div class="waifu" :style="{'background-image':'url('+imageUrl+')'}" draggable="true">
      <div class="cover" @mousedown="handleMouseDown($event)" @mouseup="handleMouseUp($event)"></div>
    </div>
  `,
  methods : {
    initialize : async function(e) {
      this.$emit("initialize", this);
      
      let result = await new Promise(resolve => {
        const nekoUrl = "https://www.nekos.life/api/v2/img/neko";
        const xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function() { 
          if (xmlHttp.readyState === 4 && xmlHttp.status === 200)
            resolve(xmlHttp.responseText);
        }
        xmlHttp.open("GET", nekoUrl, true); 
        xmlHttp.send(null);
      });
      this.imageUrl = JSON.parse(result).url;
      
      /*
      let result = await new Promise(resolve => {
        const nekoUrl = "https://safebooru.org/index.php?page=dapi&s=post&q=index&tags=rating%3Asafe+score%3A%3E0+1girl&limit=1&pid=";
        // May want to update when number of posts increases
        const pid = Math.floor(Math.random() * 350000);
        const xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function() { 
          if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            resolve(xmlHttp.responseText);
        }
        xmlHttp.open("GET", nekoUrl + pid, true); 
        xmlHttp.send(null);
      });
      let parser = new DOMParser();
      let xmlDoc = parser.parseFromString(result, "text/xml");
      this.imageUrl = xmlDoc.firstElementChild.firstElementChild.getAttribute("file_url");
      */
    },
    handleMouseDown(e) {
      console.log("X: " + e.pageX + ", Y:" + e.pageY);
      this.$el.style.position = "absolute";
      this.$el.style.zIndex = 9001;
      document.body.appendChild(this.$el);
      
      this.moveAt(e.pageX, e.pageY);
      if (this.onMouseMove != null) return;
      /* NOTE: Use arrow syntax here! Don't use your normal function 
      declarations because the binding of the 'this' keyword differs */
      this.onMouseMove = (e) => {
        this.moveAt(e.pageX, e.pageY);
        let elemsBelow = document.elementsFromPoint(e.clientX, e.clientY);
          
        let foundDroppable = false;
        for (let candidate of elemsBelow) {
          if (candidate.className.includes("droppable")) {
            if (this.currentDroppable != candidate) {
              this.currentDroppable = candidate;
            }
            foundDroppable = true;
            break;
          } 
        }
        if (!foundDroppable) {
          if (this.currentDroppable) {
            this.currentDroppable = null;
          }
        }
      };
      document.addEventListener("mousemove", this.onMouseMove);
    },
    handleMouseUp(e) {
      document.removeEventListener("mousemove", this.onMouseMove);
      this.onMouseMove = null;
      this.$el.style.position = "";
      this.$el.style.zIndex = "";
      this.$el.style.left = "";
      this.$el.style.top = "";
      if (this.currentDroppable != null) {
        this.currentDroppable.appendChild(this.$el);
        this.previousParent = this.currentDroppable;
      } else {
        this.previousParent.appendChild(this.$el);
      }
    },
    moveAt(pageX, pageY) {
      this.$el.style.left = pageX - this.$el.offsetWidth / 2 + 'px';
      this.$el.style.top = pageY - this.$el.offsetHeight / 2 + 'px';      
    },
  },
  data() {
    return {
      imageUrl : "",
      onMouseMove : null,
      currentDroppable : null,
      previousParent : null,
    }
  },
  created() {
    this.initialize();
  }
});

Vue.component("tier", {
  props: ["colour", "rank"],
  template: `
    <div class="tier">
      <div class="unselectable rank" :style="{'background-color':colour}">{{rank}}</div>
      <div class="droppable"></div>
    </div>
  `,
});

const WaifuComponent = Vue.extend(Vue.options.components["waifu"])

let fuee = new Vue({
  el: "#app",
  methods: {
    initialize(e) {
      Vue.nextTick(() => {
        e.$el.ondragstart = () => {
          return false;
        }
        e.previousParent = e.$el.parentElement;
      })
    },
    addWaifu() {
      let child = new WaifuComponent();
      child.$mount();
      document.getElementById("waifu-container").appendChild(child.$el);
      child.$el.ondragstart = () => {
        return false;
      }
      child.previousParent = document.getElementById("waifu-container");
    }
  }
});