export const initialState={
    basket:[],
    AllProducts:[],
    User:[],
    purchaseProducts:[],
    DeletedProducts:[],
    sellerProducts:[]
    
};
export const getBasketTotal = (basket) =>
basket?.reduce((amount,item)=>item.price + amount,0);

export const getBasketitemqty = (basket,id) =>
basket?.filter(item=> item.pid ===id ).length;

export const changeBasketitemqty = (basket,id,value) =>{
   var itemlength =  basket?.filter(item=> item.pid ===id ).length;

}





function reducer(state,action){
    console.log(state);
    console.log(action);
   
    switch(action.type){

        case 'FILLING_TO_PRODUCTS':

            return{
                ...state,
                AllProducts:action.products
            }

        case'ADD_TO_BASKET':

            console.log("remove");
            return {
                ...state,
                basket:[...state.basket,action.item]
            };
            

           
            //break;
        case 'REMOVE_FROM_BASKET':
            
            let newbasket = [...state.basket];

            const index = state.basket.findIndex((basketitem)=>basketitem.pid ===action.id);

            if(index >= 0){

                newbasket.splice(index,1);
            }
            else{
                console.warn("something happen wrong");
            }
            
            return {...state,basket:newbasket};


           // break;

        case'CLEAN_BASKET':

            console.log("CLEAN_BASKET");
            return {
                ...state,
                basket:[]
            };



         case'ADD_Deleted_Products':

            console.log("Purchase_Products");

            return{
                ...state,
                DeletedProducts:action.items
            };

        case'ADD_TO_Purchase_Products':

            console.log("Purchase_Products");

            return{
                ...state,
                purchaseProducts:action.items
            };

           

            case 'REMOVE_FROM_Purchase_Products':
            
                let newpurchaseProduct = [...state.purchaseProducts];
                let deletedproduct;
    
                const index2 = state.purchaseProducts.findIndex((purchaseProductitem)=>purchaseProductitem.cartItem.id ===action.id);
    
                if(index2 >= 0){
                    
                    deletedproduct = state.purchaseProducts[index2];
                    state.DeletedProducts = [...state.DeletedProducts,deletedproduct];
                    newpurchaseProduct.splice(index2,1);
                   
                }
                else{
                    console.warn("something happen wrong");
                }
                
                return {...state,
                purchaseProducts:newpurchaseProduct};


         case'ADD_SELLER_ADDED_PRODUCTS':

            console.log("ADD_SELLER_ADDED_PRODUCTS");

            return{
                ...state,
                sellerProducts:action.items
            };
            


            case 'REMOVE_SELLER_PRODUCTS':
            

            console.log("REMOVE_SELLER_PRODUCTS");
                let newSellerProducts = [...state.sellerProducts];
              //  let deletedproduct;
    
                const indexOFdeletedproduct = state.sellerProducts.findIndex((Productitem)=>Productitem.pid ===action.id);

                console.log("REMOVE_SELLER_PRODUCTS indexOFdeletedproduct "+indexOFdeletedproduct); 
    
                if(indexOFdeletedproduct >= 0){
                    
                    //deletedproduct = state.sellerProducts[index2];
                   // state.DeletedProducts = [...state.DeletedProducts,deletedproduct];
                   newSellerProducts.splice(indexOFdeletedproduct,1);
                   
                }
                else{
                    console.log("something happen wrong");
                }
                
                return {...state,
                    sellerProducts:newSellerProducts};

        default:
            return state;

    }
}

export default reducer;

