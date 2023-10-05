

// Connect to Ethereum network using web3.js
const web3 = new Web3(Web3.givenProvider);


// Replace with your contract address and ABI
const contractAddress = "0x91eCFB6E2561C5c9F79facfba8737a3058B122E9";
const contractABI = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_description",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_deadline",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_priority",
				"type": "uint256"
			}
		],
		"name": "createTask",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			}
		],
		"name": "deleteTask",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "bool",
				"name": "completed",
				"type": "bool"
			}
		],
		"name": "TaskCompleted",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "description",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "deadline",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "priority",
				"type": "uint256"
			}
		],
		"name": "TaskCreated",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			}
		],
		"name": "TaskDeleted",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "description",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "deadline",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "priority",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "bool",
				"name": "completed",
				"type": "bool"
			}
		],
		"name": "TaskUpdated",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			}
		],
		"name": "toggleTaskStatus",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_description",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_deadline",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_priority",
				"type": "uint256"
			}
		],
		"name": "updateTask",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "taskCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "tasks",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "description",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "deadline",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "priority",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "completed",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

// Função para conectar uma conta do MetaMask
async function connectMetaMask() {
    try {
        // Solicitar permissão para acessar contas do MetaMask
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        
        // Verificar se há contas retornadas
        if (accounts.length > 0) {
            const selectedAccount = accounts[0]; // Use a primeira conta (ou a que o usuário selecionou)

            // Agora você pode usar selectedAccount para interações com a blockchain
            console.log(`Connected to MetaMask with account: ${selectedAccount}`);
        } else {
            console.log('No MetaMask accounts available.');
        }
    } catch (error) {
        console.error('Error connecting to MetaMask:', error);
    }
}

// Resto do seu código JavaScript aqui


// Create a contract instance
const contract = new web3.eth.Contract(contractABI, contractAddress);



// Function to create a task
async function createTask() {
    const description = document.getElementById("taskDescription").value;
    const deadline = parseInt(document.getElementById("taskDeadline").value);
    const priority = parseInt(document.getElementById("taskPriority").value);

    // Use MetaMask to get the current user's Ethereum address
    const accounts = await web3.eth.requestAccounts();
    const userAddress = accounts[0];

    try {
        // Call the createTask function in the contract
        await contract.methods.createTask(description, deadline, priority).send({ from: userAddress });
        alert("Task created successfully!");
		location.reload();
    } catch (error) {
        console.error(error);
        alert("Failed to create task.");
    }
	
}

async function displayTasks() {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    const taskCount = await contract.methods.taskCount().call();

    for (let i = 1; i <= taskCount; i++) {
        const task = await contract.methods.tasks(i).call();

        // Verifique se o ID da tarefa é maior que 0 antes de adicioná-lo à lista
        if (task.id > 0) {
            const taskItem = document.createElement("li");
            taskItem.innerHTML = `Task ID: ${task.id}, Description: ${task.description}, Deadline: ${task.deadline}, Priority: ${task.priority}, Completed: ${task.completed}`;
            taskList.appendChild(taskItem);
        }
    }
}




// Function to edit a task
async function editTask() {
    const taskId = parseInt(document.getElementById("editTaskId").value);
    const newDescription = document.getElementById("editTaskDescription").value;
    const newDeadline = parseInt(document.getElementById("editTaskDeadline").value);
    const newPriority = parseInt(document.getElementById("editTaskPriority").value);

    // Use MetaMask to get the current user's Ethereum address
    const accounts = await web3.eth.requestAccounts();
    const userAddress = accounts[0];

    try {
        // Call the updateTask function in the contract
        await contract.methods.updateTask(taskId, newDescription, newDeadline, newPriority).send({ from: userAddress });
        alert("Task updated successfully!");
		location.reload();
    } catch (error) {
        console.error(error);
        alert("Failed to update task.");
    }
}

// Function to toggle task status (completing/uncompleting a task)
async function toggleTaskStatus() {
    const taskId = parseInt(document.getElementById("toggleTaskId").value);

    // Use MetaMask to get the current user's Ethereum address
    const accounts = await web3.eth.requestAccounts();
    const userAddress = accounts[0];

    try {
        // Call the toggleTaskStatus function in the contract
        await contract.methods.toggleTaskStatus(taskId).send({ from: userAddress });
        alert("Task status toggled successfully!");
		location.reload();

    } catch (error) {
        console.error(error);
        alert("Failed to toggle task status.");
		
    }
}

// Function to delete a task
async function deleteTask() {
    try {
        // Use MetaMask to get the current user's Ethereum address
        const accounts = await web3.eth.requestAccounts();
        const userAddress = accounts[0]; // Use a primeira conta (ou a que o usuário selecionou)

        const taskId = parseInt(document.getElementById("deleteTaskId").value);

        await contract.methods.deleteTask(taskId).send({ from: userAddress });
        alert("Task deleted successfully!");
        location.reload();
    } catch (error) {
        console.error(error);
        alert("Failed to delete task.");
    }
}

// Call the displayTasks function to load tasks when the page loads
displayTasks();
