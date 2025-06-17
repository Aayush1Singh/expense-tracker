import React from "react";
import axios from "axios";
const apiUrl = "http://127.0.0.1:8000";
export async function loginHandler(username) {
  const res = await axios.post(`${apiUrl}/login`, { username });
  return res.data;
}
export async function singupHandler(username, name) {
  const res = await axios.post(`${apiUrl}/signup`, { username, name });
  return res.data;
}

export async function getGroups(username) {
  const res = await axios.get(`${apiUrl}/users/${username}/groups`);
  return res.data;
}
export async function createGroup(name, members) {
  const res = await axios.post(`${apiUrl}/groups`, { members, name });
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
  console.log(res);
}

export async function getSummary(data) {
  const { groupID } = data;
  const res = await axios.get(`${apiUrl}/groups/${groupID}`);
  return res.data;
}
export async function getUserSummary(username) {
  const res = await axios.get(`${apiUrl}/users/${username}/balances`);
  return res.data;
}
export async function PayBackExpenseById(id, username) {
  console.log(username, id);
  const res = await axios.post(`${apiUrl}/users/payBack`, {
    id,
    username,
  });
}
