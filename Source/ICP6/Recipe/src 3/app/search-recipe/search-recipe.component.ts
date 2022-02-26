import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { SearchRecipeService } from './search-recipe.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-search-recipe',
  templateUrl: './search-recipe.component.html',
  styleUrls: ['./search-recipe.component.css']
})
export class SearchRecipeComponent implements OnInit {
  @ViewChild('recipe') recipes: ElementRef;
  @ViewChild('place') places: ElementRef;
  isLoading = true;
  recipeValue: any;
  placeValue: any;
  venueList = [];
  recipeList = [];

  currentLat: any;
  currentLong: any;
  geolocationPosition: any;

  constructor(private searchService: SearchRecipeService, private _http: HttpClient) {
    
  }

  ngOnInit() {

    window.navigator.geolocation.getCurrentPosition(
      position => {
        this.geolocationPosition = position;
        this.currentLat = position.coords.latitude;
        this.currentLong = position.coords.longitude;
      });
  }

  getVenues() {

    this.recipeValue = this.recipes.nativeElement.value;
    this.placeValue = this.places.nativeElement.value;

    if (this.recipeValue !== null) {
      
      
      this.searchService.getRecipes(this.recipeValue).subscribe(data => {
      this.recipeList = data.map(e => e.recipe)
    })
  }
  //if the user entered a place and a food, then display a list of restaraunts
  if (this.placeValue !== null && this.placeValue !== '' && this.recipeValue !== null && this.recipeValue !== '') {
      //Set up http headers for the get request. These are needed so that foursquare can verify the account information
      const headers= new HttpHeaders()
        .set('Accept', 'application/json')
        .set('Authorization', 'fsq3lNgWyv9sczLrigyn5/WI4acjplEA0JXYzR7DWFdEXmA=');

      //set a variable that contains our dynamic url
      var url = 'https://api.foursquare.com/v3/places/search?exclude_all_chains=true&sort=RATING&limit=50&query=' + this.recipeValue+ '&near=' + this.placeValue;

      //create a get request with headers
      this._http.get(url, { 'headers': headers })
        // subscribe triggers when data is successfully retrieved
        .subscribe((data:any) => {
        this.isLoading=false;
        // query the json object. the results is the output of the query
        this.venueList = Object.keys(data.results).map(function (k){
          var i = data.results[k];
          console.log(i);
          // return the needed restaraunt name and location
          return {name: i.name, location: i.location, category: i.categories[0].name}
        })
        //Log the results to the console for testing
        console.log(this.venueList);
      });
}}}
