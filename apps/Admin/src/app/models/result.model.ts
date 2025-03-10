export interface ResultModel<T>{
  data?:T
  errorMessage? : string[] ;
  isSuccessful : boolean;
  statusCode : number;
}
