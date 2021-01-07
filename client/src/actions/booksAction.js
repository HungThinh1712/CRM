import * as Types from '../constants/ActionType'
import axios from 'axios'

import * as CallApis from './../constants/Apis'
import {toastMessage} from './../common/ToastHelper'

export const getBooksRequest = (name) => async (dispatch) => {

    const url = CallApis.API_URL.concat(`/book/list?name=${name}`)
    await axios.get(url)
        .then(res => {
            dispatch({
                type: Types.GET_ALLBOOK,  //this call test dispatch. to dispsatch to our reducer
                books: res.data
            });
        })
        .catch(err => {

            console.log('Error' + err);
        }
        );

}
export const getBookByIdRequest = (id) => async (dispatch) => {
    const url = CallApis.API_URL.concat(`/book/getbyid?id=${id}`)
    await axios.get(url)
        .then(res => {
            dispatch({
                type: Types.GET_BOOK_BY_ID,  //this call test dispatch. to dispsatch to our reducer
                selectedBook: res.data
            });
        })
        .catch(err => {
            console.log('Error' + err);
        }
        );

}

export const addBook = (bookData) => async (dispatch) => {
    const url = CallApis.API_URL.concat(`/book/add`)
    await axios.post(url, bookData)
        .then(res =>  {  
            if (res.status===200 ) {
               
                toastMessage("Thêm thành công")
                dispatch({
                 type: Types.ADD_BOOK,  //this call test dispatch. to dispsatch to our reducer
                 item: res.data
                });                      
            
            }else {
                toastMessage("Vui lòng điền đầy thủ thông tin");
            }
        })
};

export const deleteFromCart = (id) => async (dispatch) =>{
    const url = CallApis.API_URL.concat(`/book?id=${id}`)
    await axios.delete(url)
    .then(res => {
        dispatch({
            type: Types.DELETE_BOOK,  //this call test dispatch. to dispsatch to our reducer
            id: id
        });
    })
    .catch(err => {

        console.log('Error' + err);
    }
    );
};

export const updateBook = (bookData) => async (dispatch) => {
    console.log("aaa",bookData.name);
    const url = CallApis.API_URL.concat(`/book/update`)
    await axios.put(url, bookData)
        .then(res =>  {  
            if (res.status===200 ) {
               
                toastMessage("Cập nhật thành công")           
            
            }else {
                console.log(res)
                dispatch({
                    type: Types.GET_ERRORS,  //this call test dispatch. to dispsatch to our reducer
                    payload: "Vui lòng kiểm tra lại thông tin" //sets payload to errors coming from server
                })
            }
        })
        .catch(err => {
            console.log(err)
                dispatch({
                    type: Types.GET_ERRORS,  //this call test dispatch. to dispsatch to our reducer
                    payload: "Vui lòng kiểm tra lại thông tin" //sets payload to errors coming from server
                })
            }
        );
};

export const updateBookWithoutImage = (bookData) => async (dispatch) => {
    const url = CallApis.API_URL.concat(`/book/updatewithoutimage`)
    await axios.put(url, bookData)
        .then(res =>  {  
            if (res.status===200 ) {
               
                toastMessage("Cập nhật thành công")                
            
            }else {
                console.log(res)
                dispatch({
                    type: Types.GET_ERRORS,  //this call test dispatch. to dispsatch to our reducer
                    payload: "Vui lòng kiểm tra lại thông tin" //sets payload to errors coming from server
                })
            }
        })
        .catch(err => {
            console.log(err)
                dispatch({
                    type: Types.GET_ERRORS,  //this call test dispatch. to dispsatch to our reducer
                    payload: "Vui lòng kiểm tra lại thông tin" //sets payload to errors coming from server
                })
            }
        );
};



