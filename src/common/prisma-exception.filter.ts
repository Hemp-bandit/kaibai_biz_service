import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import ERROR_CODE from '@src/error';

// http 错误过滤器
@Catch()
export class PrismaExceptionFilter implements ExceptionFilter {
    catch(exception, host: ArgumentsHost) {
        // 获取请求上下文
        const ctx = host.switchToHttp();
        // 获取请求上下文中的 response对象
        const response = ctx.getResponse();

        // 设置错误信息
        const errorResponse = {
            // respCode
            respCode: -1,
            // errorCode
            errorCode: ERROR_CODE.DB_ERR,
            // respMsg
            respMsg: "db err"
        };

        console.log(JSON.stringify(exception, null, 2));
        // 获取名称
        const name = Reflect.get(exception, 'name');
        if (name) {
            // 未知的prisma error
            if (name === 'PrismaClientKnownRequestError') {
                // @ts-ignore
                errorResponse.errorCode = ERROR_CODE.DB_ERR
                // @ts-ignore
                errorResponse.respMsg = "db err";
            }
            // @ts-ignore
        } else { errorResponse.respMsg = 'Service Error'; }

        // 设置返回的状态码、请求头、发送错误信息。状态码做errorCode适配
        response.status(500);
        // 设置响应头
        response.header('Content-Type', 'application/json; charset=utf-8');
        // 返回响应
        response.send(errorResponse);
    }
}
