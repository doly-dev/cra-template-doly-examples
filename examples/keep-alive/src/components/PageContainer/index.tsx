import * as React from 'react';
import classnames from 'classnames';
import { useActivate } from 'react-activation';
import styles from './index.module.less';

interface PageContainerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  title: string;
}

const PageContainer = React.forwardRef<HTMLDivElement, PageContainerProps>(
  ({ children, className, title, ...restProps }, ref) => {
    // 设置标题
    const setPageTitle = React.useCallback(() => {
      document.title = title || '';
    }, [title]);

    React.useEffect(() => {
      setPageTitle();
    }, [setPageTitle]);

    // 页面激活时设置标题
    useActivate(setPageTitle);

    return (
      <div {...restProps} className={classnames(styles.page, className)} ref={ref}>
        {children}
      </div>
    );
  }
);

export default PageContainer;
