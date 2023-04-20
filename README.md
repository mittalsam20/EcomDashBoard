# EcomDashBoard

- A regular ecommerce dashboard for CRUD operations on sales

## FEATURES

## TODO

- [x] add authentication to the app
- [x] remove extra buttons, dummy data and search component
- [ ] filters query parmas in url
- [ ] optimistic UI and pagination on scroll

---

- [x] customers card page
- [x] cols:- name, avatar, city state country, phone number, total income, last transaction
- [x] actions:- edit, delete and add to print spool
- [x] create option:- opens modal
- [x] filters:- search, filter and sort

  - [x] multipurpose live search for name, phone number, address string
  - [x] filter
    - [x] state city
  - [ ] sort:- most valued customer && all time 52 weeks, alphabetically, most recent transaction

  ***

  - [x] onCLick opens a checkedList modal of customer with print and cancel button in bottom
  - [x] conditions to add a customer address in print spool
  - [x] once printed then customer will be ejected from spool
  - addedByAdmin || (paymentRecieved && notPrintedEvenOnceAfterReceivingOfPayment)

  ***

- [ ] customer's page
- [ ] details name, address, state, type, cnct number, order history and print button
- [ ] order history will contain amount, payment mode, date imported from transaction/order list page
- [ ] edit delete add to print spool button

  ***

- [x] orders/transaction page
- [x] create button on top open modal with all info and current date but no time
- [x] name date+time amount payment mode status (actions is edit only)
  - [x] status:- noItemsYet notPaid paymentAfter/To be packed To be packed packed dispatched return
- [ ] search sort filter
- search by name amount
- filter by mode status dateRange
- sort by amount date mode status
  ***
  - [ ] Navbar right side and sideBar bottom corner will have settings dropDown Menu with actions
- [x] show print spool button in navbar
- logout
- accounts settings
- [ ] accounts settings
- [ ] edit name emailid reset password
- [ ] setup bank API

- [ ] only product page is visible to customers
