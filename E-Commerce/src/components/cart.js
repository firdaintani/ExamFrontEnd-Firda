import React from 'react'
import {connect} from 'react-redux'
import Axios from 'axios'
import {urlApi} from '../support/urlApi'
import cookie from 'universal-cookie'
import {deleteCartItem,updateCart,payCart} from '../1.actions'
import swal from 'sweetalert';
// import {Table} from 'reactstrap'

const objCookie = new cookie()
class CartBs extends React.Component{
    state={cart:[],selectedEdit : -1,qty:0,deleteTemp:[]}
    componentDidMount(){
        this.getDataApi()
        this.getDeleteTemp()
        // this.setState({cart:this.props.cart})
        

    }
    getDataApi=()=>{
        Axios.get(urlApi+'/cart?id_user='+objCookie.get('userDataCart'))
        .then((res)=>{
            this.setState({cart:res.data})
        })
        .catch((err)=>console.log)
    }

    componentWillReceiveProps(newProps){
     
        this.setState({cart:newProps.cart})

        
    }

    calculateTotal=()=>{
        var total = 0
        for(var i=0;i<this.state.cart.length;i++){
            if(this.state.cart[i].discount>0){
                total+=((this.state.cart[i].harga - (this.state.cart[i].harga*(this.state.cart[i].discount/100)))*this.state.cart[i].qty)
            }else{
                total+=this.state.cart[i].harga*this.state.cart[i].qty
            }
        }
      
        return total
    }


    
    kurang=()=>{
        if(this.state.qty>1){

            this.setState({qty:this.state.qty-1})
        }
    }
    tambah=()=>{
        this.setState({qty:this.state.qty+1})
     
    }

    saveBtn=(val)=>{
        var newObject = {...val, qty:this.state.qty}
        this.props.updateCart(newObject)
        this.setState({selectedEdit:-1})

    }
    handleEditBtn=(id,qty)=>{
        this.setState({selectedEdit: id, qty: qty})
    }
 
    handleDeleteBtn=(val)=>{
        

        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this product data!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
     
            if (willDelete) {
                var newObj={...val, id_cart:val.id}
                delete newObj.id
                Axios.post(urlApi+'/deleteTemp',newObj)
                .then((res)=>{
                    this.getDeleteTemp()
                }
                    
                )
                swal("Poof! Product has been deleted!", {
                icon: "success",
              });
              this.props.deleteCartItem(val.id)  
            
               
            
            } else {
              swal("Your product is safe!");
            }
          });
       }

    cancelBtn=()=>{
        this.setState({selectedEdit:-1})
    }
    getDataCart=()=>{
        
      
        this.state.cart.map((val)=>{})

        var cartData= this.state.cart.map((val)=>{
            
            if(this.state.selectedEdit===val.id){
                return(
                    <tr>
                   
                    <td><img width={'50px'} src={val.img}></img></td>
                    <td>{val.nama}</td>
                    <td>
                    { val.discount>0 ? 
                       <p style={{textDecoration:'line-through',color:'red', display:'inline'}}>Rp.{val.harga}</p>
                        : null
                    }
                    <p style={{display:'inline',marginLeft:'10px',fontWeight:500}}>Rp. {val.harga * ((100-val.discount)/100)}</p>
                        
                    </td>
                    <td><input type="button" value='-' onClick={this.kurang}></input>
                <span style={{margin:'0 40px'}}>{this.state.qty}</span>
                <input type="button" value='+' onClick={this.tambah}></input>
</td>
                    {val.discount>0?
                        <td>{(val.harga * ((100-val.discount)/100))*val.qty}</td>
            
                        :
                        <td>{val.harga*val.qty}</td>
                    }
                    <td>
                        <input type='button' className='btn btn-success' value='Save' onClick={()=>this.saveBtn(val)} />
                        <input type='button' className='btn btn-danger' value='Cancel' onClick={this.cancelBtn} />
                    </td>
                </tr>
                )
               
            }
            // alert('isi'+val.nama)
            return (
                
                <tr>
                   
                <td><img width={'50px'} src={val.img}></img></td>
                <td>{val.nama}</td>
                <td>
                { val.discount>0 ? 
                   <p style={{textDecoration:'line-through',color:'red', display:'inline'}}>Rp.{val.harga}</p>
                    : null
                }
                <p style={{display:'inline',marginLeft:'10px',fontWeight:500}}>Rp. {val.harga * ((100-val.discount)/100)}</p>
                    
                </td>
                <td>{val.qty}</td>
                {val.discount>0?
                    <td>{(val.harga * ((100-val.discount)/100))*val.qty}</td>
        
                    :
                    <td>{val.harga*val.qty}</td>
                }
                <td>
                    <input type='button' className='btn btn-success' value='Edit' onClick={()=>this.handleEditBtn(val.id,val.qty)} />
                    <input type='button' className='btn btn-danger' value='Delete' onClick={()=>this.handleDeleteBtn(val)} />
                </td>
            </tr>
                
            )
        // }
        })
    
        return cartData  
   
    
     
}
getDeleteTemp=()=>{
    Axios.get(urlApi+'/deleteTemp?id_user='+objCookie.get('userDataCart'))
    .then((res)=>this.setState({deleteTemp:res.data}))
    .catch((err)=>console.log(err))
}

