export class ResponseHandler {
    constructor(code, status, data, message) {
        this.code = code;
        this.status = status;
        this.data = data;
        this.message = message;
        this.code = code;
        this.status = status;
        this.message = message;
        this.data = data;
    }
    static resourceFetched(data, msg) {
        if (!msg) {
            return new ResponseHandler(200, "Success", data);
        }
        return new ResponseHandler(200, "Success", data, msg);
    }
    static resourceCreated(data, msg) {
        if (!msg) {
            return new ResponseHandler(200, "Success", data);
        }
        return new ResponseHandler(201, "Success", data, msg);
    }
    static resourceUpdated(data, msg) {
        if (!msg) {
            return new ResponseHandler(200, "Success", data);
        }
        return new ResponseHandler(200, "Success", data, msg);
    }
    static resourceDeleted(data, msg) {
        if (!msg) {
            return new ResponseHandler(200, "Success", data);
        }
        return new ResponseHandler(200, "Success", data, msg);
    }
}
