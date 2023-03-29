import React from "react";
import { useRemovePhotoMutation } from "../store/apis/PhotosApi";
import { GoTrashcan } from "react-icons/go";

const PhotoListItem=({photo})=>{
    const [removePhoto]= useRemovePhotoMutation();

    const handlePhotoDelete=()=>{
        removePhoto(photo);
    }

    return (
        <div className="relative m-2 cursor-pointer" onClick={handlePhotoDelete}>
            <img src={photo.url} alt="random-pic" className="h-32 w-32"/>
            <div className="absolute inset-0 flex items-center justify-center hover:bg-gray-200 opacity-0 hover:opacity-80 ">
                <GoTrashcan className="text-3xl text-red-600 font-bold"/>
            </div>
        </div>
    )
}

export default PhotoListItem;