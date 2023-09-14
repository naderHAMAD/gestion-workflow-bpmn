import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../../../services/token-storage.service';

@Component({
  selector: 'app-validator-profile',
  templateUrl: './validator-profile.component.html',
  styleUrls: ['./validator-profile.component.css']
})
export class ValidatorProfileComponent implements OnInit {

  username: string;

  constructor(private tokenStorageService: TokenStorageService) { }

  ngOnInit() {
    const user = this.tokenStorageService.getUser();
    this.username = user.username; // Assuming the user object has a 'name' property
  }
}
