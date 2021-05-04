import { ViewChild } from '@angular/core';
import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { User } from 'src/app/models/user';
import { ID } from 'src/app/services/auth.service';
import { ImageService } from 'src/app/services/image.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-file-upload-dialog',
  templateUrl: './file-upload-dialog.component.html',
  styleUrls: ['./file-upload-dialog.component.css']
})
export class FileUploadDialogComponent implements OnInit {
  @ViewChild('fileInput', { static: true }) fileInput:any;
  
  public close: boolean = false;
  public file: File;
  public user_id: number;
  public currentuser: User;

  public response: {dbPath: ''};
  
  constructor(@Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<FileUploadDialogComponent>,
    private imageService: ImageService,
    private userService: UserService) {
      this.user_id = +localStorage.getItem(ID);
   }

  ngOnInit() {
    this.userService.getUser(this.user_id)
      .subscribe(u => this.currentuser = u);
  }

  onFileSelected(event) {
    this.file = event.target.files[0];
  }

  public saveImage = (files) => {
    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, this.user_id.toString()+'.'+fileToUpload.type.split('/')[1].toString());
    this.imageService.uploadImage(formData)
      .subscribe(event => {
        console.log(event);
        this.uploadFinished(event);
        this.close = true;
     });
  }

  public uploadFinished = (event) => {
    this.response = event;
    this.currentuser.image = this.response.dbPath;
    this.userService.updateUser(this.user_id, this.currentuser).subscribe();
  }

}
