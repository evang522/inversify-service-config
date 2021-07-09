// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const isSymbol = (value: any): boolean =>
{
    return typeof value === 'symbol' || value instanceof Symbol;
};
