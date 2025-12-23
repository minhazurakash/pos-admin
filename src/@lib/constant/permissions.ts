export type PermissionsTypes = (typeof PermissionsList)[keyof typeof PermissionsList];

export const PermissionsList = {
  FORBIDDEN: 'FORBIDDEN',

  INTERNAL_CMS_READ: 'internal-cms:read',
  INTERNAL_CMS_WRITE: 'internal-cms:write',
  INTERNAL_CMS_DELETE: 'internal-cms:delete',

  INTERNAL_BASIC_CONFIGURATION_READ: 'internal-basic-configuration:read',
  INTERNAL_BASIC_CONFIGURATION_WRITE: 'internal-basic-configuration:write',
  INTERNAL_BASIC_CONFIGURATION_DELETE: 'internal-basic-configuration:delete',

  INTERNAL_ADVANCE_CONFIGURATION_READ: 'internal-advance-configuration:read',
  INTERNAL_ADVANCE_CONFIGURATION_WRITE: 'internal-advance-configuration:write',
  INTERNAL_ADVANCE_CONFIGURATION_DELETE: 'internal-advance-configuration:delete',

  INTERNAL_CHECKLIST_BUILDER_READ: 'internal-assessment:read',
  INTERNAL_CHECKLIST_BUILDER_WRITE: 'internal-assessment:write',
  INTERNAL_CHECKLIST_BUILDER_DELETE: 'internal-assessment:delete',

  INTERNAL_USER_READ: 'internal-user:read',
  INTERNAL_USER_WRITE: 'internal-user:write',
  INTERNAL_USER_DELETE: 'internal-user:delete',
  INTERNAL_USER_FORCE_VERIFY: 'internal-user:force-verify',
  INTERNAL_USER_UPDATE_PASSWORD: 'internal-user:update-password',

  INTERNAL_ROLE_READ: 'internal-role:read',
  INTERNAL_ROLE_WRITE: 'internal-role:write',
  INTERNAL_ROLE_DELETE: 'internal-role:delete',

  INTERNAL_PERMISSION_READ: 'internal-permission:read',
  INTERNAL_PERMISSION_WRITE: 'internal-permission:write',
  INTERNAL_PERMISSION_DELETE: 'internal-permission:delete',

  INTERNAL_PERMISSION_TYPE_READ: 'internal-permission-type:read',
  INTERNAL_PERMISSION_TYPE_WRITE: 'internal-permission-type:write',
  INTERNAL_PERMISSION_TYPE_DELETE: 'internal-permission-type:delete',
} as const;

export const applicationRoutePermissionByQuery = {
  DEFAULT: 'internal-default-application:read',
  INTERNAL: 'internal-internal-application:read',
  SEND_BACK: 'internal-send-back-application:read',
};
