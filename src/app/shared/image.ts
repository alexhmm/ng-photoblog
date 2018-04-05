import { Injectable, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

const _IMAGES = [
  {id: 0, url: 'assets/photos/abstract-cosm.jpg', align: 'landscape', tags: 'art, abstract, white, distortion'},
    {id: 1, url: 'assets/photos/roven1.jpg', align: 'landscape', tags: 'nature'},
    {id: 2, url: 'assets/photos/technology.jpg', align: 'landscape', tags: 'art, abstract'},
    {id: 3, url: 'assets/photos/texture-squares.jpg', align: 'portrait', tags: 'art, abstract'},
    {id: 4, url: 'assets/photos/water.jpg', align: 'landscape', tags: 'nature, water, ice'}
];

@Injectable()
export class Image {
  images = [];
  filter: string;
  filteredImages: EventEmitter<any> = new EventEmitter();
  filterEventEmitter: EventEmitter<string> = new EventEmitter();

  constructor() {
  }

  loadImages() {
    if (this.filter) {
      for (let i = 0; i < 20; i++) {
        const filteredImages = this.images.filter(filter => filter.tags.includes(this.filter));
        const rdm = Math.floor((Math.random() * filteredImages.length));
        this.images.push(filteredImages[rdm]);
      }
    } else {
      for (let i = 0; i < 20; i++) {
        const rdm = Math.floor((Math.random() * _IMAGES.length));
        this.images.push(_IMAGES[rdm]);
      }
    }
    return this.images;
  }

  filterImages(tag: string) {
    this.filter = tag;
    this.filterEventEmitter.emit(tag);
    const filteredImages = this.images.filter(search => search.tags.includes(tag));
    this.images = filteredImages;
    this.filteredImages.emit(filteredImages);
  }

  removeFilter() {
    this.images = [];
    this.filter = '';
    return this.loadImages();
  }
}
