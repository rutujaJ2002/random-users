import {createApi} from '@reduxjs/toolkit/query/react';
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {faker} from "@faker-js/faker";


//to demo skeleton only...remove for production
const pause=(duration)=>{
        return new Promise((resolve)=>{
            setTimeout(resolve,duration)
        })
    }

const albumsApi= createApi({
    reducerPath:'albums',
    baseQuery: fetchBaseQuery({
        baseUrl:'http://localhost:3001',
        fetchFn: async(...args)=>{
            await pause(200);
            return fetch(...args);
        }
    }),
    endpoints(builder){
        return{
            removeAlbum: builder.mutation({
                invalidatesTags:(result,error,album)=>{
                    return [{type:'Album', id:album.userId}]
                },
                query:(album)=>{
                    return{
                        url:`/albums/${album.id}`,
                        method:'DELETE',
                    }
                }
            }),
            addAlbum: builder.mutation({
                invalidatesTags:(result,error, user)=>{
                    return [{type:'UsersAlbums', id:user.id}]
                },
                query:(user)=>{
                    return{
                        url:'/albums',
                        method:'POST',
                        body:{
                            userId:user.id,
                            title:faker.commerce.productName()
                        }
                    }
                }
            }),
            fetchAlbums: builder.query({
                providesTags:(result,error,user)=>{
                    const tags= result.map(album=>{
                        return [{type:'Album', id:album.id}];
                    })
                    tags.push({type:'UsersAlbums', id:user.id});
                    return tags;
                },
                query:(user)=>{
                    return{
                        url:'/albums',
                        params:{
                            userId: user.id
                        },
                        method:'GET',
                    }
                }
            })
        }
    }
})

export const {useFetchAlbumsQuery, useAddAlbumMutation, useRemoveAlbumMutation} = albumsApi;
export {albumsApi};