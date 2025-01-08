import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isPublicRoute = createRouteMatcher(['/sign-in', '/sign-up', '/api(.*)', '/api/webhooks/clerk(.*)','/api/payment(.*)', '/api/payment_result(.*)', 'accounts.(.*)']);

export default clerkMiddleware( async (auth, request) => {   

  console.log("aaaaaaaaaaaaaaaaaaa____", request?.url, isPublicRoute(request));
  
  if (!isPublicRoute(request)) {
    // console.log("Korunması gereken sayfa::: ", request?.url);
    await auth.protect()
  }
  else {
    // console.log("Korunması gereken sayfa değil::: ", request?.url);
  }
}, 
// { debug: true }, 
)

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
    '/',    
  ],
}



// import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";....



// export default clerkMiddleware((auth, request) => {
//   if(!isPublicRoute(request)) {
//     auth().protect();
//   }
// });

// export const config = {
//   matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
// };