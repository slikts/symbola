import { log, logger, Loggable } from "./Loggable";
import { Indexable } from "../common";
import { extend } from "../util";

extend(Object.prototype, Loggable.prototype, {
  [logger]: console.log
});

global.log = log;
type log = typeof log;
declare global {
  interface Object extends Loggable {}
  const global: Indexable<any>;
  const log: log;
}

export default log;
