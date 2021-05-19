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
      vrtTrack(name: string, options?: Partial<Loggable & Timeoutable & ScreenshotOptions & TrackOptions>): Chainable<null>;
    }
    interface IgnoreArea {
        x: number;
        y: number;
        width: number;
        height: number;
    }
    interface TrackOptions {
        os?: string;
        device?: string;
        diffTollerancePercent?: number;
        ignoreAreas?: IgnoreArea[];
        retryLimit?: number;
    }
  }
}

addVrtStartCommand();
addVrtStopCommand();
addVrtTrackCommand();
