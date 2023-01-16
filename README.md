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
        plugin.rollup({ /* options */}),
        pluginRollup({ /* options */})
    ],
}
```
目前仅调试了rollup

</details>

## 参数
```typescript
interface ConditionCompileOption {
    target: string;
    startIncludeTag?: string;
    startExcludeTag?: string;
    endTag?: string;
}
```
- target: 编译时指定的条件字符串
- startIncludeTag: 包含条件的起始标签，默认#ifdef
- startExcludeTag: 排除条件的起始标签，默认#ifndef
- endif: 结束标签，默认#endif

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

## 自定义语法
可以通过 startIncludeTag，startExcludeTag，endTag 配置项来自定义模板中的语法
```typescript
export default {
    plugins: [
        plugin.rollup({
			target: 'wx',
            startIncludeTag: '$startIncludeTag',
            startExcludeTag: '!startExcludeTag',
			endTag: '@endTag'
		})
    ],
}
```
```typescript
// $startIncludeTag wx
console.log('包含在wx中的code')
// @endTag

// !startExcludeTag wx
console.log('不包含在wx中的code')
// @endTag
```
