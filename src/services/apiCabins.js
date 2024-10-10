import supabase from "./supabase";
/* 
    1. read fn 
*/
export async function getCabins() {
    const { data, error } = await supabase.from("cabins").select("*");

    if (error) {
        console.log(error);
        throw new Error("could not get Cabins (from apiCabins)");
    }

    return data;
}
/*
    2. create/edit fn
*/
export async function createEditCabin(cabinDataOBJ, ID) {
    const URL_to_Supabase = "https://kcnecazqiibjxxydpefd.supabase.co";
    const path_to_cabins = "/storage/v1/object/public/cabin-images/";
    const cabinImage = `${Math.random()}--${
        cabinDataOBJ.image.name
    }`.replaceAll("/", "");

    const hasImgPath = cabinDataOBJ.image?.startsWith?.(URL_to_Supabase);

    const full_img_URL = hasImgPath
        ? cabinDataOBJ.image
        : `${URL_to_Supabase}${path_to_cabins}${cabinImage}`;
    // --1-> create/edit cabin
    let query = supabase.from("cabins");

    // A) CREATE
    if (!ID) query = query.insert([{ ...cabinDataOBJ, image: full_img_URL }]);
    // \\

    // B) EDIT
    if (ID)
        query = query
            .update({ ...cabinDataOBJ, image: full_img_URL })
            .eq("id", ID);
    // \\
    const { data, error } = await query.select().single();

    if (error) {
        console.log(error);
        throw new Error("could not Add Cabin (API Error)");
    }

    // --2-> uploading image
    if (hasImgPath) return data;

    const { error: StorageError } = await supabase.storage
        .from("cabin-images")
        .upload(cabinImage, cabinDataOBJ.image);

    // --3-> Error handeling

    if (StorageError) {
        await supabase.from("cabins").delete().eq("id", data.id);
        console.error(StorageError);
        throw new Error("could not upload the image file");
    }

    return data;
}

/*
    3. delete fn
*/
export async function deleteCabin(cabinID) {
    const { error } = await supabase.from("cabins").delete().eq("id", cabinID);

    if (error) {
        console.log(error);
        throw new Error("could not Delete Cabin (API Error)");
    }
}
