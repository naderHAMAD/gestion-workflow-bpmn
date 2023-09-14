import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../../../services/token-storage.service';

@Component({
  selector: 'app-simple-user-profile',
  templateUrl: './simple-user-profile.component.html',
  styleUrls: ['./simple-user-profile.component.css']
})
export class SimpleUserProfileComponent implements OnInit {

  username: string;

  constructor(private tokenStorageService: TokenStorageService) { }

  ngOnInit() {
    const user = this.tokenStorageService.getUser();
    this.username = user.username; // Assuming the user object has a 'name' property
  }
}
