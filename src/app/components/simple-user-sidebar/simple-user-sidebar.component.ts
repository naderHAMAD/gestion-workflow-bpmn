import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [

  { path: '/simple-user-active-task', title: 'Active Tasks',  icon:'ni ni-user-run text-info', class: '' },

];
@Component({
  selector: 'app-simple-user-sidebar',
  templateUrl: './simple-user-sidebar.component.html',
  styleUrls: ['./simple-user-sidebar.component.css']
})
export class SimpleUserSidebarComponent implements OnInit {
  public menuItems: any[];
  public isCollapsed = true;
  constructor(private router: Router) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
   });
  }
}
