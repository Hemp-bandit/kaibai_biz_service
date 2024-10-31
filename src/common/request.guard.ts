import { CanActivate, ExecutionContext, Logger } from '@nestjs/common';
import { IncomingMessage } from 'http';
import { Observable } from 'rxjs';

export class RequestGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        // 获取当前请求ctx
        const request = context.switchToHttp().getRequest<IncomingMessage>();
        // 获取body
        const body = Reflect.get(request, 'body');
        // 获取query
        const query = Reflect.get(request, 'query');
        // params
        const params = Reflect.get(request, 'params');
        // 获取请求方法
        const method = request.method;
        // 获取headers
        const headers = request.headers;
        // 组装数据
        const requestData = {
            // 请求数据
            url: request.url,
            // 请求数据
            method,
            // 请求数据
            query,
            // 请求数据
            params,
            // 请求数据
            body
        };
        // console.log('[ request.url ] >', request.headers);
        Logger.log(JSON.stringify(requestData), 'request.url');
        return true;
    }
}
