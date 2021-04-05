import {useState} from 'react'
import initialState from '../initialState'

const useInitialState = () => {
  const [state, setsState] = useState(initialState)

  const addToCart = payload => {
    setsState({
      ...state,
      cart: [ ...state.cart, payload]
    })
  }

  const removeFromCart = payload => {
    setsState({
      ...state,
      cart: state.cart.filter(item => item.id !== payload.id)
    })
  }

  const addToBuyer = payload => {
    setsState({
      ...state,
      buyer: [...state.buyer, payload]
    })
  }

  const addNewOrder = payload => {
    setsState({
      ...state,
      orders: [...state.orders, payload]
    })
  }

  return {
    addToCart,
    removeFromCart,
    addToBuyer,
    addNewOrder,
    state
  }

}

export default useInitialState;