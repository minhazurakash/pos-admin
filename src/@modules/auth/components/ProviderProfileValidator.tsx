import { LoadingOutlined } from '@ant-design/icons';
import { Paths } from '@lib/constant/paths';
import { useProviders } from '@modules/provider/lib/hooks';
import { Spin } from 'antd';
import { useRouter } from 'next/router';

const EmployeeProfileValidator = (WrappedComponent) => {
  const Component = ({ ...props }) => {
    const router = useRouter();

    const myProfiles = useProviders({
      options: {
        page: 1,
        limit: 1,
      },
    });

    const spinner = (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white">
        <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
      </div>
    );

    //if subscription is not approved, redirect to create request page
    if (!myProfiles?.data?.data?.length && myProfiles?.isLoading) {
      return spinner;
    }
    if (!myProfiles?.data?.data?.length) {
      router.push(Paths.profile.create);
      return spinner;
    }

    return <WrappedComponent {...props} />;
  };
  return Component;
};

export default EmployeeProfileValidator;
