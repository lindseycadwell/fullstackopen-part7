import React from "react";

const BlogCommentsList = ({ comments }) => {
  console.log("comments :>> ", comments);
  if (!comments || comments.length === 0)
    return (
      <ul>
        <li>No comments for this blog post yet!</li>
      </ul>
    );

  const renderedComments = comments.map((comment) => {
    return (
      <li key={comment.id} style={{ marginTop: "5px" }}>
        <div>By: {comment.name}</div>
        <div>{comment.content}</div>
      </li>
    );
  });

  return <ul style={{ listStyle: "none" }}>{renderedComments}</ul>;
};

export default BlogCommentsList;
