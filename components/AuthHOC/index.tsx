import { useAuthState } from '@/contexts/auth';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo } from 'react';
import LoadingPage from '../LoadingPage';
import { ROUTERS } from '@/constants';

enum RouteRole {
  auth,
  all,
}
export interface WithAuthProps {
}

export default function withAuth<T extends WithAuthProps = WithAuthProps>(
  Component: React.ComponentType<T>,
  routeRole: keyof typeof RouteRole,
) {
  const ComponentWithAuth = (props: Omit<T, keyof WithAuthProps>) => {
    const router = useRouter();
    const { loading, loadingInitial, profile, user, isSignedUp, isLogout, logout } = useAuthState();
    const isAuthenticated = useMemo(() => profile && user && isSignedUp, [profile, user, isSignedUp]);

    const checkRouterRole = useCallback(async () => {
      if (!loading && !loadingInitial) {
        if (isAuthenticated && routeRole === 'auth') {
          router.replace(ROUTERS.categories);
        }
        if (!isAuthenticated && routeRole !== 'auth') {
          let routerName = '/';
          router.replace(
            `${routerName}?redirect=${router.asPath}`,
            `${routerName}`
          );
        }
      }
    }, [loading, loadingInitial, router, routeRole, isAuthenticated]);

    useEffect(() => {
      checkRouterRole();
    }, [checkRouterRole]);

    if ((loading || loadingInitial || isAuthenticated) && isAuthenticated && routeRole === 'auth') {
      return (
        <LoadingPage />
      );
    }

    if ((loadingInitial || !isAuthenticated) && routeRole !== 'auth') {
      return (
        <LoadingPage />
      );
    }

    return <div>
      {(loading || loadingInitial) && <LoadingPage />}
      <Component {...(props as T)} />
    </div>
  };

  return ComponentWithAuth;
}
