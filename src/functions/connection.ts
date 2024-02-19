import { api } from "src/services/api";
import { serverReplyType } from "src/types";

type requestProps = {
    link: string,
    params: any,
    token?: string,
    onSuccess?: (response: serverReplyType) => void,
    onError?: (response: serverReplyType) => void,
    setWaitingResponse?: (status: boolean) => void,
}


export const postRequest = ({link, params, token, onSuccess, onError, setWaitingResponse}: requestProps) => {
    setWaitingResponse && setWaitingResponse(true);
    const headers = token? { authorization: token } : {};
    api
    .post(link, {...params}, { headers })
    .then((response) => {
        onSuccess && onSuccess(response.data);
        setWaitingResponse && setWaitingResponse(false);
    })
    .catch((e) => {
        console.log(e.message);
        onError && onError(e.response.data);
        setWaitingResponse && setWaitingResponse(false);
    });
};