/**
 * 初始化钩子
 */
const Hooks: {
    [index: string]: {
        [HookWhen.Before]: {
            Async: { [index: string]: Function },
            Sync: { [index: string]: Function }
        },
        [HookWhen.After]: {
            Async: { [index: string]: Function },
            Sync: { [index: string]: Function }
        },
    }
} = {};
/**
 * Hook时机
 */
export enum HookWhen {
    After,
    Before
}
export class Hook {
    /**
     * 注册Hook事件
     * @param Name Hook`s Name
     * @param When When Emit Hook ? Before or After
     * @param HookID Hook`s ID,We will replace the same id hook
     * @param Callback 
     * @param Async 
     */
    regist(Name: string, When: HookWhen, HookID: string, Callback: Function, Async: boolean = true) {
        if (!Hooks[Name]) {
            Hooks[Name] = {
                [HookWhen.After]: {
                    Async: {},
                    Sync: {}
                },
                [HookWhen.Before]: {
                    Async: {},
                    Sync: {}
                }
            };
        }
        // if (hooks[Name][HookID]) {
        if (Callback instanceof Function) {
            try {
                if (Async) {
                    Hooks[Name][When].Async[HookID] = Callback;
                } else {
                    Hooks[Name][When].Sync[HookID] = Callback;
                }
            } catch (error) {

            }
        }
        return true;
    }
    /**
     * 获取所有hook内容
     */
    get Hooks() {
        return Hooks;
    }
    /**
     * 反注册Hook事件
     * @param Name 
     * @param HookID 
     */
    unregist(Name: string, When: HookWhen, HookID: string) {
        if (!Hooks[Name]) {
            return true;
        }
        if (Hooks[Name][When].Async[HookID]) {
            delete Hooks[Name][When].Async[HookID]
        }
        if (Hooks[Name][When].Sync[HookID]) {
            delete Hooks[Name][When].Sync[HookID]
        }
        return true;
    }
    /**
     * 触发Hook事件
     * @param Name 
     * @param When 
     * @param Ctx 
     * @param Data 
     */
    async emit(Name: string, When: HookWhen, Ctx: any, Data: any) {
        if (!Hooks[Name]) {
            return true;
        }
        let hooks = Object.keys(Hooks[Name][When].Async);
        let asyncs = [];
        for (let i = 0; i < hooks.length; i++) {
            asyncs.push(Hooks[Name][When].Async[hooks[i]](Ctx, Data))
        }
        let syncHooks = Object.keys(Hooks[Name][When].Sync);
        for (let i = 0; i < syncHooks.length; i++) {
            await Hooks[Name][When].Sync[syncHooks[i]](Ctx, Data)
        }
        return true;
    }
}
const hook = new Hook()
export default hook;