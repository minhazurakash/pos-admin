import { Empty, Spin } from 'antd';
import React from 'react';

interface Props {
  loading?: boolean;
  empty?: boolean;
  hide?: '*' | 'loader' | 'empty';
  children?: any;
  style?: React.CSSProperties;
  loader?: React.ReactNode;
}
const Purify: React.FC<Props> = ({
  style,
  empty = false,
  loading = false,
  hide,
  children,
  loader = (
    <div className="grid h-60 place-content-center" style={style}>
      <Spin className="content-center" />
    </div>
  ),
}) => {
  return (
    <>
      {loading === true ? (
        hide === 'loader' || hide === '*' ? (
          <span></span>
        ) : (
          loader
        )
      ) : empty === true ? (
        hide === 'empty' || hide === '*' ? (
          <span></span>
        ) : (
          <div style={style}>
            <Empty className="content-center" />
          </div>
        )
      ) : (
        children
      )}
    </>
  );
};
export default Purify;
