# webapp

# **Prerequisites**:  
NodeJs, VS Code, Postman, MYSQL

# **Scripts to Run:**
 npm i - To Install the dependencies.
 npm start - To start the application.
 npm test - To run the test cases.

Testing for review

# **Git Commands**
git clone sshkey
git branch
git pull origin main
git checkout -b branchname
git status
git add .
git status
git commit -m”message”
git push origin branchname

To go to main:
git checkout origin main


# **To open mysql:**
mysql -u root -p

show databases;
use webapp;
select * from Users;
select * from products;

# **Port:**
http://localhost:3000/v1/user
http://localhost:3000/v1/product

# **Requirements & Description:**
All API request/response payloads should be in JSON.
All API calls to return with a proper HTTP status code.
web application supports Token-Based authentication and not Session Authentication Links.
Provided a basic Links to an external site. authentication Links to an external site. token when making an API call to the authenticated endpoint.
Created an account by providing the information such as Email Address, Password, First Name, Last Name
Users are allowed to set values for account_created and account_updated.
Password is not returned in the response payload. Used email address as my username.
Application returned 400 Bad Request HTTP response code when a user account with the email address already exists.
Password is stored securely using the BCrypt password hashing scheme Links to an external site. with salt Links to an external site.
Allowed to update the information such as First Name, Last Name, Password.
Any user can add a product.
Product quantity cannot be less than 0.
Only the user who added the product can update the product.
Users can use either the PATCH or PUT API for updates.
Only the user who added the product can delete the product.



