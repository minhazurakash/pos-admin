// ---------------------ENUM_NO_OF_ENTRIES------------------------- \\

import { $$ } from '@lib/utils/functions';

export const ENUM_NO_OF_ENTRIES = {
  SINGLE_ENTRY: 'SINGLE ENTRY',
  DOUBLE_ENTRY: 'DOUBLE ENTRY',
  MULTIPLE_ENTRY: 'MULTIPLE ENTRY',
};
export const noOfEntriesArray = Object.values(ENUM_NO_OF_ENTRIES);

// ---------------------ENUM_PASSPORT_TYPE------------------------- \\

export const ENUM_PASSPORT_TYPES = {
  ORDINARY_PASSPORT: 'ORDINARY PASSPORT',
  DIPLOMATIC_PASSPORT: 'DIPLOMATIC PASSPORT',
};
export const passportTypeArray = Object.values(ENUM_PASSPORT_TYPES);

// ---------------------ENUM_QUESTION_TYPES------------------------- \\

export const ENUM_QUESTION_TYPES = {
  'YES/NO': 'YES/NO',
  CUSTOM_INPUT: 'CUSTOM_INPUT',
  SINGLE_CHOICE: 'SINGLE_CHOICE',
  MULTIPLE_CHOICE: 'MULTIPLE_CHOICE',
  SEARCHABLE_MULTIPLE_JOB_SECTOR_CHOICE: 'SEARCHABLE_MULTIPLE_JOB_SECTOR_CHOICE',
  SEARCHABLE_MULTIPLE_SKILL_CHOICE: 'SEARCHABLE_MULTIPLE_SKILL_CHOICE',
  SEARCHABLE_MULTIPLE_CERTIFICATION_CHOICE: 'SEARCHABLE_MULTIPLE_CERTIFICATION_CHOICE',
};

export const assessmentQuestionTypeArray = Object.values(ENUM_QUESTION_TYPES);

// ---------------------ENUM_CURRENCY------------------------- \\

export const ENUM_CURRENCY = {
  BDT: 'Bangladeshi Taka',
  USD: 'United States Dollar',
  EUR: 'Euro',
  JPY: 'Japanese Yen',
  GBP: 'British Pound Sterling',
  CAD: 'Canadian Dollar',
  AUD: 'Australian Dollar',
  INR: 'Indian Rupee',
  CNY: 'Chinese Yuan',
  CHF: 'Swiss Franc',
  NZD: 'New Zealand Dollar',
  ZAR: 'South African Rand',
  AED: 'United Arab Emirates Dirham',
  BRL: 'Brazilian Real',
  MXN: 'Mexican Peso',
  SGD: 'Singapore Dollar',
  KRW: 'South Korean Won',
  SEK: 'Swedish Krona',
  DKK: 'Danish Krone',
  NOK: 'Norwegian Krone',
  RUB: 'Russian Ruble',
};
export const currencyArray = Object.keys(ENUM_CURRENCY);
export const currencyData = $$.convertObjectToArray(ENUM_CURRENCY);

// ---------------------ENUM_USER_ROLES------------------------- \\

export const ENUM_USER_ROLES = {
  SUPER_ADMIN: 'Super Admin',
  COMPANY_MAIN_OWNER: 'Company Main Owner',
  ADMIN: 'admin',
  CUSTOMER: 'Customer',
  AGENT: 'Agent',
  CASE_OFFICER: 'Case Officer',
  ACCOUNTS_LEAD: 'Accounts Lead',
  ACCOUNTS_OFFICER: 'Accounts Officer',
  OPERATION_LEAD: 'Operation Lead',
  OPERATION_OFFICER: 'Operation Officer',
  LOGISTIC_LEAD: 'Logistic Lead',
  LOGISTIC_OFFICER: 'Logistic Officer',
  EMBASSY_CO_ORDINATE_LEAD: 'Embassy Co-ordinate Lead',
  EMBASSY_CO_ORDINATE_OFFICER: 'Embassy Co-ordinate Officer',
  CONSULTANT: 'Consultant',
  B2B_USER: 'B2B User',
  CORPORATE_USER: 'Corporate User',
  CLOSING_OFFICER: 'Closing Officer',
};

export const userRoles = Object.values(ENUM_USER_ROLES);

export const ENUM_DISCOUNT_TYPES = {
  REFERRAL: 'referral',
  FIRST_TIME: 'first_time',
  REPEAT: 'repeat',
  // CORPORATE: 'corporate',
  GROUP: 'group',
  // SPECIAL: 'special',
};
export const discountTypeArray = Object.values(ENUM_DISCOUNT_TYPES);

export const ENUM_APPLICATION_DISCOUNT_TYPES = {
  REFERRAL: 'referral',
  FIRST_TIME: 'first_time',
  REPEAT: 'repeat',
  CORPORATE: 'corporate',
  GROUP: 'group',
  SPECIAL: 'special',
  B2B: 'b2b',
  CAMPAIGN: 'campaign',
};
export const applicationDiscountTypeArray = Object.values(ENUM_APPLICATION_DISCOUNT_TYPES);

