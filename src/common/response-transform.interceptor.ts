import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export class ResponseTransformInterceptor implements NestInterceptor {
    // 拦截器
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        // 处理请求
        return next.handle().pipe(
            map((data) => {
                // 返回数据
                return {
                    respCode: 0,
                    errorCode: 0,
                    respMsg: '请求成功',
                    data
                };
            })
        );
    }
}
