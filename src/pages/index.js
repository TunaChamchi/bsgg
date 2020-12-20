import withSplitting from 'withSplitting';

export const Main = withSplitting(() => import('./Main'));
export const Detail = withSplitting(() => import('./Detail'));
export const Map = withSplitting(() => import('./Map'));
export const RouteM = withSplitting(() => import('./RouteM'));
export const NewMain = withSplitting(() => import('./NewMain'));