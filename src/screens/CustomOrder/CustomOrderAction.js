import {
  CUSTOMIZE_ORDER_DATA,
  CUSTOMIZE_ORDER_DATA_SUCCESS,
  CUSTOMIZE_ORDER_DATA_ERROR,
  CUSTOMIZE_ORDER_DATA_RESET_REDUCER,
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

export function submitCustomOrder(data) {
  console.warn("submitCustomOrder data", data);

  return dispatch => {
    dispatch(showLoadingIndicator(CUSTOMIZE_ORDER_DATA));

    axios.post(urls.CustomizeOrder.url, data, header).then(response => {
      // axios.post('http://skychain.jewelmarts.in/webservices/File_test', data, header).then(response => {

      console.warn("submitCusomOrder", response.data);
      if (response.data.ack === '1') {
        dispatch(
          onSuccess(response.data, CUSTOMIZE_ORDER_DATA_SUCCESS)
        )
      }
      else {
        dispatch(
          onFailure(response.data.msg, CUSTOMIZE_ORDER_DATA_ERROR)
        )
      }
    })
      .catch(function (error) {
        console.log("AFTER OTP ERROR", error);

        dispatch(
          onFailure(strings.serverFailedMsg, CUSTOMIZE_ORDER_DATA_ERROR)
        );
      });
  }
}

