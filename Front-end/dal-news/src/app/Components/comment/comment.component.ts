import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from 'src/app/Services/data-service.service';
import { HttpService } from 'src/app/Services/http-service.service';
import { DialogData } from '../requestlist-dashboard/requestlist-dashboard.component';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  listComment: any
  constructor( private dataservice: DataService, private httpservice: HttpService,@Inject(MAT_DIALOG_DATA) public data: any) { }
  comment: string
  ngOnInit(): void {
    this.getComments()
  }

  getComments(){
    this.httpservice.getServiceCall("/news/getComments/" + this.data.newsID).subscribe(
      (result: any)=>{
        if(result.status){
        this.listComment =  result.results
        console.log(this.listComment)
        }
      },(error: any)=>{
        console.log(error)
        alert("Something went wrong!")
      })
  }

  addComment(){
    let req = {
      newsId: this.data.newsID,
      commentedBy: this.dataservice.userData.FirstName + " "+ this.dataservice.userData.LastName,
      comment: this.comment
    }
    this.httpservice.postServiceCall("/news/saveComment",req)
    .subscribe((result: any)=>{
      if (result.status){
        console.log(result)
        this.getComments()
      }
    },(error: any)=>{
      console.log(error)
      alert("Something went wrong!")
    })
  }
}
