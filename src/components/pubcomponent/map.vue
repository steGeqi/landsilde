<template>
  <div v-bind:id="id" :class="mapclass" class="Map-container"></div>
</template>
<script type="text/javascript">
export default {
  props: {
    id: {
      type: String,
      default: ""
    }
  },
  data: function() {
    return {
      mapclass: null
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      //console.log(this.id)
    }
  }
};
</script>
<style type="text/css">
.Map-container {
  height: 100%;
}

/* a[href="http://map.baidu.com/?sr=1"] {
  display: none;
}
img[src="http://api0.map.bdimg.com/images/iws3.png"] {
  display: none;
}

.Map-container .gmnoprint .gm-style-cc {
  display: none !important;
}
.Map-container .gmnoprint.gm-style-cc {
  display: none !important;
}
.Map-container img[src*="google4"] {
  display: none;
}
.Map-container img[src*="google_white5_hdpi"] {
  display: none;
} */
</style>