undoDelete=()=>{
    // this.getDeleteTemp()
    for(var i=0;i<this.state.deleteTemp.length;i++){
        var newObj = {...this.state.deleteTemp[i]}
        delete newObj.id_cart
        delete newObj.id
        Axios.post(urlApi+'/cart',newObj)
        .then((res)=>console.log(res))
        .catch((err)=>console.log(err))

        Axios.delete(urlApi+'/deleteTemp/'+this.state.deleteTemp[i].id)
        .then((res)=>{
            this.getDeleteTemp()
            this.getDataApi()
        }
        )
        .catch((err)=>console.log(err))

    }
    // this.getDeleteTemp()
}


    btnPay=()=>{
        for(var i=0;i<this.state.deleteTemp.length;i++){
          
            var newObj = {...this.state.deleteTemp[i]}
            delete newObj.id_cart
            delete newObj.id
            // Axios.post(urlApi+'/cart',newObj)
            Axios.delete(urlApi+'/deleteTemp/'+this.state.deleteTemp[i].id)
        }
        
        
        
        var total= this.calculateTotal()
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth(); //January is 0!
        var yyyy = today.getFullYear();

        var month=['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember']
        var tanggal = dd+' '+month[mm]+' '+yyyy+' '+today.getHours()+':'+today.getMinutes()
      

        var newArr=[]
        for(var i=0;i<this.state.cart.length;i++){
            var newObj={...this.state.cart[i], id_transaksi: this.state.cart[i].id}
            delete newObj.id
            delete newObj.id_user
            newArr.push(newObj)
           
            Axios.delete(urlApi+'/cart/'+this.state.cart[i].id)
            .then((res)=>this.getDataApi())
            // .catch((err)=>alert('gagal'))
        }
        this.getDataApi()
        
        var ObjBaru = {id_user : this.state.cart[0].id_user, tanggal: tanggal, item:newArr,totalBayar:total}
        Axios.post(urlApi+'/history',ObjBaru)
        .then((res)=>{
            swal('success','pay success', 'success')
        })
        .catch((err)=>console.log(err))

        this.props.payCart()
        
    }


    render(){
        return (
            <div className='container'>
            { this.state.deleteTemp.length>0?
            <input type='button' value='Undo Delete' className='btn btn-primary' onClick={this.undoDelete}></input>
            : null
            }   
            {this.state.cart.length>0 ?
                <table className='table'>
                    <thead>
                    <tr>
                    <th colSpan={2}>Produk</th>
                        <th>Harga Satuan</th>
                        <th>Kuantitas</th>
                        <th>Total Harga</th>
                        <th>Aksi</th>

                    </tr>
                    </thead>
                    <tbody>
                   
                {this.getDataCart()}
               
                            {/* {this.calculateTotal()} */}
          
                         <tr>
                            <td colSpan={4} style={{textAlign:"right"}}>Total</td>
                            <td>{this.calculateTotal()}</td>
                            <td> <input type='button' className='btn btn-danger' value="Pay" onClick={this.btnPay}/></td>
                        </tr>
                          
                      

                    </tbody>
                </table>
                  :
                  <h2>Data Cart Kosong</h2>}
            </div>
        
        )
    }
}
const mapStateToProps=(state)=>{
    return {
        id : state.user.id,
        cart : state.cart.cart
    }
}
export default connect(mapStateToProps,{deleteCartItem,updateCart,payCart})(CartBs)