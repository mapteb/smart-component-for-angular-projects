import { UserRole } from "../state-transitions-config/user-role.enum";


/**
 * User info
 * 
 */
export class User {
    loginId = '';
    pwd = '';
    name = '';
    role?: UserRole = 0;

    constructor(loginId: string, pwd: string, name: string, role?: UserRole) {
        this.loginId = loginId;
        this.pwd = pwd;
        this.name = name;
        this.role = role;
    }
}

