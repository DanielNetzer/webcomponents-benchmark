import { Component, Input, ElementRef, SimpleChanges, OnChanges, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'ae-img',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class AppComponent implements OnChanges {

  @Input()
  src: string;

  @Input()
  lazySrc: string;

  private isLoading = true;

  constructor(private hostEl: ElementRef) {

  }

  ngOnChanges(changes: SimpleChanges) {

    if (changes.src.previousValue !== changes.src.currentValue) {
      // console.log(`Custom img element attributes changed. attrib changes ${attr} from ${oldValue} to ${newValue}`)
      // this[attr] = newValue
      this._removePrevImg();
      this._renderImg();
    }
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
      imgContainer.style.backgroundSize = `auto 100%`;
      imgContainer.style.backgroundRepeat = `no-repeat`;
      imgContainer.style.backgroundPosition = `center`;
      imgContainer.id = 'lazyImg';
      imgContainer.style.backgroundColor = `gray`;
      this.hostEl.nativeElement.shadowRoot.appendChild(imgContainer);

      lazyImg.onload = () => {
        if (this.isLoading) {
          imgContainer.style.backgroundColor = `none`;
          imgContainer.style.backgroundImage = `url("${this.lazySrc}")`;
        }
      };
    }

    if (this.src) {
      this._loadImg(imgContainer);
    }
  }

  _removePrevImg() {
    const img = this.hostEl.nativeElement.shadowRoot.getElementById('lazyImg');

    if (img) {
      this.hostEl.nativeElement.shadowRoot.removeChild(img);
    }
  }
}
