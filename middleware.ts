import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { type NextRequest, NextResponse } from 'next/server'

const isPublicRoute = createRouteMatcher(['/sign-in', '/sign-up', '/api(.*)', '/api/webhooks/clerk(.*)','/api/payment(.*)', '/api/paymentresult(.*)', 'accounts.(.*)']);
const isPrivateRoute = createRouteMatcher(['/p(.*)']);

export default clerkMiddleware( async (auth, request) => {   
  
  console.log("requestrequest url, ", request?.url);
  
  // if (request.url.match('__clerk')) {
  //   console.log("aaaaaaaaaaaaaaaaaaa____", request?.url, isPublicRoute(request));
  //   const proxyHeaders = new Headers(request.headers)
  //   proxyHeaders.set('Clerk-Proxy-Url', process.env.NEXT_PUBLIC_CLERK_PROXY_URL || '')
  //   proxyHeaders.set('Clerk-Secret-Key', process.env.CLERK_SECRET_KEY || '')
  //   if (request.ip) {
  //     proxyHeaders.set('X-Forwarded-For', request.ip)
  //   } else {
  //     proxyHeaders.set('X-Forwarded-For', request.headers.get('X-Forwarded-For') || '')
  //   }

  //   const proxyUrl = new URL(request.url)
  //   proxyUrl.host = 'frontend-api.clerk.dev'
  //   proxyUrl.protocol = 'https'
  //   proxyUrl.pathname = proxyUrl.pathname.replace('/__clerk', '')

  //   return NextResponse.rewrite(proxyUrl, {
  //     request: {
  //       headers: proxyHeaders,
  //     },
  //   })
  // }


  
  // if (!isPublicRoute(request)) {
  //   // console.log("Korunması gereken sayfa::: ", request?.url);
  //   await auth.protect()
  // }
  // else {
  //   // console.log("Korunması gereken sayfa değil::: ", request?.url);
  // }

  if (isPrivateRoute(request)) {
    // console.log("Korunması gereken sayfa::: ", request?.url);
    await auth.protect()
  }
  else {
    // console.log("Korunması gereken sayfa değil::: ", request?.url);
  }



  // 


}, 
// { debug: true }, 
)

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
      '/(api|trpc)(.*)',
    // '/',    
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