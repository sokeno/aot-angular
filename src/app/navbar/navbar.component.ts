import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public router:Router) { }

  ngOnInit(): void {
  }

  logOut():void{
  	localStorage.removeItem('h');
    localStorage.removeItem('u');
  	this.router.navigate(['/sign-in']);
  }

}
