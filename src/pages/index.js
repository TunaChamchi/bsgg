import withSplitting from 'withSplitting';

export const Main = withSplitting(() => import('./Main2'));
export const Detail = withSplitting(() => import('./Detail2'));
export const Map = withSplitting(() => import('./Map'));
export const RouteM = withSplitting(() => import('./RouteM'));
export const NewMain = withSplitting(() => import('./NewMain'));
export const Match = withSplitting(() => import('./match'));
export const Character = withSplitting(() => import('./character'));
export const Rank = withSplitting(() => import('./rank'));
export const Rank_Character = withSplitting(() => import('./rank_Character'));
