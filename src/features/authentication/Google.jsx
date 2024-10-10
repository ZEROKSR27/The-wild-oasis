import { useEffect } from "react";
import supabase from "../../services/supabase"; // استخدم Supabase client الخاص بك
import { useNavigate } from "react-router-dom";

function GoogleCallback() {
    const navigate = useNavigate();

    useEffect(() => {
        const handleAuthResponse = async () => {
            const { data, error } = await supabase.auth.getSessionFromUrl();
            if (error) {
                console.error("Error during Google login:", error);
            } else {
                console.log("Login successful:", data);
                // بعد النجاح، قم بتوجيه المستخدم إلى الصفحة الرئيسية أو أي صفحة أخرى
                navigate("/");
            }
        };

        handleAuthResponse();
    }, [navigate]);

    return (
        <div>
            <p>Processing login...</p>
        </div>
    );
}

export default GoogleCallback;
