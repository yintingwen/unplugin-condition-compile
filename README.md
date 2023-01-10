# unplugin-condition-compile
条件编译插件，可以通过注释语法，使代码块针对不同情况进行可选择的编译和剔除

## 安装
```bash
npm i -D unplugin-condition-compile
```
<details>
<summary>Rollup</summary>

```ts
// rollup.config.js
import plugin, {rollup as pluginRollup} from 'unplugin-vue-components/rollup'

export default {
    plugins: [
        Components.rollup({ /* options */}),
        pluginRollup({ /* options */})
    ],
}
```
目前仅调试了rollup

</details>

## 参数
```typescript
interface ConditionCompileOption {
    target: string
}
```
- target：编译时指定的条件字符串

## 使用
使用注释，以 #ifdef 或 #ifndef 开头，以 #endif 结尾。匹配条件可自定义
```typescript
// #ifdef target1 || target2 ...
// #ifndef target1 || target2 || ...
// #endif
```
- #ifdef：仅在该条件中存在
- #ifndef：在该条件中不存在
- #endif：结束，就近匹配
- targetn：匹配目标，和配置项中的target匹配，可通过 || 指定多个目标（或）

```typescript
// #ifdef t1 || t2
console.log('target等于t1和t2时，这块代码才会编译进去')
// endif

// #ifndef target1 || target2
console.log('target等于t1或t2时，这块代码会被剔除')
// endif
```