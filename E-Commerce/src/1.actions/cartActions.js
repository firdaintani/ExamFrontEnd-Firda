// import axios from 'axios'
import {urlApi} from '../support/urlApi'
import Axios from 'axios';
import cookie from 'universal-cookie'
import swal from 'sweetalert'

var objCookie= new cookie()
export const addToCart=(newProduct)=>{
   return (dispatch)=>{
    Axios.get(urlApi+'/cart?id_user='+newProduct.id_user+'&id_product='+newProduct.id_product)
    .then((res)=>{
        console.log(res)
        if(res.data.length>0){
           var quantity = res.data[0].qty+newProduct.qty
            Axios.put(urlApi+'/cart/'+res.data[0].id,{...newProduct,qty:quantity})
            .then((res)=>{
                swal("Done!", "Telah dimasukkan ke keranjang", "success")
                Axios.get(urlApi+'/cart?id_user='+newProduct.id_user)
                .then((res)=>{
                    if(res.data.length>0){
                        dispatch({
                            type:'CART_SAVE',
                            payload : res.data
                        })
            
                    }
                })
                .catch((err)=>console.log(err))
                // objCookie.set('userDataCart',newProduct.id_user,{path:'/'})
            })
            .catch((err)=>{
                console.log(err)
            })

        }
        else {
            Axios.post(urlApi+'/cart', newProduct)
            .then((res)=>{
                Axios.get(urlApi+'/cart?id_user='+newProduct.id_user)
                .then((res)=>{
                    swal("Done!", "Telah dimasukkan ke keranjang", "success")
                    if(res.data.length>0){
                        dispatch({
                            type:'CART_SAVE',
                            payload : res.data
                        })
            
                    }
                })
                .catch((err)=>console.log(err))  
                // objCookie.set('userDataCart',newProduct.id_user,{path:'/'})      
            })
            .catch((err)=>console.log(err))
        }
    })
}

}

export const keepCart=(id_user)=>{
    return (dispatch)=>{
        
        Axios.get(urlApi+'/cart?id_user='+id_user)
        .then((res)=>{
          
            if(res.data.length>0){

                dispatch({
                    type:'CART_SAVE',
                    payload: res.data
                })
            }
        })
        .catch((err)=> {console.log(err)
       })
    }
}


export const deleteCartItem=(id)=>{
    var id_user = objCookie.get('userDataCart')
    return(dispatch)=>{
        Axios.delete(urlApi+'/cart/'+ id)
        .then((res)=> {
        Axios.get(urlApi+'/cart?id_user='+id_user)
        .then((res)=>{
           

            if(res.data.length>0){
               
                dispatch({
                    type:'CART_SAVE',
                    payload: res.data
                })
            }
            else{
                dispatch({
                    type:'CART_EMPTY'
                })
            }
        })
        .catch((err)=> {console.log(err)
       })   
        })
    }
}

export const updateCart=(data)=>{
    return (dispatch)=>{
        Axios.put(urlApi+'/cart/'+data.id, data)
        .then((res)=>{
            Axios.get(urlApi+'/cart?id_user='+data.id_user)
        .then((res)=>{
          
            if(res.data.length>0){
               
                dispatch({
                    type:'CART_SAVE',
                    payload: res.data
                })
            }
        })
        .catch((err)=> {console.log(err)
       })
        })
        .catch((err)=> {console.log(err)
        })
    }
}


export const payCart=()=>{
    return {
        type: 'CART_EMPTY'
    }
}