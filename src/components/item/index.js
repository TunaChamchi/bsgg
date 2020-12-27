import withSplitting from 'withSplitting';

export const Weapons = withSplitting(() => import('./Weapons2'));
export const Armors = withSplitting(() => import('./Armors2'));