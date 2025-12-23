import { ImagePaths } from '@lib/constant/imagePaths';
import { Paths, checkPathIsInAuth, checkPathIsInPublic, pathToUrl } from '@lib/constant/paths';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { authRefreshToken } from '../lib/refresh-token';
import { getAuthSession, setAuthSession } from '../lib/utils';

const WithAuth = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
  const AuthComponent: React.FC<P> = (props) => {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const handleRefreshToken = async () => {
      await authRefreshToken((newSession) => {
        setAuthSession(newSession);
        return newSession.accessToken;
      });
    };

    const handleAuth = () => {
      // check if the path is in authPaths if yes then check if the user is authenticated or not, is yes then redirect to root
      const { isAuthenticate } = getAuthSession();
      // const isAuthenticate = true;

      if (checkPathIsInAuth(router.pathname)) {
        if (!isAuthenticate) return setIsAuthenticated(true);
        router.push({
          pathname: Paths.root,
        });
        return;
      }

      // check if the path is not in publicPaths then check if the user is authenticated or not, if is not then redirect to login
      if (checkPathIsInPublic(router.pathname)) return setIsAuthenticated(true);

      // Redirect to B2B root page if user is a B2B user

      setIsAuthenticated(isAuthenticate);
      // setIsAuthenticated(isAuthenticate);

      // Redirect to login page if user is not authenticated
      if (!isAuthenticate && typeof window !== 'undefined') {
        router.push({
          pathname: Paths.auth.login,
          query: {
            callbackUrl: encodeURIComponent(pathToUrl(router.asPath)),
          },
        });
      }
    };

    useEffect(() => {
      handleRefreshToken().then(() => handleAuth());
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [router.asPath]);

    if (!isAuthenticated) {
      // Return loading or any other UI indicating authentication check is in progress
      return (
        <div className="flex h-screen w-full flex-col items-center justify-center gap-2">
          <div id="loading-indicator">
            <div className="lds-hourglass"></div>
          </div>
          <div className="w-72">
            <img src={ImagePaths.logo} className="w-full object-contain" alt="logo" />
          </div>
        </div>
      );
    }

    // Render the wrapped component if the user is authenticated
    return <WrappedComponent {...props} />;
  };

  // Set the display name for easier debugging
  AuthComponent.displayName = `withAuth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return AuthComponent;
};

export default WithAuth;
