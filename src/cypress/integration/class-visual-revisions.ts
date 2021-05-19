export class VRTUrl{
  url: string;
  sections: string[];
  scroller: any;
  removeStickers: any;

  constructor(
      url: string,
      sections: string[]=undefined,
      scroller: any=() => {},
      removeStickers: any=() => {}
    ){
    this.url = url;
    this.sections = sections;
    this.scroller = scroller;
    this.removeStickers = removeStickers;
  }
}

export abstract class VRTTest{
  urls: VRTUrl[];

  constructor(urls: VRTUrl[]){
    this.urls = urls;
  }

  abstract removeStickers(): void;

  getTest() {
    return describe('Performs a visual testing over a whole page or component', () => {
      before(() => {
        cy.vrtStart();
      });

      after(() => {
        cy.vrtStop();
      });

      beforeEach(() => {
        cy.clearCookies();
        cy.clearLocalStorage();
        cy.reload();
      });

      context('Performs visual tracking of pages and components', () => {
        it('Captures desktop and mobile versions of the urls', () => {
          this.urls.forEach(page => {
            cy.visit(page.url, {
              headers: {
                "Accept-Encoding": "gzip, deflate",
                Connection: "Keep-Alive",
              }
            });

            // this per site functon removes sticky elements and makes the header
            // stay on the top of the page instead following the scroll
            cy.wait(1000);
            this.removeStickers();
            cy.wait(1000);

            let scroll_options = {
              duration: 500,
              ensureScrollable: false
            };

            cy.scrollTo('top').then(() => {
              // track whole page
              cy.title().then(($title) => {
                // desktop
                cy.viewport(1920, 1080).then(() => {
                  // the scroller is a small function to scroll to a particular
                  // place in the page to load things up
                  if ('scroller' in page){
                    page?.scroller(scroll_options);
                  }

                  if ('removeStickers' in page){
                    page.removeStickers();
                  }
                  cy.wait(1000);

                  cy.scrollTo('bottom', scroll_options)
                    .scrollTo('center', scroll_options)
                    .scrollTo('top', scroll_options).then(() =>{
                    cy.vrtTrack($title + ": desktop", { device: "desktop" });
                  });
                  //cy.vrtTrack($title + ": desktop", { device: "desktop" });
                });

                // mobile
                cy.viewport(375, 667).then(() => {
                  cy.wait(1000);
                  cy.scrollTo('bottom', scroll_options)
                    .scrollTo('center', scroll_options)
                    .scrollTo('top', scroll_options).then(() =>{
                    cy.vrtTrack($title + ": mobile", { device: "mobile" });
                  });
                  //cy.vrtTrack($title + ": mobile", { device: "mobile" });
                });
              });


              // track sections
              page?.sections?.forEach((selector) => {
                cy.get(selector).then(($section) => {
                  // desktop
                  cy.viewport(1920, 1080).then(() => {
                    cy.get(selector).vrtTrack(selector + ": desktop", { device: "desktop" });
                  });

                  // mobile
                  cy.viewport(375, 667).then(() => {
                    cy.get(selector).vrtTrack(selector + ": mobile", { device: "mobile"  });
                  });
                });
              });
            });
          });
        });
      });
    });
  }
}
