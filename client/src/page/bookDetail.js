import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button"
import * as bookActions from './../actions/booksAction'
import { useSelector, useDispatch } from 'react-redux'
import Header from './../common/Header'
import Description from './../common/Description'
import Footer from './../common/Footer'
const useStyles = makeStyles((theme) => ({


    container: {
        [theme.breakpoints.up('sm')]: {
            marginLeft: '0px',
            marginRight: '0px',

        },
        [theme.breakpoints.up('lg')]: {
            marginLeft: '87px',
            marginRight: '87px',
            padding: '10px',
            height: '400px',
        },
        [theme.breakpoints.down('xs')]: {
            marginLeft: '0px',
            marginRight: '0px',
        },
    },
    cover_product_detail: {

        [theme.breakpoints.up('lg')]: {
            margin: '10px',
            display: 'flex'
        },
        [theme.breakpoints.up('md')]: {
            margin: '10px',
            display: 'flex',
        },
        [theme.breakpoints.up('sm')]: {
            margin: '10px',
            display: 'flex',

        },
        [theme.breakpoints.down('xs')]: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        },
    },
    card_image_detail: {
        height: '360px',
        width: '350px',
        display: 'flex',
        alignContent: "center",
        justifyContent: 'center',
        [theme.breakpoints.down('xs')]: {
            alignItem: 'center'

        },
    },
    card_title_detail: {
        fontSize: '2vw',
        color: 'black',
        fontWeight: '700',
        marginBottom: '1.5em',
        [theme.breakpoints.down('xs')]: {
            fontSize: '20px',
            color: 'black',
            fontWeight: '700',
            marginBottom: '1.5em',
        },
    },
    card_price: {
        fontWeight: '600',
        fontSize: '30px',
        fontFamily: 'Arial',
        color: 'red'
    },
    card_info: {
        fontWeight: '600', fontSize: '12px'
    },
    mgleft: {
        marginLeft: '40px',
        [theme.breakpoints.down('xs')]: {
            marginLeft: '0px'
        },
    }


}));

const BookDetail = (props) => {
    const dispatch = useDispatch();
    const id = props.match.params.book_id
    const selectedBook = useSelector(state => state.books.selectedBook)

    useEffect(() => {
        dispatch(bookActions.getBookByIdRequest(id))

    }, [dispatch, id])
    const classes = useStyles();
    const imageSrc = selectedBook ? `http://localhost:3002/uploads/${selectedBook.bookImage}` : ''
    return (
        <div style={{ paddingTop: '120px' }}>
            <Header />
            {selectedBook ? <div>
                <Paper className={` ${classes.container}`}>
                <div className={classes.cover_product_detail} >
                    <div className={classes.card_image_detail}>
                        <img src={imageSrc} alt="product " style={{ maxWidth: '100%', maxHeight: '100%' }} />
                    </div>
                    <div className={classes.mgleft}>
                        <Grid container style={{ marginBottom: '0.5em', height: '50px' }}>
                            <span className={classes.card_title_detail}>{selectedBook.name}</span>
                        </Grid>
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            <p style={{ marginBottom: '0.5em' }}><span
                                className={classes.card_info}>Tác giả: {selectedBook.author}</span></p>
                            <div style={{flexGrow:1,minWidth:'40px'}}></div>
                            <p style={{ marginBottom: '0.5em',justifyContent:'flex-end' }}><span
                                className={classes.card_info}>Thể loại: {selectedBook.type}</span></p>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <p style={{ marginBottom: '0.5em' }}><span
                            className={classes.card_info}>Nhà xuất bản: {selectedBook.publishHouse}</span></p>
                            <div style={{flexGrow:1,minWidth:'40px'}}></div>
                        <p style={{ marginBottom: '0.5em',justifyContent:'flex-end' }}><span
                            className={classes.card_info}>Loại bìa: {selectedBook.coverType}</span></p>
                        </div>
                        <p style={{ marginBottom: '0.5em' }}><span
                            className={classes.card_price}>{selectedBook.price} đ</span></p>
                        
                        <p style={{ marginBottom: '0.5em' }}><span
                            className={classes.card_info}>Số trang: {selectedBook.pageAmount}</span></p>
                        <p style={{ marginBottom: '0.5em' }}><span
                            className={classes.card_info}>Kích thước: {selectedBook.size}</span></p>

                        <p style={{ marginBottom: '0.5em' }}><span
                            className={classes.card_info}>Tiết kiệm: {Math.round(((selectedBook.coverPrice-selectedBook.price)/selectedBook.coverPrice)*100)}%</span></p>
                        <p style={{ marginBottom: '1em' }}><span
                            className={classes.card_info}>Giá thị trường: {selectedBook.coverPrice} đ</span></p>
                            <div style={{ marginBottom: '0.5em',marginLeft:'0px'}}>
                                    <Button onClick={()=>props.history.push('/update',{bookData:selectedBook})}  size="small" variant="contained" color='primary'
                                        style={{ fontSize: '1em',width:'150px' }}>
                                        
                                            Cập nhật 
                                        </Button>
                                </div>

                    </div>

                </div>

            </Paper>
            <div className={classes.container}>
          <h4>Mô tả sách</h4>
          <Description  description ={selectedBook.description} />
        </div>
        
         
                </div> : null}
                <div style={{marginTop:'50px'}}><Footer/></div>
        </div>
    );
};

export default BookDetail;