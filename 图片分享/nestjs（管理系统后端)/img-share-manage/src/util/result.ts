export class Result{
    static ok(data?:any,message?:string) {
        return {
            code: 1,
            message: message == undefined ? "成功" : message,
            data:data
        }
    }
    static no(message?: string) {
        return {
            code: 2,
            message: message == undefined ? "失败" : message,
            data:null
        }
    }
}