import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../../../Supabase/Supabase";
import DatabaseObj from "../../../Supabase/database.js";

function AuthCallback() {
  const navigate = useNavigate();
  const processedRef = useRef(false);

  useEffect(() => {
    let isMounted = true;

    const processSession = async (session) => {
      // Prevent running multiple times if called by both code exchange and auth state listener
      if (processedRef.current || !session?.user) return;
      processedRef.current = true;

      try {
        const authUser = session.user;
        const metadata = authUser.user_metadata || {};

        // console.log("Authenticated User:", authUser);

        // 1. Check existing profile
        const { data: existingProfile, error: profileCheckError } = await supabase
          .from("userprofile")
          .select("*")
          .eq("id", authUser.id)
          .maybeSingle();

        if (profileCheckError) {
          console.error("Failed to check user profile:", profileCheckError);
          if (isMounted) navigate("/login", { replace: true });
          return;
        }

        if (existingProfile) {
          if (!existingProfile.publicurl?.trim() && metadata.avatar_url) {
            await DatabaseObj.updateData({
              table: "userprofile",
              data: { publicurl: metadata.avatar_url },
              id: authUser.id,
            });
          }
          if (isMounted) navigate("/home", { replace: true });
          return;
        }

        // 2. Format details from Google Metadata
        const fullName = metadata.full_name || metadata.name || "";
        const nameParts = fullName.trim().split(/\s+/);
        const firstName = nameParts[0] || "";
        const lastName = nameParts.slice(1).join(" ");
        const email = authUser.email || "";
        const username = email
          .split("@")[0]
          .toLowerCase()
          .replace(/[^a-z0-9._-]/g, "");
        const imageUrl = metadata.avatar_url || metadata.picture || null;

        const profileData = {
          id: authUser.id,
          firstName,
          lastName,
          username,
          email,
          publicurl: imageUrl,
        };

        // console.log("Creating user profile:", profileData);

        await DatabaseObj.insertData({
          table: "userprofile",
          data: profileData,
        });

        if (isMounted) {
          navigate("/home", { replace: true });
        }
      } catch (error) {
        console.error("Unexpected authentication error:", error);
        if (isMounted) navigate("/login", { replace: true });
      }
    };

    const handleAuth = async () => {
      // Check if OAuth returned a PKCE code in query params: ?code=...
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get("code");

      if (code) {
        const { data, error } = await supabase.auth.exchangeCodeForSession(code);
        if (!error && data?.session) {
          await processSession(data.session);
          return;
        }
      }

      // Check for an existing session or implicit flow tokens
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        await processSession(session);
        return;
      }

      // Fallback listener in case Supabase is still parsing the hash / session
      const { data: authListener } = supabase.auth.onAuthStateChange(
        async (event, currentSession) => {
          if (currentSession && (event === "SIGNED_IN" || event === "INITIAL_SESSION")) {
            await processSession(currentSession);
          }
        }
      );

      // If no session appears after 5 seconds, redirect back to login
      const timeoutId = setTimeout(() => {
        if (!processedRef.current && isMounted) {
          console.warn("Authentication timed out.");
          navigate("/login", { replace: true });
        }
      }, 5000);

      return () => {
        authListener?.subscription?.unsubscribe();
        clearTimeout(timeoutId);
      };
    };

    const cleanupPromise = handleAuth();

    return () => {
      isMounted = false;
      cleanupPromise.then((cleanup) => cleanup && cleanup());
    };
  }, [navigate]);

  return (
    <div className="w-full flex justify-center items-center min-h-screen">
      <div className="w-fit h-fit text-center">
        <h2>Signing you in with Google...</h2>
      </div>
    </div>
  );
}

export default AuthCallback;
