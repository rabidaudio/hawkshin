Parse.Cloud.define("meow", function(request, response) {
  response.success("meow!");
});

Parse.Cloud.define("nextproduct", function(request, response) {
  //take in current_user id request.uid
  var User = Parse.Object.extend("User");
  var user = new User();
  user.id = request.uid;
  response.success(user);
  
  
  var Product = Parse.Object.extend("Product");
  var query = new Parse.Query(Product);
  var total=0;
  
  query.count({
      success: function(number) {
        total=number;
        //response.success(total);
      },

      error: function(error) {
        // error is an instance of Parse.Error.
        response.error(error);
      }
  });
  var product;
  query.find({
    success: function(results) {
      var r = Math.floor((Math.random()*total)); //TODO replace with good stuff
      product = results[r];
      //response.success(product);
    },
    error: function(error) {
      response.error(error);
      return;
    }
  });
  //then update the log of viewers
  var UserProduct = Parse.Object.extend("user_product");
  var uplog = new UserProduct;
  uplog.set("product", product);
  uplog.set("user", user);
  uplog.set("bid", false); //we will set this to true on our bid call
  uplog.save();
});

Parse.Cloud.define("bid", function(request, response){
    var User = Parse.Object.extend("User");
    var qu = new Parse.Query(User);
    var user;
    qu.get(request.body.userId, {
         success: function(r){
             user = r.result;
             response.success(user);
         },
         error: function(object, error){
             response.error(error);
             //return;
         }
     });


    //now we have both user and product. we need to update product's price and high bidder
    /*product.set("highBidder", user);
    product.set("currentBid", product.get("currentBid")+1);//all bids $1
    product.save();
    //and finally, we need to update user_product to show that the user bid on the item
    var UserProduct = Parse.Object.extend("user_product");
    var query = new Parse.Query(UserProduct);
    query.equalTo("user", user);
    query.equalTo("product",product);
    query.descending("createdAt");
    query.limit(1);
    var userproduct = {};
    query.find({
        success: function(results) {
            userproduct = results[0];
         },
         error: function(error) {
            response.error(error);
            return;
        }
    });
    userproduct.set("bid", true); //they bid on this one
    userproduct.save();*/
    //response.success(1);
});






/***CANT DO IT THIS WAY. GOTTA DO IT ON THE CLIENT**/
//Parse.Cloud.define("charge", function(request, response){
//    var TransactionHistory = Parse.Object.extend("TransactionHistory");
//    var transactionHistory = new TransactionHistory();
//    transactionHistory.set("info", JSON.stringify(request));
//    
//    Stripe.Charges.create({
//      amount: 100 * response.cost, // $10 expressed in cents
//      currency: "usd",
//      card: {
//        number: request.number,
//        exp_month: request.exp_month,
//        exp_year: request.exp_year,
//        cvc: request.exp_cvc,
//        name: request.name,
//        address_zip: request.address_zip
//        //and so on
//      },
//      //application_fee: //take a cut
//      description: request.productId
//    },{
//      success: function(httpResponse) {
//        response.success("Transaction successful");
//        transactionHistory.set("success", true);
//      },
//      error: function(httpResponse) {
//        response.error(httpResponse);
//        transactionHistory.set("success", false);
//      }
//    });
//    transactionHistory.save(null, {
//      success: function(transactionHistory) {
//        // Execute any logic that should take place after the object is saved.
//      },
//      error: function(transactionHistory, error) {
//        //  Execute any logic that should take place if the save fails.
//        // error is a Parse.Error with an error code and description.
//        response.error(error.description);
//      }
//    });
//});

