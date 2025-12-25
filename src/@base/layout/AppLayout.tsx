import { Paths } from '@lib/constant/paths';
import { localStorageState } from '@lib/constant/storage';
import useLocalStorage from '@lib/hooks/useLocalStorage';
import useResize from '@lib/hooks/useResize';
import useTheme from '@lib/hooks/useTheme';
import { cn } from '@lib/utils/cn';
import { Button, Grid, Layout } from 'antd';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';
import { MdOutlineKeyboardDoubleArrowRight } from 'react-icons/md';
import MainMenu from './menu/MainMenu';
import WelcomeMenu from './menu/WelcomeMenu';

interface IFProps extends React.PropsWithChildren {}

const AppLayout: React.FC<IFProps> = ({ children }) => {
  const pathname = usePathname();
  const screens = Grid.useBreakpoint();
  const [isCollapsed, setCollapsed] = useState<boolean>(false);
  const { elemRef: headerRef, height: headerHeight } = useResize();
  const { elemRef: footerRef, height: footerHeight } = useResize();
  const [menu, setActiveMenu] = useLocalStorage(localStorageState?.menu);
  const { isLight } = useTheme();

  const styles: any = {
    header: {
      position: 'fixed',
      right: 0,
      width: '100%',
      height: 'auto',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      background: isLight ? '#f5f5f5' : 'var(--colorSecondary)',
      gap: '1rem',
      paddingInline: '1rem',
      zIndex: 99,
    },
    sider: {
      position: 'fixed',
      top: headerHeight,
      left: !screens.md && isCollapsed ? '-100%' : 0,
      paddingLeft: screens.md ? 16 : 0,
      height: `calc(100vh - ${headerHeight}px)`,
      background: isLight ? '#f5f5f5' : 'var(--colorSecondary)',
      zIndex: 100,
    },
    menuWrapper: {
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      paddingBlock: 32,
      overflowY: 'auto',
    },
    layout: {
      background: isLight ? '#f5f5f5' : 'var(--colorSecondary)',
      paddingLeft: !screens.md ? 0 : isCollapsed ? 100 : 300,
    },
    content: {
      paddingTop: headerHeight + 32,
      paddingBottom: `calc(32px + ${footerHeight}px)`,
    },
    footer: {
      position: 'fixed',
      left: 0,
      bottom: 0,
      width: '100%',
      textAlign: 'center',
      paddingBlock: 16,
      paddingLeft: !screens.md ? 0 : isCollapsed ? 100 : 300,
      background: isLight ? '#f5f5f5' : 'var(--colorSecondary)',
    },
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Layout.Header style={styles.header} ref={headerRef}>
        <div className="flex w-62 items-center justify-center pt-5">
          <Link href={Paths.root} className="block">
            <img
              className="logo"
              src={'https://www.standard-accounts.com/img?file=SPROD-POS-logo.png'}
              // src={isLight ? ImagePaths.logo : ImagePaths.logoLight}
              style={{ width: 120 }}
              alt="logo"
            />
          </Link>
        </div>
        <Button
          type="text"
          size="large"
          onClick={() => setCollapsed((prev) => !prev)}
          className={cn('mr-auto', {
            'ml-[124px]': screens.md && !isCollapsed,
          })}
        >
          <MdOutlineKeyboardDoubleArrowRight size={24} className={isCollapsed ? 'rotate-0' : 'rotate-180'} />
        </Button>
        <WelcomeMenu />
      </Layout.Header>
      <Layout style={styles.layout}>
        <Layout.Sider
          collapsible
          trigger={null}
          collapsed={screens.md && isCollapsed}
          width={280}
          style={styles.sider}
          breakpoint="md"
          theme="light"
          onBreakpoint={(broken) => {
            if (broken) setCollapsed(true);
          }}
          onClick={(e) => {
            if (!screens.md && (e.target as HTMLAnchorElement).href) setCollapsed(true);
          }}
        >
          <div
            style={styles.menuWrapper}
            className="designed_scrollbar [&_.ant-menu]:!border-none [&_.ant-menu]:!bg-transparent"
          >
            <MainMenu
              defaultSelectedKeys={[pathname]}
              openedMenuKeys={menu?.openedMenuKeys}
              onOpenChange={(v) => setActiveMenu({ ...menu, openedMenuKeys: v })}
            />
          </div>
        </Layout.Sider>
        <Layout.Content style={styles.content} onClick={() => (screens.md ? null : setCollapsed(true))}>
          <div className="container md:h-full">
            <div className="rounded-3xl bg-white p-8 md:h-full dark:bg-gray-900/70">{children}</div>
          </div>
        </Layout.Content>
        <Layout.Footer style={styles.footer} ref={footerRef}>
          Made With ❤️ By Akash
        </Layout.Footer>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
