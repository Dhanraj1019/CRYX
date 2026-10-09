import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../../../Supabase/Supabase";
import DatabaseObj from "../../../Supabase/database.js";

function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;

    const handleAuth = async () => {
      try {
        const {
          data: { session },
          error: sessionError,
        } = await supabase.auth.getSession();

        if (sessionError) {
          console.error("Failed to get session:", sessionError);
          
          if (isMounted) {
            navigate("/login", { replace: true });
          }

          return;
        }
        if (!session || !session.user) {
          console.warn("No authenticated session found.");

          if (isMounted) {
            navigate("/login", { replace: true });
          }

          return;
        }

        const authUser = session.user;
        const metadata = authUser.user_metadata || {};
        console.log("auth user is = ",authUser);
        const {
          data: existingProfile,
          error: profileCheckError,
        } = await supabase
          .from("userprofile")
          .select("*")
          .eq("id", authUser.id)
          .maybeSingle();
        console.log("existingprofile = ",existingProfile);
        if (profileCheckError) {
          console.error(
            "Failed to check user profile:",
            profileCheckError
          );

          if (isMounted) {
            navigate("/login", { replace: true });
          }

          return;
        }
        if (existingProfile) {
          // console.log("User profile already exists.");

          if (isMounted) {
            if(!existingProfile.publicurl?.trim()){
              const res=await DatabaseObj.updateData({table:"userprofile",data:{...existingProfile,publicurl:metadata.avatar_url},id:authUser.id})
              console.log("image not find in usrprofile ",existingProfile)
              console.log("res in update image : ",res);
            }
            navigate("/home", { replace: true });
          }

          return;
        }

        const fullName =
          metadata.full_name ||
          metadata.name ||
          "";

        const nameParts = fullName.trim().split(/\s+/);

        const firstName = nameParts[0] || "";
        const lastName = nameParts.slice(1).join(" ");

        const email = authUser.email || "";

        const username = email
          .split("@")[0]
          .toLowerCase()
          .replace(/[^a-z0-9._-]/g, "");

        const imageUrl =
          metadata.avatar_url ||
          metadata.picture ||
          null;

        const profileData = {
          id: authUser.id,
          firstName,
          lastName,
          username,
          email,
          publicurl: imageUrl,
        };

        console.log("Creating user profile:", profileData);

        const insertResult = await DatabaseObj.insertData({
          table: "userprofile",
          data: profileData,
        });

        console.log(
          "Profile stored successfully:",
          insertResult
        );

        if (isMounted) {
          navigate("/home", { replace: true });
        }

      } catch (error) {
        console.error(
          "Unexpected authentication error:",
          error
        );

        if (isMounted) {
          navigate("/login", { replace: true });
        }

      } finally {
        console.log("Authentication callback finished.");
      }
    };

    handleAuth();

    return () => {
      isMounted = false;
    };
  }, [navigate]);

  return (
    <div className="w-full flex justify-center">
      <div className="w-fit h-fit">
        <h2>Signing you in...</h2>
      </div>
    </div>
  );
}

export default AuthCallback;