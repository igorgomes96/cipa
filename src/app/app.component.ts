import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, NavigationEnd, ActivationStart } from '@angular/router';

import { filter, distinctUntilChanged } from 'rxjs/operators';
import { correctHeight, detectBody } from '../app.helpers';
import { NavigationService } from './core/services/navigation.service';
import { ToastsService } from './core/services/toasts.service';

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
  showFooter = true;
  constructor(
    private router: Router,
    private navigationService: NavigationService,
    public toastsService: ToastsService) { }

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      distinctUntilChanged()
    ).subscribe(_ => {
      if (!this.showLeftNav) {
        $('#page-wrapper').css('margin-left', '0px');
        $('body').addClass('top-navigation');
      } else {
        $('#page-wrapper').css('margin-left', '');
        $('body').removeClass('top-navigation');
      }
    });
    this.router.events.pipe(
      filter(event => event instanceof ActivationStart),
      distinctUntilChanged()
    ).subscribe((event: ActivationStart) => {
      if (event.snapshot.data.hasOwnProperty('navigationType')) {
        this.navigationType = event.snapshot.data.navigationType;
      }

      this.showFooter = true;
      if (event.snapshot.data.hasOwnProperty('showFooter')) {
        this.showFooter = event.snapshot.data.showFooter;
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
