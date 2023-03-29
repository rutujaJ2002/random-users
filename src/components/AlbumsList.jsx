import React from "react";
import { useFetchAlbumsQuery , useAddAlbumMutation} from "../store";
import Button from "./Button";
import ExpandablePanel from "./ExpandablePanel";
import Skeleton from "./skeleton";
import AlbumListItem from "./AlbumListItem";

const AlbumsList= ({user})=>{

    //query returns different params like data, isLoading etc.
    const { data, error, isLoading}= useFetchAlbumsQuery(user);
    //both calls send same response as Redux toolkit has de-duplication of requests mechanism
    useFetchAlbumsQuery(user);

    //mutation returns function like addAlbum here
    const [addAlbum, results]= useAddAlbumMutation();

    const handleAddAlbum=()=>{
        addAlbum(user)
    }

    let content;
    if(isLoading){
        content=<Skeleton className="h-10 w-full" times={3}/>
    }else if(error){
        content= <div>Error Loading Albums</div>
    }
    else{
        content= data.map(album=>{
            return <AlbumListItem key={album.id} album={album}/>
        })
    }

    return <div className="bg-slate-50">
        <div className="flex flex-row items-center justify-between p-3 m-2">
            <h3 className="text-md font-bold">Albums for {user.name}</h3>
            <Button onClick={handleAddAlbum} loading={results.isLoading}>
                +Add Album
            </Button>
        </div>
        <div className="m-2">
            {content}
        </div>
    </div>
}

export default AlbumsList;