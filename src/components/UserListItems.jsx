import React from "react";
import {GoTrashcan} from "react-icons/go";
import Button from "./Button";
import { removeUser } from "../store/thunks/deleteUser";
import { useSelector, useDispatch } from "react-redux";
import ExpandablePanel from "./ExpandablePanel";
import AlbumsList from "./AlbumsList";

const UserListItems= ({user})=>{
    const dispatch= useDispatch();

    const {isLoading,error}=useSelector((state)=>{
        return state.users;
    });

    const handleDeleteClick=()=>{
        dispatch(removeUser(user))
    }

    const header = <>
                    <Button className="mr-5 bg-red-600 border-red-300 shadow-md" loading={isLoading} onClick={handleDeleteClick}>
                            <GoTrashcan className="text-white bg-red-600"/>
                    </Button>
                    {error && <div>
                            Error deleting user
                    </div>}
                    {user.name}
        </>

    return (
        <ExpandablePanel header={header}>
            <AlbumsList user={user}/>
        </ExpandablePanel>
    )
}

export default UserListItems;