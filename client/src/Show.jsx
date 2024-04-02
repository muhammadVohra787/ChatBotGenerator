// import React from "react";
// import ReactDOM from "react-dom"; // Import ReactDOM separately

// function Show() {
//     var div = document.createElement('div');
//     var chatPreview = document.createElement('div');
//     chatPreview.setAttribute('id', 'chat-preview-container');
//     div.appendChild(chatPreview);
//     document.body.appendChild(div);

//     var script = document.createElement('script');
//     script.src = 'http://localhost:3000/static/js/bundle.js'; // Replace 'path_to_your_bundle.js' with the actual path to your bundled JavaScript file
//     script.onload = function () {
//       ReactDOM.render(
//         React.createElement(ChatPreview, { // Ensure ChatPreview is properly imported
//           chatnameFromParent: 'newChat',
//           userIdFromParent: '5',
//           preview: false
//         }),
//         document.getElementById('chat-preview-container')
//       );
//     };
//     document.body.appendChild(script);
//   }
