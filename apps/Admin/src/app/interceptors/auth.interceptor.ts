import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjEyZTdhNGI1LTQzYmYtNDAyYy1iNTdlLTJmZDEwNmVjMDY4OSIsIm5iZiI6MTc0MTU1NTcwNSwiZXhwIjoxNzQxNjQyMTA1LCJpc3MiOiJFbXJlIENhbiIsImF1ZCI6IkVtcmUgQ2FuIn0.RociI2L-a_bqkYQ60VL6u5_0RNYBgJ5cyUq7lzXUAbzxQX6jaiih5w6bZscf13xihWcyJX8krEImII-FLVZjRg";
  const cloneReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  })
  return next(cloneReq);
};
