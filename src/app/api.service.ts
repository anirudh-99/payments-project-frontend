import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BankBic } from 'src/app/models/bankBic';
import { Customer } from 'src/app/models/customer';
import { MessageCode } from 'src/app/models/messageCode';
import { TransactionHistoryResponse, TransactionReq } from 'src/app/models/transaction';

@Injectable({
  providedIn: 'root'
})
export class APIService {

  constructor(private http:HttpClient) { }

  getCustomerDetails(acctId:string){
    return this.http.get<Customer>(`/customer/${acctId}`);
  }

  getBankDetails(bankBic:string){
    return this.http.get<BankBic>(`/bankbic/${bankBic}`);
  }

  getAllMessageCodes(){
    return this.http.get<MessageCode[]>('/msgcodes');
  }

  postTransaction(trans:TransactionReq){
    return this.http.post('/transaction',trans);
  }

  getTransactionHistory(page:number,startDate:string,endDate:string){
    return this.http.post<TransactionHistoryResponse>(`/transaction/history?page=${page}`,{
      startDate,
      endDate
    });
  }

}

/*
{
    "transferType":"CUSTOMER",
	"messageCode":"CHQB",
	"amount":"12",
	"receiverAcctNumber":"12345678912345",
	"receiverName":"Bin Laden",
	"senderAcctNumber":"71319440983198",
	"receiverBic":"ABBLINBBXXX"
}
*/
