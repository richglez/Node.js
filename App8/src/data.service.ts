import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
 '@angular/common/http'
import { Post } from "./app/Post";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private httpClient: HttpClient) { 
    console.log('service is working!');
    
  }

  getData(){
    return this.httpClient.get<Post[]>('https://jsonplaceholder.typicode.com/posts')
  }
}
