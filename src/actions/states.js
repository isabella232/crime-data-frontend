import {
  UCR_STATE_FAILED,
  UCR_STATE_FETCHING,
  UCR_STATE_RECEIVED,
} from './constants'
import api from '../util/api/lookups'
import reshapeData from '../util/states'

export const failedUcrState = error => ({
  type: UCR_STATE_FAILED,
  error,
})

export const fetchingUcrState = () => ({
  type: UCR_STATE_FETCHING,
})

export const receivedUcrState = states => ({
  type: UCR_STATE_RECEIVED,
  states,
})

export const fetchUcrState = () => dispatch => {
  dispatch(fetchingUcrState())
  const requests = api.getLookupState(100)
  return Promise.all(requests)
    .then(response => ({ results: response.results }))
    .then(data => dispatch(receivedUcrState(reshapeData(data))))
    .catch(error => dispatch(failedUcrState(error)))
}
