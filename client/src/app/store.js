import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../../src/ReduxToolkit/features/auth/authSlice'
import clientReducer from '../../src/ReduxToolkit/features/client/clientSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    clients: clientReducer,
  },
})
