// THIS ONLY FOR EXAMPLE
import { selector } from "recoil";
import exampleAtom from "../atoms/exampleAtom";
import exampleClickedAtom from "../atoms/exampleClicked";

const exampleSelector = selector({
  key: "exampleSelector",
  get: ({ get }) => {
    const data = get(exampleAtom);
    const clickedExample = get(exampleClickedAtom);
    return !clickedExample
      ? data
      : "📢 this message is from exampleSelector.js in selector folder 😉";
  },
});

export default exampleSelector;

// THIS IS AN EXAMPLE WITH COMMUNICATION WITH BACKEND (GET PUBLICATION BY USER ID)

// const exampleWithAxiosRequestSelector = selector({
//   key: "exampleWithAxiosRequestSelector",
//   get: async ({ get }) => {
//     try {
//       const url = new URL(window.location.href);
//       const userId = url.searchParams.get("user");

//       const user = await get(userAtom);

//       const userModelId = (user && user._id) || userId;

//       if (userModelId) {
//         const response = await axios.get(
//           `${REACT_APP_API_BASE_URL}/v1/user/${userId}/publications`,
//           {
//             headers: {
//               Authorization: `Bearer ${getAuthSession().user.access_token}`,
//             },
//           }
//         );

//         return response.data;
//       }
//       return;
//     } catch (e) {
//       console.error("ERROR GET /api/v1/user/:id/publications", e);
//     }
//   },
// });
