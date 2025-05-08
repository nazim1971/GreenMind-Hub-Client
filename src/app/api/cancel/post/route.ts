import { NextResponse } from 'next/server';


export async function POST(request: Request): Promise<NextResponse> {
  // Construct the redirect URL with tran_id as a query parameter
  const redirectUrl = '/cancel';

  // Redirect to the validation page
  return NextResponse.redirect(new URL(redirectUrl, request.url), 303);
}