const INITIAL_STATE={cart:[]}

export default (state=INITIAL_STATE,action)=>{
    if(action.type==='CART_SAVE'){
        return{...INITIAL_STATE, cart: action.payload}
    }else if(action.type==='CART_EMPTY'){
        return INITIAL_STATE
    }
    else {
    return state
}
}