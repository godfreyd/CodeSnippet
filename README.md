# CodeSnippet

## Usage

1. Install dependences:

    ```sh
    npm i
    ```

2. Build dist:

    ```sh
    npm run build
    ```

3. Add CodeSnippet to your app:

    ```ts
    import { CodeSnippet } from './dist/CodeSnippet'

    export const App = () => {

    const args = {
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
    }

    return (
        <div className="App">
            <CodeSnippet content={args.content} language={args.language} startLine={args.startLine} artifactLocation={args.artifactLocation}/>
        </div>
    );
    }
    ```

## Run StoryBook

1. Install dependences:

    ```sh
    npm i
    ```

2. Run StoryBook

    ```sh
    npm run storybook
    ```

Storybook is running on [port 6006](http://localhost:6006/).