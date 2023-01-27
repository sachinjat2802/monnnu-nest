import jwt from "jsonwebtoken";
//import config from "../../appConfig";

class JwtGenerator {
    private jwtKey: string;

    constructor(jwtKey: string) {
        this.jwtKey = jwtKey;
    }

    public generateJwtClient(userid: string, username: string, roleName?: string): string {
        const payload = {
            id: userid,
            username: username,
            role: roleName,
        };

        const signoptions: jwt.SignOptions = {
            issuer: "espotz-api-service-master-issuer",
            subject: userid.toString(),
            algorithm: "HS256",
        };

        const token = jwt.sign(
            payload,
            this.jwtKey,
            signoptions
        );

        return token;
    }

    public generateJwtAdmin(userid: string, email?: string): string {
        const payload = {
            id: userid,
            email: email,
        };

        const signoptions: jwt.SignOptions = {
            issuer: "espotz-admin-service-master-issuer",
            subject: userid.toString(),
            algorithm: "HS256",
        };

        const token = jwt.sign(
            payload,
            this.jwtKey,
            signoptions
        );

        return token;
    }
}

export default JwtGenerator;
