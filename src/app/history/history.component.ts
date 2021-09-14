import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { merge, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { APIService } from '../api.service';
import { TransactionResponse } from '../models/transaction';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css'],
  providers: [DatePipe]
})
export class HistoryComponent implements OnInit {

  displayedColumns: string[] = ['transactionId', 'amount', 'sender', 'receiver','timestamp'];

  resultsLength = 0;
  isLoadingResults = true;
  data!: TransactionResponse[];

  range!:FormGroup;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private apiService:APIService,private _formBuilder: FormBuilder,private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.range = this._formBuilder.group({
      'start':[new Date()],
      'end':[new Date()]
    });
  }

  ngAfterViewInit(){


    merge(this.paginator.page,this.range.statusChanges)
    .pipe(
      startWith({}),
      switchMap((value) => {
        console.log(value);
        this.isLoadingResults = true;

        //convert date format to yyyy-MM-dd
        const _startDate = this.datePipe?.transform(this.startDate,'yyyy-MM-dd')!;
        const _endDate = this.datePipe.transform(this.endDate,'yyyy-MM-dd')!;

        return this.apiService!.getTransactionHistory(
            this.paginator.pageIndex,_startDate,_endDate)
          .pipe(catchError(() => observableOf(null)));
      }),
      map(data => {
        // Flip flag to show that loading has finished.
        this.isLoadingResults = false;

        if (data === null) {
          return [];
        }
        this.resultsLength = data.totalElements;

        return data.items;
      })
    ).subscribe(data => this.data = data);
  }

  get startDate(){
    return this.range.get('start')?.value;
  }

  get endDate(){
    return this.range.get('end')?.value;
  }

}


