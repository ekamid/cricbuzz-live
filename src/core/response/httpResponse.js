
class HttpResponse {

    static baseResponse(dataResponse) {
        const { message = 'Data has been received', code = 200, ...rest } = dataResponse;

        return { code, message, ...rest };
    }


    static get(dataResponse) {
        const message = "Data retrived successfully"
        return this.baseResponse({ message, ...dataResponse });
    }

    static created(dataResponse) {
        const message = "Data Created successfully"

        return this.baseResponse({ code: 201, message, ...dataResponse });
    }

    static updated(dataResponse) {
        const message = "Data updated successfully"
        return this.baseResponse({ message, ...dataResponse });
    }

    static deleted(dataResponse) {
        const message = "Data deleted successfully"
        return this.baseResponse({ message, ...dataResponse });
    }
}

module.exports = HttpResponse;
