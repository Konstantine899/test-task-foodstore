export type Mods = Record<string, boolean | string>;

export function classNames(
  cls: string,
  mods: Mods = {},
  additional: Array<string | undefined> = [],
): string {
  const Mods: string[] = Object.entries(mods)
    .filter(([_, value]) => Boolean(value))
    .map(([className]) => className);

  const Additional = additional.filter(Boolean);
  return [cls, ...Mods, ...Additional].join(' ');
}
