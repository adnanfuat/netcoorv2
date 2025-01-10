import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { type NextRequest, NextResponse } from 'next/server'

const isPublicRoute = createRouteMatcher(['/sign-in', '/sign-up', '/api(.*)', '/api/webhooks/clerk(.*)','/api/payment(.*)', '/api/paymentresult(.*)', 'accounts.(.*)']);
const isPrivateRoute = createRouteMatcher(['/paaaa/']);

export default clerkMiddleware( async (auth, request) => {   
  
   // console.log("RQLL::: , ", request?.url);    
   
   // if (!isPublicRoute(request)) {
   //   // console.log("Korunması gereken sayfa::: ", request?.url);
   //   await auth.protect()
   // }
   // else {
   //   // console.log("Korunması gereken sayfa değil::: ", request?.url);
   // }
   
    if (isPrivateRoute(request) ) { //
    // console.log("Korunması gereken sayfa::: ", request?.url);
    await auth.protect()
  }
  else {
     console.log("Korunması gereken sayfa değil::: ", request?.url);
  }



}
// { debug: true }, 
)

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    // '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    // '/(api|trpc)(.*)',
    '/api/perfectmutation_next15(.*)',
    '/api/perfectquery_next15(.*)',
    '/api/upload(.*)',
    '/api/payment/(.*)',
    '/api/webhooks/(.*)',
    '/p(.*)',    
  ],
}

