export const ENUM_APPLICATION_PROCESSING_STATUS = {
  PENDING: 'pending',
  RECEIVED: 'received',
  PASSED: 'passed',
  SENT_BACK: 'sent-back',
  REVERTED: 'reverted',
};

export const applicationProcessingStatusArray = Object.values(ENUM_APPLICATION_PROCESSING_STATUS);

export const ENUM_APPLICATION_ABILITIES = {
  ADD_AWB: 'ADD_AWB',
};
export const applicationAbilitiesData = Object.values(ENUM_APPLICATION_ABILITIES);

export const ENUM_PAYMENT_GATEWAY = {
  SYSTEM: 'SYSTEM',
  AMARPAY: 'AMARPAY',
  RAZORPAY: 'RAZORPAY',
  NGENIUS: 'NGENIUS',
  BKASH: 'BKASH',
  NAGAD: 'NAGAD',
  SSL_COMMERZ: 'SSL_COMMERZ',
};

export const paymentGatewayArray = Object.values(ENUM_PAYMENT_GATEWAY);

export const ENUM_PAYMENT_METHOD = {
  CASH: 'CASH',
  CARD: 'CARD',
  BFTN: 'BFTN',
  BKASH: 'BKASH',
  NAGAD: 'NAGAD',
  CASH_CHEQUE: 'CASH_CHEQUE',
  BANK_DEPOSIT: 'BANK_DEPOSIT',
  ACCOUNT_PAYEE_CHEQUE: 'ACCOUNT_PAYEE_CHEQUE',
};

export const paymentMethodArray = Object.values(ENUM_PAYMENT_METHOD);

export const ENUM_APPLICATION_TYPE = {
  DEFAULT: 'DEFAULT',
  INTERNAL: 'INTERNAL',
  SEND_BACK: 'SEND_BACK',
};

export const applicationTypeArray = Object.keys(ENUM_APPLICATION_TYPE);

export const ENUM_APPLICATION_DISCOUNT_TYPES = {
  REFERRAL: 'referral',
  CORPORATE: 'corporate',
  SPECIAL: 'special',
  REPEAT: 'repeat',
  COMPLEMENTARY: 'complementary',
};
export const applicationDiscountTypeArray = Object.keys(ENUM_APPLICATION_DISCOUNT_TYPES);
