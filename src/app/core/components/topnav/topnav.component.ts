import { Component, OnInit, Input } from '@angular/core';
import { smoothlyMenu } from 'src/app.helpers';

declare var $: any;

@Component({
  selector: 'app-topnav',
  templateUrl: './topnav.component.html',
  styleUrls: ['./topnav.component.css']
})
export class TopnavComponent implements OnInit {

  @Input() showToggle = true;

  constructor() { }

  ngOnInit() {
  }

  logout() {
    // this.authService.logout();
    // this.router.navigate(['/login']);
  }

  toggleNavigation(): void {
    $('body').toggleClass('mini-navbar');
    smoothlyMenu();
  }

}
