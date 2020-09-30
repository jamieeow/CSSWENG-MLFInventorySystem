# CSSWENGGroup4App

Use the code below in the command line to access the application:
```
npm install
node createDatabase.js
```
The code below adds the admin account. However, if you want to start the application with few data, skip this and do addData instead.

```
node addAdmin.js
```

```
node addData.js
```

Run the application with:

```
node server.js
```

Go to localhost:1337/ for the login page.

admin login credentials  
username: admin  
password: pw123

cashier login credentials (Part of addData.js)  

username: 1  
password: pw123  

username: 2  
password: pw123  

username: 3  
password: pw123  

To create a cashier, log in to admin and create an artist. Fill in the artist's name, ID number, and password to create an artist and a cashier. The ID number of the artist will be the username of the cashier.

To delete all the data in the collection, simply type this in the command line:
```
node deleteCollection.js
```