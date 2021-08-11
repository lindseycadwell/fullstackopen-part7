import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import NewBlogForm from "./NewBlogForm";

test("<NewBlogForm /> updates parent state and calls onSubmit", () => {
  const createBlog = jest.fn();

  const component = render(<NewBlogForm handleNewBlog={createBlog} />);

  const titleInput = component.container.querySelector(".titleInput");
  const authorInput = component.container.querySelector(".authorInput");
  const urlInput = component.container.querySelector(".urlInput");

  const form = component.container.querySelector("form");

  fireEvent.change(titleInput, {
    target: { value: "testing newTitle" },
  });
  fireEvent.change(authorInput, {
    target: { value: "testing newAuthor" },
  });
  fireEvent.change(urlInput, {
    target: { value: "testing newUrl" },
  });
  component.debug();
  fireEvent.submit(form);

  console.log(createBlog.mock.calls[0][0]);

  expect(createBlog.mock.calls).toHaveLength(1);
  expect(createBlog.mock.calls[0][0].title).toBe("testing newTitle");
});
