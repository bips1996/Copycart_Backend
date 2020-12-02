# COPYCART

Copycart is an e-Commerce application intended to University students where they can take benefits of selling/buying stationary materials as per their convenience.

### Follow the steps to have this repository into your system:
1.  ### Download the repository
    Clone repository using the link:
    #### https://github.com/bips1996/Copycart_Backend.git

2. ### Connect to the Database
    > login into your MongoDB Atlas account 
    
    > Deploy a Free Tier Cluster named CopyCart (or anything you want to)
    
    > Whitelist Your Connection IP Address
    
    > Create a Database User for Your Cluster
    
    > Connect to Your Cluster using connection URL, it seems something like this:
      
      `mongodb+srv://<username>:<password>@clustername.mongodb.net/<dbname>?retryWrites=true&w=majority&useNewUrlParser=true&useUnifiedTopology=true`
	
      Replace `<username>`,`<password>`,`<dbname>` with your username, password 
      and Database name.

	#### Don’t have an account? You can follow the given link to do the above procedure:
	#### https://docs.atlas.mongodb.com/getting-started/
              
-  Copy the connection URL and replace it in app.js file inside   
    mongoose.connect()


3.  ## Install Dependencies
-  cd into the directory 
	#### cd COPYCART_BACKEND

-    You need to install all packages used which is mentioned in `package.json` file using command:
        #### npm install
4. ## Start the Server 
-    start your graphql-express server using the command :
        #### nodemon app.js

-  Open your web Browser at http://localhost:8000
-  Test all the graphql Queries and mutations at 
    #### http://localhost:8000/graphiql

