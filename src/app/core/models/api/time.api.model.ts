import firebase from "firebase/compat";

export interface TimeApiModel {
  seconds: number;
  nanoseconds: number;
}


import Timestamp = firebase.firestore.Timestamp;
export default Timestamp;
