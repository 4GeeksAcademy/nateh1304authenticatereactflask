const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			signup: async (email, password) => {
				try {
					// Creating the userData object
					const userData = { email, password };

					const response = await fetch('https://studious-waddle-x59gj54r7xpj26r4g-3001.app.github.dev/signup', {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify(userData),
					});

					if (response.ok) {
						const data = await response.json();
						localStorage.setItem('authToken', data.token);
						// store token & id in localstorage with setItem; in fetch to '/private' route you need to use 
						// getItem from local storage to get the value of the token and put in the 'Bearer'
					} else {
						throw new Error(data.message || 'Signup failed'); // Throw error if signup fails
					}
				} catch (error) {
					console.error('Error signing up:', error); // Log any errors
					throw error;
				}
			},

			login: async (email, password) => {
				try {
					const response = await fetch('https://studious-waddle-x59gj54r7xpj26r4g-3001.app.github.dev/login', {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify({ email, password }),
					});

					if (response.ok) {
						const data = await response.json();
						if (data.token) {
							localStorage.setItem('authToken', data.token);

						} else {
							throw new Error('Token missing in response');
						}
					} else {

						const errorData = await response.json();
						throw new Error(errorData.message || 'Login failed');
					}
				} catch (error) {
					console.error('Error logging in:', error);
					throw error; // Rethrow for handling in the UI
				}
			},


			private: async () => {
				const token = localStorage.getItem('authToken');

				if (!token) {
					console.error("Token not found. User is not authenticated.");
					return;
				}

				try {
					const response = await fetch('https://studious-waddle-x59gj54r7xpj26r4g-3000.app.github.dev/private', {
						method: 'GET',
						headers: {
							'Content-Type': 'application/json',
							'Authorization': `Bearer ${token}`
						},
					});

					if (!response.ok) {
						console.error(`HTTP error! Status: ${response.status}`);
						if (response.status === 401) {
							console.error("Unauthorized access. Please log in again.");
						}

					}

					const data = await response.json();
					console.log("Private data fetched:", data);


				} catch (error) {
					console.error("Error fetching private data:", error);
				}
			},

			getMessage: async () => {
				try {
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				} catch (error) {
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
