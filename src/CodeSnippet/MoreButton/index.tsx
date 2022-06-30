import React, { FC, CSSProperties } from 'react';

import { Button, Text, Svg } from './styles';

type CopyButtonProps = {
    text: string;
    direction: 'top' | 'bottom';
    onClick?: () => void;
    styles?: CSSProperties;
};
export const MoreButton: FC<CopyButtonProps> = ({
    text,
    direction,
    ...props
}) => {
    const styles =
        direction === 'top' ? { top: 0, right: 0 } : { bottom: 0, right: 0 };

    return (
        <Button tabIndex={-1} {...props} style={{ ...styles }}>
            <Text>{text}</Text>
            {direction === 'top' && (
                <Svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M13 10L8 5L3 10" stroke="black" />
                </Svg>
            )}
            {direction === 'bottom' && (
                <Svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M3 6L8 11L13 6" stroke="black" />
                </Svg>
            )}
        </Button>
    );
};
