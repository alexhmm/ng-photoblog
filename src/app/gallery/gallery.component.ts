import { Component, OnInit, HostListener } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'pb-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
  animations: [
    trigger(
      'enter', [
        transition(':enter', [
          style({opacity: 0}),
          animate('250ms', style({opacity: 1}))
        ]),
        transition(':leave', [
          style({opacity: 1}),
          animate('250ms', style({opacity: 0}))
        ])
      ]
    ),
    trigger(
      'ease', [
        transition(':enter', [
          style({opacity: 0}),
          animate('150ms ease-in', style({opacity: 1}))
        ]),
        transition(':leave', [
          style({opacity: 1}),
          animate('150ms ease-out', style({opacity: 0}))
        ])
      ]
    )
  ]
})
export class GalleryComponent implements OnInit {

  images = [];
  gridImages = [];
  deviceWidth = window.innerWidth;
  stateGridSpan;
  imageModal = false;
  imageIndex: number;
  imageUrl: string;
  imageAlign: string;
  imageTags = [];

  constructor() {
    this.images = [
      {id: 0, url: 'assets/photos/abstract-cosm.jpg', align: 'landscape', tags: 'art, abstract, white, distortion'},
      {id: 1, url: 'assets/photos/roven1.jpg', align: 'landscape', tags: 'nature'},
      {id: 2, url: 'assets/photos/technology.jpg', align: 'landscape', tags: 'art, abstract'},
      {id: 3, url: 'assets/photos/texture-squares.jpg', align: 'portrait', tags: 'art, abstract'},
      {id: 4, url: 'assets/photos/water.jpg', align: 'landscape', tags: 'nature, water, ice'}
    ];
  }

  @HostListener('window: resize', ['$event'])
  onWindowResize($event) {
    this.deviceWidth = window.innerWidth;
    this.enableGridSpan(this.stateGridSpan);
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll($event) {
    const windowHeight = 'innerHeight' in window ? window.innerHeight : document.documentElement.offsetHeight;
    const body = document.body, html = document.documentElement;
    const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight,  html.scrollHeight, html.offsetHeight);
    const windowBottom = windowHeight + window.pageYOffset;
    if (windowBottom >= docHeight) {
      this.loadImages();
    }
  }

  ngOnInit() {
    this.enableGridSpan(this.stateGridSpan);
    this.loadImages();
  }

  loadImages() {
    for (let i = 0; i < 20; i++) {
      const rdm = Math.floor((Math.random() * this.images.length));
      this.gridImages.push(this.images[rdm]);
    }
  }

  enableGridSpan(stateGridSpan) {
    if (this.deviceWidth > 642) {
      this.stateGridSpan = true;
    } else {
      this.stateGridSpan = false;
    }
  }

  changeModalContent(index, image) {
    console.log('Index: ' + index);
    console.log(image);
    this.imageIndex = index;
    this.imageUrl = image.url;
    this.imageAlign = image.align;
    this.imageTags = image.tags.split(', ');
    console.log(this.imageTags);
    if (!this.imageModal) {
      this.toggleModal();
    }
  }

  toggleModal() {
    this.imageModal = !this.imageModal;
  }
}
