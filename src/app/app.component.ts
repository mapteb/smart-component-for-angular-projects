import { Component, OnInit } from '@angular/core';

/**
 * This Angular component just loads the layout component
 */
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent implements OnInit {

  title = "A Smart Component for Angular Projects";

  constructor() {
  }

  ngOnInit() { }
}
