import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {ChatState} from "../chat.state";
import {Select} from "@ngxs/store";
import {User} from "../entities/User";

@Injectable({
  providedIn: 'root'
})
export class ChatGuard implements CanActivate {
  // @ts-ignore
  @Select(ChatState.getUser) currentUser: Observable<User>;
  // @ts-ignore
  currentU: User;
  constructor(private router: Router) {
    // @ts-ignore
    this.currentUser.subscribe((data) => {
      this.currentU = data;
    });
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this.currentU) {
      this.router.navigate(['/join']);
      return false
    } else {
      return true
    }
  }

}
