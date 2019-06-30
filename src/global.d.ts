declare namespace NodeJS{
    interface Global {
        renderHTML(name:string):Promise<string>
    }
}

/**
 * --------------------------------------------
 * @todo 
 * webpack使用typescript，在引入非ts/js文件的时候
 * 需要声明为全局模块
 * 
 * @reference 
 * https://webpack.docschina.org/guides/typescript/
 */

/**允许ts引入样式 */
interface GlobalStyleClassesMap{
    [className:string]:string
}
declare module '*.less'{
    const content:GlobalStyleClassesMap;
    export default content
}
declare module '*.css'{
    const content:GlobalStyleClassesMap;
    export default content
}

/**允许ts引入图片 */
declare module '*.svg'
declare module '*.png'
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.gif'
declare module '*.bmp'
declare module '*.tiff'

/**允许ts引入文本 */
interface GlobalTextParam{
    [key:string]:any
}
interface GlobalTextTemplateFunction{
    (param?:GlobalTextParam):string
}
declare module '*.html'{
	const content:GlobalTextTemplateFunction
	export default content
}
declare module '*.glsl'{
	const content:GlobalTextTemplateFunction
	export default content
}
declare module '*.txt'{
	const content:GlobalTextTemplateFunction
	export default content
}