import hook from './hook'
import { HookWhen } from './hook';
hook.regist('Login', HookWhen.After, 'LoginAuthCheck', () => { }, true)
hook.emit('Login', HookWhen.After, {}, {})