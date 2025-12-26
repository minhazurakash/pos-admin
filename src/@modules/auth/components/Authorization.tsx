import { PermissionsTypes } from '@lib/constant/permissions';
import { hasAccessPermission } from '../lib/utils';

interface IProps {
  allowedAccess: PermissionsTypes[];
  children?: React.ReactNode;
  fallBack?: React.ReactNode;
  superAdminAllowed?: boolean;
}
const Authorization: React.FC<IProps> = ({
  allowedAccess,
  children = null,
  fallBack = null,
  superAdminAllowed = true,
}) => {
  const hasAccess: boolean = hasAccessPermission(allowedAccess, superAdminAllowed);

  // return children;
  return !hasAccess ? children : fallBack;
};

export default Authorization;
