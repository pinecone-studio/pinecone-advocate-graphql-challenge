// export  async function search() {
//       const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Accept: "application/json",
//         },
//         body: JSON.stringify({
//           query: searchQuery,
//           variables: {
//             input: "alert",
//           },
//         }),
//       });
//       const data = await res.json();
//       console.log("DATA=>", data);
//     }
