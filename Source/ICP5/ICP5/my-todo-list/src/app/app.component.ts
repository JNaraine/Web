import { Component } from '@angular/core';

// Specify selector, templateUrl, and stylesheet
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

// Define and export class
export class AppComponent {

// Hard code some items
  allItems = [
    { description: 'Workout/Swim', done: true },
    { description: 'CS 5590-003 Homework', done: false },
    { description: 'Meal Prep', done: false },
    { description: 'Finish work project', done: false },
  ];

// Fucntion that returns all items
  get items() {
      return this.allItems;
}

// Add an item to allItems list
  addItem(description: string) {
  this.allItems.unshift({
    description,
    done: false
  });
}

//remove an item from the list
remove(item: any) {
  this.allItems.splice(this.allItems.indexOf(item), 1);
}

}

