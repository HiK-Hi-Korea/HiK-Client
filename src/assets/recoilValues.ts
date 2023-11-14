import {atom} from 'recoil';

export const LocationTypeAtom = atom<string>({
  key: 'locationTypeAtom',
  default: 'store',
});

export const PersonFilterAtom = atom<string>({
  key: 'personFilterAtom',
  default: 'someone',
});

export const IntimacyFilterAtom = atom<number>({
  key: 'intimacyFilterAtom',
  default: 1,
});
