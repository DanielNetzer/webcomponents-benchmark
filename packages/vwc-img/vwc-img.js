    let tmpl = document.createElement('template');
    tmpl.innerHTML = `
       <slot></slot>
    `;

    class vwcImage extends HTMLElement {

        // Specify observed attributes so that
        // attributeChangedCallback will work
        static get observedAttributes() {
            return ['src', 'lazysrc'];
        }

        constructor() {
            super();
            this.isLoading = true;
            this.shouldLoad = false;
            this.attachShadow({
                mode: 'open'
            });
            this.shadowRoot.appendChild(tmpl.content.cloneNode(true));
        }

        onError(err) {
            console.error(
                `Image load failed\n\n` +
                `src: ${this.src}` +
                (err.message ? `\nOriginal error: ${err.message}` : '')
            );

            this.isLoading = false;
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

        _renderImg() {
            const imgContainer = document.createElement("div");
            const lazyImg = new Image();

            if (this.lazysrc) {
                lazyImg.src = this.lazysrc;
                imgContainer.style.height = `100%`;
                imgContainer.style.filter = `blur(2px)`;
                imgContainer.style.backgroundSize = `contain`;
                imgContainer.style.backgroundRepeat = `no-repeat`;
                imgContainer.style.backgroundPosition = `center`;
                imgContainer.id = `lazyImg`;
                imgContainer.style.backgroundColor = `gray`;
                this.shadowRoot.appendChild(imgContainer);

                lazyImg.onload = () => {
                    if (this.isLoading) {
                        imgContainer.style.backgroundColor = `unset`;
                        imgContainer.style.backgroundImage = `url("${this.lazysrc}")`;
                    }
                }
            }

            if (this.src) {
                this._loadImg(imgContainer);
            }
        }

        _removePrevImg() {
            const img = this.shadowRoot.getElementById(`lazyImg`);
            if (img) {
                this.shadowRoot.removeChild(img);
            }
        }

        attributeChangedCallback(attr, oldValue, newValue) {
            this[attr] = newValue;
            this.shouldLoad = !!this.lazysrc && !!this.src;
            if ((oldValue !== newValue && attr === 'src' && !this.isLoading) || (oldValue !== newValue && this.shouldLoad)) {
                this._removePrevImg();
                this._renderImg();
            }
        }
    }

    customElements.define('vwc-img', vwcImage);