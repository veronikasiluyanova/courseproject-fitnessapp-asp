import { Injectable } from "@angular/core";
import { Image } from "../models/image";
import { HttpClient, HttpParams } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private url = "api/Images";
  constructor(private http: HttpClient) { }
  
  uploadImage(formData: FormData) {
    return this.http.post(this.url, formData);
  }

  getImage() {
    return this.http.get(this.url);
  }
  
  updateImage(id: number, user: Image) {
    return this.http.put(this.url + '/' + id, user);
  }

  deleteImage(user_id: number) {
    return this.http.delete(this.url + '/' + user_id);
  }
}
