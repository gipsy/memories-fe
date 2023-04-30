import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import FileBase from 'react-file-base64';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import useStyles from './styles';
import { createPost, updatePost } from "../../actions/posts";

const Form = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({
    title: '',
    message: '',
    tags: [],
    selectedFile: '',
  })
  const post = useSelector((state) => {
    return currentId ? state.posts.posts.find((p) => p._id === currentId) : null
  });

  const classes = useStyles();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('profile'));
  const history = useHistory();

  useEffect(() => {
    if (post) setPostData(post);
  }, [post])

  const handleSubmit = (e) => {
    e.preventDefault()

    if (currentId === 0) {
      dispatch(createPost({ ...postData, name: user?.userInfo?.name }, history));
    } else {
      dispatch(updatePost(currentId, { ...postData, name: user?.userInfo?.name }));
    }
    clear();
  };

  if (!user?.userInfo?.name) {
    return (
      <Paper className={classes.paper}>
        <Typography variant="h6" align="center">
          Please Sign In to create your own memories and like other's memories.
        </Typography>
      </Paper>
    )
  }

  const clear = () => {
    setCurrentId(0);
    setPostData({ title: '', message: '', tags: [], selectedFile: '' });
  }

  return (
    <Paper className={classes.paper} elevation={6}>
      <form
        onSubmit={handleSubmit}
        className={`${classes.root} ${classes.form}`}
        autoComplete="off"
        noValidate
      >
        <Typography variant="h6">{currentId ? 'Editing' : 'Creating'} a memory</Typography>
        <TextField
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
          value={postData.title}
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
        />
        <TextField
          onChange={(e) => setPostData({ ...postData, message: e.target.value })}
          value={postData.message}
          name="message"
          variant="outlined"
          label="Message"
          fullWidth
        />
        <TextField
          onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(",") })}
          value={postData.tags}
          name="tags"
          variant="outlined"
          label="Tags"
          fullWidth
        />

        <div className={classes.fileInput}>
          <FileBase
            type="file"
            multiple={false}
            onDone={({base64}) => setPostData({ ...postData, selectedFile: base64 })}
          />
        </div>

        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
        >Submit</Button>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={clear}
          fullWidth
        >Clear</Button>
      </form>
    </Paper>
  )
}
export default Form
