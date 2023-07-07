import API from ".";

// weddings
export function getWeddings(wedding_id) {
  return API.fetchJSON(`weddings/${wedding_id}`);
}
export function getWedding(wedding_id) {
  return API.fetchJSON(`weddings/${wedding_id}`);
}
export function createWedding(body) {
  return API.fetchJSON(`weddings`, body);
}
export function updateWedding(wedding_id, body) {
  return API.fetchJSON(`weddings/${wedding_id}`, body, {
    method: "PATCH",
  });
}
export function deleteWedding(wedding_id) {
  return API.fetchJSON(`weddings/${wedding_id}`, null, {
    method: "DELETE",
  });
}

// guests
export function getGuests(wedding_id) {
  return API.fetchJSON(`weddings/${wedding_id}/guests`);
}
export function getGuest(wedding_id, id) {
  return API.fetchJSON(`weddings/${wedding_id}/guests/${id}`);
}
export function getGuestByPasscode(wedding_id, passcode) {
  return API.fetchJSON(
    `weddings/${wedding_id}/guests/show_by_passcode/${passcode}`
  );
}
export function createGuest(wedding_id, body) {
  return API.fetchJSON(`weddings/${wedding_id}/guests`, body);
}
export function updateGuest(wedding_id, id, body) {
  return API.fetchJSON(`weddings/${wedding_id}/guests/${id}`, body, {
    method: "PATCH",
  });
}
export function deleteGuest(wedding_id, id) {
  return API.fetchJSON(`weddings/${wedding_id}/guests/${id}`, null, {
    method: "DELETE",
  });
}
