Hook Library
设计思路：
在框架执行过程中需要针对某些执行场景进行统计、权限判断等，为了实现Aop风格的调用和动态的调整，因此编写此库。
核心用法
```typescript
//注册hook事件
import hook from './hook'
import { HookWhen } from './hook';
//注册一个后置事件
hook.regist('Login',HookWhen.After,'LoginAuthCheck',()=>{},true)
//触发事件
hook.emit('Login', HookWhen.After, {}, {})
// 每次触发需要传入2个参数，
// 内部的同步函数会先自行，然后再是异步，
```