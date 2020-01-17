import { NavigationService } from './../../services/navigation.service';
import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Router, ResolveEnd, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter, distinctUntilChanged } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import { AuthInfo } from '@shared/models/usuario';
import { Subscription } from 'rxjs';

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
export class LeftnavComponent implements OnInit, OnDestroy {

  menu: MenuItem[];
  isAdmin = true;
  subscription = new Subscription();
  constructor(
    private router: Router,
    private navigationService: NavigationService,
    private authInfoService: AuthService) {
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
        label: 'Inscrições',
        link: '/eleicoes/:id/inscricoes',
        icon: 'fa fa-vcard',
        visible: true,
        children: [
          {
            label: 'Pendentes',
            link: '/pendentes',
            icon: null,
            visible: true,
            children: null,
            active: false
          },
          {
            label: 'Aprovadas',
            link: '/aprovadas',
            icon: null,
            visible: true,
            children: null,
            active: false
          },
          {
            label: 'Reprovadas',
            link: '/reprovadas',
            icon: null,
            visible: true,
            children: null,
            active: false
          }
        ],
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

    this.subscription.add(this.navigationService.leftNavLinkEmitter
      .subscribe(_ => this.updateLinks(this.router.url)));
    this.updateLinks(this.router.url);
  }

  private updateLinks(url: string) {
    const paths = url.split('/');
    if (paths.length > 2 && paths[1] === 'eleicoes') {
      const id = paths[2];
      if (!id.match(/^\d+$/)) { return; } // Se permite números
      this.menu.forEach(item => {
        item.link = item.link.replace(':id', id).replace(/(\d+)/, id);
        if (url.startsWith(item.link)) {
          item.active = true;
        } else {
          item.active = false;
        }
        if (item.children) {
          item.children.forEach(subitem => {
            subitem.link = subitem.link.replace(':id', id).replace(/(\d+)/, id);
            if (item.link + subitem.link === url) {
              subitem.active = true;
            } else {
              subitem.active = false;
            }
          });
        }
      });
    }
  }

  logout() {
    // this.authService.logout();
    this.router.navigate(['/login']);
  }

  get authInfo(): AuthInfo  {
    return this.authInfoService.authInfo;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
