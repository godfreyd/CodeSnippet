import styled from 'styled-components';

export const Wrapper = styled.div`
    position: relative;
`;

export const Pre = styled.pre`
    text-align: left;
    font-family: Menlo, monospace;
    font-size: 14px;
    white-space: pre;
    word-spacing: normal;
    word-wrap: normal;
    word-break: normal;
    tab-size: 4;
    margin: 1em 0;
    padding: 0.5em;
    overflow: scroll;

    & .token-line {
        line-height: 1.3em;
        height: 1.3em;
    }
`;

export const Line = styled.div`
    display: table-row;
`;

export const LineNo = styled.span`
    display: table-cell;
    text-align: right;
    padding-right: 1em;
    user-select: none;
    opacity: 0.5;
`;

export const LineContent = styled.span`
    display: table-cell;
`;
