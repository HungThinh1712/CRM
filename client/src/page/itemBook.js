import React from 'react';
import {useDispatch} from 'react-redux'
import * as bookActions from './../actions/booksAction'
import {withRouter} from 'react-router-dom'
import Dialog from './../common/dialog'

const ItemBookInAdmin = (props) => {

    const isAuthenticated = localStorage.getItem('jwtToken') ? true : false;
    const dispatch =useDispatch();
    const handleDeleteClick =()=>{
        dispatch(bookActions.deleteFromCart(props.id))
        setOpen(false)
    }

    const imageSrc =`http://localhost:3002/uploads/${props.bookImage}`
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = (value) => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };
    return (

            
            <div className="col-md-3 col-sm-6" style={{marginTop:'20px'}}>
            <div className="product-grid6">
                <div onClick={props.onClick} className="product-image6">
                    <div >
                        <img prop="" className="pic-1" src={imageSrc} style={{marginTop:'20px'}} />
                    </div>
                </div>
                <div className="product-content">
                    <h3 className="title" ><div>{props.name}</div></h3>
                    <div className="price">{props.price} đ</div>
                    <div className="title">Còn lại: {props.amount} sản phẩm</div>
                </div>
                <ul className="social">
                    <li><a onClick={props.onClick}  data-tip="Xem chi tiết"><i className="fas fa-search"></i></a></li>
                    {isAuthenticated ? <li><a onClick={handleClickOpen} data-tip="Xóa"><i className="fas fa-trash"></i></a></li>:null}
                </ul>
            </div>
            <Dialog open={open} onDeleteClick={handleDeleteClick}  onClose={handleClose}/>
        </div>
    );
};

export default withRouter(ItemBookInAdmin);