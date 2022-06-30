import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from '@rollup/plugin-typescript';
import babel from '@rollup/plugin-babel';
import svgr from '@svgr/rollup';
import url from '@rollup/plugin-url';
import { DEFAULT_EXTENSIONS } from '@babel/core';

const external = (id) => !id.startsWith('.') && !id.startsWith('/');

const getBabelOptions = ({useESModules}) => {
    return {
        babelrc: false,
        presets: [
            ["@babel/preset-env", { "modules": false }],
            "@babel/preset-react",
            "@babel/preset-typescript"
        ],
        plugins: [["@babel/transform-runtime", { useESModules }]],
        babelHelpers: 'runtime',
        exclude: '/node_modules/**',
        extensions: [...DEFAULT_EXTENSIONS, '.ts', '.tsx']
    }
}

export default [{
    input: './src/index.ts',
    output: [
        {
            dir: 'dist/esm',
            format: 'esm',
            preserveModules: true,
            preserveModulesRoot: 'src'
        },
    ],
    external,
    treeshake: true,
    plugins: [
        url(),
        svgr(),
        resolve({
            preferBuiltins: true,
            extensions: ['.ts', '.tsx']
        }),
        typescript(),
        commonjs({
            include: '/node_modules/**',
        }),
        babel(getBabelOptions({ useESModules: true }))
    ]}, 
    {
    input: './src/index.ts',
    output: [
        {
            dir: 'dist',
            format: 'cjs',
            preserveModules: true,
            preserveModulesRoot: 'src',
            exports: "named"
        },
    ],
    external,
    treeshake: true,
    plugins: [
        url(),
        svgr(),
        resolve({
            preferBuiltins: true,
            extensions: ['.ts', '.tsx']
        }),
        typescript({"outDir": "dist", "declarationDir": "dist"}),
        commonjs({
            include: '/node_modules/**',
        }),
        babel(getBabelOptions({ useESModules: false }))
    ]
}]