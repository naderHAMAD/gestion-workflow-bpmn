import { Component, OnInit, ElementRef } from '@angular/core';
import { ROUTES } from '../validator-sidebar/validator-sidebar.component';
import { Location} from '@angular/common';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/services/token-storage.service';
@Component({
  selector: 'app-validator-navbar',
  templateUrl: './validator-navbar.component.html',
  styleUrls: ['./validator-navbar.component.css']
})
export class ValidatorNavbarComponent implements OnInit {
  public focus;
  public listTitles: any[];
  public location: Location;
  username: string;

  constructor(location: Location,  private element: ElementRef, private router: Router ,private tokenStorageService: TokenStorageService) {
    this.location = location;
  }

  ngOnInit() {
    this.listTitles = ROUTES.filter(listTitle => listTitle);
    const user = this.tokenStorageService.getUser();
    this.username = user.username; // Assuming the user object has a 'name' property
  }

  getTitle(){
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if(titlee.charAt(0) === '#'){
        titlee = titlee.slice( 1 );
    }

    for(var item = 0; item < this.listTitles.length; item++){
        if(this.listTitles[item].path === titlee){
            return this.listTitles[item].title;
        }
    }
  }

  signOut() {
    this.tokenStorageService.signOut();
    this.router.navigate(['/login']);
  }

}
