import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import Blog from "./Blog";

const blog = {
  title: "test title",
  author: "test author",
  likes: 3,
  url: "test url",
  user: { id: "123abcuser", name: "user" },
};

const mockLikeHandler = jest.fn();
const mockDeleteHandler = jest.fn();
const userId = "a98tan4qo2nh9dtnq9nq199847890qh";

test("renders only blog name and author by default", () => {
  const component = render(
    <Blog
      blog={blog}
      handleLike={mockLikeHandler}
      handleDelete={mockDeleteHandler}
      userId={userId}
    />
  );

  expect(component.container).toHaveTextContent("test title");
  expect(component.container).toHaveTextContent("test author");
  expect(component.container).not.toHaveTextContent("test url");
  expect(component.container).not.toHaveTextContent("likes: 3");
});

test("renders likes and url after view button pressed", () => {
  const mockLikeHandler = jest.fn();

  const component = render(
    <Blog
      blog={blog}
      handleLike={mockLikeHandler}
      handleDelete={mockDeleteHandler}
      userId={userId}
    />
  );

  const button = component.getByText("view");
  fireEvent.click(button);

  expect(component.container).toHaveTextContent("test title");
  expect(component.container).toHaveTextContent("test author");
  expect(component.container).toHaveTextContent("test url");
  expect(component.container).toHaveTextContent("likes: 3");
});

test("calls handleLike function prop twice when clicked twice", () => {
  const mockLikeHandler = jest.fn();

  const component = render(
    <Blog
      blog={blog}
      handleLike={mockLikeHandler}
      handleDelete={mockDeleteHandler}
      userId={userId}
    />
  );

  const viewButton = component.getByText("view");
  fireEvent.click(viewButton);

  const likeButton = component.getByText("like");
  fireEvent.click(likeButton);
  fireEvent.click(likeButton);

  expect(mockLikeHandler.mock.calls).toHaveLength(2);
});
