import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
// Import item.ts
import { Item } from "../item";

// Specify selector, templateUrl, and stylesheet
@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})

// Define and export class
export class ItemComponent {

  // Set editable to false
  editable = false;

  // Import specific objects from App component
  @Input() item: Item;
  @Input() newItem: string;
  //Export object that removes item
  @Output() remove = new EventEmitter<Item>();

  // Function that saves new description of item
  saveItem(description: any) {
    if (!description) return;
    this.editable = false;
    this.item.description = description;
  }
}
