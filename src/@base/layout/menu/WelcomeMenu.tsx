import ThemeToggler from '@base/components/ThemeToggler';
import { Paths } from '@lib/constant/paths';
import { cn } from '@lib/utils/cn';
import { useLogout } from '@modules/auth/lib/hooks';
import { useAuthSession } from '@modules/auth/lib/utils';

import { Button, Dropdown } from 'antd';
import Link from 'next/link';
import { AiOutlineLogout, AiOutlineUser } from 'react-icons/ai';
import { FaUser } from 'react-icons/fa';

interface IProps {}

const WelcomeMenu: React.FC<IProps> = () => {
  const logout = useLogout();

  const accessToken = useAuthSession();

  // const userData = useUser({
  //   id: user?.id as any,
  //   config: {
  //     queryKey: [],
  //     enabled: !!user,
  //   },
  // });

  const items = [
    {
      key: 'Profile',
      // disabled: true,
      icon: <AiOutlineUser />,
      label: <Link href={Paths.user.profile.root}>Profile</Link>,
    },
    {
      key: 'Logout',
      icon: <AiOutlineLogout />,
      disabled: logout.isPending,
      label: 'Logout',
      onClick: logout.mutate,
    },
  ];

  return (
    <Dropdown
      dropdownRender={() => {
        return (
          <div className="min-w-36 rounded-lg border border-gray-100 bg-white p-4 shadow-sm dark:bg-black">
            {/* <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Welcome to Wage Provider</p> */}
            <p className="font-semibold">{accessToken?.user?.fullName}</p>
            <ul className="mt-4 flex flex-col gap-2 border-t border-t-gray-100 pt-4">
              {items.map((item) => (
                <li
                  key={item.key}
                  className={cn(
                    'flex cursor-pointer items-center gap-2 transition-colors duration-500 select-none hover:text-[var(--primary-500)]',
                    {
                      'pointer-events-none text-gray-500 dark:text-gray-400': item.disabled,
                    },
                  )}
                  onClick={item.onClick}
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex justify-center border-t border-t-gray-100 pt-4">
              <ThemeToggler />
            </div>
          </div>
        );
      }}
    >
      <Button className="rounded-full">
        <FaUser />
      </Button>
    </Dropdown>
  );
};
export default WelcomeMenu;
