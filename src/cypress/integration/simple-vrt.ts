describe('Simple VRT test', () => {
  before(() => {
    cy.vrtStart();
  });

  after(() => {
    cy.vrtStop();
  });

  it('Goes to the home page and performs two screen caps', function () {
    cy.visit('/')

    cy.title().then(($title) => {
      let selector = ".address:nth-child(2)";

      // remove sticky header and gliders
      cy.get('header.site-header').then((header) => {
        Cypress.$(header).css('position', 'absolute');
        Cypress.$('#CookielawBanner').css('display', 'none');
        Cypress.$('.fixed-tag').css('display', 'none');
        Cypress.$('.back-top').css('display', 'none');
      });


      // desktop
      cy.viewport(1920, 1080).then(() => {
        cy.wait(1000);
        cy.vrtTrack($title + ": desktop", { device: "desktop"});
        cy.get(selector).vrtTrack(selector + ": desktop", { device: "desktop" });
      });

      // mobile
      cy.viewport(375, 667).then(() => {
        cy.wait(1000);
        cy.vrtTrack($title + ": mobile", { device: "mobile"});
        cy.get(selector).vrtTrack(selector + ": mobile", { device: "mobile"  });
      });
    });
  })
})
