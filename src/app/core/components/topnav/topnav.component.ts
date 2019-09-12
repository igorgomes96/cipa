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

  @Input() showLeftNav = true;

  topCollapsed = true;

  rotas = [
    {
      link: '/eleicoes',
      label: 'Eleições'
    },
    {
      link: '/empresas',
      label: 'Empresas'
    },
    {
      link: '/estabelecimentos',
      label: 'Estabelecimentos'
    }
  ];

  constructor(private router: Router) { }

  ngOnInit() {
  }

  logout() {
    // this.authService.logout();
    this.router.navigate(['/autenticacao/login']);
  }

  menuClick(_) {
    if (!this.topCollapsed) {
      this.topCollapsed = true;
    }
  }

  toggleNavigation(): void {
    $('body').toggleClass('mini-navbar');
    smoothlyMenu();
  }

}
