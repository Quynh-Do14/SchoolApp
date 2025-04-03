import { Alert } from "react-native";
import { Endpoint } from "../../../core/common/apiLink";
import { RequestService } from "../../utils/response";
import { messageConfig } from "../../helper/message";

class RegistrationService {
    async getRegistration(params: any, setLoading: Function) {
        setLoading(true)
        try {
            return await RequestService.
                get(Endpoint.Registration.registration,
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
    async createRegistration(data: any, setLoading: Function) {
        setLoading(true)
        try {
            return await RequestService.
                post(Endpoint.Registration.registration,
                    { ...data }
                ).then(response => {
                    Alert.alert(`Đăng kí thành công`);
                    return response;
                });
        } catch (error: any) {
            Alert.alert(`Đăng kí không thành công`, messageConfig(error.response.data.message));
        } finally {
            setLoading(false);
        }
    }
}

export default new RegistrationService();