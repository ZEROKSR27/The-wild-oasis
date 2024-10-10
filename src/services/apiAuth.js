import supabase from "./supabase";

export async function signUp({ fullName, email, password }) {
    await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                fullName,
                avatar: "",
            },
        },
    });
}
export async function signWithGoogle() {
    await supabase.auth.signInWithOAuth({
        provider: "google",
    });
}

export async function login({ email, password }) {
    let { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) {
        throw new Error(error.message);
    }

    return data;
}

export async function getTheUser() {
    const { data: session } = await supabase.auth.getSession();

    if (!session.session) return;

    const { data, error } = await supabase.auth.getUser();
    if (error) {
        throw new Error(error.message);
    }

    return data.user;
}

export async function LogOut() {
    const { error } = await supabase.auth.signOut();

    if (error) {
        throw new Error(error.message);
    }
}

export async function updateTHEuser({ fullName, password, avatar }) {
    let UpdateData;
    if (password) UpdateData = password;
    if (fullName) UpdateData = fullName;
    const ph = password ? `password` : `fullName`;

    const { data: newUserData, error } = await supabase.auth.updateUser({
        data: {
            [ph]: UpdateData,
        },
    });
    const { error: error3 } = await supabase.auth.updateUser({
        [ph]: UpdateData,
    });
    if (error3) {
        throw new Error(error3.message);
    }

    if (error) {
        throw new Error(error.message);
    }

    if (!avatar) return newUserData;

    // av

    const fileName = `avatar-${newUserData.user.id}-${Math.random()}`;

    const { error: StorageError } = await supabase.storage
        .from("avatars")
        .upload(fileName, avatar);

    if (StorageError) throw new Error(StorageError.message);

    // put this av in user

    const { data: newUserData2, error2 } = await supabase.auth.updateUser({
        data: {
            avatar: `https://kcnecazqiibjxxydpefd.supabase.co/storage/v1/object/public/avatars/${fileName}`,
        },
    });

    if (error2) throw new Error(error2.message);

    return newUserData2;
}
