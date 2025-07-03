import axios from "axios";
import { toast } from "react-toastify";

const apiUrl = "http://127.0.0.1:8000";
export async function loginHandler(username) {
  const res = await axios.post(`${apiUrl}/login`, { username });
  if (res.data.status == "success") {
    toast("success");
  } else {
    toast("failed");
  }
  return res.data;
}
export async function singupHandler(username, name) {
  const res = await axios.post(`${apiUrl}/signup`, { username, name });
  if (res.data.status == "success") {
    toast("success");
  } else {
    toast("failed");
  }
  return res.data;
}

export async function getGroups(username) {
  const res = await axios.get(`${apiUrl}/users/${username}/groups`);
  console.log(res);
  if (res.data.status == "success") {
    toast("success");
  } else {
    toast("failed");
  }
  return res?.data;
}
export async function createGroup(name, members) {
  const res = await axios.post(`${apiUrl}/groups`, { members, name });
  if (res.data.status == "success") {
    toast("success");
  } else {
    toast("failed");
  }
  return res.data;
}
export async function insertExpense(data) {
  /**  user_id = data.get("user_id")
  amount = data.get("amount")
  description = data.get("description")
  split_type = data.get("split_type")
  split = data.get("split", [])
 */
  const { group_id, paid_by: username, amount, description, isSelected } = data;
  const type =
    Object.entries(data).filter((state) => {
      if (state[0].split("-")[0] == "percentage" && Number(state[1]) != 50)
        return true;

      return false;
    }).length > 0
      ? "percentage"
      : "equal";
  let split = Object.entries(data).filter((state) => {
    if (state[0].split("-")[0] == "percentage") return true;
    return false;
  });
  split = split.map((state) => {
    state[0] = state[0].split("-")[1];
    state[1] = isSelected ? 50 : Number(state[1]);
    console.log(state);
    return state;
  });
  console.log(data);
  const res = await axios.post(`${apiUrl}/groups/${group_id}/expenses`, {
    user_id: username,
    amount,
    description,
    type,
    split,
    split_type: isSelected ? "equal" : "percentage",
  });
  if (res.data.status == "success") {
    toast("success");
  } else {
    toast("failed");
  }
  console.log(res);
}

export async function getSummary(data) {
  const { groupID } = data;
  const res = await axios.get(`${apiUrl}/groups/${groupID}`);
  if (res.data.status == "success") {
    toast("success");
  } else {
    toast("failed");
  }
  return res.data.response;
}
export async function getUserSummary(username) {
  const res = await axios.get(`${apiUrl}/users/${username}/balances`);
  if (res.data.status == "success") {
    toast("success");
  } else {
    toast("failed");
  }
  return res.data.response;
}
export async function PayBackExpenseById(id, username) {
  console.log(username, id);
  const res = await axios.post(`${apiUrl}/users/payBack`, {
    id,
    username,
  });

  if (res.data.status == "success") {
    toast("success");
  } else {
    toast("failed");
  }
  return res.data;
}
export async function createSession(user_id) {
  const res = await axios.post(`${apiUrl}/users/${user_id}/create_session`);
  console.log(res);
  if (res.data.status == "success") {
    toast("success");
  } else {
    toast("failed");
  }
  return res.data.response;
}
export async function queryResolve(user_id, session_id, query) {
  const res = await axios.get(
    `${apiUrl}/users/${user_id}/query/${session_id}`,
    {
      params: { query },
    }
  );
  if (res.data.status == "success") {
    console.log("");
  } else {
    toast("failed");
  }
  return res.data.response;
}
export async function loadAll(user_id) {
  const res = await axios.get(`${apiUrl}/users/${user_id}/load_all_chat`);
  if (res.data.status == "success") {
    toast("success");
  } else {
    toast("failed");
  }
  return res.data.response;
}
export async function loadChat(user_id, session_id) {
  const res = await axios.get(
    `${apiUrl}/users/${user_id}/load_chat/${session_id}`
  );
  if (res.data.status == "success") {
    toast("success");
  } else {
    toast("failed");
  }
  return res.data.response;
}
