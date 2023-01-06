import {parse} from '@babel/parser'
import MagicString from "magic-string";
import { createUnplugin } from 'unplugin'

export interface ConditionCompileOptions {
    target: string
}

export default createUnplugin((options: ConditionCompileOptions) => {
    return {
        name: 'condition-comment',
        transform (code: string, id) {
            const {target} = options
            if (!target) return code

            const s = new MagicString(code)
            let conditionStart: number | undefined = undefined
            let conditionOpen: boolean = false

            const ast = parse(code, {sourceType: 'module'})
            const { comments } = ast
            if (!comments || !comments.length) return code

            comments.forEach(comment => {
                if (comment.type !== 'CommentLine') return code
                const commentStr = comment.value.trim()
                if (!commentStr) return code

                if (/^#ifn?def/g.test(commentStr)) {
                    // 判断是包含还是排除
                    let conditionInclude = commentStr.includes('ifdef')
                    // 获取后面的平台字符串
                    const platformStr = commentStr.replace(/#ifn?def/g, '').trim()
                    if (!platformStr) return code
                    // 获取指定平台数组
                    const platforms = platformStr.split('||').map(item => item.trim())
                    // 包含条件，且包含其中，保留不进行裁剪
                    if (conditionInclude && platforms.includes(target)) return code
                    // 排除条件，且不包含其中，保留不进行裁剪
                    if (!conditionInclude && !platforms.includes(target)) return code
                    // 包含模式 且 在指定的平台中
                    conditionStart = comment.start
                }
                if (/^#endif/.test(commentStr)) {
                    // 没有开启
                    if (!comment.end || conditionStart === undefined) return code
                    s.remove(conditionStart, comment.end)
                    conditionOpen = true
                    conditionStart = undefined
                }
            })

            return conditionOpen ? s.toString() : code
        }
    }
})
