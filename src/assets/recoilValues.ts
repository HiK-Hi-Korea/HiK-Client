import {atom} from 'recoil';

export const LocationTypeAtom = atom<string>({
  key: 'locationTypeAtom',
  default: 'not found',
});

export const PersonFilterAtom = atom<string>({
  key: 'personFilterAtom',
  default: 'someone',
});

export const IntimacyFilterAtom = atom<number>({
  key: 'intimacyFilterAtom',
  default: 1,
});

export const UserIdAtom = atom<string>({
  key: 'userId',
  default: '110717890204104809197',
});

export const IsUserAtom = atom<boolean>({
  key: 'isUser',
  default: false,
});

export const UserNameAtom = atom<string>({
  key: 'username',
  default: 'HiK',
});

export const UserEmailAtom = atom<string>({
  key: 'useremail',
  default: 'HiK@gmail.com',
});

export const UserAgeAtom = atom<number>({
  key: 'userage',
  default: 20,
});