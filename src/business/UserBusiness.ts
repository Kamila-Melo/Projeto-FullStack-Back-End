import { UserDatabase } from "../data/UserDatabase";
import { LoginUserInputDTo, SignUpUserInputDTo } from "../model/User";
import { Authenticator } from "../services/Authenticator";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";

export class UserBusiness{
    constructor(
        private userDatabase: UserDatabase,
        private hashManager: HashManager,
        private authenticator: Authenticator,
        private idGenerator: IdGenerator
    ){}

    public async signUp(user: SignUpUserInputDTo): Promise<string> {
        if(!user){
            throw new Error("Enter all necessary information for registration")
        }

        if(user.email.indexOf("@") === -1){
            throw new Error("Invalid email")
        }

        if(user.password.length < 6){
            throw new Error("The password must contain at least 6 characters")
        }

        const id = this.idGenerator.generateId()

        const hashPassword = await this.hashManager.hash(user.password)

        await this.userDatabase.createUser(
            id,
            user.name,
            user.email,
            user.nickname,
            hashPassword
        )

        const token = this.authenticator.generateToken({id})

        return token
    }

    public async login(user: LoginUserInputDTo): Promise<string>{
        if(!user){
            throw new Error("Enter all necessary information for login")
        }

        if(user.email.indexOf("@") === -1){
            throw new Error("Invalid email")
        }

        const userData = await this.userDatabase.getUserByEmail(user.email)

        const compareResult = await this.hashManager.compare(user.password, userData.getPassword())

        if(!compareResult){
            throw new Error("Invalid username or password")
        }

        const token = this.authenticator.generateToken({id: userData.getId()})

        return token
    }
    
}