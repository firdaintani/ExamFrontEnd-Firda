import React from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import { urlApi } from './../support/urlApi'
import './../support/css/product.css'
import{connect} from 'react-redux'
import {addToCart} from '../1.actions'
import swal from 'sweetalert'

class ProductList extends React.Component{
    state = {listProduct : []}

    componentDidMount(){
        this.getDataProduct()
    }
    getDataProduct = () => {
        axios.get(urlApi + '/products')
        .then((res) => this.setState({listProduct : res.data}))
        .catch((err) => console.log(err))
    }

    addToCart=(val)=>{
        // alert('masuk')
        var qty = 1
        // var note = this.refs.note.value
        if(isNaN(qty)===true ){
            swal('Warning',"Jumlah barang harus diisi","warning")
        }
        
    else{
        var newObj={}

        newObj={...val, id_product:val.id,id_user : this.props.id, qty:qty }
        delete newObj.id
        delete newObj.deskripsi
        delete newObj.category
        
        this.props.addToCart(newObj)

    }
        
    }
    renderProdukJsx = () => {
        var jsx = this.state.listProduct.map((val) => {
            return (
                <div className="card col-md-3 mr-5 mt-3" style={{width: '18rem'}}>
                    <Link to={'/product-detail/' + val.id}><img className="card-img-top img" height='200px' src={val.img} alt="Card" /></Link>
                    
                    {/* { Pake if ternary (karena melakukan pengkondisian di dalam return)} */}


                    {   
                        val.discount > 0 ?
                        <div className='discount'>{val.discount}%</div>
                        : null
                    }
                    <div className="card-body">
                    <h4 className="card-text">{val.nama}</h4>

                    {
                        val.discount > 0 ?
                        <p className="card-text" style={{textDecoration:'line-through',color:'red',display:'inline'}}>Rp. {val.harga}</p>
                        : null
                    }

                    <p style={{display:'inline' , marginLeft:'10px',fontWeight:'500'}}>Rp. {val.harga - (val.harga*(val.discount/100))}</p>
                    <input type='button' className='d-block btn btn-primary' value='Add To Cart' onClick={()=>this.addToCart(val)}  />
                    </div>
                </div>
            )
        })

        return jsx
    }
    render(){
        return(
            <div className='container'>
                <div className='row justify-content-center'>
                {this.renderProdukJsx()}
                </div>
            </div>
        )
    }
}

const mapStateToProps=(state)=>{
    return {
        id: state.user.id
    }
}


export default connect(mapStateToProps,{addToCart})(ProductList)



// var a = 3
// if(a > 0){
//     console.log('besar')
// }else if(a < 0) {
//     console.log('kecil')
// }else {
//     console.log('sedang')
// }   

// a > 0 ? console.log('besar') : a < 0 ? console.log('kecil') : console.log('sedang')