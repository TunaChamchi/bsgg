import withSplitting from 'withSplitting';

export const Main = withSplitting(() => import('./Main'));
export const Detail = withSplitting(() => import('./Detail'));
export const Item = withSplitting(() => import('./Item'));
export const Map = withSplitting(() => import('./Map'));