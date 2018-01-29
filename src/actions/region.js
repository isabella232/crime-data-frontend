import {
  UCR_REGION_FAILED,
  UCR_REGION_FETCHING,
  UCR_REGION_RECEIVED,
} from './constants'
import api from '../util/api/lookups'
import reshapeData from '../util/region'

export const failedUcrRegion = error => ({
  type: UCR_REGION_FAILED,
  error,
})

export const fetchingUcrRegion = () => ({
  type: UCR_REGION_FETCHING,
})

export const receivedUcrRegion = regions => ({
  type: UCR_REGION_RECEIVED,
  regions,
})

export const fetchUcrRegion = () => dispatch => {
  dispatch(fetchingUcrRegion())
  const requests = api.getLookupState(100)
  return Promise.all(requests)
    .then(response => ({ results: response.results }))
    .then(data => dispatch(receivedUcrRegion(reshapeData(data))))
    .catch(error => dispatch(failedUcrRegion(error)))
}
