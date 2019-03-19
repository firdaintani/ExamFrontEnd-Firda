import { combineReducers } from 'redux'
import User from './userGlobal'
// import Product from './userGlobal'
import Cart from './cartGlobal'

export default combineReducers({
    user : User,
    cart : Cart
    // Product : Product
})