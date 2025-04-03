import { Endpoint } from "../../../core/common/apiLink";
import { RequestService } from "../../utils/response";

class CourseService {
    async getCourse(params: any, setLoading: Function) {
        setLoading(true)
        try {
            return await RequestService.
                get(Endpoint.Course.course,
                    { ...params }
                ).then(response => {
                    return response;
                });
        }
        catch (error) {
            console.log(error)
        } finally {
            setLoading(false);
        }
    }

}

export default new CourseService();