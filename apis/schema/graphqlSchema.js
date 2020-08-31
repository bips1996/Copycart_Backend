const { buildSchema } = require('graphql');

module.exports = buildSchema(`

          input inputName{ 
            firstname:String,
            middlename:String,
            lastname:String
          },

          input inputAddress{
            hostelName:String,
            roomNo:Int
          },

          type Name{ 
            firstname:String,
            middlename:String,
            lastname:String
          },

          type Address{
            hostelName:String,
            roomNo:Int
          },

          input CustomerInput {
            name: inputName!
            email: String!
            password: String!
            contact:String!
            address:inputAddress!
            createdAt:String!
          }

          type Customer{
            _id:ID!
            name:Name!
            email: String!
            password:String
            contact:String!
            address:Address!
            placedOrder:[Order!]!
            createdAt:String
          }
          
          type CustomerAllOrder{
            _id:ID,
            orders:[Order!]!
          }

          input SellerInput{
            name:inputName!
            email:String!
            password:String!
            contact:String!
            createdAt:String
          }

          type Seller{
            _id:ID!
            name:Name!
            email:String!
            password:String
            contact:String!
            addedProducts:[Product!]!
            orderRequested:[Order!]!
            approveOrder:Boolean
            createdAt:String


          }

          type customerAllOrder{
            _id:ID!,
            placedOrder:[Order]!
          }

          type authCustumer{
            userID: ID! ,
            token : String! ,
            tokenExpiration : Int! ,
          }

          input ProductInput{
            category:String!
            brand:String!
            color:String
            size:String
            description:String!
            availability:Boolean!,
            quantity:Int!,
            price:Int!,
            addedBy:ID!
            addedAt:String!
          }

          type Product{
            _id:ID!
            category:String!
            brand:String!
            color:String
            size:String
            description:String!
            availability:Boolean!
            price:Int!
            quantity:Int!
            addedBy:Seller!
            addedAt:String!
          }

          input OrderInput {
            placedBy:ID!
            orderProduct:ID!
            orderStatus:String!
            orderAt:String!
            orderQuantity:Int!
          }

          type Order{
            _id:ID!
            placedBy:Customer!
            orderProduct:Product!
            orderStatus:String!
            orderAt:String!
            orderQuantity:Int!
            subTotal:Int!

          }

          type Queries {
            allCustomer:[Customer!]!
            customerById(id:ID!):[Customer]!
            customerByEmail(email:String!):[Customer]!
            customerAllOrder(id:ID!):[Order!]!
            

            allSeller:[Seller!]!
            sellerById(id:ID!):[Seller!]!
            sellerByEmail(email:String!):[Seller!]!

            allProduct:[Product!]!
            productById(id:ID!):[Product!]!

            allOrder:[Order!]!
            orderById(id:ID!):[Order!]!

            loginUser:(email:String! , password : String!): authCustomer! 
          },

          type Mutations {
              createCustomer(customerInput:CustomerInput): Customer
              createSeller(sellerInput:SellerInput):Seller
              createProduct(productInput:ProductInput):Product
              createOrder(orderInput:OrderInput):Order
          },

          schema {
              query: Queries
              mutation: Mutations
          }
      `);