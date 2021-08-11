describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:8000/api/testing/reset");

    const user = {
      username: "user",
      name: "bob",
      password: "pass",
    };

    cy.request("POST", "http://localhost:8000/api/auth/register", user);

    cy.visit("http://localhost:3000");
  });

  it("Login form is shown", function () {
    cy.contains("Log in to application");
    cy.contains("username");
    cy.contains("password");
    cy.contains("login");
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.get("#usernameInput").type("user");
      cy.get("#passwordInput").type("pass");
      cy.get("#loginButton").click();

      cy.contains("Logged in as bob");
    });

    it("fails with wrong credentials", function () {
      cy.get("#usernameInput").type("eh");
      cy.get("#passwordInput").type("no");
      cy.get("#loginButton").click();

      cy.contains("Error: invalid username or password");
    });
  });

  describe("When logged in", function () {
    beforeEach(function () {
      cy.get("#usernameInput").type("user");
      cy.get("#passwordInput").type("pass");
      cy.get("#loginButton").click();

      cy.contains("Logged in as bob");
    });

    it("A blog can be created", function () {
      cy.contains("create new blog").click();
      cy.get(".titleInput").type("test title");
      cy.get(".authorInput").type("test author");
      cy.get(".urlInput").type("test url");

      cy.get("#newBlogButton").click();
      cy.contains("test title by test author");
    });
  });

  describe("When blog is created", function () {
    beforeEach(function () {
      cy.get("#usernameInput").type("user");
      cy.get("#passwordInput").type("pass");
      cy.get("#loginButton").click();

      cy.contains("Logged in as bob");

      cy.contains("create new blog").click();
      cy.get(".titleInput").type("test title");
      cy.get(".authorInput").type("test author");
      cy.get(".urlInput").type("test url");

      cy.get("#newBlogButton").click();
      cy.contains("test title by test author");
    });

    it("The blog can be liked", function () {
      cy.contains("view").click();
      cy.get(".like-button").click();
      cy.contains("likes: 1");
    });

    it("The blog can be deleted", function () {
      cy.contains("view").click();
      cy.get(".delete-button").click();
      cy.get("ul").should("not.contain", "test title by test author");
    });
  });

  describe("When there are multiple blogs", function () {
    beforeEach(function () {
      cy.get("#usernameInput").type("user");
      cy.get("#passwordInput").type("pass");
      cy.get("#loginButton").click();

      cy.contains("Logged in as bob");

      cy.contains("create new blog").click();
      cy.get(".titleInput").type("test title");
      cy.get(".authorInput").type("test author");
      cy.get(".urlInput").type("test url");
      cy.get("#newBlogButton").click();

      cy.contains("create new blog").click();
      cy.get(".titleInput").type("test title2");
      cy.get(".authorInput").type("test author2");
      cy.get(".urlInput").type("test url2");
      cy.get("#newBlogButton").click();

      /* cy.contains("create new blog").click();
      cy.get(".titleInput").type("test title3");
      cy.get(".authorInput").type("test author3");
      cy.get(".urlInput").type("test url3");
      cy.get("#newBlogButton").click(); */

      cy.contains("test title by test author");
      cy.contains("test title2 by test author2");
      //cy.contains("test title3 by test author3");
    });

    /* // doesn't work
    it.only("blogs are ordered by number of likes", function () {
      cy.contains("test title by test author")
        .parent()
        .contains("view")
        .click();
      cy.get(".like-button").click();
      cy.contains("test title2 by test author2")
        .parent()
        .contains("view")
        .click()
        .wait(1000);
      cy.contains("test title2 by test author2")
        .parent()
        .children(".like-button")
        .click()
        .wait(1000)
        .click()
        .wait(1000)
        .click();

      cy.contains("likes: 3");
      cy.contains("likes: 1");

      //cy.contains("view").click({ multiple: true });

      let previousLikes;
      cy.get(".blog-item").then((i, blog) => {
        if (i === 0) {
          cy.get(blog)
            .contains("likes: ")
            .invoke("text")
            .then((text) => {
              previousLikes = text.slice(6).parseInt();
            });
        } else {
          cy.contains("likes: ")
            .invoke("text")
            .then((text) => {
              let numberLikes = text.slice(6).parseInt();
              expect(previousLikes).to.be.greaterThan(numberLikes);
              previousLikes = numberLikes;
            });
        }
      });
    }); */
  });
});
