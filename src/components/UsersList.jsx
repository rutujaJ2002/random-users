import React, {useState} from "react";
import { useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import { fetchUsers } from "../store/thunks/fetchUser";
import { addUser } from "../store/thunks/addUser";
import Skeleton from "./skeleton";
import Button from "./Button";
import UserListItems from "./UserListItems";

const UsersList=()=>{
    const dispatch= useDispatch();

    const { data, isLoading,error}=useSelector((state)=>{
        return state.users;
    });

    useEffect(()=>{
        dispatch(fetchUsers())
    },[dispatch]);

    const handleUserAdd=()=>{
        dispatch(addUser())
    }

    let content;

    if(isLoading){
        content= <Skeleton times={6} className="h-10 w-full"/>
    }

    if(error){
        content= <div> Error fetching data</div>
    }
    else{
        content=data.map((user)=>{
           return <UserListItems key={user.id} user={user}/>
        })
    }

    return <div>
        <div className ="flex flex-row justify-between m-3">
            <h1 className ="m-2 text-xl">My Users</h1>
            <Button onClick={handleUserAdd}>
                + Add USer
            </Button>
        </div>
        {content}
    </div>
}

export default UsersList;