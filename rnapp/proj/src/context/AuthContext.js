import createDataContext from "./createDataContext";
import requestapi from "../api/request.js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { navigate } from "../navigationRef";
const authReducer = (state, action) => {
  switch (action.type) {
    case "add_error":
      return { ...state, errorMessage: action.payload };
    case "signup":
      return { token: action.payload, errorMessage: "" };
    case "signin":
      return { token: action.payload, errorMessage: "" };
    case "signout":
      return { token: null, errorMessage: "" };
    case "clear_error_message":
      return { ...state, errorMessage: "" };
    case "get_requests":
      return { ...state, allrequests: action.payload };
    case "add_request":
      return { ...state, allrequests: [...state.allrequests, action.payload] };
    case "get_user_details":
      return { ...state, errorMessage: "", userData: action.payload };
    case "get_replies":
      return { ...state, replies: action.payload };
    case "add_reply":
      return {
        ...state,
        replies: [...(state.replies || []), action.payload],
      };
    default:
      return state;
  }
};
const clearErrorMessage = (dispatch) => {
  return () => dispatch({ type: "clear_error_message" });
};
const signup = (dispatch) => {
  return async ({ name, email, phonenumber, password }) => {
    try {
      const response = await requestapi.post("/signup", {
        name,
        email,
        phonenumber,
        password,
      });
      await AsyncStorage.setItem("token", response.data.token);
      dispatch({ type: "signup", payload: response.data.token });
      navigate("homeflow");
    } catch (err) {
      console.log(
        "Signup Error:",
        err.response ? err.response.data : err.message
      );
      dispatch({
        type: "add_error",
        payload: "Something went wrong with sign up",
      });
    }
  };
};
const signin = (dispatch) => {
  return async ({ email, password }) => {
    try {
      const response = await requestapi.post("/signin", { email, password });
      console.log(response);
      await AsyncStorage.setItem("token", response.data.token);
      dispatch({ type: "signin", payload: response.data.token });
      navigate("homeflow");
    } catch (err) {
      dispatch({
        type: "add_error",
        payload: "Something went wrong with sign in",
      });
    }
  };
};
const tryLocalSignin = (dispatch) => async () => {
  const token = await AsyncStorage.getItem("token");
  if (token) {
    dispatch({ type: "signin", payload: token });
    navigate("homeflow");
  } else {
    navigate("Signup");
  }
};
const signout = (dispatch) => {
  return async () => {
    await AsyncStorage.removeItem("token");
    dispatch({ type: "signout" });
    navigate("loginFlow");
  };
};
const getrequests = (dispatch) => {
  return async () => {
    try {
      const token = await AsyncStorage.getItem("token"); // Retrieve token from storage
      if (!token) {
        console.error("No token found! Redirecting to login.");
        return;
      }

      const response = await requestapi.get("/requests", {
        headers: { Authorization: `Bearer ${token}` }, // Attach token
      });

      dispatch({ type: "get_requests", payload: response.data });
    } catch (error) {
      console.error(
        "Error fetching requests:",
        error.response ? error.response.data : error.message
      );
    }
  };
};
const postrequest = (dispatch) => {
  return async ({ title, description, category }) => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        console.error("No token found! Redirecting to login.");
        return;
      }
      const response = await requestapi.post(
        "/requests",
        { title, description, category },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      dispatch({ type: "add_request", payload: response.data });
      console.log("Request posted successfully:", response.data);
    } catch (error) {
      console.error(
        "Error posting request:",
        error.response ? error.response.data : error.message
      );
    }
  };
};
const getuserdetails = (dispatch) => {
  return async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        console.error("No token found! Redirecting to login.");
        return;
      }

      const response = await requestapi.get("/user/me", {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("User details fetched successfully:", response.data);
      dispatch({ type: "get_user_details", payload: response.data });
    } catch (error) {
      console.error(
        "Error fetching user details:",
        error.response ? error.response.data : error.message
      );
    }
  };
};
const postReply = (dispatch) => {
  return async ({ requestId, replyText, userId }) => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        console.error("No token found! Redirecting to login.");
        return;
      }

      const response = await requestapi.post(
        `/requests/${requestId}/replies`,
        { replyText, userId }, // Include userId in the request body
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log("Reply posted successfully:", response.data);
      dispatch({ type: "add_reply", payload: response.data });
    } catch (error) {
      console.error(
        "Error posting reply:",
        error.response ? error.response.data : error.message
      );
    }
  };
};
const getReplies = (dispatch) => {
  return async ({ requestId }) => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        console.error("No token found! Redirecting to login.");
        return;
      }

      const response = await requestapi.get(`/requests/${requestId}/replies`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("Replies fetched successfully:", response.data);
      dispatch({ type: "get_replies", payload: response.data });
    } catch (error) {
      console.error(
        "Error fetching replies:",
        error.response ? error.response.data : error.message
      );
    }
  };
};
export const { Provider, Context } = createDataContext(
  authReducer,
  {
    signin,
    signup,
    signout,
    clearErrorMessage,
    tryLocalSignin,
    getuserdetails,
    getrequests,
    postrequest,
    getReplies,
    postReply,
  },
  {
    token: null,
    errorMessage: "",
    allrequests: [],
    userData: null,
    replies: [],
  }
);
