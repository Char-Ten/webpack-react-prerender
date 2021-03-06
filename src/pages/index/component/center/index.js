import * as React from 'react';
import styles from './index.module.less';

export default ({ className = '', children, ...props }) => {
    return (
        <div className={styles.center+' k-center '+className} {...props}>
            {children}
        </div>
    );
};
