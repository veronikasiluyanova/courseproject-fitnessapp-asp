import { Component } from '@angular/core';
import { AuthService, ID } from '../../services/auth.service';
import { Router } from '@angular/router';
import { AccountService } from '../../services/account.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  isExpanded = false;
  user_id: number; 
  username: string;

  constructor(private authService: AuthService,
    private accService: AccountService,
    private userService: UserService,
    private router: Router) {
    
  }

  //public get isAdmin(): boolean {
  //  let isAdmin = false;
  //  let role;
  //  this.userService.getUser(this.user_id).subscribe(data => {
  //    this.username = data.username;
  //    this.accService.getAllAccounts().subscribe(accs => {
  //      role = accs.find(a => a.username === this.username).role;
  //      if (role === 1) {
  //        isAdmin = true;
  //      }
  //    });
  //  });
  //  return isAdmin;
  //}

  public get isLoggedIn(): boolean {
    return this.authService.isAuthenticated()
  }

  logout() {
    this.authService.logout()
    this.router.navigate(['/'])
  }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
}
