import { TreeDataNode } from 'antd';

export const PermissionTree: TreeDataNode[] = [
  {
    title: 'Accounts Module',
    key: 'account_module',
    children: [
      {
        title: 'Dashboard',
        key: 'Dashboard',
        children: [
          {
            title: 'read',
            key: 'internal-accounts-dashboard-analytics:read',
          },
        ],
      },
      {
        title: 'Dashboard',
        key: 'distributed Dashboard',
        children: [
          {
            title: 'read',
            key: 'internal-distributed-dashboard:read',
          },
        ],
      },
      {
        title: 'Application',
        key: 'dashboard-application',
        children: [
          {
            title: 'read',
            key: 'internal-accounts-application:read',
          },
        ],
      },
      {
        title: 'Accounts Statements',
        key: 'Statements',
        children: [
          {
            title: 'read',
            key: 'internal-accounts-statements:read',
          },
          {
            title: 'write',
            key: 'internal-accounts-statements:write',
          },
        ],
      },
      {
        title: 'Accounts Transactions',
        key: 'Accounts Transactions',
        children: [
          {
            title: 'read',
            key: 'internal-accounts-transactions:read',
          },
          {
            title: 'write',
            key: 'internal-accounts-transactions:write',
          },
        ],
      },
      {
        title: 'Accounts Requisitions',
        key: 'Accounts requisitions',
        children: [
          {
            title: 'read',
            key: 'internal-accounts-requisitions:read',
          },
          {
            title: 'write',
            key: 'internal-accounts-requisitions:write',
          },
        ],
      },
      {
        title: 'Accounts Requisitions',
        key: 'Accounts requisitions',
        children: [
          {
            title: 'read',
            key: 'internal-accounts-requisitions:read',
          },
          {
            title: 'write',
            key: 'internal-accounts-requisitions:write',
          },
        ],
      },
      {
        title: 'Source Head',
        key: 'source-',
        children: [
          {
            title: 'read',
            key: 'internal-source-head:read',
          },
          {
            title: 'write',
            key: 'internal-source-head:write',
          },
          {
            title: 'write',
            key: 'internal-source-head:delete',
          },
        ],
      },
      {
        title: 'Source Sub Head',
        key: 'source-Sub-Head',
        children: [
          {
            title: 'read',
            key: 'internal-source-sub-head:read',
          },
          {
            title: 'write',
            key: 'internal-source-sub-head:write',
          },
          {
            title: 'write',
            key: 'internal-source-sub-head:delete',
          },
        ],
      },
      {
        title: 'Account Cash In',
        key: 'account-cash-in',
        children: [
          {
            title: 'read',
            key: 'internal-accounts-cash_in:read',
          },
          {
            title: 'write',
            key: 'internal-accounts-cash_in:write',
          },
        ],
      },
      {
        title: 'Account Cash Out',
        key: 'account-cash-out',
        children: [
          {
            title: 'read',
            key: 'internal-accounts-cash_out:read',
          },
          {
            title: 'write',
            key: 'internal-accounts-cash_out:write',
          },
        ],
      },
      {
        title: 'Splitted-Statement',
        key: 'Spited-statement',
        children: [
          {
            title: 'Service Fee Statement Read',
            key: 'internal-service-fee-statement:read',
          },
          {
            title: 'Visa Fee Statement Read',
            key: 'internal-visa-fee-statement:read',
          },
          {
            title: 'Center Fee Statement Read',
            key: 'internal-center-fee-statement:read',
          },
          {
            title: 'Premium Fee Statement Read',
            key: 'internal-premium-fee-statement:read',
          },
          {
            title: 'Insurance Fee Statement Read',
            key: 'internal-insurance-fee-statement:read',
          },
          {
            title: 'Vat Statement Read',
            key: 'internal-vat-statement:read',
          },
          {
            title: 'Tax Statement Read',
            key: 'internal-tax-statement:read',
          },
          {
            title: 'Checklist Statement Read',
            key: 'internal-checklist-statement:read',
          },
          {
            title: 'Subscription Statement Read',
            key: 'internal-subscription-statement:read',
          },
          {
            title: 'Recharge Statement Read',
            key: 'internal-recharge-statement:read',
          },
          {
            title: 'Commision Statement Read',
            key: 'internal-commission-statement:read',
          },
        ],
      },
      {
        title: 'Accounts Invoices',
        key: 'invoices',
        children: [
          {
            title: 'read',
            key: 'internal-accounts-invoices:read',
          },
          {
            title: 'write',
            key: 'internal-accounts-invoices:write',
          },
        ],
      },
      {
        title: 'Distributed',
        key: 'distributed-dashboard',
        children: [
          {
            title: 'Monthly Config',
            key: 'monthly-config',
            children: [
              {
                title: 'read',
                key: 'accounts-monthly-config:read',
              },
              {
                title: 'write',
                key: 'accounts-monthly-config:write',
              },
              {
                title: 'delete',
                key: 'accounts-monthly-config:delete',
              },
            ],
          },
          {
            title: 'Distribution Cash In',
            key: 'Distribution-cash-in',
            children: [
              {
                title: 'read',
                key: 'internal-accounts-distribution-cash-in-list:read',
              },
              {
                title: 'write',
                key: 'internal-accounts-distribution-cash-in-list:write',
              },
            ],
          },
          {
            title: 'Distribution Cash out',
            key: 'Distribution-cash-out',
            children: [
              {
                title: 'read',
                key: 'internal-accounts-distribution-cash-out-list:read',
              },
              {
                title: 'write',
                key: 'internal-accounts-distribution-cash-out-list:write',
              },
            ],
          },
          {
            title: 'Departments List',
            key: 'departments-list',
            children: [
              {
                title: 'read',
                key: 'internal-departments-list:read',
              },
              {
                title: 'write',
                key: 'internal-departments-list:write',
              },
              {
                title: 'delete',
                key: 'internal-departments-list:delete',
              },
            ],
          },
          {
            title: 'Csuites List',
            key: 'csuites-list',
            children: [
              {
                title: 'read',
                key: 'internal-csuites-list:read',
              },
              {
                title: 'write',
                key: 'internal-csuites-list:write',
              },
              {
                title: 'delete',
                key: 'internal-csuites-list:delete',
              },
            ],
          },
          {
            title: 'Requisition Type',
            key: 'Requisition-type',
            children: [
              {
                title: 'read',
                key: 'internal-requisition-types-list:read',
              },
              {
                title: 'write',
                key: 'internal-requisition-types-list:write',
              },
              {
                title: 'delete',
                key: 'internal-requisition-types-list:delete',
              },
            ],
          },
          {
            title: 'Expense Types List',
            key: 'expense-types-list',
            children: [
              {
                title: 'read',
                key: 'internal-expense-types-list:read',
              },
              {
                title: 'write',
                key: 'internal-expense-types-list:write',
              },
              {
                title: 'delete',
                key: 'internal-expense-types-list:delete',
              },
            ],
          },
          {
            title: 'Other Distributions List',
            key: 'other-distributions-list',
            children: [
              {
                title: 'read',
                key: 'internal-other-distributions-list:read',
              },
              {
                title: 'write',
                key: 'internal-other-distributions-list:write',
              },
              {
                title: 'delete',
                key: 'internal-other-distributions-list:delete',
              },
            ],
          },
          {
            title: 'Expense Head List',
            key: 'expense-head-list',
            children: [
              {
                title: 'read',
                key: 'internal-expense-head-list:read',
              },
              {
                title: 'write',
                key: 'internal-expense-head-list:write',
              },
              {
                title: 'delete',
                key: 'internal-expense-head-list:delete',
              },
            ],
          },
          {
            title: 'Expense Sub Head List',
            key: 'expense-sub-head-list',
            children: [
              {
                title: 'read',
                key: 'internal-expense-sub-head-list:read',
              },
              {
                title: 'write',
                key: 'internal-expense-sub-head-list:write',
              },
              {
                title: 'delete',
                key: 'internal-expense-sub-head-list:delete',
              },
            ],
          },
        ],
      },
      {
        title: 'Account Approval Step',
        key: 'account-approval-step',
        children: [
          {
            title: 'read',
            key: 'internal-account-approval-step:read',
          },
          {
            title: 'write',
            key: 'internal-account-approval-step:write',
          },
          {
            title: 'delete',
            key: 'internal-account-approval-step:delete',
          },
        ],
      },
    ],
  },
  {
    title: 'Application Module',
    key: 'application_module',
    children: [
      {
        title: 'Default Application',
        key: 'Application Module',
        children: [
          {
            title: 'Default Application Module',
            key: 'internal-default-application:read',
          },
          {
            title: 'Columns',
            key: 'Columns-',
            children: [
              {
                title: 'Payment Status',
                key: 'internal-payment-status:read',
              },
              {
                title: 'Paid Amount',
                key: 'internal-paid-amount:read',
              },
              {
                title: 'Application Stage Status',
                key: 'internal-application-stage-status:read',
              },

              {
                title: 'Case Officer Read',
                key: 'internal-case-officer:read',
              },
              {
                title: 'Assigned By',
                key: 'internal-assigned-by:read',
              },
              {
                title: 'Application check',
                key: 'internal-application-check:read',
              },
              {
                title: 'Country & Service',
                key: 'internal-application-country-service-category:read',
              },
            ],
          },

          //
          //   {
          //     title: 'Stage Status',
          //     key: 'internal-application-stage-status:read',
          //   },
          {
            title: 'Actions Buttons',
            key: 'application action buttons',
            children: [
              {
                title: 'Add AWB',
                key: 'internal-applications:add-awb',
              },
              {
                title: 'AWB Details',
                key: 'internal-awb-details:read',
              },
              {
                title: 'Application Create',
                key: 'internal-application:create',
              },
              {
                title: 'Application Invoice',
                key: 'internal-application-invoice:read',
              },
              {
                title: 'Money Recept',
                key: 'internal-application-money-receipt:read',
              },
              {
                title: 'Summery',
                key: 'internal-application-summary:read',
              },
              {
                title: 'Notes',
                key: 'internal-application-notes:read',
              },
              {
                title: 'Approve Transaction',
                key: 'internal-application-approve-transaction:read',
              },
              {
                title: 'Additional Payment',
                key: 'internal-application-additional-payment:read',
              },

              {
                title: 'Application Details',
                key: 'application-details',
                children: [
                  {
                    title: 'read',
                    key: 'internal-application-details:read',
                  },
                  {
                    title: 'write',
                    key: 'internal-application-details:write',
                  },
                  {
                    title: 'delete',
                    key: 'internal-application-details:delete',
                  },
                ],
              },
              {
                title: 'Custom task read',
                key: 'internal-application-custom-task:read',
              },
              {
                title: 'Custom task write',
                key: 'internal-application-custom-task:write',
              },
              {
                title: 'Print',
                key: 'internal-application-print:read',
              },
              {
                title: 'Confirm Application',
                key: 'internal-application-confirm:read',
              },
              {
                title: 'Case Processing History',
                key: 'internal-case-processing-history:read',
              },
              {
                title: 'Application update info',
                key: 'Application update info',
                children: [
                  {
                    title: 'read',
                    key: 'internal-application-update-info:read',
                  },
                  {
                    title: 'write',
                    key: 'internal-application-update-info:write',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        key: 'web_application',
        title: 'Web Application',
        children: [
          {
            key: 'internal-web-application:read',
            title: 'read',
          },
          {
            key: 'internal-web-application:approve',
            title: 'Approve',
          },
        ],
      },
      {
        key: 'all_application',
        title: 'All Application',
        children: [
          {
            key: 'internal-all-application:read',
            title: 'read',
          },
          {
            key: 'internal-all-application-mark-test:read',
            title: 'Mark Test Read',
          },
          {
            key: 'internal-all-application:delete',
            title: 'delete',
          },
        ],
      },
      {
        key: 'paid_application',
        title: 'Paid Application',
        children: [
          {
            key: 'internal-paid-application:read',
            title: 'read',
          },
          {
            key: 'internal-paid-application-mark-test:read',
            title: 'Mark Test Read',
          },
          {
            key: 'internal-paid-application:delete',
            title: 'delete',
          },
        ],
      },
      {
        key: 'drafted_application',
        title: 'Drafted Application',
        children: [
          {
            key: 'internal-drafted-application:read',
            title: 'read',
          },
          {
            key: 'internal-drafted-application-mark-test:read',
            title: 'Mark Test Read',
          },
          {
            key: 'internal-drafted-application:delete',
            title: 'delete',
          },
        ],
      },
      {
        key: 'b2b_application',
        title: 'B2B Application',
        children: [
          {
            key: 'internal-b2b-application:read',
            title: 'read',
          },
          {
            key: 'internal-b2b-application:approve',
            title: 'Approve',
          },
        ],
      },
    ],
  },
  {
    key: 'omni_channel',
    title: 'Omni Channel',
    children: [
      {
        key: 'source',
        title: 'Source',
        children: [
          {
            key: 'internal-source:read',
            title: 'read',
          },
          {
            key: 'internal-source:write',
            title: 'write',
          },
          {
            key: 'internal-source:delete',
            title: 'delete',
          },
        ],
      },
      {
        key: 'channel',
        title: 'Channel',
        children: [
          {
            key: 'internal-channel:read',
            title: 'read',
          },
          {
            key: 'internal-channel:write',
            title: 'write',
          },
          {
            key: 'internal-channel:delete',
            title: 'delete',
          },
        ],
      },
      {
        key: 'contact',
        title: 'Contact',
        children: [
          {
            key: 'internal-contact:read',
            title: 'read',
          },
        ],
      },
      {
        key: 'whatsapp',
        title: 'Whatsapp',
        children: [
          {
            key: 'internal-whatsapp:read',
            title: 'read',
          },
          {
            key: 'internal-whatsapp:write',
            title: 'write',
          },
          {
            key: 'internal-whatsapp:delete',
            title: 'delete',
          },
        ],
      },
      {
        key: 'facebook',
        title: 'Facebook',
        children: [
          {
            key: 'internal-facebook:read',
            title: 'read',
          },
          {
            key: 'internal-facebook:write',
            title: 'write',
          },
          {
            key: 'internal-facebook:delete',
            title: 'delete',
          },
        ],
      },
      {
        key: 'telegram',
        title: 'Telegram',
        children: [
          {
            key: 'internal-telegram:read',
            title: 'read',
          },
          {
            key: 'internal-telegram:write',
            title: 'write',
          },
          {
            key: 'internal-telegram:delete',
            title: 'delete',
          },
        ],
      },
      {
        key: 'viber',
        title: 'Viber',
        children: [
          {
            key: 'internal-viber:read',
            title: 'read',
          },
          {
            key: 'internal-viber:write',
            title: 'write',
          },
          {
            key: 'internal-viber:delete',
            title: 'delete',
          },
        ],
      },
      {
        key: 'stage',
        title: 'Stage',
        children: [
          {
            key: 'internal-stage:read',
            title: 'read',
          },
          {
            key: 'internal-stage:write',
            title: 'write',
          },
          {
            key: 'internal-stage:delete',
            title: 'delete',
          },
        ],
      },
      {
        key: 'inquiry',
        title: 'Inquiry',
        children: [
          {
            key: 'internal-inquiry:read',
            title: 'read',
          },
          {
            key: 'internal-inquiry:write',
            title: 'write',
          },
        ],
      },
      {
        key: 'inquiry-dashboard',
        title: 'Inquiry Dashboard',
        children: [
          {
            key: 'internal-inquiry-dashboard:read',
            title: 'read',
          },
          {
            key: 'internal-inquiry-dashboard:write',
            title: 'write',
          },
        ],
      },
      {
        key: 'inquiry-followup',
        title: 'Inquiry Followup',
        children: [
          {
            key: 'internal-inquiry-followup:read',
            title: 'read',
          },
          {
            key: 'internal-inquiry-followup:write',
            title: 'write',
          },
        ],
      },
      {
        key: 'agent',
        title: 'Agent',
        children: [
          {
            key: 'internal-agent:read',
            title: 'read',
          },
          {
            key: 'internal-agent:write',
            title: 'write',
          },
          {
            key: 'internal-agent:delete',
            title: 'delete',
          },
        ],
      },
      {
        key: 'task',
        title: 'Task',
        children: [
          {
            key: 'internal-task:read',
            title: 'read',
          },
          {
            key: 'internal-task:write',
            title: 'write',
          },
        ],
      },
    ],
  },
  {
    title: 'Lead Capture',
    key: 'lead_capture',
    children: [
      {
        title: 'Lead Capture Questions',
        key: 'lead_capture_questions',
        children: [
          {
            title: 'read',
            key: 'internal-lead-capture-question:read',
          },
          {
            title: 'write',
            key: 'internal-lead-capture-question:write',
          },
          {
            title: 'delete',
            key: 'internal-lead-capture-question:delete',
          },
        ],
      },
      {
        title: 'Lead Capture Question Groups',
        key: 'lead_capture_question_groups',
        children: [
          {
            title: 'read',
            key: 'internal-lead-capture-question-group:read',
          },
          {
            title: 'write',
            key: 'internal-lead-capture-question-group:write',
          },
          {
            title: 'delete',
            key: 'internal-lead-capture-question-group:delete',
          },
        ],
      },
      // {
      //   title: 'Lead Capture Answer Types',
      //   key: 'lead_capture_answer_types',
      //   children: [
      //     {
      //       title: 'read',
      //       key: 'internal-lead-capture-answer-type:read',
      //     },
      //     {
      //       title: 'write',
      //       key: 'internal-lead-capture-answer-type:write',
      //     },
      //     {
      //       title: 'delete',
      //       key: 'internal-lead-capture-answer-type:delete',
      //     },
      //   ],
      // },
      {
        title: 'Lead Capture Answers',
        key: 'lead_capture_answers',
        children: [
          {
            title: 'read',
            key: 'internal-lead-capture-answer:read',
          },
          {
            title: 'write',
            key: 'internal-lead-capture-answer:write',
          },
          {
            title: 'delete',
            key: 'internal-lead-capture-answer:delete',
          },
        ],
      },
      {
        title: 'Segments',
        key: 'segments',
        children: [
          {
            title: 'read',
            key: 'internal-segments:read',
          },
          {
            title: 'write',
            key: 'internal-segments:write',
          },
          {
            title: 'delete',
            key: 'internal-segments:delete',
          },
        ],
      },
      {
        title: 'Lead Captured',
        key: 'lead_captured',
        children: [
          {
            title: 'read',
            key: 'internal-lead-captured:read',
          },
          {
            title: 'write',
            key: 'internal-lead-captured:write',
          },
          {
            title: 'delete',
            key: 'internal-lead-captured:delete',
          },
          {
            title: 'classify',
            key: 'internal-lead-captured:classify',
          },
        ],
      },
    ],
  },
  {
    key: 'user',
    title: 'User',
    children: [
      {
        key: 'user',
        title: 'User',
        children: [
          {
            key: 'internal-user:read',
            title: 'read',
          },
          {
            key: 'internal-user:write',
            title: 'write',
          },
          {
            key: 'internal-user:delete',
            title: 'delete',
          },
          {
            key: 'internal-user:force-verify',
            title: 'Force Verify',
          },
          {
            key: 'internal-user:update-password',
            title: 'Update Password',
          },
        ],
      },
      {
        key: 'client',
        title: 'Client',
        children: [
          {
            key: 'internal-client:read',
            title: 'read',
          },
          {
            key: 'internal-client:write',
            title: 'write',
          },
        ],
      },
      {
        key: 'user_family',
        title: 'User Family',
        children: [
          {
            key: 'internal-user-family:read',
            title: 'read',
          },
          {
            key: 'internal-user-family:write',
            title: 'write',
          },
        ],
      },
      {
        key: 'b2b_client',
        title: 'B2B Client',
        children: [
          {
            key: 'internal-b2b-client:read',
            title: 'read',
          },
          {
            key: 'internal-b2b-client:write',
            title: 'write',
          },
        ],
      },
      {
        key: 'role',
        title: 'Role',
        children: [
          {
            key: 'internal-role:read',
            title: 'read',
          },
          {
            key: 'internal-role:write',
            title: 'write',
          },
          {
            key: 'internal-role:delete',
            title: 'delete',
          },
        ],
      },
      {
        key: 'permission',
        title: 'Permission',
        children: [
          {
            key: 'internal-permission:read',
            title: 'read',
          },
          {
            key: 'internal-permission:write',
            title: 'write',
          },
          {
            key: 'internal-permission:delete',
            title: 'delete',
          },
        ],
      },
      {
        key: 'permission_type',
        title: 'Permission Type',
        children: [
          {
            key: 'internal-permission-type:read',
            title: 'read',
          },
          {
            key: 'internal-permission-type:write',
            title: 'write',
          },
          {
            key: 'internal-permission-type:delete',
            title: 'delete',
          },
        ],
      },
      {
        key: 'b2b_user',
        title: 'B2B User',
        children: [
          {
            key: 'internal-b2b-user:read',
            title: 'read',
          },
          {
            key: 'internal-b2b-user:write',
            title: 'write',
          },
        ],
      },
    ],
  },
  {
    key: 'b2b',
    title: 'B2B',
    children: [
      {
        key: 'subscription',
        title: 'Subscription',
        children: [
          {
            key: 'internal-b2b-subscription:read',
            title: 'read',
          },
          {
            key: 'internal-b2b-subscription:write',
            title: 'write',
          },
          {
            key: 'internal-b2b-subscription:delete',
            title: 'delete',
          },
        ],
      },
      {
        key: 'subscription_request',
        title: 'Subscription Request',
        children: [
          {
            key: 'internal-b2b-subscription-request:read',
            title: 'read',
          },
          {
            key: 'internal-b2b-subscription-request:write',
            title: 'write',
          },
          {
            key: 'internal-b2b-subscription-request:delete',
            title: 'delete',
          },
        ],
      },
      {
        key: 'b2b_query',
        title: 'B2B Query',
        children: [
          {
            key: 'internal-b2b-query:read',
            title: 'read',
          },
          {
            key: 'internal-b2b-query:write',
            title: 'write',
          },
          {
            key: 'internal-b2b-query:delete',
            title: 'delete',
          },
        ],
      },
    ],
  },
  {
    key: 'Application',
    title: 'Application Configuration',
    children: [
      {
        key: 'Application Configuration',
        title: 'All Application Configuration',
        children: [
          {
            key: 'application_stage',
            title: 'Application Stage',
            children: [
              {
                key: 'internal-application-stage:read',
                title: 'read',
              },
              {
                key: 'internal-application-stage:write',
                title: 'write',
              },
              {
                key: 'internal-application-stage:delete',
                title: 'delete',
              },
            ],
          },
          {
            key: 'application_status',
            title: 'Application Status',
            children: [
              {
                key: 'internal-application-status:read',
                title: 'read',
              },
              {
                key: 'internal-application-status:write',
                title: 'write',
              },
              {
                key: 'internal-application-status:delete',
                title: 'delete',
              },
            ],
          },
          {
            key: 'application_funnel',
            title: 'Application Funnel',
            children: [
              {
                key: 'internal-application-funnel:read',
                title: 'read',
              },
              {
                key: 'internal-application-funnel:write',
                title: 'write',
              },
              {
                key: 'internal-application-funnel:delete',
                title: 'delete',
              },
            ],
          },
          {
            key: 'application_funnel_step',
            title: 'Application Funnel Step',
            children: [
              {
                key: 'internal-application-funnel-step:read',
                title: 'read',
              },
              {
                key: 'internal-application-funnel-step:write',
                title: 'write',
              },
              {
                key: 'internal-application-funnel-step:delete',
                title: 'delete',
              },
            ],
          },
          {
            key: 'notification_content_type',
            title: 'Notification Content Type',
            children: [
              {
                key: 'internal-notification-content-type:read',
                title: 'read',
              },
              {
                key: 'internal-notification-content-type:write',
                title: 'write',
              },
              {
                key: 'internal-notification-content-type:delete',
                title: 'delete',
              },
            ],
          },
          {
            key: 'sms_content',
            title: 'SMS Content',
            children: [
              {
                key: 'internal-sms-content:read',
                title: 'read',
              },
              {
                key: 'internal-sms-content:write',
                title: 'write',
              },
              {
                key: 'internal-sms-content:delete',
                title: 'delete',
              },
            ],
          },
          {
            key: 'sms_gateway',
            title: 'SMS Gateway',
            children: [
              {
                key: 'internal-sms-gateway:read',
                title: 'read',
              },
              {
                key: 'internal-sms-gateway:write',
                title: 'write',
              },
              {
                key: 'internal-sms-gateway:delete',
                title: 'delete',
              },
            ],
          },
          {
            key: 'email_content',
            title: 'Email Content',
            children: [
              {
                key: 'internal-email-content:read',
                title: 'read',
              },
              {
                key: 'internal-email-content:write',
                title: 'write',
              },
              {
                key: 'internal-email-content:delete',
                title: 'delete',
              },
            ],
          },
          {
            key: 'email_gateway',
            title: 'Email Gateway',
            children: [
              {
                key: 'internal-email-gateway:read',
                title: 'read',
              },
              {
                key: 'internal-email-gateway:write',
                title: 'write',
              },
              {
                key: 'internal-email-gateway:delete',
                title: 'delete',
              },
            ],
          },
          {
            key: 'corporate_client_discount',
            title: 'Corporate Client Discount',
            children: [
              {
                key: 'internal-corporate-client-discount:read',
                title: 'read',
              },
              {
                key: 'internal-corporate-client-discount:write',
                title: 'write',
              },
              {
                key: 'internal-corporate-client-discount:delete',
                title: 'delete',
              },
            ],
          },
          {
            key: 'discount',
            title: 'Discount',
            children: [
              {
                key: 'internal-discount:read',
                title: 'read',
              },
              {
                key: 'internal-discount:write',
                title: 'write',
              },
              {
                key: 'internal-discount:delete',
                title: 'delete',
              },
            ],
          },
          {
            key: 'special_discount',
            title: 'Special Discount',
            children: [
              {
                key: 'internal-special-discount:read',
                title: 'read',
              },
              {
                key: 'internal-special-discount:write',
                title: 'write',
              },
              {
                key: 'internal-special-discount:delete',
                title: 'delete',
              },
            ],
          },
          {
            key: 'coupon',
            title: 'Coupon',
            children: [
              {
                key: 'internal-coupon:read',
                title: 'read',
              },
              {
                key: 'internal-coupon:write',
                title: 'write',
              },
              {
                key: 'internal-coupon:delete',
                title: 'delete',
              },
            ],
          },
          {
            key: 'visa_application_form',
            title: 'Visa Application Form',
            children: [
              {
                key: 'internal-visa-application-form:read',
                title: 'read',
              },
              {
                key: 'internal-visa-application-form:write',
                title: 'write',
              },
              {
                key: 'internal-visa-application-form:delete',
                title: 'delete',
              },
            ],
          },
          {
            key: 'all_sales_report',
            title: 'All Sales Report',
            children: [
              {
                key: 'internal-all-sales-report:read',
                title: 'read',
              },
            ],
          },
          {
            key: 'my_sales_report',
            title: 'My Sales Report',
            children: [
              {
                key: 'internal-my-sales-report:read',
                title: 'read',
              },
            ],
          },
          {
            key: 'sales_register',
            title: 'Sales Register',
            children: [
              {
                key: 'internal-sales-register:read',
                title: 'read',
              },
            ],
          },
          {
            key: 'default_application',
            title: 'Default Application',
            children: [
              {
                key: 'internal-default-application:read',
                title: 'read',
              },
            ],
          },
          {
            key: 'internal_application',
            title: 'Internal Application',
            children: [
              {
                key: 'internal-internal-application:read',
                title: 'read',
              },
            ],
          },
          {
            key: 'send_back_application',
            title: 'Send Back Application',
            children: [
              {
                key: 'internal-send-back-application:read',
                title: 'read',
              },
            ],
          },
          {
            key: 'transaction_gateway',
            title: 'Transaction Gateway',
            children: [
              {
                key: 'internal-transaction-gateway:read',
                title: 'read',
              },
              {
                key: 'internal-transaction-gateway:write',
                title: 'write',
              },
              {
                key: 'internal-transaction-gateway:delete',
                title: 'delete',
              },
            ],
          },
          {
            key: 'invoice_config',
            title: 'Invoice Config',
            children: [
              {
                key: 'internal-invoice-config:read',
                title: 'read',
              },
              {
                key: 'internal-invoice-config:write',
                title: 'write',
              },
              {
                key: 'internal-invoice-config:delete',
                title: 'delete',
              },
            ],
          },
          {
            key: 'appointment',
            title: 'Appointment',
            children: [
              {
                key: 'internal-appointment:read',
                title: 'read',
              },
              {
                key: 'internal-appointment:write',
                title: 'write',
              },
              {
                key: 'internal-appointment:delete',
                title: 'delete',
              },
            ],
          },

          {
            key: 'application_report',
            title: 'Application Report',
            children: [
              {
                key: 'application-report:read',
                title: 'read',
              },
              {
                key: 'application-report:download',
                title: 'Download',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    key: 'provided_services',
    title: 'Provided Services',
    children: [
      {
        key: 'All',
        title: 'All',
        children: [
          {
            key: 'provided-service:bulk-update',
            title: 'Buk Update',
          },
          {
            key: 'provided-service:bulk-delete',
            title: 'Bulk Delete',
          },
          {
            key: 'provided-service-fee:bulk-update',
            title: 'Bulk Fee Update',
          },
        ],
      },
    ],
  },
  {
    key: 'Basic configuration',
    title: 'Basic configuration',
    children: [
      {
        key: 'All',
        title: 'All',
        children: [
          {
            key: 'internal-basic-configuration:read',
            title: 'read',
          },
          {
            key: 'internal-basic-configuration:write',
            title: 'write',
          },
          {
            key: 'internal-basic-configuration:delete',
            title: 'delete',
          },
        ],
      },
    ],
  },
  {
    key: 'Advanced configuration',
    title: 'Advanced configuration',
    children: [
      {
        key: 'All',
        title: 'All',
        children: [
          {
            key: 'internal-advance-configuration:read',
            title: 'read',
          },
          {
            key: 'internal-advance-configuration:write',
            title: 'write',
          },
          {
            key: 'internal-advance-configuration:delete',
            title: 'delete',
          },
        ],
      },
    ],
  },
  {
    key: 'DMS',
    title: 'DMS',
    children: [
      {
        key: 'All',
        title: 'All',
        children: [
          {
            key: 'internal-dms:read',
            title: 'read',
          },
          {
            key: 'internal-dms:write',
            title: 'write',
          },
          {
            key: 'internal-dms:delete',
            title: 'delete',
          },
          {
            key: 'Visa Group',
            title: 'Visa Group',
            children: [
              {
                key: 'internal-visa-group:read',
                title: 'read',
              },
              {
                key: 'internal-visa-group:write',
                title: 'write',
              },
              {
                key: 'internal-visa-group:delete',
                title: 'delete',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    key: 'Application Reports',
    title: 'Application Reports',
    children: [
      {
        key: 'All-Application Reports',
        title: 'All',
        children: [
          {
            key: 'application-report:read',
            title: 'read',
          },
          {
            key: 'application-report:download',
            title: 'download',
          },
        ],
      },
    ],
  },
  {
    title: 'Requisition',
    key: 'requisition',
    children: [
      {
        title: 'Approval History',
        key: 'approval-history',
        children: [
          {
            title: 'read',
            key: 'internal-requisition-approval-history:read',
          },
          {
            title: 'write',
            key: 'internal-requisition-approval-history:write',
          },
          {
            title: 'delete',
            key: 'internal-requisition-approval-history:delete',
          },
        ],
      },
    ],
  },
];
