import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { userReducer } from "./slices/usersSlice";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { albumsApi } from "./apis/AlbumApi";
import { photosApi } from "./apis/PhotosApi";


export const store= configureStore({
    reducer:{
        users:userReducer,
        [albumsApi.reducerPath]:albumsApi.reducer,
        [photosApi.reducerPath]:photosApi.reducer
    },
    middleware: (getDefaultMiddleware)=>{
        return getDefaultMiddleware()
            .concat(albumsApi.middleware)
            .concat(photosApi.middleware)
    }
});

setupListeners(store.dispatch);

export * from './thunks/fetchUser';
export * from "./thunks/addUser";
export * from "./thunks/deleteUser";
export { useFetchAlbumsQuery, useAddAlbumMutation, useRemoveAlbumMutation} from "./apis/AlbumApi";
export { useFetchPhotosQuery, useAddPhotoMutation, useRemovePhotoMutation} from "./apis/PhotosApi";
