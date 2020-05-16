export class User{

    constructor(
        public email: string,
        public id: string,
        private _token:string,
        private _tokenExpirePeriod : Date){}

    get token(){
        if(!this._tokenExpirePeriod || new Date > this._tokenExpirePeriod){
            return ;
        }
        return this._token;
    }    
}