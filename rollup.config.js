import typescript from 'rollup-plugin-typescript2';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

export default {
    input: 'wait-for-element-transition.ts',
    output: {
        format: 'esm',
        file: 'dist/wait-for-element-transition.js'
    },
    plugins: [resolve(), typescript(), commonjs()],
};
