import React from 'react';

import { CodeSnippet } from '.';

export default {
    title: 'Example/CodeSnippet',
    component: CodeSnippet,
    argTypes: {},
};

const Template = args => <CodeSnippet {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    content: [
        'return (',
             '<AlertContainer>',
                 '{alerts.map(alert => {',
                 'const {message, key, ...rest} = alert;',
                 'return (',
                     '<Alert',
                     'key={key}',
                     '{...rest}',
                     '>{message}</Alert>',
                 ');',
                 '})}',
             '</AlertContainer>',
        ');',
    ],
    language: 'js',
    startLine: 37,
    artifactLocation: {
        owner: 'JetBrains',
        repo: 'ring-ui',
        path: 'src/alert-service/alert-service.tsx',
    },
};
