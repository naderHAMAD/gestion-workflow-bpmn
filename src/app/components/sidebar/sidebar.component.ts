import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
  //{ path: '/user-profile', title: 'Home',  icon:'ni-single-02 text-yellow', class: '' },   
  { path: '/form-editor', title: 'Form Editor',  icon:'ni ni-folder-17 text-blue', class: '' },
  { path: '/form', title: 'Forms',  icon:'ni ni-single-copy-04 text-purple', class: '' },
  { path: '/task-active', title: 'Active Tasks',  icon:'ni ni-user-run text-info', class: '' },
  { path: '/modeler', title: 'Modeler',  icon:'ni ni-vector text-pink', class: '' },
  { path: '/workflow', title: 'Workflows',  icon:'ni ni-map-big text-danger', class: '' },
  { path: '/process', title: 'Processes',  icon:'ni ni-settings-gear-65 text-green', class: '' },


  
  //{ path: '/task', title: 'Tasks',  icon:'ni-books text-pink', class: '' },
  //{ path: '/dashboard', title: 'History',  icon: 'ni-tv-2 text-red', class: '' },
  //{ path: '/icons', title: 'Other',  icon:'ni-planet text-blue', class: '' },

   // { path: '/login', title: 'Login',  icon:'ni-key-25 text-info', class: '' },
    //{ path: '/register', title: 'Register',  icon:'ni-circle-08 text-pink', class: '' }
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

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
