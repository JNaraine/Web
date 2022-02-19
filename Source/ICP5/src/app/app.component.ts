import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ngx-countdown';


 constructor() {}

 ngOnInit(): void {
     
 }
  countDownDate = new Date("Mar 28, 2022 12:37:25").getTime();
 
  demo:any;
  x= setInterval(()=>{

    var now = new Date().getTime();
    var distance = this.countDownDate - now;
    var days = Math.floor(distance/(1000*60*60*24));
    var hours = Math.floor((distance %(1000*60*60*24)) / (1000*60*60));
    var minutes = Math.floor((distance % (1000*60*60)) / (1000*60));
    var seconds = Math.floor((distance % (1000*60)) / (1000));

    this.demo = days + " Days    " + hours + " Hours   " + minutes + " Minutes  " + seconds + " Seconds";
  })
}
