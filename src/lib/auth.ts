import { AuthOptions } from 'next-auth'
import AzureADProvider from 'next-auth/providers/azure-ad'

export const authOptions: AuthOptions = {
  providers: [
    AzureADProvider({
      clientId: process.env.AZURE_AD_CLIENT_ID!,
      clientSecret: process.env.AZURE_AD_CLIENT_SECRET!,
      tenantId: process.env.AZURE_AD_TENANT_ID!,
      authorization: { params: { scope: 'openid profile user.Read email' } }
    })
  ],
  pages: {
    signIn: '/auth/signin'
  },
  callbacks: {
    async jwt ({ token, account }) {
      // IMPORTANT: Persist the access_token to the token right after sign in
      if (account) {
        token.idToken = account.id_token
      }
      return token
    }
  },
  secret: process.env.NEXTAUTH_SECRET
}
