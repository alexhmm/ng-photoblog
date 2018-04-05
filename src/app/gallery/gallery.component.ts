import { Component, OnInit, HostListener } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Image } from '../shared/image';

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
  filter: string;
  deviceWidth = window.innerWidth;
  stateGridSpan;
  imageModal = false;
  imageIndex: number;
  imageUrl: string;
  imageAlign: string;
  imageTags = [];

  constructor(private image: Image) {
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
    this.image.filteredImages.subscribe((filteredImages) => {
      this.gridImages = filteredImages;
    });
    this.image.filterEventEmitter.subscribe((filter) => {
      this.filter = filter;
    });
  }

  loadImages() {
    this.gridImages = this.image.loadImages();
  }

  enableGridSpan(stateGridSpan) {
    if (this.deviceWidth > 642) {
      this.stateGridSpan = true;
    } else {
      this.stateGridSpan = false;
    }
  }

  changeModalContent(index, image) {
    this.imageIndex = index;
    this.imageUrl = image.url;
    this.imageAlign = image.align;
    this.imageTags = image.tags.split(', ');
    if (!this.imageModal) {
      this.toggleModal();
    }
  }

  toggleModal() {
    this.imageModal = !this.imageModal;
  }

  filterImages(tag) {
    this.image.filterImages(tag);
    if (this.imageModal) {
      this.toggleModal();
    }
  }

  removeFilter() {
    this.filter = '';
    this.gridImages = this.image.removeFilter();
  }
}
