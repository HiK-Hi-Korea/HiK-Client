import {atom} from 'recoil';

export const LocationTypeAtom = atom<string>({
  key: 'locationTypeAtom',
  default: 'university',
});
