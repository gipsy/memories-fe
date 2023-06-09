import React, { useState } from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, ButtonBase, Typography } from "@material-ui/core";
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import noImage from '../../../images/no-image.jpg';
import moment from 'moment';
import useStyles from './styles';
import { useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';

import { deletePost, likePost } from '../../../actions/posts';

const Post = ({ post, setCurrentId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const user = JSON.parse(localStorage.getItem('profile'));
  const [likes, setLikes] = useState(post?.likes);

  const userId = user?.userInfo?.sub || user?.userInfo?._id;
  const hasLikedPost = post.likes.find((like) => like === userId);

  const handleLike = async () => {
    dispatch(likePost(post._id))
    if (hasLikedPost) {
      setLikes(post.likes.filter((id) => id !== userId));
    } else {
      setLikes([...post.likes, userId]);
    }
  }

  const Likes = () => {
    if (likes.length > 0) {
      return hasLikedPost
        ? (
          <><ThumbUpAltIcon fontSize="small" />&nbsp;{likes.length > 2
            ? `You and ${likes.length - 1} others`
            : `${likes.length} like${likes.length > 1 ? 's' : ''}` }</> )
        : (
          <><ThumbUpAltOutlined fontSize="small" />&nbsp;{likes.length} {likes.length === 1
            ? 'Like'
            : 'Likes'}</> );
    }

    return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
  };

  const openPost = () => history.push(`/posts/${post._id}`);

  return (
    <Card className={classes.card} raised elevation={6}>
      <ButtonBase
        component="span"
        className={classes.cardAction}
        onClick={openPost}
      >
        <CardMedia
          className={classes.media}
          image={post?.selectedFile || noImage}
          title={post.title}
        />
        <div className={classes.overlay}>
          <Typography variant="h6">{post.name}</Typography>
          <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
        </div>
        {(user?.userInfo?.sub === post?.creator || user?.userInfo?._id === post?.creator) && (
          <div className={classes.overlay2}>
            <Button onClick={() => setCurrentId(post._id)} style={{ color: 'white' }} size="small">
              <MoreHorizIcon fontSize="medium" />
            </Button>
          </div>
        )}

        <div className={classes.details}>
          <Typography variant="body2" color="textSecondary">
            {post.tags.map((tag) => `#${tag} `)}
          </Typography>
        </div>

        <Typography className={classes.title} variant="h5" gutterBottom>
          {post.title}
        </Typography>

        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {post.message}
          </Typography>
        </CardContent>
      </ButtonBase>

      <CardActions className={classes.cardActions}>
        <Button
          onClick={handleLike}
          size="small"
          color="primary"
        >
          <Likes />
        </Button>

        {(user?.userInfo?.sub === post?.creator || user?.userInfo?._id === post?.creator) && (
          <Button
            onClick={() => dispatch(deletePost(post._id))}
            size="small"
            color="secondary"
          >
            <DeleteIcon fontSize="small" />
            &nbsp;
            Delete
          </Button>
        )}
      </CardActions>
    </Card>
  )
}
export default Post
