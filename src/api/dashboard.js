const BASE_URL = "https://servermaltex.whdevs.com";

export async function getDashboardData(userID){
    try{
        const res = await fetch(`${BASE_URL}/menus/getMenusUserIDWise`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({userID}),
        });
        const data = await res.json();
        if(!res.ok){
            throw new Error(data.message || "Failed to fetch dashboard data");
        }
        return data.data || data;
    } catch(err){
        console.error("Error fetching dashboard data", err);
        throw err;
    }

}