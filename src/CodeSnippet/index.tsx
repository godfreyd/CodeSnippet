import React, { FC, useCallback, useState, useEffect } from 'react';

import Highlight, { defaultProps, Language } from 'prism-react-renderer';

import copy from 'copy-to-clipboard';

import { decodedData } from '../utils/decodedData';
import { customFetch } from '../utils/customFetch';
import { Spinner } from '../Spinner';
import { theme } from './theme';
import { CopyButton } from './CopyButton';
import { MoreButton } from './MoreButton';
import { Pre, Line, LineNo, LineContent, Wrapper } from './styles';

type IartifactLocation = {
    owner: string;
    repo: string;
    path: string;
    ref?: string;
};

type CodeSnippetType = {
    className: string;
    /** Предзагруженный контент */
    content: string[];
    /** Язык программирования */
    language: Language;
    /** Начальная строка видимых строк */
    startLine?: number;
    /** Организация, репозиторий и путь до файла внутри публичного репозитория
     * на GitHub Необязательный параметр ref - коммит/ветка/тег. Например, 'master'
     */
    artifactLocation: IartifactLocation;
};

export const CodeSnippet: FC<CodeSnippetType> = ({
    content,
    className,
    language,
    startLine = 0,
    artifactLocation,
}) => {
    const step = 5;
    const lines = content.length;
    const { owner, repo, path } = artifactLocation;
    const factStartLine = startLine > 0 ? startLine - 1 : 0;
    const [topShouldShow, setTopShouldShow] = useState(false);
    const [bottomShouldShow, setBottomShouldShow] = useState(false);
    const [stepTop, setStepTop] = useState(0);
    const [stepBottom, setStepBottom] = useState(0);
    const [fullFileContent, setFullFileContent] = useState('');

    const onCopyClick = useCallback(() => {
        copy(fullFileContent);
    }, [fullFileContent]);

    const onTopShow = useCallback(() => {
        setTopShouldShow(true);
        if (factStartLine - stepTop < step) {
            setStepTop(factStartLine);
        } else {
            setStepTop(stepTop + step);
        }
    }, [stepTop, setTopShouldShow, setStepTop, factStartLine]);

    const onBottomShow = useCallback(() => {
        setBottomShouldShow(true);
        setStepBottom(stepBottom + step);
    }, [stepBottom, setBottomShouldShow, setStepBottom]);

    const handleClickTop = useCallback(() => {
        onTopShow();
    }, [onTopShow]);

    const handleClickBottom = useCallback(() => {
        onBottomShow();
    }, [onBottomShow]);

    useEffect(() => {
        (async () => {
            try {
                const data = await customFetch(
                    `https://api.github.com/repos/${owner}/${repo}/contents/${path}`,
                    {
                        method: 'GET',
                    },
                );

                const { content: fileContent } = data;

                if (fileContent) {
                    setFullFileContent(decodedData(fileContent));
                }
            } catch (err) {
                console.error(err);
            }
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    /* eslint-disable react/no-array-index-key */
    return (
        <Wrapper>
            {!fullFileContent && <Spinner />}
            {fullFileContent && (
                <Highlight
                    {...defaultProps}
                    theme={theme}
                    code={fullFileContent.trim()}
                    language={language}
                >
                    {({ style, tokens, getLineProps, getTokenProps }) => (
                        <>
                            <Pre className={className} style={style}>
                                {topShouldShow &&
                                    tokens
                                        .slice(
                                            factStartLine - stepTop,
                                            factStartLine,
                                        )
                                        .map((line, key1) => (
                                            <Line
                                                key={key1}
                                                data-top
                                                {...getLineProps({
                                                    line,
                                                    key: key1,
                                                })}
                                            >
                                                <LineNo>{key1 + 1}</LineNo>
                                                <LineContent>
                                                    {line.map((token, key2) => (
                                                        <span
                                                            key={key2}
                                                            {...getTokenProps({
                                                                token,
                                                                key: key2,
                                                            })}
                                                        />
                                                    ))}
                                                </LineContent>
                                            </Line>
                                        ))}
                                {tokens
                                    .slice(factStartLine, factStartLine + lines)
                                    .map((line, key1) => (
                                        <Line
                                            key={key1}
                                            data-top
                                            {...getLineProps({
                                                line,
                                                key: key1,
                                            })}
                                        >
                                            <LineNo>
                                                {topShouldShow
                                                    ? stepTop + key1 + 1
                                                    : key1 + 1}
                                            </LineNo>
                                            <LineContent>
                                                {line.map((token, key2) => (
                                                    <span
                                                        key={key2}
                                                        {...getTokenProps({
                                                            token,
                                                            key: key2,
                                                        })}
                                                    />
                                                ))}
                                            </LineContent>
                                        </Line>
                                    ))}
                                {bottomShouldShow &&
                                    tokens
                                        .slice(
                                            factStartLine + lines,
                                            factStartLine + lines + stepBottom,
                                        )
                                        .map((line, key1) => (
                                            <Line
                                                key={key1}
                                                data-top
                                                {...getLineProps({
                                                    line,
                                                    key: key1,
                                                })}
                                            >
                                                <LineNo>
                                                    {lines + stepTop + key1 + 1}
                                                </LineNo>
                                                <LineContent>
                                                    {line.map((token, key2) => (
                                                        <span
                                                            key={key2}
                                                            {...getTokenProps({
                                                                token,
                                                                key: key2,
                                                            })}
                                                        />
                                                    ))}
                                                </LineContent>
                                            </Line>
                                        ))}
                            </Pre>
                            <nav>
                                {stepTop < factStartLine && (
                                    <MoreButton
                                        text="More"
                                        direction="top"
                                        onClick={handleClickTop}
                                    />
                                )}
                                {tokens.length >
                                    factStartLine + lines + stepBottom && (
                                    <MoreButton
                                        text="More"
                                        direction="bottom"
                                        onClick={handleClickBottom}
                                    />
                                )}
                                {stepTop >= factStartLine &&
                                    tokens.length <=
                                        factStartLine + lines + stepBottom && (
                                        <CopyButton onClick={onCopyClick} />
                                    )}
                            </nav>
                        </>
                    )}
                </Highlight>
            )}
        </Wrapper>
    );
    /* eslint-enable react/no-array-index-key */
};
