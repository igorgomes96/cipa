import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, ResolveEnd, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter, distinctUntilChanged } from 'rxjs/operators';

declare var $: any;

export interface MenuItem {
  label: string;
  link: string;
  icon: string;
  visible: boolean;
  active: boolean;
  children: MenuItem[];
}

@Component({
  selector: 'app-leftnav',
  templateUrl: './leftnav.component.html',
  styleUrls: ['./leftnav.component.css']
})
export class LeftnavComponent implements OnInit, AfterViewInit {

  menu: MenuItem[];
  isAdmin = true;
  constructor(private router: Router, private route: ActivatedRoute) {
    this.menu = [
      {
        label: 'Dashboard',
        link: '/eleicoes/:id/dashboard',
        icon: 'fa fa-bar-chart',
        visible: true,
        children: null,
        active: false
      },
      {
        label: 'Cronograma',
        link: '/eleicoes/:id/cronograma',
        icon: 'fa fa-calendar',
        visible: true,
        children: null,
        active: false
      },
      {
        label: 'Eleitores',
        link: '/eleicoes/:id/eleitores',
        icon: 'fa fa-users',
        visible: true,
        children: null,
        active: false
      },
      {
        label: 'Candidaturas',
        link: '/eleicoes/:id/candidaturas',
        icon: 'fa fa-vcard',
        visible: true,
        children: null,
        active: false
      }
    ];
  }

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      distinctUntilChanged()
    ).subscribe((event: NavigationEnd) => {
      this.updateLinks(event.url);
    });

    this.updateLinks(this.router.url);

    // this.authService.onUserChanges.subscribe(_ => {
    //   this.isAdmin = this.authService.isInRole('Administrador');
    // });
    // this.isAdmin = this.authService.isInRole('Administrador');

    // this.router.events.pipe(tap(console.log)).subscribe();
  }

  private updateLinks(url: string) {
    const paths = url.split('/');
    if (paths.length > 2 && paths[1] === 'eleicoes') {
      const id = paths[2];
      this.menu.forEach(item => {
        item.link = item.link.replace(':id', id).replace(/(\d+)/, id);
        if (item.link === url) {
          item.active = true;
        } else {
          item.active = false;
        }
        if (item.children) {
          item.children.forEach(subitem => {
            subitem.link = subitem.link.replace(':id', id).replace(/(\d+)/, id);
          });
        }
      });
    }
  }

  logout() {
    // this.authService.logout();
    this.router.navigate(['/login']);
  }

  ngAfterViewInit() {
    $('#side-menu').metisMenu();
  }

}
