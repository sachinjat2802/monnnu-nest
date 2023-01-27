import jwt from "jsonwebtoken";
//import config from "../../appConfig";

class JwtVerify {
    private jwtKey: string;

    constructor(jwtKey: string) {
        this.jwtKey = jwtKey;
    }

    public decodeJwt(token: string): any {
        try {
            const payload = jwt.decode(token);
            return payload;
        } catch (error) {
            console.error(
                "-------------ERROR:: decoding the token :: Start-----------"
            );
            console.error(error);
            throw new Error("Error decoding the payload");
        }
    }

    public verfyJwtClient(token: string, next: CallableFunction): any {
        const payload: any = this.decodeJwt(token);
        const verifyOptions: jwt.VerifyOptions = {
            issuer: "espotz-api-service-master-issuer",
            subject: payload.sub,
            audience: payload.aud, // roles/scope of the token *Have to be replaced by regex
            algorithms: ["HS256"],
        };

        jwt.verify(token, this.jwtKey, verifyOptions, (err, decodeJwt) => {
            if (err) {
                next(err);
            } else {
                next(null, decodeJwt);
            }
        });
    }

    public verfyJwtAdmin(token: string, next: CallableFunction): any {
        const payload: any = this.decodeJwt(token);
        const verifyOptions: jwt.VerifyOptions = {
            issuer: "espotz-admin-service-master-issuer",
            subject: payload.sub,
            audience: payload.aud, // roles/scope of the token *Have to be replaced by regex
            algorithms: ["HS256"],
        };
        jwt.verify(token, this.jwtKey, verifyOptions, (err, decodeJwt) => {
            if (err) {
                next(err);
            } else {
                next(null, decodeJwt);
            }
        });
    }
}

export default JwtVerify;
