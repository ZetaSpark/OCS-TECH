Used Technologies: HTML, CSS, Express, MongoDB(with mongoose for connecting with Express), Node.js and Embedded JavaScript(EJS).
firstly, initialise npm and install packages such as Express, mongoose and ejs using npm.
Connect mongoose with express and start the server using express.
Then i created a database named OCS, in that a table named users and store the given data in it.
Now to get input from user side, a GET route is created which will create a HTML form with help of index.ejs.
For hashing the real-password, install a package named Crypto-js which internally works on md5 hashing only.
Now, after getting input(userid, real-password) parse it into url body and Search it using POST route.
In POST route, firstly we will check if inputed userid and password is there in database or not, if not then through error.
If input is present in database server, then render the request to one of 2 different ejs based on userid==admin_test or not.
Then the corresponding ejs will show the output in table format.

To check the working go to localhost:8080, after setting up the files and installing above packages.
