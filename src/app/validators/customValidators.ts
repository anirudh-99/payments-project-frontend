import { Injectable } from "@angular/core";
import { AbstractControl, AsyncValidator, ValidationErrors } from "@angular/forms";
import { Observable } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { APIService } from "../api.service";
import { Customer } from "../models/customer";

@Injectable({ providedIn: 'root' })
export class AccountIdValidator implements AsyncValidator {
    constructor(private homeService: APIService) { }

    validate(
        ctrl: AbstractControl
    ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
        return this.homeService.getCustomerDetails(ctrl.value).pipe(
            map((customer: Customer) => {
                console.log(customer);
                if(!customer){
                    return { accountIdIncorrectSize: true };
                }
                
                else return null;
            }),
        );
    }
}