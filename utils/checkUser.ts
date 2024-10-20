import { newRequest } from "./createRequest";

const getUser = async () => {
    const check = localStorage.getItem("currentUser");
    let userId = "";
    
    if (check !== null) {
      userId = JSON.parse(localStorage.getItem("currentUser") || " ")?._id;
      const res = await newRequest(`/api/user/user-data/${userId}`)

      if(res.data) return res.data;
      return null;
    }
    
    return null;
}

export { getUser }