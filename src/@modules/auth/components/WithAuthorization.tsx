import { PermissionsTypes } from '@lib/constant/permissions';
import { hasAccessPermission } from '../lib/utils';

interface IOptions {
  allowedAccess: PermissionsTypes[];
  fallBack?: React.ReactNode;
}
const WithAuthorization = <P extends object>(
  WrappedComponent: React.ComponentType<P>,

  {
    allowedAccess,
    fallBack = (
      <div className="flex items-center justify-center md:h-full">
        {/* <div className="p-6 bg-white rounded-lg shadow-md">
          <p className="flex justify-center">
            <RiAlarmWarningFill className="animate-pulse" color="#ff0000" size={30} />
          </p>
          <h4 className="text-2xl font-bold text-center text-red-600">Unauthorized Access</h4>
          <p className="mt-2 text-center text-gray-600">You do not have permission to access this page.</p>
        </div> */}
      </div>
    ),
  }: IOptions,
) => {
  const AuthorizationComponent: React.FC<P> = (props) => {
    const hasAccess: boolean = hasAccessPermission(allowedAccess);

    if (hasAccess) return fallBack;

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
