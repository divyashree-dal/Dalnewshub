import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { HttpService } from 'src/app/Services/http-service.service';
import { UtilityService } from 'src/app/Services/utility-service.service';
import { RequestlistDetailsComponent } from '../requestlist-details/requestlist-details.component';

export interface DialogData {
  animal: string;
  name: string;
}

export interface PeriodicElement {
  requesterName: string;
  requestType: string;
  requestModificationDate: string;
  requestStatus: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {requesterName: 'Johny Bravo', requestType: 'Auditor', requestModificationDate: '2021-06-06 15:00:00', requestStatus: 'Pending'},
  {requesterName: 'Popeye', requestType: 'Auditor', requestModificationDate: '2021-06-06 15:00:00', requestStatus: 'Accepted'},
  {requesterName: 'Dexter', requestType: 'Auditor', requestModificationDate: '2021-06-06 15:00:00', requestStatus: 'Rejected'},
  {requesterName: 'Oswald', requestType: 'Reader', requestModificationDate: '2021-06-06 15:00:00', requestStatus: 'Pending'},
  {requesterName: 'Noddy', requestType: 'Reader', requestModificationDate: '2021-06-06 15:00:00', requestStatus: 'Pending'}
]

@Component({
  selector: 'app-requestlist-dashboard',
  templateUrl: './requestlist-dashboard.component.html',
  styleUrls: ['./requestlist-dashboard.component.css']
})
export class RequestlistDashboardComponent implements OnInit {
  // let myCompOneObj= new RequestlistDetailsComponent();

  displayedColumns: string[] = ['RequesterName', 'RequestType', 'CreatedOn', 'Status'];
  dataSource = ELEMENT_DATA;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public dialog: MatDialog, public util: UtilityService, private httpservice: HttpService) { }

  ngOnInit(): void {
    this.getNewsList();
  }

  getNewsList(){
    this.httpservice.getServiceCall("/requests")
    .subscribe((result: any)=>{
      this.dataSource= result.results;
      console.log(result)
    },
    (error: any)=>{
      console.log(error)
    })
  }

  openDialog(index: number) {
    // this.registerUser[index+this.paginator.pageSize].mode = 'V';
    const dialogRef = this.dialog.open(RequestlistDetailsComponent, {
      // data: {requesterName: "Mansi", email: "mansi@gmail.com", requestType : "Auditor"},
      data: this.dataSource[index],
      width: '400px'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }

}
