const bcrypt = require('bcryptjs');


const Customer = require('../../models/CustomerSchema');
const Seller = require('../../models/SellerSchema');
const Product = require('../../models/ProductSchema');
const Order=require('../../models/OrderSchema');
const { buildSchema } = require('graphql');

const products = async productIds => {
  try {
    const products = await Product.find({ _id: { $in: productIds } });
    products.map(event => {
      return {
        ...event._doc,
        _id: event.id,
        addedAt: new Date(event._doc.addedAt).toISOString(),
        addedBy: seller.bind(this, event.addedBy)
      };
    });
    return products;
  } catch (err) {
    throw err;
  }
};

const seller = async sellerId => {
  try {
    const seller = await Seller.findById(sellerId);
    return {
      ...seller._doc,
      _id: seller.id,
      password:null,
      createdAt:new Date(seller._doc.createdAt).toISOString(),
      addedProducts: products.bind(this, seller._doc.addedProducts)
    };
  } catch (err) {
    throw err;
  }
};

const customer = async customerId => {
  try {
    const customer = await Customer.findById(customerId);
    return {
      ...customer._doc,
      _id: customer.id,
      password:null,
      createdAt:new Date(customer._doc.createdAt).toISOString()
    };
  } catch (err) {
    throw err;
  }
};


