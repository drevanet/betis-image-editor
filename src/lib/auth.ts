import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
// If your Prisma file is located elsewhere, you can change the path
import { PrismaClient } from "@prisma/client";
import { Polar } from "@polar-sh/sdk";
import { env } from "~/env";
import { polar, checkout, portal, usage, webhooks } from "@polar-sh/better-auth";
import { db } from "~/server/db";


const polarClient = new Polar({
    accessToken: env.POLAR_ACCESS_TOKEN,
   
    server: 'production'
});
const prisma = new PrismaClient();
export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider:  "postgresql", 
    }),
    emailAndPassword: { 
    enabled: true, 
  }, 
   plugins: [
    polar({
      client: polarClient,
      createCustomerOnSignUp: true,
      use: [
        checkout({
          products: [
            {
              productId: "92c24638-7f9a-45f5-822f-c3fbd0606073",
              slug: "500 credits",
            },
            {
              productId: "74a6d6f0-2901-4784-b807-1329429017d8",
              slug: "unlimited",
            },
           
          ],
          successUrl: "/dashboard",
          authenticatedUsersOnly: true,
        }),
        portal(),
        webhooks({
          secret: env.POLAR_WEBHOOK_SECRET,
          onOrderPaid: async (order) => {
            const externalCustomerId = order.data.customer.externalId;

            if (!externalCustomerId) {
              console.error("No external customer ID found.");
              throw new Error("No external customer id found.");
            }

            const productId = order.data.productId;

            let creditsToAdd = 0;

            switch (productId) {
              case "92c24638-7f9a-45f5-822f-c3fbd0606073":
                creditsToAdd = 500;
                break;
              case "74a6d6f0-2901-4784-b807-1329429017d8":
                creditsToAdd = 1000;
                break;
           
            }

            await db.user.update({
              where: { id: externalCustomerId },
              data: {
                credits: {
                  increment: creditsToAdd,
                },
              },
            });
          },
        }),
      ],
    }),
  ],
});