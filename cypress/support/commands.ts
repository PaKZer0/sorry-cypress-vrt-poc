import {
  addVrtTrackCommand,
  addVrtStartCommand,
  addVrtStopCommand,
} from "@visual-regression-tracker/agent-cypress/dist/commands";

// add new command to the existing Cypress interface
declare global {
  namespace Cypress{
    interface Chainable<Subject> {
      vrtStart(): Chainable<Subject>;
      vrtStop(): Chainable<Subject>;
      vrtTrack(track_name: string, track_info: string, options: object): Chainable<Subject>;
    }
  }
}

addVrtStartCommand();
addVrtStopCommand();
addVrtTrackCommand();
