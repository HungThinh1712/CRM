import React, { useEffect } from 'react';

import ItemBookInAdmin from '../page/itemBook'
import { useDispatch, useSelector } from 'react-redux';
import * as bookActions from '../actions/booksAction';
import {withRouter} from 'react-router-dom';
import Header from './../common/Header'
import Footer from './../common/Footer'
import Dialog from './../common/dialog'

const LstBook = (props) => {

    const dispatch = useDispatch(); 
    const books = useSelector(state=>state.books.books);
    useEffect(()=>{
        dispatch(bookActions.getBooksRequest(""));
    },[dispatch])
    const showBooks = books.map((book, index) => <ItemBookInAdmin
    key={book._id}
    id={book._id}
    price={book.price}
    name={book.name}
    amount={book.amount}
    bookImage={book.bookImage}
    onClick={() => props.history.push(`/details/${book._id}`)}
   
  ></ItemBookInAdmin>)
    
    return (
        <div>
         
            <Header/>
            <div id="wrapper">
                <div id="content-wrapper" style={{ marginTop: '100px' }}>

                    <div className="container-fluid">
                        <div className="card mb-3">

                            <div className="card-body">
                                <div className="table-wrapper">
                                    <div className="table-title">
                                        <div className="row">
                                            <div className="col-sm-8"><h2>DANH SÁCH SÁCH</h2></div>
                                            <div className="col-sm-4">
                                                <div >
                                                    <button onClick={()=>props.history.push('/add')} type="button" className="btn btn-info add-new"><i className="fa fa-plus"></i> Thêm sách</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="container">
                                        <div className="row">
                                           {showBooks}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div style={{marginTop:'120px'}}><Footer/></div>
        </div>
    );
};

export default withRouter(LstBook);