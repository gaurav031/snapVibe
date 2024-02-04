import { createSlice } from "@reduxjs/toolkit";

/* REDUX DIRECTLY CHANGE THE MODE  */
const initialState = {
    mode: "light",
    user: null,
    token: null,
    posts: [],
};

/* THIS FUNCTION IS FOR CHANGING THE MODE FROM 
DARK TO LIGHT AND VICE VERSA */
export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers:{
        setMode:(state) => {
            state.mode = state.mode === "light" ? "dark" : "light";
        },//this is for login
        setLogin: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },//this is for logout
        setLogout: (state) => {
            state.user = null;
            state.token = null;
        },//for add and removing friends
        setFriends:(state, action) => {
            if (state.user) {
                state.user.friends = action.payload.friends;
            }else {
                console.error("user friends non-existent:(")
            }
        },
        setPosts: (state, action) => {
            state.posts = action.payload.posts;
        },
        setPost: (state, action) => {
            const updatePosts = state.posts.map((post) =>{
                if(post._id === action.payload.post_id) return action.payload.post;
                return post;
            });
            state.posts = updatePosts;
        },
    },
});
 
export const { setMode, setLogin, setLogout, setFriends, setPosts, setPost } = authSlice.actions;
export default authSlice.reducer;