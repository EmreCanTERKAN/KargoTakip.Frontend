import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjEyZTdhNGI1LTQzYmYtNDAyYy1iNTdlLTJmZDEwNmVjMDY4OSIsIm5iZiI6MTc0MTQzMTI3NywiZXhwIjoxNzQxNTE3Njc3LCJpc3MiOiJFbXJlIENhbiIsImF1ZCI6IkVtcmUgQ2FuIn0.y1BALZKnaw_yFzQpP5cGY4nPfusl3BGv4SMnWpfuFKDcS9CyGEff5Dx2Q63jfkVq7lAsFIOTwD27TZAvl2P9dw";
  const cloneReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  })
  return next(cloneReq);
};
