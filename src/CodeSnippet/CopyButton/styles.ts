import styled from 'styled-components';

export const Button = styled.button`
    position: absolute;
    top: 0;
    right: 0;

    height: 42px;
    padding: 0 16px;

    cursor: pointer;

    border: none;
    outline: none;
    background: none;

    transition: opacity 100ms ease-in-out;
    transform: translateZ(0);

    &:hover {
        opacity: 0.5;
    }
`;

export const Text = styled.span`
    margin-right: 4px;

    font-size: 13px;
    line-height: 1;
    user-select: none;
    vertical-align: middle;

    color: #111;
`;

export const Svg = styled.svg`
    vertical-align: middle;
`;
