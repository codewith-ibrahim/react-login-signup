const BASE_URL = "https://servermaltex.whdevs.com";

export async function loginCompany(cmpID, cmpEmail) {
  try {
    const res = await fetch(`${BASE_URL}/company/addcompany`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ cmpID, cmpEmail }),
    });
    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "login failed");
    }
    return data.data;
  } catch (err) {
    console.error("login error", err);
    throw err;
  }
}

export async function singupCompany(formData) {
    try {
        const res = await fetch(`${BASE_URL}/company/addcompany`, {
            method: "POST",
            body: formData,
        });
        const data = await res.json();
        if(!res.ok){
            throw new Error(data.message || "signup failed");
        }
        return data.data;
    } catch(err){
        console.error("signup error", err);
        throw err;
    }
}