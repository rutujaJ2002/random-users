import React from "react";
import Button from "./Button";
import ExpandablePanel from "./ExpandablePanel";
import { GoTrashcan } from "react-icons/go";
import { useRemoveAlbumMutation } from "../store";
import PhotosList from "./PhotosList";

const AlbumListItem=({album})=>{

    const [removeAlbum, results]=useRemoveAlbumMutation();

    const handleRemoveAlbum=()=>{
        removeAlbum(album);
    }

    const header=(
            <div className="flex">
                <Button className="mr-5 bg-red-600 border-red-300 shadow-md rounded" onClick={handleRemoveAlbum} loading={results.isLoading}>
                        <GoTrashcan className="text-white text-sm bg-red-600"/>
                </Button>
                {album.title}
            </div>
    )

     return <ExpandablePanel key={album.id} header={header}>
            <PhotosList album={album}/>
     </ExpandablePanel>
}

export default AlbumListItem;