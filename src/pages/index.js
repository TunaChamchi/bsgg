import withSplitting from 'withSplitting';

export const Main = withSplitting(() => import('./Main'));
export const Detail = withSplitting(() => import('./Detail'));
export const Map = withSplitting(() => import('./Map'));
export const RouteM = withSplitting(() => import('./RouteM'));
export const NewMain = withSplitting(() => import('./NewMain'));
export const Match = withSplitting(() => import('./match'));
export const Character = withSplitting(() => import('./character'));
export const Rank = withSplitting(() => import('./rank'));
export const Rank_Character = withSplitting(() => import('./rank_Character'));
export const Stat = withSplitting(() => import('./Stat'));
export const Talk = withSplitting(() => import('./Talk'));
export const Talk2 = withSplitting(() => import('./Talk2'));
export const Talk3 = withSplitting(() => import('./Talk3'));
export const Talk4 = withSplitting(() => import('./Talk4'));

export const Error404 = withSplitting(() => import('./404'));