export const ENUM_DISCOUNT_AMOUNT_TYPES = {
  PERCENTAGE: 'percentage',
  FLAT: 'flat',
};
export const discountAmountTypeArray = Object.values(ENUM_DISCOUNT_AMOUNT_TYPES);

export const ENUM_SPECIAL_DISCOUNT_STATUS_TYPES = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
};
export const specialDiscountStatusTypeArray = Object.values(ENUM_SPECIAL_DISCOUNT_STATUS_TYPES);

export const organizationsData = [
  {
    title: 'Bangladesh',
    slug: 'bangladesh',
    code: 'BD',
  },
  {
    title: 'India',
    slug: 'india',
    code: 'IN',
  },
];

export const ENUM_MENU_TYPES = {
  HEADER: 'HEADER',
  FOOTER: 'FOOTER',
};
export const menuTypesArray = Object.values(ENUM_MENU_TYPES);

export const ENUM_FAMILY_RELATIONS = {
  //   MY_SELF: 'My Self',
  PARENT: 'Parent',
  BROTHER: 'Brother',
  SISTER: 'Sister',
  SPOUSE: 'Spouse',
  FRIEND: 'Friend',
  CHILDREN: 'Children',
  CO_WORKER: 'Co-Worker',
  OTHERS: 'Others',
  CLIENT: 'Client',
};

export const familyRelationsArray = Object.values(ENUM_FAMILY_RELATIONS);

export enum ENUM_B2B_FEATURES_AVAILABILITY_STATUS {
  'Not Available' = 'not_available',
  'Partially Available' = 'partially_available',
  'Available' = 'available',
}
export const b2bFeaturesAvailabilityStatusArray = Object.keys(ENUM_B2B_FEATURES_AVAILABILITY_STATUS);

// B2b Account type

export const ENUM_B2B_ACCOUNT_TYPE = {
  DEFAULT: 'default',
  CUSTOM: 'custom',
};

export const B2bAccountType = Object.values(ENUM_B2B_ACCOUNT_TYPE);

export enum ENUM_B2B_SUBSCRIPTION_REQUEST_STATUS {
  'Drafted' = 'drafted',
  'Submitted' = 'submitted',
  'Review' = 'review',
  'Re Submitted' = 'resubmitted',
  'Switch Plan' = 'switch_plan_requested',
  'Approved' = 'approved',
  'Rejected' = 'rejected',
}
export const b2bSubscriptionRequestStatusArray = Object.keys(ENUM_B2B_SUBSCRIPTION_REQUEST_STATUS);

export const ENUM_B2B_SUBSCRIPTION_REQUEST_STATUSES = {
  drafted: 'drafted',
  submitted: 'submitted',
  review: 'review',
  resubmitted: 'resubmitted',
  switch_plan_requested: 'switch_plan_requested',
  approved: 'approved',
  rejected: 'rejected',
};

export enum ENUM_SPECIAL_DISCOUNT_REQUEST_STATUS {
  APPROVED = 'approved',
  REJECTED = 'rejected',
  PENDING = 'pending',
}
export const specialDiscountRequestArray = Object.values(ENUM_SPECIAL_DISCOUNT_REQUEST_STATUS);

export enum ENUM_ASSESSMENT_TYPE {
  worker_onboard = 'worker_onboard',
}
export const assessmentTypeArray = Object.values(ENUM_ASSESSMENT_TYPE);

export enum ENUM_CUSTOM_FIELD_TYPES {
  'Input' = 'input',
  'Input Number' = 'input_number',
  'Email' = 'email',
  'Text Area' = 'text_area',
  'File Upload' = 'file_upload',
  'Select' = 'select',
}
export const customFieldTypesArray = Object.keys(ENUM_CUSTOM_FIELD_TYPES);

export enum ENUM_ORGANIZATION_NAME {
  BANGLADESH = 'bangladesh',
  INDIA = 'india',
  UAE = 'uae',
  NEPAL = 'nepal',
}

export const organizationsNameArray = Object.values(ENUM_ORGANIZATION_NAME);

export enum ENUM_BLOOD_GROUPS {
  A_POSITIVE = 'a+',
  A_NEGATIVE = 'a-',
  B_POSITIVE = 'b+',
  B_NEGATIVE = 'b-',
  AB_POSITIVE = 'ab+',
  AB_NEGATIVE = 'ab-',
  O_POSITIVE = 'o+',
  O_NEGATIVE = 'o-',
}

export type TBloodGroup = `${ENUM_BLOOD_GROUPS}`;
export const bloodGroups: TBloodGroup[] = Object.values(ENUM_BLOOD_GROUPS);
