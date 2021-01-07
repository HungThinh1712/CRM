import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toastMessage } from '../common/ToastHelper';
import * as bookActions from './../actions/booksAction'
import Header from './../common/Header'
import Footer from './../common/Footer'
import { useJwt } from "react-jwt";

const AddBook = () => {
    
    const dispatch = useDispatch();
    const hiddenFileInput = React.useRef(null);
    const books = useSelector(state => state.books.books);
    const handleUpLoadClick = event => {
        hiddenFileInput.current.click();
    };
    //Show review Image
    const showPreview = e => {
        if (e.target.files && e.target.files[0]) {
            let bookImage = e.target.files[0]
            const reader = new FileReader();
            reader.onload = x => {
                setBookImage(bookImage);
                setImageSrc(x.target.result)
            }
            reader.readAsDataURL(bookImage)
        }
        else {
            setBookImage(null);
            setImageSrc('/img/a.jpg')
        }
    };

    //Input
    const [name, setName] = useState('')
    const [type, setType] = useState('')
    const [author, setAuthor] = useState('')
    const [amount, setAmount] = useState(0)
    const [publishHouse, setPublishHouse] = useState('')
    const [price, setPrice] = useState('')
    const [coverPrice, setCoverPrice] = useState('')
    const [pageAmount, setPageAmount] = useState(0)
    const [size, setSize] = useState('')
    const [coverType, setCoverType] = useState('')
    const [description, setDescription] = useState('')
    const [imageSrc, setImageSrc] = useState('/img/a.jpg')
    const [bookImage, setBookImage] = useState(null)

    //HandelInputChange
    const handleNameInputChange = e => {
        setName(e.target.value);
    };
    const handleTypeInputChange = e => {
        setType(e.target.value);
    };
    const handleAuthorInputChange = e => {
        setAuthor(e.target.value);
    };

    const handleAmountInputChange = e => {
        setAmount(e.target.value);
    };
    const handlePublishHouseInputChange = e => {
        setPublishHouse(e.target.value);
    };
    const handlePriceInputChange = e => {
        setPrice(e.target.value);
    };
    const handleCoverPriceInputChange = e => {
        setCoverPrice(e.target.value);
    };
    const handlePageAmountInputChange = e => {
        setPageAmount(e.target.value);
    };
    const handleSizeInputChange = e => {
        setSize(e.target.value);
    };
    const handleCoverTypeChange = e => {
        setCoverType(e.target.value);
    };
    const handleDescriptionInputChange = e => {
        setDescription(e.target.value);
    };
    //Add book
    useEffect(() => {
        setName('')
        setType('')
        setAuthor('')
        setAmount(0)
        setPublishHouse('')
        setPrice('')
        setCoverPrice('')
        setPageAmount(0)
        setSize('')
        setCoverType('')
        setDescription('')
        setImageSrc('/img/a.jpg')
        setBookImage(null)
    }, [books])
    const handleSubmit = async e => {
        if (bookImage !== null) {
            const formData = new FormData();
            formData.append("name", name)
            formData.append("type", type)
            formData.append("author", author)
            formData.append("amount", amount)
            formData.append("price", price)
            formData.append("coverPrice", coverPrice)
            formData.append("pageAmount", pageAmount)
            formData.append("publishHouse", publishHouse)
            formData.append("size", size)
            formData.append("coverType", coverType)
            formData.append("description", description)
            formData.append("bookImage", bookImage)
            await dispatch(bookActions.addBook(formData));
        } else {
            toastMessage("Vui lòng chọn hình ảnh")
        }
    };
    return (
        <div >
            <Header />
            <div id="wrapper" style={{ marginTop: '20px' }}>
                <div id="content-wrapper" style={{ marginTop: '60px' }}>
                    <div className="container-fluid">
                        <div className="card-body">
                            <div className="tm-bg-primary-dark tm-block tm-block-h-auto">
                                <div className="row">
                                    <div className="col-12">
                                        <h4 className="tm-block-title d-inline-block" style={{ fontSize: '30px' }}>Thêm sách</h4>
                                    </div>
                                </div>
                                <div className="row tm-edit-product-row">
                                    <div className="col-xl-6 col-lg-6 col-md-10">
                                        <div className="row">
                                            <div className="form-group mb-3 col-xs-12 col-sm-6">
                                                <label >Tên sách</label>
                                                <input value={name} onChange={handleNameInputChange} type="text" className="form-control validate" data-large-mode="true" />
                                            </div>
                                            <div className="form-group mb-3 col-xs-12 col-sm-6">
                                                <label >Nhà xuất bản</label>
                                                <input value={publishHouse} onChange={handlePublishHouseInputChange} type="text" className="form-control validate" required />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="form-group mb-3 col-xs-12 col-sm-6">
                                                <label >Thể loại</label>
                                                <input value={type} onChange={handleTypeInputChange} type="text" className="form-control validate" data-large-mode="true" />
                                            </div>
                                            <div className="form-group mb-3 col-xs-12 col-sm-6">
                                                <label for="amount">Số lượng</label>
                                                <input value={amount} onChange={handleAmountInputChange} type="number" className="form-control validate" required />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="form-group mb-3 col-xs-12 col-sm-6">
                                                <label >Giá</label>
                                                <input value={price} onChange={handlePriceInputChange} type="number" className="form-control validate" required />
                                            </div>
                                            <div className="form-group mb-3 col-xs-12 col-sm-6">
                                                <label >Giá bìa</label>
                                                <input value={coverPrice} onChange={handleCoverPriceInputChange} type="number" className="form-control validate" data-large-mode="true" />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="form-group mb-3 col-xs-12 col-sm-6">
                                                <label >Loại bìa</label>
                                                <input value={coverType} onChange={handleCoverTypeChange} type="text" className="form-control validate" data-large-mode="true" />
                                            </div>
                                            <div className="form-group mb-3 col-xs-12 col-sm-6">
                                                <label >Tác giả</label>
                                                <input value={author} onChange={handleAuthorInputChange} type="text" className="form-control validate" required />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="form-group mb-3 col-xs-12 col-sm-6">
                                                <label >Số trang</label>
                                                <input value={pageAmount} onChange={handlePageAmountInputChange} type="number" className="form-control validate" data-large-mode="true" />
                                            </div>
                                            <div className="form-group mb-3 col-xs-12 col-sm-6">
                                                <label >Kích thước</label>
                                                <input value={size} onChange={handleSizeInputChange} type="text" className="form-control validate" required />
                                            </div>
                                        </div>


                                        <div className="form-group mb-3">
                                            <label for="description">Mô tả</label>
                                            <textarea value={description} onChange={handleDescriptionInputChange} className="form-control validate" rows="3" required></textarea>
                                        </div>
                                        <button onClick={handleSubmit} className="btn btn-info form-group mb-3" style={{ width: '100%' }}>Thêm sản phẩm</button>

                                    </div>
                                    <div style={{ marginLeft: '50px', marginTop: '10px' }} >

                                        <div className="row">
                                            <div >
                                                <img alt="" src={imageSrc} onClick={handleUpLoadClick} className="tm-product-img-dummy mx-auto">
                                                    {/* <i className="fas fa-cloud-upload-alt tm-upload-icon" onClick={handleClick} ></i> */}
                                                </img>
                                                <div className="custom-file mt-3 mb-3" >
                                                    <input id="fileInput" accept="image/*" type="file" style={{ display: 'none' }} ref={hiddenFileInput} onChange={showPreview} />
                                                </div>
                                            </div>
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

export default AddBook;