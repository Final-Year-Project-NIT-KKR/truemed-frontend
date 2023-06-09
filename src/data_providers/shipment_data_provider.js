import Web3 from 'web3'

const SHIPMENT_LIST_ABI =[
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "listOfShipments",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "chainId",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "shipmentId",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "medicineId",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "senderId",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "recieverId",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "sendingTime",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "deliveryStatus",
          "type": "string"
        },
        {
          "internalType": "bool",
          "name": "transactionStatus",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "numberOfChains",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "numberOfShipments",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "bool",
          "name": "newShipment",
          "type": "bool"
        },
        {
          "internalType": "uint256",
          "name": "chainId",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "medicineId",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "recieverId",
          "type": "address"
        },
        {
          "internalType": "string",
          "name": "deliveryStatus",
          "type": "string"
        }
      ],
      "name": "createShipment",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "chainId",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "shipmentId",
          "type": "uint256"
        }
      ],
      "name": "deleteShipment",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "chainId",
          "type": "uint256"
        }
      ],
      "name": "deleteChain",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "chainId",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "shipmentId",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "deliveryStatus",
          "type": "string"
        }
      ],
      "name": "updateDeliveryStatus",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "chainId",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "shipmentId",
          "type": "uint256"
        }
      ],
      "name": "setTransactionComplete",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "chainId",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "shipmentId",
          "type": "uint256"
        }
      ],
      "name": "setVerified",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "chainId",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "shipmentId",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "getVerificationResult",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "chainId",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "shipmentId",
          "type": "uint256"
        }
      ],
      "name": "allowOpenSelling",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]
const SHIPMENT_LIST_ADDRESS = "0xFefaf0F05d81a80E5E45542d985EEF31bdBb5f3C"

async function createShipment(newShipment, chainId, medicineId, recieverId, deliveryStatus) {
    const web3 = new Web3(Web3.givenProvider || "http://localhost:7545")
    const shipmentList = new web3.eth.Contract(SHIPMENT_LIST_ABI, SHIPMENT_LIST_ADDRESS)
    const gas = await shipmentList.methods
    .createShipment(newShipment, chainId, medicineId, recieverId, deliveryStatus)
    .estimateGas();
    const accounts = await window.ethereum.enable();
    const account = accounts[0];
    await shipmentList.methods.createShipment(newShipment, chainId, medicineId, recieverId, deliveryStatus).send({ from: account, gas: 7920027 })
}

async function getPendingShipments(){
  const web3 = new Web3(Web3.givenProvider || "http://localhost:7545")
  const shipmentListContract = new web3.eth.Contract(SHIPMENT_LIST_ABI, SHIPMENT_LIST_ADDRESS)
  const numberOfChains = await shipmentListContract.methods.numberOfChains().call();
  var shipmentCount = []
  for(let i = 0;i<numberOfChains;i++){
    shipmentCount.push(await shipmentListContract.methods.numberOfShipments(i+1).call())
  }
  const accounts = await window.ethereum.enable();
  const account = accounts[0];
  var pending_shipments = []
  // console.log(shipmentCount)
  for(let chainId = 1; chainId<=shipmentCount.length; chainId++){
    for(let shipmentId = 1; shipmentId<=parseInt(shipmentCount[chainId-1]); shipmentId++){
      const shipment = await shipmentListContract.methods.listOfShipments(chainId, shipmentId).call()
      // console.log(shipment['recieverId'], account)
      if(shipment['recieverId'].toLowerCase()==account.toLowerCase() && shipment['transactionStatus']==false){
        pending_shipments.push(shipment)
      }
    }
  }
  return pending_shipments
}

async function getMyShipments(){
  const web3 = new Web3(Web3.givenProvider || "http://localhost:7545")
  const shipmentListContract = new web3.eth.Contract(SHIPMENT_LIST_ABI, SHIPMENT_LIST_ADDRESS)
  const numberOfChains = await shipmentListContract.methods.numberOfChains().call();
  var shipmentCount = []
  for(let i = 0;i<numberOfChains;i++){
    shipmentCount.push(await shipmentListContract.methods.numberOfShipments(i+1).call())
  }
  const accounts = await window.ethereum.enable();
  const account = accounts[0];
  var pending_shipments = []
  // console.log(shipmentCount)
  for(let chainId = 1; chainId<=shipmentCount.length; chainId++){
    for(let shipmentId = 1; shipmentId<=parseInt(shipmentCount[chainId-1]); shipmentId++){
      const shipment = await shipmentListContract.methods.listOfShipments(chainId, shipmentId).call()
      // console.log(shipment['recieverId'], account)
      if(shipment['senderId'].toLowerCase()===account.toLowerCase()){
        pending_shipments.push(shipment)
      }
    }
  }
  return pending_shipments
}

async function verifyShipment(chainId, shipmentId){
  const web3 = new Web3(Web3.givenProvider || "http://localhost:7545")
  const shipmentListContract = new web3.eth.Contract(SHIPMENT_LIST_ABI, SHIPMENT_LIST_ADDRESS)
  const accounts = await window.ethereum.enable();
    const account = accounts[0];
    console.log(chainId, shipmentId, account)
  const verificationResult = await shipmentListContract.methods.getVerificationResult(chainId, shipmentId, account).call()
  if(verificationResult==0){
    await shipmentListContract.methods.setVerified(chainId, shipmentId).send({from: account, gas: 7920027})
  }
  return verificationResult
}

async function updateDeliveryStatus(chainId, shipmentId, newStatus){
  const web3 = new Web3(Web3.givenProvider || "http://localhost:7545")
  const shipmentListContract = new web3.eth.Contract(SHIPMENT_LIST_ABI, SHIPMENT_LIST_ADDRESS)
  const accounts = await window.ethereum.enable();
  const account = accounts[0];
  await shipmentListContract.methods.updateDeliveryStatus(chainId, shipmentId, newStatus).send({from: account, gas: 7920027})    
}

async function allowOpenSelling(chainId, shipmentId){
  const web3 = new Web3(Web3.givenProvider || "http://localhost:7545")
  const shipmentListContract = new web3.eth.Contract(SHIPMENT_LIST_ABI, SHIPMENT_LIST_ADDRESS)
  const accounts = await window.ethereum.enable();
  const account = accounts[0];
  await shipmentListContract.methods.allowOpenSelling(chainId, shipmentId).send({from: account, gas: 7920027})
}

async function getSupplyChain(chainId, finalShipmentId){
  const web3 = new Web3(Web3.givenProvider || "http://localhost:7545")
  const shipmentListContract = new web3.eth.Contract(SHIPMENT_LIST_ABI, SHIPMENT_LIST_ADDRESS)
  const numberOfChains = await shipmentListContract.methods.numberOfChains().call();
  var shipmentCount = await shipmentListContract.methods.numberOfShipments(chainId).call()
  
  const accounts = await window.ethereum.enable();
  const account = accounts[0];
  var shipments = []
  // console.log(shipmentCount)
    for(let shipmentId = 1; shipmentId<=parseInt(shipmentCount); shipmentId++){
      const shipment = await shipmentListContract.methods.listOfShipments(chainId, shipmentId).call()
      // console.log(shipment['recieverId'], account)
        shipments.push(shipment)
        if(shipmentId==finalShipmentId) break;

    }
  return shipments
}

export { createShipment, getPendingShipments, getMyShipments, verifyShipment, updateDeliveryStatus, allowOpenSelling, getSupplyChain }