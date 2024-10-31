import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import ERROR_CODE from '@src/error';
// http 错误过滤器
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        // 获取请求上下文
        const ctx = host.switchToHttp();
        // 获取请求上下文中的 response对象
        const response = ctx.getResponse();
        // 获取异常状态码
        const status = exception.getStatus();

        // 设置错误信息
        console.log('exception:' + JSON.stringify(exception));
        // 生成错误消息
        const message = exception.message
            ? exception.message
            : `${status >= 500 ? 'Service Error' : 'Client Error'}`;
        // 组装响应消息
        const errorResponse = {
            respCode: -1,
            errorCode: ERROR_CODE.SYS_ERROR,
            respMsg: message
        };

        // 设置返回的状态码、请求头、发送错误信息。状态码做errorCode适配
        response.status(status);
        // 设置响应头
        response.header('Content-Type', 'application/json; charset=utf-8');
        // 返回响应
        response.send(errorResponse);
    }
}
