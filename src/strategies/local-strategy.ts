import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { UserType } from "../../types";
import { User } from "../schemas/mongoose/user";
import { comparePassword } from "../utils/helpers";

passport.serializeUser((user, done) => {
  console.log("Inside serialize user");
  console.log(user);
  done(null, (user as UserType).id);
});

passport.deserializeUser(async (id, done) => {
  console.log(`Inside deserialize user`);
  console.log(`Deserializing user id: ${id}`);

  try {
    const user: UserType | null = await User.findById(id);

    if (!user) {
      throw new Error("User not found!");
    }
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

export default passport.use(
  new LocalStrategy(
    { usernameField: "email" },
    async (email, password, done) => {

      try {
        const user: UserType | null = await User.findOne({email});

        if (!user) {
          throw new Error("User not found!");
        }

        if(!comparePassword(password, user.password)) {
          throw new Error("Wrong password!");
        }

        done(null, user);
      } catch (error) {
        console.log(error);
        done(error, null as any);
      }
    }
  )
);
