import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  /*
    PURPOSE: redirect to page
    This function will redirect to page passed as parameter
  */
  goToPage(pageName:string):void{
    this.router.navigate([`${pageName}`]);
  }

}
