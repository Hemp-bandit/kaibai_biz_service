import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import BizError from '@src/error/biz_error';

// errorCode 错误过滤器
@Catch(BizError)
export default class ErrorCodeExceptionFilter implements ExceptionFilter {
    catch(exception: BizError, host: ArgumentsHost) {
        // 获取请求上下文
        const ctx = host.switchToHttp();
        // 获取请求上下文中的 response对象
        const response = ctx.getResponse();

        console.log('ErrorCodeException:' + JSON.stringify({ errorCode: exception.code, message: exception.message }));
        // 设置错误信息
        const errorResponse = {
            respCode: -1,
            errorCode: exception.code,
            respMsg: exception.message
        };
        // 设置响应头
        response.header('Content-Type', 'application/json; charset=utf-8');
        // 发送响应
        response.send(errorResponse);
    }
}
