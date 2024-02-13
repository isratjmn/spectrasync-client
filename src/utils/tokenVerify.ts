import { jwtDecode } from "jwt-decode";

export const tokenverify = (token: string) => {
    return jwtDecode(token)
};
