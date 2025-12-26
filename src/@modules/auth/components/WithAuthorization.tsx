import AccessDeniedFallBack from '@/@base/components/AccessDeniedFallBack';
import { PermissionsTypes } from '@lib/constant/permissions';
import { hasAccessPermission } from '../lib/utils';

interface IOptions {
  allowedAccess: PermissionsTypes[];
  fallBack?: React.ReactNode;
}
const WithAuthorization = <P extends object>(
  WrappedComponent: React.ComponentType<P>,

  { allowedAccess, fallBack = <AccessDeniedFallBack /> }: IOptions,
) => {
  const AuthorizationComponent: React.FC<P> = (props) => {
    const hasAccess: boolean = hasAccessPermission(allowedAccess);

    if (!hasAccess) return fallBack;

    // Render the wrapped component if the user has the given access
    return <WrappedComponent {...props} />;
  };

  // Set the display name for easier debugging
  AuthorizationComponent.displayName = `WithAuthorization(${
    WrappedComponent.displayName || WrappedComponent.name || 'Component'
  })`;

  return AuthorizationComponent;
};

export default WithAuthorization;
