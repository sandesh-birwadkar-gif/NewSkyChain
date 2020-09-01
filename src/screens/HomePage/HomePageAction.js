import {
  HOMEPAGE_DATA,
  HOMEPAGE_DATA_SUCCESS,
  HOMEPAGE_DATA_ERROR,
  HOMEPAGE_DATA_RESET_REDUCER,

  TOTAL_CART_COUNT_DATA,
  TOTAL_CART_COUNT_DATA_SUCCESS,
  TOTAL_CART_COUNT_DATA_ERROR,
  TOTAL_CART_COUNT_DATA_RESET_REDUCER,

  ADD_TO_WISHLIST_DATA,
  ADD_TO_WISHLIST_DATA_SUCCESS,
  ADD_TO_WISHLIST_DATA_ERROR,
  ADD_TO_WISHLIST_DATA_RESET_REDUCER,


  ADD_TO_CART_DATA,
  ADD_TO_CART_DATA_SUCCESS,
  ADD_TO_CART_DATA_ERROR,
  ADD_TO_CART_DATA_RESET_REDUCER,

  ADD_TO_CART_PLUS_ONE_DATA,
  ADD_TO_CART_PLUS_ONE_DATA_SUCCESS,
  ADD_TO_CART_PLUS_ONE_DATA_ERROR,
  ADD_TO_CART_PLUS_ONE_DATA_RESET_REDUCER,


} from "@redux/types";

import { strings } from '@values/strings'
import axios from 'axios'
import { urls } from '@api/urls'

const header = {
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'multipart/form-data',
  },
}

export function showLoadingIndicator(type) {
  return {
    type: type
  };
}


export function onSuccess(data, type) {
  return {
    data,
    type: type,
  };
}

export function onFailure(error, type) {
  return {
    type: type,
    error
  };
}

export function getHomePageData(data) {
  console.log("getHomePageData", data);

  return dispatch => {
    dispatch(showLoadingIndicator(HOMEPAGE_DATA));

    axios.post(urls.HomePage.url, data, header).then(response => {
      console.log("getHomePageData", response.data);
      if (response.data.ack === '1') {
        dispatch(
          onSuccess(response.data, HOMEPAGE_DATA_SUCCESS)
        )
      }
      else {
        dispatch(
          onFailure(response.data.msg, HOMEPAGE_DATA_ERROR)
        )
      }
    })
      .catch(function (error) {
        console.log("getHomePageData ERROR", error);

        dispatch(
          onFailure(strings.serverFailedMsg, HOMEPAGE_DATA_ERROR)
        );
      });
  }
}

export function getTotalCartCount(data) {
  console.log("getTotalCartCount", data);

  return dispatch => {
    dispatch(showLoadingIndicator(TOTAL_CART_COUNT_DATA));

    axios.post(urls.TotalCartCount.url, data, header).then(response => {
      console.log("getTotalCartCount", response.data);
      if (response.data.ack === '1') {
        dispatch(
          onSuccess(response.data, TOTAL_CART_COUNT_DATA_SUCCESS)
        )
      }
      else {
        dispatch(
          onFailure(response.data.msg, TOTAL_CART_COUNT_DATA_ERROR)
        )
      }
    })
      .catch(function (error) {
        console.log("getHomePageData ERROR", error);

        dispatch(
          onFailure(strings.serverFailedMsg, TOTAL_CART_COUNT_DATA_ERROR)
        );
      });
  }
}

export function addToWishlist(data) {
  console.log("addToWishlist", data);

  return dispatch => {
    dispatch(showLoadingIndicator(ADD_TO_WISHLIST_DATA));

    axios.post(urls.addToCartWishlist.url, data, header).then(response => {
      console.log("addToWishlist", response.data);
      if (response.data.ack === '1') {
        dispatch(
          onSuccess(response.data, ADD_TO_WISHLIST_DATA_SUCCESS)
        )
      }
      else {
        dispatch(
          onFailure(response.data.msg, ADD_TO_WISHLIST_DATA_ERROR)
        )
      }
    })
      .catch(function (error) {
        console.log("getHomePageData ERROR", error);
        dispatch(
          onFailure(strings.serverFailedMsg, ADD_TO_WISHLIST_DATA_ERROR)
        );
      });
  }
}


export function addToCart(data) {
  console.log("addToCart", data);

  return dispatch => {
    dispatch(showLoadingIndicator(ADD_TO_CART_DATA));

    axios.post(urls.addToCartWishlist.url, data, header).then(response => {
      console.log("addToCart", response.data);
      if (response.data.ack === '1') {
        dispatch(
          onSuccess(response.data, ADD_TO_CART_DATA_SUCCESS)
        )
      }
      else {
        dispatch(
          onFailure(response.data.msg, ADD_TO_CART_DATA_ERROR)
        )
      }
    })
      .catch(function (error) {
        console.log("getHomePageData ERROR", error);
        dispatch(
          onFailure(strings.serverFailedMsg, ADD_TO_CART_DATA_ERROR)
        );
      });
  }
}



export function addRemoveFromCartByOne(data) {
  console.log("addRemoveFromCartByOne", data);

  return dispatch => {
    dispatch(showLoadingIndicator(ADD_TO_CART_PLUS_ONE_DATA));

    axios.post(urls.addToCartGridAdd.url, data, header).then(response => {
      console.log("addRemoveFromCartByOne response", response.data);
      if (response.data.ack === '1') {
        dispatch(
          onSuccess(response.data, ADD_TO_CART_PLUS_ONE_DATA_SUCCESS)
        )
      }
      else {
        dispatch(
          onFailure(response.data.msg, ADD_TO_CART_PLUS_ONE_DATA_ERROR)
        )
      }
    })
      .catch(function (error) {
        console.log("addToCartPlusOne ERROR", error);
        dispatch(
          onFailure(strings.serverFailedMsg, ADD_TO_CART_PLUS_ONE_DATA_ERROR)
        );
      });
  }
}