module.exports = {
          createOrder: async args => {
            try{
            const productquery = await Product.findOne({ _id: args.orderInput.orderProduct });
            const customerquery = await Customer.findOne({ _id: args.orderInput.placedBy });          
            const order = new Order({
              placedBy: customerquery,
              orderProduct: productquery,
              orderStatus:args.orderInput.orderStatus,
              orderQuantity:args.orderInput.orderQuantity,
              orderAt:new Date(args.orderInput.orderAt)
            });
            order.subTotal = productquery.price * order.orderQuantity;
            const result = await order.save();
            let createdOrder = {
               ...result._doc,
                _id: result._doc._id,
                orderAt:new Date(result._doc.orderAt).toISOString(),
                placedBy:customer.bind(this,result._doc.placedBy),
                orderProduct:{
                  ...result._doc.orderProduct._doc,
                  _id:result._doc.orderProduct.id,
                  addedAt:new Date(result._doc.orderProduct.addedAt).toISOString(),

                }
            }

            const added = result._doc.orderProduct._doc.addedBy;
            const sellerquery = await Seller.findOne({"_id":added});
            if(!sellerquery)
              throw new Error('No such seller found');
            sellerquery.orderRequested.push(order);
            sellerquery.save();

            customerquery.placedOrder.push(order);
            customerquery.save();

            return createdOrder;

          }catch(err){
            throw err;
          }
          },

        allOrder: () => {
          return Order.find().populate('placedBy').populate('orderProduct')
            .then(events => {
              return events.map(result => {
                return {...result._doc,
                  _id: result.id,
                  orderAt:new Date(result._doc.orderAt).toISOString(),
                  placedBy:{
                    ...result._doc.placedBy._doc,
                      _id:result._doc.placedBy.id,
                      password:null,
                      createdAt:new Date(result._doc.placedBy.createdAt).toISOString()
                    
                  },
                  orderProduct:{
                    ...result._doc.orderProduct._doc,
                    _id:result._doc.orderProduct.id,
                    addedAt:new Date(result._doc.orderProduct.addedAt).toISOString(),
  
                  } 
                };
              });
            })
            .catch(err => {
              throw err;
            });
        },

        orderById: ({id}) => {
          return Order.find({"_id":id}).populate('placedBy').populate('orderProduct')
            .then(events => {
              return events.map(result => {
                return { 
                  ...result._doc,
                  _id: result.id,
                  orderAt:new Date(result._doc.orderAt).toISOString(),
                  placedBy:{
                    ...result._doc.placedBy._doc,
                      _id:result._doc.placedBy.id,
                      password:null,
                      createdAt:new Date(result._doc.placedBy.createdAt).toISOString(),
                      
                    
                  },
                  orderProduct:{
                    ...result._doc.orderProduct._doc,
                    _id:result._doc.orderProduct.id,
                    addedAt:new Date(result._doc.orderProduct.addedAt).toISOString(),
  
                  }
                };
              });
            })
            .catch(err => {
              throw err;
            });
        },
        
        //Product Resolver
        createProduct:async args => {
          try{
          const sellerquery = await Seller.findOne({ _id: args.productInput.addedBy });
          const event = new Product({
            category:args.productInput.category,
            brand:args.productInput.brand,
            color:args.productInput.color,
            size:args.productInput.size,
            description:args.productInput.description,
            availability:args.productInput.availability,
            price:args.productInput.price,
            quantity:args.productInput.quantity,
            addedBy:args.productInput.addedBy,
            addedAt:new Date(args.productInput.addedAt)
          });
          const result = await event.save();
          let createdProduct= { 
            ...result._doc, 
            _id: result._doc._id,
            addedAt:new Date(result._doc.addedAt).toISOString(),
            addedBy:seller.bind(this,result._doc.addedBy)
          };
          sellerquery.addedProducts.push(event);
          await sellerquery.save();
          return createdProduct;
        }catch(err){
          throw err;
        }
        
        },

        allProduct: () => {
          return Product.find()
            .then(events => {
              return events.map(event => {
                return {
                   ...event._doc,
                   _id: event.id,
                   addedAt:new Date(event._doc.addedAt).toISOString(),
                   addedBy:seller.bind(this,event._doc.addedBy)
                   };
              });
            })
            .catch(err => {
              throw err;
            });
        },

        productById: ({id}) => {
          return Product.find({"_id":id})
            .then(events => {
              return events.map(event => {
                return { ...event._doc,
                   _id: event.id,
                   addedAt:new Date(event._doc.addedAt).toISOString(),
                   addedBy:seller.bind(this,event._doc.addedBy)
                   };
              });
            })
            .catch(err => {
              throw err;
            });
        },


        //Seller Resolver
        createSeller: (args) =>{
          return Seller.findOne({email:args.sellerInput.email})
          .then(seller =>{
            if(seller){
              throw new Error("Seller already exists");
            }
            return bcrypt.hash(args.sellerInput.password, 12);
            })
            .then(hashedPassword => {
                const seller = new Seller({
                name: args.sellerInput.name,
                email: args.sellerInput.email,
                password: hashedPassword,
                contact:args.sellerInput.contact,
                createdAt:new Date(args.sellerInput.createdAt)
                
              });
              return seller.save();
            })
            .then(result => {
              return { ...result._doc, 
                password: null,
                 _id: result.id,
                 createdAt:new Date(result._doc.createdAt).toISOString()

                };
            })
            .catch(err => {
              throw err;
            });
        },    
        allSeller: () => {
          return Seller.find().populate('addedProduct')
            .then(events => {
              return events.map(event => {
                return { 
                  ...event._doc,
                  password:null,_id:event.id,
                  createdAt:new Date(event._doc.createdAt).toISOString(),
                  
                };
              });
            })
            .catch(err => {
              throw err;
            });
        },
        sellerById: ({id}) => {
          return Seller.find({"_id":id})
            .then(events => {
              return events.map(event => {
                return { ...event._doc,password:null,_id:event.id,createdAt:new Date(event._doc.createdAt).toISOString()};
              });
            })
            .catch(err => {
              throw err;
            });
        },

        sellerByEmail: ({email}) => {
          return Seller.find({"email":email})
            .then(events => {
              return events.map(event => {
                return { ...event._doc,password:null,_id:event.id,createdAt:new Date(event._doc.createdAt).toISOString()};
              });
            })
            .catch(err => {
              throw err;
            });
        },

          
        


        //Users Resolver
         allCustomer: () => {
           return Customer.find()
             .then(events => {
               return events.map(event => {
                 return { 
                   ...event._doc,
                   password:null,
                   _id:event.id,
                   createdAt:new Date(event._doc.createdAt).toISOString(),
                }
               });
             })
             .catch(err => {
               throw err;
             });
         },
         customerByEmail: ({email}) => {
          return Customer.find({"email" :email}).populate('placedOrder')
            .then(events => {
              return events.map(event => {
                return { ...event._doc,
                  password:null,
                  _id:event.id,
                  createdAt:new Date(event._doc.createdAt).toISOString(),
                  placedOrder:{
                    ...event._doc.placedOrder._doc,
                    _id:event._doc.placedOrder.id
                  }
                };
              });
            })
            .catch(err => {
              throw err;
            });
        },
        customerById: ({id}) => {
          return Customer.find({"_id":id})
            .then(events => {
              return events.map(event => {
                return { ...event._doc,
                  password:null,
                  _id:event.id,
                  createdAt:new Date(event._doc.createdAt).toISOString()
                };
              });
            })
            .catch(err => {
              throw err;
            });
        },
        
         
         customerAllOrder:({id}) =>{
           return Order.find({"placedBy":id})
           .then(events => {
            return events.map(result => {
              return { 
                ...result._doc,
                  _id: result._doc._id,
                  orderAt:new Date(result._doc.orderAt).toISOString(),
                  placedBy:customer.bind(this,result._doc.placedBy),
                  orderProduct:{
                    ...result._doc.orderProduct._doc,
                    _id:result._doc.orderProduct._id,
                    // addedAt:new Date(result._doc.orderProduct.addedAt).toISOString(),
  
                  }
              };
            });
          })
          .catch(err => {
            throw err;
          });
         },

       
        
        // ordersbyUser:({user_id}) =>{
        //   return Order.find({"placedBy":user_id})
        //     .then(events => {
        //       return events.map(event => {
        //         return { ...event._doc};
        //       });
        //     })
        //     .catch(err => {
        //       throw err;
        //     });
        // },


        createCustomer: args => {
          return Customer.findOne({ email: args.customerInput.email })
            .then(customer => {
              if (customer) {
                throw new Error('Customer exists already.');
              }
              return bcrypt.hash(args.customerInput.password, 12);
            })
            .then(hashedPassword => {
              const customer = new Customer({
                name: args.customerInput.name,
                email: args.customerInput.email,
                password: hashedPassword,
                contact:args.customerInput.contact,
                address: args.customerInput.address,
                createdAt:new Date(args.customerInput.createdAt)
                
              });
              return customer.save();
            })
            .then(result => {
              return { ...result._doc, 
                password: null, 
                _id: result.id,
                createdAt:new Date(result._doc.createdAt).toISOString()};
            })
            .catch(err => {
              throw err;
            });
        }
      
};