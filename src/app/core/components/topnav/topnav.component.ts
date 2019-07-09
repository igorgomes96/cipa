import { Component, OnInit, Input } from '@angular/core';
import { smoothlyMenu } from 'src/app.helpers';
import { Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-topnav',
  templateUrl: './topnav.component.html',
  styleUrls: ['./topnav.component.css']
})
export class TopnavComponent implements OnInit {

  @Input() showToggle = true;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  logout() {
    // this.authService.logout();
    this.router.navigate(['/autenticacao/login']);
  }

  toggleNavigation(): void {
    $('body').toggleClass('mini-navbar');
    smoothlyMenu();
  }

}
