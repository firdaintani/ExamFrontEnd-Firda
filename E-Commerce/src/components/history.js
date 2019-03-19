import React from 'react'
import Axios from 'axios';
import { urlApi } from '../support/urlApi';
import cookie from 'universal-cookie'
import {Link} from 'react-router-dom'

const objCookie = new cookie()
class History extends React.Component{
    state={history : []}

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

    renderDataHistory=()=>{
     

        var data=this.state.history.map((val)=>{
            return(
                <tr>
                    {/* <td>haha</td> */}
                    <td>{val.id}</td>
                    <td>{val.tanggal}</td>
                    <td>{val.item.length}</td>
                    <td>Rp. {val.totalBayar}</td>
                    <td><Link to={'history-detail/'+val.id}><input type='button' className='btn btn-primary' value="Detail"></input></Link></td>
                </tr>
            )
        })
        return data

    }
    render(){
        
        return (
            
            <div className='container'>
            { this.state.history.length>0?
                <table className='table'>
                    <thead>
                    <tr>
                        <th>ID</th>
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
            </div>
        )
    }
}

export default History