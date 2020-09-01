
//var url = "http://jewel.jewelmarts.in/webservices/"

var url  = "http://skychain.jewelmarts.in/webservices/"

export const urls = {
    //baseUrl: "http://jewel.jewelmarts.in/webservices/",

    baseUrl: "http://skychain.jewelmarts.in/webservices/",
    
  imageUrl: "http://jewel.jewelmarts.in/",
 //imageUrl: "http://skychain.jewelmarts.in/",


    Login: {
        url: url + "User_registration/userLogin",
    },
    SendOtp: {
        url: url + "User_registration/send_otp",
    },
   //change_password  or FP
    ChangePassword: {
        url: url + "User_registration/change_password",
    },
    Register:{
        url: url + "User_registration",
    },
    HomePage:{
        url: url + "Home"
    },
    ProductGrid:{
        url: url + "Products_Grid"
    },
    
    AddToCartFromDetails:{
        url: url + 'Product_Cart/add_to_cart'
    },
    TotalCartCount:{
        url: url + 'Product_Cart/cart_value_count'
    },
    CartData:{
        url : url + 'Product_Cart/get_cart_data'
    },
    addToCartWishlist:{
        url : url + 'Product_Cart/add_to_cart_grid'
    },
    sortByParams:{
        url : url + 'Sort_Parameter'
    },
    FilterParams:{
        url : url + 'Filter_Parameter'
    },
    ProductDetails:{
        url : url + 'Product_Details'
    },
    addToCartGridAdd:{
        url : url + 'Product_Cart/add_to_cart_grid_add'
    },
    OrderHistory:{
        url : url + 'Order_history'
    },
    OrderHistoryDetail:{
        url: url + "Order_history/order_details"
    },
    ReOrder:{
        url:  url + 'Order_history/re_order'
    },
    DeleteFromCartWishList:{
        url:  url + 'Product_Cart/delete_cart_product'
    },
    MoveProduct:{
        url:  url + 'Product_Cart/move_products'
    },       

    ClearCartWishlistData:{
        url:  url + 'Product_Cart/clear_cart_data'
    },       
    
    EditCartProduct:{
        url:  url + 'Product_Cart/cart_change'
    },       
    
    PlaceOrderFromCart:{
        url:  url + 'Order'
    },       
    
    CustomizeOrder:{
        url:  url + 'Customized_Order'
    },       
    
    
}
