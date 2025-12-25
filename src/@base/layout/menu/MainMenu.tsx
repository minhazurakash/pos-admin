import { Paths } from '@lib/constant/paths';
import { $$ } from '@lib/utils/functions';
import { getRbacMenuItems } from '@modules/auth/lib/utils';
import { Menu } from 'antd';
import Link from 'next/link';
import React from 'react';
import {
  FaBox,
  FaChartLine,
  FaCog,
  FaDollarSign,
  FaShoppingCart,
  FaTags,
  FaTruck,
  FaUsers,
  FaWarehouse,
} from 'react-icons/fa';
import { HiDocumentReport, HiReceiptTax, HiUserGroup } from 'react-icons/hi';
import { MdCategory, MdDashboard, MdInventory, MdPayment, MdPointOfSale } from 'react-icons/md';
import { TbBrandProducthunt, TbUserCog } from 'react-icons/tb';

interface IProps {
  openedMenuKeys: string[];
  onOpenChange: (openKeys: string[]) => void;
  defaultSelectedKeys: string[];
}

const MainMenu: React.FC<IProps> = ({ openedMenuKeys, onOpenChange, defaultSelectedKeys }) => {
  return (
    <Menu
      theme="light"
      mode="inline"
      defaultSelectedKeys={defaultSelectedKeys}
      openKeys={openedMenuKeys}
      onOpenChange={onOpenChange}
      items={getRbacMenuItems([
        {
          key: Paths.root,
          label: <Link href={Paths.root}>Dashboard</Link>,
          icon: <MdDashboard size={18} />,
        },
        {
          key: Paths.sales.pos,
          label: <Link href={Paths.sales.pos}>POS</Link>,
          icon: <MdPointOfSale size={18} />,
          allowedAccess: [],
        },
        {
          key: Paths.products.root,
          icon: <FaBox size={16} />,
          label: 'Products',
          children: [
            {
              key: Paths.products.list,
              label: <Link href={$$.appendPagination(Paths.products.list)}>All Products</Link>,
              icon: <TbBrandProducthunt size={16} />,
            },
            {
              key: Paths.products.create,
              label: <Link href={Paths.products.create}>Add Product</Link>,
              icon: <FaBox size={14} />,
            },
            {
              key: Paths.products.categories.list,
              label: <Link href={$$.appendPagination(Paths.products.categories.list)}>Categories</Link>,
              icon: <MdCategory size={16} />,
            },
            {
              key: Paths.products.brands.list,
              label: <Link href={$$.appendPagination(Paths.products.brands.list)}>Brands</Link>,
              icon: <FaTags size={14} />,
            },
            {
              key: Paths.products.units.list,
              label: <Link href={$$.appendPagination(Paths.products.units.list)}>Units</Link>,
              icon: <FaBox size={14} />,
            },
          ],
        },
        {
          key: Paths.sales.root,
          icon: <FaShoppingCart size={16} />,
          label: 'Sales',
          children: [
            {
              key: Paths.sales.list,
              label: <Link href={$$.appendPagination(Paths.sales.list)}>All Sales</Link>,
              icon: <FaShoppingCart size={14} />,
            },
            {
              key: Paths.sales.create,
              label: <Link href={Paths.sales.create}>New Sale</Link>,
              icon: <FaShoppingCart size={14} />,
            },
            {
              key: Paths.sales.returns.list,
              label: <Link href={$$.appendPagination(Paths.sales.returns.list)}>Returns</Link>,
              icon: <HiReceiptTax size={16} />,
            },
          ],
        },
        {
          key: Paths.purchases.root,
          icon: <FaTruck size={16} />,
          label: 'Purchases',
          children: [
            {
              key: Paths.purchases.list,
              label: <Link href={$$.appendPagination(Paths.purchases.list)}>All Purchases</Link>,
              icon: <FaTruck size={14} />,
            },
            {
              key: Paths.purchases.create,
              label: <Link href={Paths.purchases.create}>New Purchase</Link>,
              icon: <FaTruck size={14} />,
            },
            {
              key: Paths.purchases.returns.list,
              label: <Link href={$$.appendPagination(Paths.purchases.returns.list)}>Returns</Link>,
              icon: <HiReceiptTax size={16} />,
            },
          ],
        },
        {
          key: Paths.customers.root,
          icon: <FaUsers size={16} />,
          label: 'Customers',
          children: [
            {
              key: Paths.customers.list,
              label: <Link href={$$.appendPagination(Paths.customers.list)}>All Customers</Link>,
              icon: <FaUsers size={14} />,
            },
            {
              key: Paths.customers.create,
              label: <Link href={Paths.customers.create}>Add Customer</Link>,
              icon: <FaUsers size={14} />,
            },
            {
              key: Paths.customers.groups.list,
              label: <Link href={$$.appendPagination(Paths.customers.groups.list)}>Groups</Link>,
              icon: <HiUserGroup size={16} />,
            },
          ],
        },
        {
          key: Paths.suppliers.list,
          label: <Link href={$$.appendPagination(Paths.suppliers.list)}>Suppliers</Link>,
          icon: <FaTruck size={16} />,
          allowedAccess: [],
        },
        {
          key: Paths.inventory.root,
          icon: <FaWarehouse size={16} />,
          label: 'Inventory',
          children: [
            {
              key: Paths.inventory.stock,
              label: <Link href={Paths.inventory.stock}>Stock</Link>,
              icon: <MdInventory size={16} />,
            },
            {
              key: Paths.inventory.adjustments.list,
              label: <Link href={$$.appendPagination(Paths.inventory.adjustments.list)}>Adjustments</Link>,
              icon: <FaWarehouse size={14} />,
            },
            {
              key: Paths.inventory.transfers.list,
              label: <Link href={$$.appendPagination(Paths.inventory.transfers.list)}>Transfers</Link>,
              icon: <FaTruck size={14} />,
            },
            {
              key: Paths.inventory.warehouses.list,
              label: <Link href={$$.appendPagination(Paths.inventory.warehouses.list)}>Warehouses</Link>,
              icon: <FaWarehouse size={14} />,
            },
          ],
        },
        {
          key: Paths.expenses.root,
          icon: <FaDollarSign size={16} />,
          label: 'Expenses',
          children: [
            {
              key: Paths.expenses.list,
              label: <Link href={$$.appendPagination(Paths.expenses.list)}>All Expenses</Link>,
              icon: <FaDollarSign size={14} />,
            },
            {
              key: Paths.expenses.create,
              label: <Link href={Paths.expenses.create}>Add Expense</Link>,
              icon: <FaDollarSign size={14} />,
            },
            {
              key: Paths.expenses.categories.list,
              label: <Link href={$$.appendPagination(Paths.expenses.categories.list)}>Categories</Link>,
              icon: <MdCategory size={16} />,
            },
          ],
        },
        {
          key: Paths.reports.root,
          icon: <HiDocumentReport size={18} />,
          label: 'Reports',
          children: [
            {
              key: Paths.reports.sales,
              label: <Link href={Paths.reports.sales}>Sales Report</Link>,
              icon: <FaChartLine size={14} />,
            },
            {
              key: Paths.reports.purchases,
              label: <Link href={Paths.reports.purchases}>Purchase Report</Link>,
              icon: <FaChartLine size={14} />,
            },
            {
              key: Paths.reports.inventory,
              label: <Link href={Paths.reports.inventory}>Inventory Report</Link>,
              icon: <FaChartLine size={14} />,
            },
            {
              key: Paths.reports.profit,
              label: <Link href={Paths.reports.profit}>Profit & Loss</Link>,
              icon: <FaChartLine size={14} />,
            },
            {
              key: Paths.reports.expenses,
              label: <Link href={Paths.reports.expenses}>Expense Report</Link>,
              icon: <FaChartLine size={14} />,
            },
            {
              key: Paths.reports.tax,
              label: <Link href={Paths.reports.tax}>Tax Report</Link>,
              icon: <HiReceiptTax size={16} />,
            },
          ],
        },
        {
          key: Paths.users.root,
          icon: <TbUserCog size={18} />,
          label: 'Users & Roles',
          children: [
            {
              key: Paths.users.list,
              label: <Link href={$$.appendPagination(Paths.users.list)}>All Users</Link>,
              icon: <TbUserCog size={16} />,
            },
            {
              key: Paths.users.roles.list,
              label: <Link href={$$.appendPagination(Paths.users.roles.list)}>Roles</Link>,
              icon: <HiUserGroup size={16} />,
            },
          ],
        },
        {
          key: Paths.settings.root,
          icon: <FaCog size={16} />,
          label: 'Settings',
          children: [
            {
              key: Paths.settings.general,
              label: <Link href={Paths.settings.general}>General</Link>,
              icon: <FaCog size={14} />,
            },
            {
              key: Paths.settings.company,
              label: <Link href={Paths.settings.company}>Company</Link>,
              icon: <FaCog size={14} />,
            },
            {
              key: Paths.settings.payment,
              label: <Link href={Paths.settings.payment}>Payment Methods</Link>,
              icon: <MdPayment size={16} />,
            },
            {
              key: Paths.settings.tax,
              label: <Link href={Paths.settings.tax}>Tax Settings</Link>,
              icon: <HiReceiptTax size={16} />,
            },
            {
              key: Paths.settings.notifications,
              label: <Link href={Paths.settings.notifications}>Notifications</Link>,
              icon: <FaCog size={14} />,
            },
            {
              key: Paths.settings.backup,
              label: <Link href={Paths.settings.backup}>Backup & Restore</Link>,
              icon: <FaCog size={14} />,
            },
          ],
        },
      ])}
    />
  );
};

export default MainMenu;
