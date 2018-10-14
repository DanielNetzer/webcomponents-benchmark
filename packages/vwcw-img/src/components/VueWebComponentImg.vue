<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "vwcvImg",
  props: ["src", "lazySrc"],
  data() {
    return {
      isLoading: true
    };
  },
  mounted: function() {
    this._renderImg();
  },
  methods: {
    onError(err) {
      console.error(
        `Image load failed\n\n` +
          `src: ${this.src}` +
          (err.message ? `\nOriginal error: ${err.message}` : "")
      );
    },
    _loadImg(imgDiv) {
      const img = new Image();

      img.onload = () => {
        imgDiv.style.filter = `unset`;
        imgDiv.style.backgroundImage = `url("${this.src}")`;
        imgDiv.style.backgroundColor = `unset`;
        this.isLoading = false;
      };
      img.onerror = this.onError;

      img.src = this.src;
    },

    _renderImg() {
      const imgContainer = document.createElement("div"),
        lazyImg = new Image();

      if (this.lazySrc) {
        lazyImg.src = this.lazySrc;
        imgContainer.style.width = `100%`;
        imgContainer.style.height = `100%`;
        imgContainer.style.filter = `blur(2px)`;
        imgContainer.style.backgroundSize = `contain`;
        imgContainer.style.backgroundRepeat = `no-repeat`;
        imgContainer.style.backgroundPosition = `center`;
        imgContainer.id = `lazyImg`;
        imgContainer.style.backgroundColor = `gray`;
        this.$root.$options.shadowRoot.appendChild(imgContainer);

        lazyImg.onload = () => {
          if (this.isLoading) {
            imgContainer.style.backgroundColor = `unset`;
            imgContainer.style.backgroundImage = `url("${this.lazySrc}")`;
          }
        };
      }

      if (this.src) {
        this._loadImg(imgContainer);
      }
    },

    _removePrevImg() {
      const img = this.$root.$options.shadowRoot.getElementById(`lazyImg`);
      if (img) {
        this.$root.$options.shadowRoot.removeChild(img);
      }
    }
  },
  attributeChangedCallback(attr, oldValue, newValue) {
    if (oldValue !== newValue && attr === "src") {
      // console.log(
      //   `Custom img element attributes changed. attrib changes ${attr} from ${oldValue} to ${newValue}`
      // );
      this[attr] = newValue;
      this._removePrevImg();
      this._renderImg();
    }
  }
};
</script>

<style>
</style>
