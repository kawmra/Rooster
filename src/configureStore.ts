import { createStore } from 'redux'
import { ProjectsReducer } from './projects/ProjectsReducer'
import { StoreState } from './domain/stores'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, ProjectsReducer)

export const store = createStore<StoreState>(persistedReducer, {
    projects: [],
    template: ''
})
export const persistor = persistStore(store)