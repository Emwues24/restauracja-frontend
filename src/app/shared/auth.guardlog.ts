import { CanActivateFn,Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuardLog: CanActivateFn = (route, state) => {
  const router:Router = inject(Router);
  const token = localStorage.getItem('token')
  if(token){
    router.navigate(['/dashboard/orders'])
    return false
  }
  else {
    return true;}
};