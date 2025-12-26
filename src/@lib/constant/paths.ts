import nextConfig from '../../../next.config';

export const Paths = {
  root: '/',
  maintenance: '/maintenance',
  // auth
  auth: {
    login: '/auth/login',
    resetPassword: '/auth/reset-password',
    signup: '/auth/sign-up',
  },
  // POS System Paths
  products: {
    root: '/products',
    list: '/products/list',
    create: '/products/create',
    update: (productId: string) => `/products/update/${productId}`,
    view: (productId: string) => `/products/view/${productId}`,
    categories: {
      root: '/categories',
      list: '/categories/list',
      create: '/categories/create',
      update: (categoryId: string) => `/categories/update/${categoryId}`,
    },
    brands: {
      root: '/brands',
      list: '/brands/list',
      create: '/brands/create',
      update: (brandId: string) => `/brands/update/${brandId}`,
    },
    units: {
      root: '/units',
      list: '/units/list',
    },
  },
  sales: {
    root: '/sales',
    pos: '/sales/pos',
    list: '/sales/list',
    create: '/sales/create',
    view: (saleId: string) => `/sales/view/${saleId}`,
    returns: {
      root: '/sales/returns',
      list: '/sales/returns/list',
      create: '/sales/returns/create',
    },
  },
  purchases: {
    root: '/purchases',
    list: '/purchases/list',
    create: '/purchases/create',
    update: (purchaseId: string) => `/purchases/update/${purchaseId}`,
    view: (purchaseId: string) => `/purchases/view/${purchaseId}`,
    returns: {
      root: '/purchases/returns',
      list: '/purchases/returns/list',
      create: '/purchases/returns/create',
    },
  },
  customers: {
    root: '/customers',
    list: '/customers/list',
    create: '/customers/create',
    update: (customerId: string) => `/customers/update/${customerId}`,
    view: (customerId: string) => `/customers/view/${customerId}`,
    groups: {
      root: '/customers/groups',
      list: '/customers/groups/list',
    },
  },
  suppliers: {
    root: '/suppliers',
    list: '/suppliers/list',
    create: '/suppliers/create',
    update: (supplierId: string) => `/suppliers/update/${supplierId}`,
    view: (supplierId: string) => `/suppliers/view/${supplierId}`,
  },
  inventory: {
    root: '/inventory',
    stock: '/inventory/stock',
    adjustments: {
      root: '/inventory/adjustments',
      list: '/inventory/adjustments/list',
      create: '/inventory/adjustments/create',
    },
    transfers: {
      root: '/inventory/transfers',
      list: '/inventory/transfers/list',
      create: '/inventory/transfers/create',
    },
    warehouses: {
      root: '/inventory/warehouses',
      list: '/inventory/warehouses/list',
      create: '/inventory/warehouses/create',
    },
  },
  expenses: {
    root: '/expenses',
    list: '/expenses/list',
    create: '/expenses/create',
    update: (expenseId: string) => `/expenses/update/${expenseId}`,
    categories: {
      root: '/expenses/categories',
      list: '/expenses/categories/list',
    },
  },
  reports: {
    root: '/reports',
    sales: '/reports/sales',
    purchases: '/reports/purchases',
    inventory: '/reports/inventory',
    customers: '/reports/customers',
    suppliers: '/reports/suppliers',
    profit: '/reports/profit-loss',
    expenses: '/reports/expenses',
    tax: '/reports/tax',
  },
  users: {
    root: '/users',
    list: '/users/list',
    create: '/users/create',
    update: (userId: string) => `/users/update/${userId}`,
    roles: {
      root: '/users/roles',
      list: '/users/roles/list',
      create: '/users/roles/create',
    },
  },
  settings: {
    root: '/settings',
    general: '/settings/general',
    company: '/settings/company',
    payment: '/settings/payment',
    tax: '/settings/tax',
    notifications: '/settings/notifications',
    backup: '/settings/backup',
  },
  user: {
    profile: {
      root: '/user/profile',
    },
  },
};

// is used for access those paths which are not restricted by authentication & not wrap the layout
export const publicPaths = [Paths.auth.login, Paths.auth.signup, Paths.maintenance, Paths.auth.resetPassword];

export const authPaths = [...getAllStaticPaths(Paths.auth)];

export const securedPathsPrefix = [Paths.root];
export const securedPaths = [];

export function pathToUrl(path: string): string {
  path = path.startsWith('/') ? path : `/${path}`;
  if (typeof window === 'undefined') {
    return path;
  }
  return `${window.location.origin}${path}`;
}

export function getAllStaticPaths(obj: Record<string, any>) {
  const paths = [];

  function traverse(o: Record<string, any>) {
    for (const key in o) {
      if (typeof o[key] === 'string') {
        paths.push(o[key]);
      } else if (typeof o[key] === 'function') {
        // Skip functions that generate paths based on arguments
        continue;
      } else {
        traverse(o[key]);
      }
    }
  }

  traverse(obj);
  return paths;
}

export const pathByNextConfig = (x: string) => (x.endsWith('/') ? x : nextConfig.trailingSlash ? x + '/' : x);

export const checkPathIsInAuth = (pathName: string): boolean => {
  pathName = pathByNextConfig(pathName);
  return authPaths.some((x) => pathByNextConfig(x) === pathName);
};

export const checkPathIsInPublic = (pathName: string): boolean => {
  pathName = pathByNextConfig(pathName);
  if (publicPaths.some((x) => pathByNextConfig(x) === pathName)) return true;
  if (
    securedPaths?.some((x) => pathByNextConfig(x) === pathName) ||
    securedPathsPrefix?.some((x) => {
      if (x === '/') return true;
      const endPortion = pathName.slice(pathByNextConfig(x).length - (nextConfig.trailingSlash ? 1 : 0));
      return pathName.startsWith(pathByNextConfig(x)) && (endPortion.startsWith('/') || endPortion.length < 1);
    })
  ) {
    return false;
  }

  return true;
};
