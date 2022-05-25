import React,{createContext, useContext, useReducer} from 'react';

const CartContext = createContext({
    items:[],
    totalAmount: 0,
    addItem: (item) => {},
    removeItem: (item) => {},
    resetCart: () => {}
})

export const useCart = () => useContext(CartContext);

const defaultCart = {
    items: [],
    totalAmount: 0
}

const cartReducer = (state,action) => {
   
    if(action.type === 'ADD'){
        const newAmount = state.totalAmount + action.item.price * action.item.amount;
        const isExisting = state.items.findIndex(item => item.id === action.item.id);
        let newItems =  [...state.items];

        if(isExisting !== -1){
            
            const existingItem = {...state.items[isExisting]};
            existingItem.amount = existingItem.amount+action.item.amount
            newItems[isExisting] = existingItem;

        }else {

            newItems = state.items.concat(action.item);
        }
        return {
            items: newItems,
            totalAmount: newAmount
        }
    }else if(action.type === 'REMOVE'){
        const newAmount = state.totalAmount - action.item.price;
        const index = state.items.findIndex(item => item.id === action.item.id);

        let newItems = [...state.items];
        const updatedItem = {...newItems[index]};

        updatedItem.amount =  updatedItem.amount - 1

        
        if(updatedItem.amount>0){
            newItems[index] = updatedItem;
        }else {
            newItems = state.items.filter(item => item.id!==action.item.id);
        }

        return {
            items: newItems,
            totalAmount: newAmount
        }

    }else {

        return defaultCart
    }
}

const CartProvider = (props) => {

    const [cartState,dispatchCart] = useReducer(cartReducer,defaultCart);

    const handleAddItem = item => {
        dispatchCart({type:'ADD',item})
    };

    const handleRemoveItem = item => {
        dispatchCart({type:'REMOVE',item})
    };

    const handleClearItem = () => {
        dispatchCart({type:'CLEAR'})
    }

    const context = {
        items:cartState.items,
        totalAmount:cartState.totalAmount,
        addItem: handleAddItem,
        removeItem: handleRemoveItem,
        resetCart: handleClearItem,

    }
    return (
       <CartContext.Provider value={context} >
           {props.children}
       </CartContext.Provider>
    );
}

export default CartProvider;

