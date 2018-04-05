import { Component, OnInit, HostListener, Inject, ElementRef, Renderer } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { DOCUMENT } from '@angular/common';
import { Image } from '../shared/image';

@Component({
  selector: 'pb-home',
  styleUrls: ['./home.component.scss'],
  templateUrl: './home.component.html',
  animations: [
    trigger('enter', [
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
    trigger('navHeight', [
      state('top', style({
        height: '70px',
      })),
      state('scroll', style({
        height: '50px',
      })),
      transition('top <=> scroll', animate('100ms ease-in-out'))
    ])
  ]
})

export class HomeComponent implements OnInit {

  title = 'PHOTO BLOG';
  search = false;
  menu = false;
  stateNavigation;
  stateSearchDiv = 'inactive';
  stateScrollbar = 'auto';
  deviceWidth = window.innerWidth;

  constructor(private elRef: ElementRef, private renderer: Renderer, private image: Image) {
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll($event) {
    this.setStateNavigation();
  }

  @HostListener('window: resize', ['$event'])
  onWindowResize($event) {
    this.deviceWidth = window.innerWidth;
    this.setStateNavigation();
    if (this.deviceWidth > 959) {
      // tslint:disable-next-line:curly
      if (this.stateScrollbar === 'hidden') this.toggleMenu();
    }
  }

  ngOnInit() {
    console.log('width: ' + window.innerWidth);
    this.setStateNavigation();
  }

  setStateNavigation() {
    const offset = window.pageYOffset;
    if (this.deviceWidth > 959) {
      if (offset > 30) {
        this.stateNavigation = 'scroll';
      } else {
        this.stateNavigation = 'top';
      }
    } else {
      this.stateNavigation = 'scroll';
    }
  }

  toggleSearch() {
    this.search = !this.search;
    this.stateSearchDiv = (this.stateSearchDiv === 'inactive' ? 'active' : 'inactive');
  }

  toggleMenu() {
    this.menu = !this.menu;
    this.stateScrollbar = (this.stateScrollbar === 'auto' ? 'hidden' : 'auto');
    document.documentElement.style.overflow = this.stateScrollbar;
  }

  filterImages(tag) {
    this.image.filterImages(tag);
    this.toggleSearch();
  }
}
