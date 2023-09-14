import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../services/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ValidatorGuard implements CanActivate {
  constructor(private router: Router, private tokenStorageService: TokenStorageService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const user = this.tokenStorageService.getUser();
    if (user && user.roles[0] === 'ROLE_VALIDATOR') {
      return true;
    } else {
      this.router.navigate(['/unauthorized']);
      return false;
    }
  }
}