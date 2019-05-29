import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, NavigationEnd, ActivationEnd } from '@angular/router';

import { filter, distinctUntilChanged } from 'rxjs/operators';
import { correctHeight, detectBody } from '../app.helpers';
import { NavigationService } from './core/services/navigation.service';

declare var $: any;

export enum NavigationType {
  Left,
  Top,
  None
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {

  private navigationType = NavigationType.Left;
  constructor(private router: Router, private navigationService: NavigationService) { }

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      distinctUntilChanged()
    ).subscribe(_ => {
      if (!this.showLeftNav) {
        $('#page-wrapper').css('margin-left', '0px');
      } else {
        $('#page-wrapper').css('margin-left', '');
      }
    });
    this.router.events.pipe(
      filter(event => event instanceof ActivationEnd),
      distinctUntilChanged()
    ).subscribe((event: ActivationEnd) => {
      if (event.snapshot.data.hasOwnProperty('navigationType')) {
        this.navigationType = event.snapshot.data.navigationType;
      }
    });
  }

  get showLeftNav(): boolean {
    return this.navigationType === NavigationType.Left;
  }

  get showTopNav(): boolean {
    return this.navigationType === NavigationType.Left || this.navigationType === NavigationType.Top;
  }

  ngAfterViewInit() {
    // Run correctHeight function on load and resize window event
    $(window).bind('load resize', () => {
      correctHeight();
      detectBody();
    });

    // Correct height of wrapper after metisMenu animation.
    $('.metismenu a').click(() => {
      setTimeout(() => {
        correctHeight();
      }, 300);
    });
  }

  toggleNav() {
    this.navigationService.toggleNavigation();
  }
}
