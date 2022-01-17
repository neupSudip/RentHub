import React, { useState, useEffect } from "react";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import { createPost, updatePost } from "../../actions/posts";
import { useNavigate } from "react-router-dom";

const Form = ({ currentId, setCurrentId }) => {
  const user = JSON.parse(localStorage.getItem("profile"));

  const [postData, setPostDate] = useState({
    creatorId: "",
    creatorType: "",
    title: "",
    location: "",
    amount: "",
    tags: "",
    discription: "",
    negotiable: "negotiable",
    image: "",
  });

  const post = useSelector((state) =>
    currentId ? state.posts.find((p) => p._id === currentId) : null
  );

  const dispatch = useDispatch();
  const history = useNavigate();

  useEffect(() => {
    if (post) setPostDate(post);
  }, [post]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentId) {
      dispatch(
        updatePost(currentId, {
          ...postData,
          creatorName: user?.result?.name,
          creatorType: user?.result?.userType,
        })
      );
    } else {
      dispatch(
        createPost({
          ...postData,
          creatorName: user?.result?.name,
          creatorType: user?.result?.userType,
        })
      );
    }
    reset();
    history("/");
  };

  const reset = () => {
    setCurrentId(null);
    setPostDate({
      creatorId: "",
      creatorType: "",
      title: "",
      location: "",
      amount: "",
      tags: "",
      discription: "",
      negotiable: "negotiable",
      image: "",
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>{currentId ? "Update" : "Create"} Post</h1>
        <input
          type="text"
          name="title"
          label="title"
          placeholder="title"
          value={postData.title}
          onChange={(e) => setPostDate({ ...postData, title: e.target.value })}
          required
        />
        <input
          type="number"
          name="amount"
          label="amount"
          placeholder="amount"
          value={postData.amount}
          onChange={(e) => setPostDate({ ...postData, amount: e.target.value })}
          required
        />
        <input
          type="text"
          name="location"
          label="location"
          placeholder="location"
          value={postData.location}
          onChange={(e) =>
            setPostDate({ ...postData, location: e.target.value })
          }
          required
        />
        <input
          type="text"
          name="tags"
          label="tittagsle"
          placeholder="tags"
          value={postData.tags}
          onChange={(e) =>
            setPostDate({
              ...postData,
              tags: e.target.value.split(",").map((item) => item.trim()),
            })
          }
          required
        />
        <input
          type="text"
          name="discription"
          label="discription"
          placeholder="discription"
          value={postData.discription}
          onChange={(e) =>
            setPostDate({ ...postData, discription: e.target.value })
          }
          required
        />
        <select
          onChange={(e) =>
            setPostDate({ ...postData, negotiable: e.target.value })
          }
          required
        >
          <option value="negotiable">negotiable</option>
          <option value="non-negotiable">non-negotiable</option>
        </select>

        <FileBase
          type="file"
          multiple={false}
          onDone={({ base64 }) => setPostDate({ ...postData, image: base64 })}
        />
        <button onClick={reset}>Reset</button>
        <button type="submit">Submit </button>
      </form>
    </div>
  );
};

export default Form;
