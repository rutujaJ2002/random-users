import React from "react";
import PhotoListItem from "./PhotoListItem";
import { useFetchPhotosQuery, useAddPhotoMutation } from "../store/apis/PhotosApi";
import Button from "./Button";
import Skeleton from "./skeleton";

const PhotosList=({album})=>{
    const {data,error, isLoading}=useFetchPhotosQuery(album);
    const [addPhoto, photoResults] = useAddPhotoMutation();

    const handleAddPhoto=()=>{
        addPhoto(album);
    }

    let content='';
    if(isLoading){
        content= <Skeleton times={4} className="h-16 w-16"/>
    }
    else if(error){
        content =<div>Errror fetching photos</div>
    }
    else{
        content=data.map((photo)=>{
            return <PhotoListItem key={photo.id} photo={photo}/>
        })
    }

    return (
        <div className="bg-white">
            <div className="m-2 flex flex-row items-center justify-between">
                <h3 className="text-sm font-bold">Photos in {album.title}</h3>
                <Button loading={photoResults.isLoading} onClick={handleAddPhoto}>
                    + Add Photo
                </Button>
            </div>
            <div className="flex flex-row m-2 justify-center gap-10 flex-wrap">
                {content}
            </div>
        </div>
    )
}

export default PhotosList;