import {
    LitElement
} from '@polymer/lit-element';

let tmpl = document.createElement('template');
tmpl.innerHTML = `
  <style>:host { 
    height: 100%;
    width: 100%;
    display: block;
   }
   </style>
   <slot></slot>
`;

class LitImg extends LitElement {

    static get properties() {
        return {
            lazysrc: {
                type: String
            },
            src: {
                type: String
            }
        }
    }

    constructor() {
        super();
        this.isLoading = true;
        this.isLoaded = false;
        this.shadowRoot.appendChild(tmpl.content.cloneNode(true));
    }

    attributeChangedCallback(attr, oldValue, newValue) {
        this[attr] = newValue;
        this.isLoaded = !!this.lazysrc && !!this.src;
        if (oldValue !== newValue && attr === 'src' || this.isLoaded) {
            this._removePrevImg();
            this._renderImg();
        }
    }

    _renderImg() {
        const imgContainer = document.createElement("div");

        imgContainer.style.width = `100%`;
        imgContainer.style.height = `100%`;
        imgContainer.style.filter = `blur(2px)`;
        imgContainer.style.backgroundSize = `auto 100%`;
        imgContainer.style.backgroundRepeat = `no-repeat`;
        imgContainer.style.backgroundPosition = `center`;
        imgContainer.id = `lazyImg`;
        imgContainer.style.backgroundColor = `gray`;
        this.shadowRoot.appendChild(imgContainer);

        if (this.lazysrc) {
            const lazyImg = new Image();
            lazyImg.src = this.lazysrc;

            lazyImg.onload = () => {
                if (this.isLoading) {
                    imgContainer.style.backgroundColor = `none`
                    imgContainer.style.backgroundImage = `url("${this.lazysrc}")`
                }
            }
        }

        if (this.src) {
            this._loadImg(imgContainer)
        }
    }

    _onError(err) {
        console.error(
            `Image load failed\n\n` +
            `src: ${this.src}` +
            (err.message ? `\nOriginal error: ${err.message}` : '')
        )
    }

    _loadImg(imgDiv) {
        const img = new Image();

        img.onload = () => {
            imgDiv.style.filter = `unset`;
            imgDiv.style.backgroundImage = `url("${this.src}")`;
            imgDiv.style.backgroundColor = `unset`;
            this.isLoading = false;
        }
        img.onerror = this.onError;

        img.src = this.src;
    }

    _removePrevImg() {
        const img = this.shadowRoot.getElementById(`lazyImg`)
        if (img) {
            this.shadowRoot.removeChild(img);
        }
    }
}

customElements.define('lit-img', LitImg);