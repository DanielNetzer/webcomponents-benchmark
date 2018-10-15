import { Component, Prop, Watch, State, Element } from '@stencil/core';

@Component({
  tag: 'stencil-img',
  styleUrl: 'stencil-img.css',
  shadow: true
})
export class StencilImg {
  @Element() hostEl: HTMLElement;
  @State() isLoading = true;

  @Prop() src: string;
  @Prop() lazySrc: string;

  @Watch('src')
  reRenderImg(newValue: string, oldValue: string) {
    if (newValue !== oldValue) {
      console.log(`Custom img element attributes changed. src changed from ${oldValue} to ${newValue}`);
      this._removePrevImg();
      this._renderImg();
    }
  }

  render() {
    this._removePrevImg();
    this._renderImg();
    return <slot></slot>;
  }

  onError(err) {
    console.error(
      `Image load failed\n\n` +
      `src: ${this.src}` +
      (err.message ? `\nOriginal error: ${err.message}` : '')
    );
  }

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
  }

  _renderImg() {
    const imgContainer = document.createElement('div');
    const lazyImg = new Image();

    if (this.lazySrc) {
      lazyImg.src = this.lazySrc;
      imgContainer.style.width = `100%`;
      imgContainer.style.height = `100%`;
      imgContainer.style.filter = `blur(2px)`;
      imgContainer.style.backgroundSize = `contain`;
      imgContainer.style.backgroundRepeat = `no-repeat`;
      imgContainer.style.backgroundPosition = `center`;
      imgContainer.id = 'lazyImg';
      imgContainer.style.backgroundColor = `gray`;
      this.hostEl.shadowRoot.appendChild(imgContainer);

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
  }

  _removePrevImg() {
    const img = this.hostEl.shadowRoot.getElementById('lazyImg');

    if (img) {
      this.hostEl.shadowRoot.removeChild(img);
    }
  }
}
