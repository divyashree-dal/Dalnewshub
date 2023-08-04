import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/Services/data-service.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(private dataservice: DataService, private router: Router) { }

  ngOnInit(): void {
    if(!this.dataservice.getLoginStatus()){
      this.router.navigateByUrl("/signin")
    }
  }

  logout(){
    this.dataservice.logout();
    this.router.navigateByUrl("/signin")
  }
}
