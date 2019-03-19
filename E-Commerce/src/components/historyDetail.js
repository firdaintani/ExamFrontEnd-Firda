import React from 'react'
import Axios from 'axios';
import { urlApi } from '../support/urlApi';

class HistoryDetail extends React.Component{
    state={product : []}
    
    componentDidMount(){
        this.getDataProductHistory()
    }

    getDataProductHistory=()=>{
        var id=this.props.match.params.id
        Axios.get(urlApi+'/history/'+id)
        .then((res)=>
        this.setState({product : res.data.item}))
    }

    getData=()=>{
    //   var {item} = this.state.product.item
        var data = this.state.product.map((val)=>{
            return (
                <tr>
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
                        <td>Rp. {(val.harga * ((100-val.discount)/100))*val.qty}</td>
            
                        :
                        <td>Rp. {val.harga*val.qty}</td>
                    }
                </tr>
            )
        })
        return data
    // alert(this.state.product.item.length)
      
    }


    render(){
        return (
            <div className='container'>
            <table className='table'>
                <thead>
                <tr>
                    <th>Nama</th>
                    <th>Harga</th>
                    <th>Qty</th>
                    <th>Total</th>
                   
                </tr>
                </thead>
                <tbody>
                    {this.getData()}
                    {/* <input type='button' onClick={this.getData}></input> */}
                </tbody>
            </table>
          
        </div>

        )
    }
}

export default HistoryDetail