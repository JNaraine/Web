import { Injectable } from '@angular/core';
import {environment as env} from './../../environments/environment';
import {HttpClient} from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchRecipeService {
  
  
  
  constructor(private http:HttpClient) { }

  getRecipes(recipeName:String): Observable<any>  {
    const EDAMAM_API_URL = `https://api.edamam.com/search?q=${recipeName}&app_id=${env.APP_ID}&app_key=${env.APP_KEY}`;
    return this.http.get(EDAMAM_API_URL).pipe(map(e => e['hits']))
  }

  
}
