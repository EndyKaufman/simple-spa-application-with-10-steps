import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'my-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage implements OnInit {

  static NAME: string = 'home';

  ngOnInit() {
    console.log('Hello Home');
  }

}
