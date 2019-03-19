import React from 'react'
import Axios from 'axios';
import { urlApi } from '../support/urlApi';
import cookie from 'universal-cookie'
import {connect} from 'react-redux'
import PageNotFound from './pageNotFound'

const objCookie = new cookie()
class History extends React.Component{
    state={history : [], isDetail:false, detailHistory:[]}

    componentDidMount(){
        this.getDataHistory()
    }

    getDataHistory=()=>{
        var id = objCookie.get('userDataCart')
        Axios.get(urlApi+'/history?id_user='+id)
        .then((res)=>{
            this.setState({history:res.data})
            // alert('masuk')
        })
        .catch((err)=>console.log(err))
    }

    detailHistory=(item)=>{
        this.setState({detailHistory:item, isDetail:true})
    }

    renderDetail=()=>{
        var detail = this.state.detailHistory.map((val,index)=>{
            return (
                <tr>
               
                <td>{index+1}</td>
                <td>{val.nama}</td>
                <td>Rp. {val.harga * ((100-val.discount)/100)}</td>
                { val.discount===0? <td>-</td> :
                <td>{val.discount}</td>
                }
                <td>{val.qty}</td>
                <td>Rp. {(val.harga * ((100-val.discount)/100))*val.qty}</td>
                </tr>
            )
        })
        return detail
    }
    renderDataHistory=()=>{
     

        var data=this.state.history.map((val,index)=>{
            return(
                <tr>
                    {/* <td>haha</td> */}
                    <td>{index+1}</td>
                    <td>{val.tanggal}</td>
                    <td>{val.item.length}</td>
                    <td>Rp. {val.totalBayar}</td>
                    <td><input type='button' className='btn btn-primary' value="Detail" onClick={()=>this.detailHistory(val.item)}></input></td>
                </tr>
            )
        })
        return data

    }

    closeDetail=()=>{
        this.setState({detailHistory:[], isDetail:false})
    }
    render(){
        if(this.props.username!==''){
        return (
            
            <div className='container'>
            { this.state.history.length>0?
                <table className='table'>
                    <thead>
                    <tr>
                        <th>No</th>
                        <th>Tanggal</th>
                        <th>Jumlah Item</th>
                        <th>Total</th>
                        <th></th>

                    </tr>
                    </thead>
                    <tbody>
                   {/* <input type='button' onClick={this.renderDataHistory}></input> */}
                {this.renderDataHistory()}
                {/* <tr><td>hhh</td></tr> */}
                    {/* {this.state.history.item.length} */}
                    </tbody>
                </table>

                :
                <div><h1>Data History Kosong</h1></div>
             } 
        { this.state.isDetail ?
             <div style={{marginTop:'100px'}}>
                 <table className='table'>
                 <thead>
                    <tr>
                        <th>No</th>
                        <th>Nama</th>
                        <th>Harga</th>
                        <th>Diskon</th>
                        <th>Qty</th>
                        <th>Total</th>

                    </tr>
                    </thead>
                    <tbody>
                        {this.renderDetail()}
                    </tbody>
                 </table>
                 <input type='button' className='btn btn-primary' value='close' onClick={this.closeDetail}></input>
             </div>
             : null
             }

            </div>
        )
        }return <PageNotFound/>
    }
}

const mapStateToProps=(state)=>{
    return {
        username : state.user.username
    }
}

export default connect(mapStateToProps)(History)