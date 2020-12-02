import withSplitting from 'withSplitting';

export const Weapons = withSplitting(() => import('./Weapons'));
export const Items = withSplitting(() => import('./Items'));