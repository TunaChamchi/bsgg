import withSplitting from 'withSplitting';

export const Main = withSplitting(() => import('./Main'));
export const Detail = withSplitting(() => import('./Detail'));
export const Map = withSplitting(() => import('./Map'));
export const RouteM = withSplitting(() => import('./RouteM'));
export const NewMain = withSplitting(() => import('./NewMain'));
export const Match = withSplitting(() => import('./Match'));
export const Character = withSplitting(() => import('./Character'));
export const Rank = withSplitting(() => import('./Rank'));
