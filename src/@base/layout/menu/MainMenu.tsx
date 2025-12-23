import { Paths } from '@lib/constant/paths';
import { $$ } from '@lib/utils/functions';
import { getRbacMenuItems } from '@modules/auth/lib/utils';
import { Menu } from 'antd';
import Link from 'next/link';
import React from 'react';
import { FaBook, FaTags } from 'react-icons/fa';
import { HiUserGroup } from 'react-icons/hi';
import { TbIdBadge2, TbUserCog } from 'react-icons/tb';

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
          icon: <TbUserCog size={16} />,
          // allowedAccess: ['internal-user:read', 'internal-user:delete', 'internal-user:write'],
        },
        {
          key: Paths.profile.list,
          icon: <TbIdBadge2 size={16} />,
          label: <Link href={$$.appendPagination(Paths.profile.list)}>Profiles</Link>,
          allowedAccess: [],
        },
        {
          key: Paths.course.root,
          icon: <FaTags />,
          label: 'Courses',
          children: [
            {
              key: Paths.course.instructor.list,
              label: <Link href={$$.appendPagination(Paths.course.instructor.list)}>Instructor</Link>,
              icon: <HiUserGroup />,
            },
            {
              key: Paths.course.list,
              label: <Link href={$$.appendPagination(Paths.course.list)}>Course</Link>,
              icon: <FaBook />,
            },
          ],
        },
        {
          key: Paths.enrollment.list,
          label: <Link href={$$.appendPagination(Paths.enrollment.list)}>Enrollment</Link>,
          icon: <FaBook />,
        },
      ])}
    />
  );
};

export default MainMenu;
