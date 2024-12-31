import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isPublicRoute = createRouteMatcher(['/sign-in', '/sign-up', '/api(.*)', '/api/webhooks/clerk(.*)','accounts.(.*)']);

export default clerkMiddleware( async (auth, request) => {   
  //console.log("aaaaa:", request);
  if (!isPublicRoute(request)) {
    await auth.protect()
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