window.addEventListener('WebComponentsReady', function () {
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

    class vwcImage extends HTMLElement {

        // Specify observed attributes so that
        // attributeChangedCallback will work
        static get observedAttributes() {
            return ['src', 'lazy-src'];
        }

        constructor() {
            super();
            this.isLoading = true;
            this.attachShadow({
                mode: 'open'
            });
            this.shadowRoot.appendChild(tmpl.content.cloneNode(true));
        }

        get src() {
            const value = this.getAttribute('src');
            return value === null ? '' : value;
        }

        set src(value) {
            this.setAttribute('src', value);
        }

        get lazySrc() {
            const value = this.getAttribute('lazy-src');
            return value === null ? '' : value;
        }

        set lazySrc(value) {
            this.setAttribute('lazy-src', value);
        }

        onError(err) {
            console.error(
                `Image load failed\n\n` +
                `src: ${this.src}` +
                (err.message ? `\nOriginal error: ${err.message}` : '')
            )
        }

        _loadImg(imgDiv) {
            const img = new Image()

            img.onload = () => {
                imgDiv.style.filter = `unset`
                imgDiv.style.backgroundImage = `url("${this.src}")`
                this.isLoading = false;
            }
            img.onerror = this.onError

            img.src = this.src
        }

        _renderImg() {
            const imgContainer = document.createElement("div");
            const lazyImg = new Image()

            if (this.lazySrc) {
                lazyImg.src = this.lazySrc
                imgContainer.style.width = `100%`
                imgContainer.style.height = `100%`
                imgContainer.style.filter = `blur(2px)`
                imgContainer.style.backgroundSize = `cover`
                imgContainer.style.backgroundRepeat = `no-repeat`
                imgContainer.id = "lazyImg"
                imgContainer.style.backgroundColor = `gray`
                this.shadowRoot.appendChild(imgContainer)

                lazyImg.onload = () => {
                    if (this.isLoading) {
                        imgContainer.style.backgroundColor = `none`
                        imgContainer.style.backgroundImage = `url("${this.lazySrc}")`
                    }
                }
            }

            if (this.src) {
                this._loadImg(imgContainer)
            }
        }

        _removePrevImg() {
            const img = this.shadowRoot.getElementById("img")
            if (img) {
                this.shadowRoot.removeChild(img);
            }
        }

        // connectedCallback() {
        //     console.log(`Custom img element added to the page.`);
        // }

        // disconnectedCallback() {
        //     console.log('Custom img element removed from page.')
        // }

        // adoptedCallback() {
        //     console.log('Custom img element moved to new page.')
        // }

        attributeChangedCallback(attr, oldValue, newValue) {
            if (oldValue !== newValue && attr === 'src') {
                // console.log(`Custom img element attributes changed. attrib changes ${attr} from ${oldValue} to ${newValue}`)
                this[attr] = newValue
                this._removePrevImg()
                this._renderImg()
            }
        }
    }

    customElements.define('vwc-img', vwcImage)
});