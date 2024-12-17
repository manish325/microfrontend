// Global state object to store shared data
let globalState = {};
// Array of connected ports (clients)
const connections = [];
// On new connection to the Shared Worker
self.onconnect = function (event) {
  const port = event.ports[0];
  connections.push(port);

  // Listen for messages from microfrontends
  port.onmessage = function (e) {
    const { type, payload } = e.data;

    if (type === 'setState') {
      // Update the global state
      globalState = { ...globalState, ...payload };

      // Notify all connected clients about the updated state
      connections.forEach((conn) => conn.postMessage({ type: 'stateUpdate', state: globalState }));
    } else if (type === 'getState') {
      // Send the current state to the client
      port.postMessage({ type: 'stateUpdate', state: globalState });
    }
  };

  // Start communication
  port.start();
};
