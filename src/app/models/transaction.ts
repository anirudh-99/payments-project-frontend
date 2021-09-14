export interface TransactionReq {
	transferType: string;
	messageCode: string;
	amount: number;
	receiverAcctNumber: string;
	receiverName: string;
	senderAcctNumber: string;
	receiverBic: string;
}


export interface TransactionHistoryResponse {
	totalElements: number,
	items: TransactionResponse[]
};

export interface TransactionResponse {
	transactionId: number,
	amount: number,
	receiverAccountNumber: string,
	receiverName: string,
	customer: {
		accountNumber: string,
		name: string,
		clearBalance: number,
		overdraft: string
	},
	messageCode: {
		messageCode: string,
		description: string
	},
	receiverBic: {
		bic: string,
		name: string,
	},
	transferType: string,
	timestamp: string
}

/*
{
		"transactionId": 1,
		"amount": 10.0,
		"receiverAccountNumber": "1242241243",
		"receiverName": "anirudh reddy",
		"customer": {
			"accountNumber": "83020817828620",
			"name": "A KRISHNA MOHAN",
			"clearBalance": 36080.32499999999,
			"overdraft": "YES"
		},
		"messageCode": {
			"messageCode": "HOLD",
			"description": "Beneficiary customer or claimant will call upon identification."
		},
		"receiverBic": {
			"bic": "ABBLINBBXXX",
			"name": "AB BANK LIMITED"
		},
		"transferType": "CUSTOMER",
		"timestamp": "2021-09-10T15:30:03.000+00:00"
	},
*/