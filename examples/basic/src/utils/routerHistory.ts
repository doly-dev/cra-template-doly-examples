import type { History } from 'history';

export let routerHistory: History;

export function syncHistory(his: History) {
  routerHistory = his;
}
