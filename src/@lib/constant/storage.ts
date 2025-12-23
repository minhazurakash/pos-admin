import { ENUM_THEME_TYPES } from '@lib/enum/theme.enum';

export interface IB2bRequestState {
  information: any;
  documents?: any;
  step: 'basic-information' | 'document-upload' | 'final-review';
}

interface ILocalStorageStates {
  [name: string]: {
    key: string;
    initialValue: any;
  };
}

export const localStorageState: ILocalStorageStates = {
  theme: {
    key: 'theme',
    initialValue: ENUM_THEME_TYPES.SYSTEM,
  },
  b2bTutorial: {
    key: 'b2b-tutorial',
    initialValue: true,
  },
  menu: {
    key: 'menu',
    initialValue: {
      openedMenuKeys: [],
      activeTabsKeys: 'menu',
    },
  },
  b2b: {
    key: 'b2b_create_request',
    initialValue: {
      information: null,
      step: 'basic-information',
    },
  },
};
