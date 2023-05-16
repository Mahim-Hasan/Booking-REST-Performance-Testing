# Booking-REST-Performance-Testing

## How to run this project
- Clone this project
- Open with JMeter / Command Shell
- For running in Command Shell follow the steps:
1. > Keep the jmx files in bin
2. > Create a folder in bin called "report"
3. > Run Command:  
```console 
jmeter -n -t filename.jmx -l report\filename.jtl 
```
- Run Command for Report: 
```console 
jmeter -g report\filename.jtl -o report\filename.html
```

## Technology used:
- JMeter

## Prerequisite:
- Jdk
- Node Js
- Html Report Library

## Test case list:
1. ### Create Booking
	> In this section we created dataset using the dynamic random variables.

2. ### Get Booking
	> In this section we tested wether we can get the details of the particular searched id which we got in the create booking section's response and also validated the following field values:
 	1. > First Name
 	2. > Last Name
 	3. > Total Price
 	4. > Deposit Paid
 	5. > Check In
 	6. > Check Out
 	7. > Additional Needs

3. ### Create Token
  > In this section we generated a token that'll be needed to update the booking, partially update the booking and delete the booking.
  
4. ### Update Booking
	> In this section we updated the following field values:
 	1. > First Name
 	2. > Last Name
 	3. > Total Price
 	4. > Additional Needs
 	
5. ### Get Updated Booking
	> In this section we tested wether the updated field values successfully added ot not and validated the following field values:
	1. > First Name
 	2. > Last Name
 	3. > Total Price
 	4. > Additional Needs

6. ### Partial Update Booking
	> In this section we just modified the following two field values:
	1. > First Name
 	2. > Last Name

7. ### Delete Booking
	> In this section we deleted the information of the id that we called and successfully got the result.

## Report Summary:
For, 1 Concurrent Request with 1 Ramp-up Period and 1 Loop Count; Avg TPS for Total Samples is ~ 0.117 and Total Concurrent API requested: 7.
	![t1-tps](https://github.com/Mahim-Hasan/Booking-REST-Performance-Testing/assets/77658882/f9136dd0-3169-4a59-9b1b-91c92a862739)
	![t1-tbl](https://github.com/Mahim-Hasan/Booking-REST-Performance-Testing/assets/77658882/c5648f31-6465-4895-b59f-3fb84433cc87)

For, 10 Concurrent Requests with 5 Ramp-up Period and 1 Loop Count; Avg TPS for Total Samples is ~ 1.167 and Total Concurrent API requested: 70.
	![t10-tps](https://github.com/Mahim-Hasan/Booking-REST-Performance-Testing/assets/77658882/ae7aba2d-43e2-48d5-a910-6c60646dfa03)
	![t10-tbl](https://github.com/Mahim-Hasan/Booking-REST-Performance-Testing/assets/77658882/c657dcd0-50bc-4af4-b316-4b88126a60ba)

For, 100 Concurrent Requests with 10 Ramp-up Period and 1 Loop Count; Avg TPS for Total Samples is ~ 11.667 and Total Concurrent API requested: 700.
	![t100-tps](https://github.com/Mahim-Hasan/Booking-REST-Performance-Testing/assets/77658882/603cd95f-1cf9-498e-8a24-67d2504c8f36)
	![t100-tbl](https://github.com/Mahim-Hasan/Booking-REST-Performance-Testing/assets/77658882/84c12fcf-1311-4bb8-89e4-077185967e4a)

For, 100 Concurrent Requests with 10 Ramp-up Period and 10 Loop Counts; Avg TPS for Total Samples is ~ 64 and Total Concurrent API requested: 7000.
	![t100-tps](https://github.com/Mahim-Hasan/Booking-REST-Performance-Testing/assets/77658882/71056e63-3115-4253-a630-aa8c3635c63d)
	![t100-tbl](https://github.com/Mahim-Hasan/Booking-REST-Performance-Testing/assets/77658882/15c45d4f-9f8c-410e-a971-fb3e57d05f4f)
	![t-1000](https://github.com/Mahim-Hasan/Booking-REST-Performance-Testing/assets/77658882/6c56e3e5-5a19-4e93-aba3-2df389d67c05)

For, 500 Concurrent Requests with 10 Ramp-up Period and 1 Loop Count; Avg TPS for Total Samples is ~ 42 and Total Concurrent API requested: 3500.
	![t500-tps](https://github.com/Mahim-Hasan/Booking-REST-Performance-Testing/assets/77658882/e2054d89-6243-49f6-89e8-4739f51fa6e1)
	![t500-tbl](https://github.com/Mahim-Hasan/Booking-REST-Performance-Testing/assets/77658882/52e76860-4edd-495b-a440-43e0b13014c1)

For, 500 Concurrent Requests with 10 Ramp-up Period and 10 Loop Counts; Avg TPS for Total Samples is ~ 417 and Total Concurrent API requested: 35000.
	![t5000-tps](https://github.com/Mahim-Hasan/Booking-REST-Performance-Testing/assets/77658882/155b1549-ac83-4e45-9583-e59d6ee501b2)
	![t5000-tbl](https://github.com/Mahim-Hasan/Booking-REST-Performance-Testing/assets/77658882/0006c67a-449d-48ec-94ed-f7e404517367)
	![t-5000](https://github.com/Mahim-Hasan/Booking-REST-Performance-Testing/assets/77658882/a4ef8597-94bb-4b92-b86b-e282bf8e9536)

For, 600 Concurrent Requests with 20 Ramp-up Period and 10 Loop Counts; Avg TPS for Total Samples is ~ 467 and Total Concurrent API requested: 42000.
	![t600-tps](https://github.com/Mahim-Hasan/Booking-REST-Performance-Testing/assets/77658882/e7a49728-bf88-4f45-af8c-840319667bfe)
	![t600-tbl](https://github.com/Mahim-Hasan/Booking-REST-Performance-Testing/assets/77658882/9e0d4dc2-5a3d-40f7-8845-d163c2838042)

For, 600 Concurrent Requests with 10 Ramp-up Period and 10 Loop Counts; Avg TPS for Total Samples is ~ 370 and Total Concurrent API requested: 42000.
	![t6000-tps](https://github.com/Mahim-Hasan/Booking-REST-Performance-Testing/assets/77658882/95311c9d-251a-4583-b783-821d1db87ac5)
	![t6000-tbl](https://github.com/Mahim-Hasan/Booking-REST-Performance-Testing/assets/77658882/79d445b0-3c4a-4ad4-be0b-0b0aa634c75a)
	![t-6000](https://github.com/Mahim-Hasan/Booking-REST-Performance-Testing/assets/77658882/c2b2dea5-0472-4ec4-8e7c-1ef12d81a388)

### While executed 600 Concurrent Requests with 10 Ramp-up Period and 10 Loop Counts, I found:
1. > 572 requests got "403/Forbidden" message
2. > 503 requests got "404/Not Found" message
3. > 390 requests got "503/Service Unavailable" message
4. > 390 requests got "Non HTTP response code: org.apache.http.NoHttpResponseException/Non HTTP response message: restful-booker.herokuapp.com:443 failed to respond" message
5. > 186 requests got "405/Method Not Allowed" message
6. > Error Rate is 4.86%

![t6000-grp](https://github.com/Mahim-Hasan/Booking-REST-Performance-Testing/assets/77658882/682d3bad-ef6d-41fe-94b5-e00f53edd1aa)


## Summary:
> Server can handle almost concurrent 37000 API calls with almost zero (0)% error rate.
