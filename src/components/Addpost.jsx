import React from "react";

function Addpost(){
    return(
        <div>
            <h1>Add New Post</h1>
            <form>
                <input type="text" placeholder="Title" />
                <textarea placeholder="Content" />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default Addpost;