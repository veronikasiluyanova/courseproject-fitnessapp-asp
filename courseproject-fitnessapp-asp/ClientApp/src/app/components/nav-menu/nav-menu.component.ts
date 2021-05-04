import { Component } from '@angular/core';
import { AuthService, ID } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { FileUploadDialogComponent } from '../file-upload-dialog/file-upload-dialog.component';
import { ResourceLoader } from '@angular/compiler';

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
    private router: Router,
    public dialog: MatDialog) {
  }

  public get isLoggedIn_2(): boolean {
    return this.authService.isAuthenticated() && +localStorage.getItem(ID) === 11;
  }

  public get isLoggedIn(): boolean {
    return this.authService.isAuthenticated();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  openDialog() {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '50%'
    });
    
    dialogRef.afterClosed().subscribe();
  }

  openUploadDialog() {
    const dialogRef = this.dialog.open(FileUploadDialogComponent, {
      width: '50%',
      data: {path: ''}
    });

    dialogRef.afterClosed().subscribe();
  }
}
