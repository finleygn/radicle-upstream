context("navigation", () => {
  before(() => {
    cy.nukeAllState();
    cy.createProjectWithFixture();
  });

  beforeEach(() => {
    cy.visit("./public/index.html#/projects");
  });

  context("when the app is opened for the first time", () => {
    it("shows the projects screen", () => {
      cy.contains("Projects").should("exist");
    });

    it("shows the four default mock projects", () => {
      cy.contains("Monadic").should("exist");
    });
  });

  context("sidebar", () => {
    it("provides navigation to all main sections of the app", () => {
      cy.get('[data-cy="sidebar"] [data-cy="search"]').click();
      cy.get('[data-cy="page"]').should("contain", "Search");

      cy.get('[data-cy="sidebar"] [data-cy="network"]').click();
      cy.get('[data-cy="page"]').should("contain", "Network");

      cy.get('[data-cy="sidebar"] [data-cy="profile"]').click();
      cy.get('[data-cy="page"]').should("contain", "My Projects");
      cy.get('[data-cy="page"]').should("contain", "New Project");
    });
  });

  context("project topbar", () => {
    it("opens the project overview by default", () => {
      cy.get('[data-cy="sidebar"] [data-cy="profile"]').click();
      cy.contains("Monadic").click();

      cy.get("h2")
        .contains("Overview")
        .should("exist");
      cy.get("[data-cy=topbar]").within(() => {
        cy.contains("Monadic").should("exist");
      });
    });

    it("provides navigation to all sub-sections of a project", () => {
      cy.get('[data-cy="sidebar"] [data-cy="profile"]').click();
      cy.contains("Monadic").click();

      cy.get("h2")
        .contains("Overview")
        .should("exist");

      cy.get('[data-cy="project-topbar-menu"]')
        .get('a[title="ProjectFeed"]')
        .click();
      cy.get("h2")
        .contains("Feed")
        .should("exist");
      cy.get("[data-cy=project-topbar-menu]").within(() => {
        cy.contains("Feed").should("exist");
      });

      cy.get('[data-cy="project-topbar-menu"]')
        .get('a[title="ProjectIssues"]')
        .click();
      cy.get("h2")
        .contains("Issues")
        .should("exist");
      cy.get("[data-cy=project-topbar-menu]").within(() => {
        cy.contains("Issues").should("exist");
      });

      cy.get('[data-cy="project-topbar-menu"]')
        .get('a[title="ProjectFund"]')
        .click();
      cy.get("h2")
        .contains("Register your project to receive donations")
        .should("exist");
      cy.get("[data-cy=project-topbar-menu]").within(() => {
        cy.contains("Fund").should("exist");
      });

      cy.get('[data-cy="project-topbar-menu"]')
        .get('a[title="ProjectSource"]')
        .click();
      cy.get("thead")
        .contains("Commit Message")
        .should("exist");
      cy.get("[data-cy=project-topbar-menu]").within(() => {
        cy.contains("Source").should("exist");
      });

      cy.get('[data-cy="project-topbar-menu"]')
        .get('a[title="ProjectRevisions"]')
        .click();
      cy.get("h2")
        .contains("Revisions")
        .should("exist");
      cy.get("[data-cy=project-topbar-menu]").within(() => {
        cy.contains("Revisions").should("exist");
      });
    });
  });

  context("projects page", () => {
    context("clicking on the project name", () => {
      it("navigates to project overview", () => {
        cy.get('[data-cy="sidebar"] [data-cy="profile"]').click();
        cy.contains("Monadic").click();
        cy.get('[data-cy="project-topbar-menu"]')
          .get('a[title="ProjectSource"]')
          .click();

        cy.contains("Monadic").click();
        cy.contains("Overview").should("exist");
      });
    });

    context("when using the vertical scrollbar", () => {
      it("stays fixed at the top", () => {
        cy.get('[data-cy="sidebar"] [data-cy="profile"]').click();
        cy.contains("Monadic").click();
        cy.get('[data-cy="project-topbar-menu"]')
          .get('a[title="ProjectSource"]')
          .click();

        cy.get("[data-cy=source-tree]").within(() => {
          cy.get("[data-cy=expand-src]").click();
          cy.contains("Eval.hs").click();
        });
        cy.get("[data-cy=scrollable-content]").scrollTo("bottom");

        cy.get("[data-cy=project-topbar-menu]").should("be.inViewport");
      });
    });
  });
});