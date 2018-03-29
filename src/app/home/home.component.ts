import { Component, OnInit, HostListener, Inject, ElementRef, Renderer } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'pb-home',
  styleUrls: ['./home.component.scss'],
  templateUrl: './home.component.html',
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
    )
  ]
})

export class HomeComponent implements OnInit {

  title = 'PHOTO BLOG';
  search = false;
  menu = false;
  stateSearchDiv = 'inactive';
  stateScrollbar = 'auto';
  deviceWidth = window.innerWidth;

  constructor(private elRef: ElementRef, private renderer: Renderer) {
  }

  @HostListener('window:scroll', ['$event'])
  /* onWindowScroll($event) {
    const offset = window.pageYOffset;
    if (offset > 50) {
      const navEl = this.elRef.nativeElement.querySelector('.nav');
      this.renderer.setElementStyle(navEl, 'border-bottom', 'solid 1px black');
    } else {
      const navEl = this.elRef.nativeElement.querySelector('.nav');
      this.renderer.setElementStyle(navEl, 'border', '0px');
    }
  } */

  @HostListener('window: resize', ['$event'])
  onWindowResize($event) {
    this.deviceWidth = window.innerWidth;
    if (this.deviceWidth > 959) {
      // tslint:disable-next-line:curly
      if (this.stateScrollbar === 'hidden') this.toggleMenu(this.menu);
    }
  }

  ngOnInit() {
    console.log('width: ' + window.innerWidth);
  }

  toggleSearch(search) {
    this.search = !this.search;
    this.stateSearchDiv = (this.stateSearchDiv === 'inactive' ? 'active' : 'inactive');
    console.log(this.search + ', ' + this.stateSearchDiv);
  }

  toggleMenu(menu) {
    this.menu = !this.menu;
    this.stateScrollbar = (this.stateScrollbar === 'auto' ? 'hidden' : 'auto');
    document.documentElement.style.overflow = this.stateScrollbar;
  }
}
