import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/db/mongodb";
import dbConnect from "@/db/connect";
import User from "@/db/models/User";

export default NextAuth({
  // Configure one or more authentication providers

  providers: [
    GoogleProvider({
      clientId: process.env.GG_ID,
      clientSecret: process.env.GG_SECRET,
    }),

    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],

  adapter: MongoDBAdapter(clientPromise),

  callbacks: {
    async session({ session, user }) {
      dbConnect();
      const currentUser = await User.findById(user.id);
      if (currentUser.favoritePlaces == null) {
        currentUser.favoritePlaces = [];
        currentUser.save();
      }

      if (currentUser.createdPlaces == null) {
        currentUser.createdPlaces = [];
        currentUser.save();
      }

      return { ...session, user: { ...session.user, id: user.id } };
    },
  },
});
