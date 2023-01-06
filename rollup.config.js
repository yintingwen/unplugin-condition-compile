import typescript from "rollup-plugin-typescript2";
import cleanup from "rollup-plugin-cleanup";
import clear from 'rollup-plugin-clear'

export default {
    input: {
        index: "src/index.ts",
        // webpack: "src/webpack.ts",
        rollup: "src/rollup.ts",
        // esbuild: "src/esbuild.ts",
        // vite: "src/vite.ts"
    },
    output: [
        {
            dir: "dist",
            chunkFileNames: "chunk-[hash].js",
            entryFileNames: '[name].js',
            format: 'esm'
        },
        {
            dir: "dist",
            chunkFileNames: "chunk-[hash].cjs",
            entryFileNames: '[name].cjs',
            format: 'cjs',
        }
    ],
    external: ["fs", "path", "unplugin"],
    plugins: [ clear({ watch: true, targets: ['dist']  }), typescript(), cleanup()]
}