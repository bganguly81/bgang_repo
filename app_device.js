var abi;
var myContractInstance;
var MyContract;
function startApp(abi2,MyContract2,myContractInstance2){
		console.error("startup");
	    abi=abi2;
	    MyContract=MyContract2;
	    myContractInstance=myContractInstance2;
}

function deviceRegistry(){ 
	var deviceAddress = document.getElementById('deviceAddress').value;
	var deviceCode = document.getElementById('deviceCode').value;
	var deviceType = document.getElementById('deviceType').value;
	var deviceDesc = document.getElementById('deviceDesc').value;
	var devManDate = document.getElementById('devManDate').value;
	var devManCompany = document.getElementById('devManComp').value;
	var deviceCost = document.getElementById('deviceCost').value;
	var remarks = document.getElementById('remarks').value;
	
	var mintProp = myContractInstance.mint(deviceAddress,deviceCode,deviceType,deviceDesc,devManDate,devManCompany,deviceCost,remarks,function(err,res){
		if(err){
			console.log(err);
		} else {
			//document.getElementById('deviceMsg').innerHTML = "Device registered for owner address ::"+ " " +deviceAddress;
			console.log(res);
		}
	});
    //document.getElementById('propMsg').innerHTML = "Propery registered for address ::"+""+ownerAdd;
	var event = myContractInstance.deviceRegisterEvent({},function(error, result) {
		  if (!error) {
			    var msg = "Property registered for owner address "+ result.args.from;
			    document.getElementById('deviceMsg').innerHTML = ""+msg;
			    console.log(msg);

		  }
		  else {
			  console.error(error);
		  } 
	});
	
}

function sendDevice(){

	var receiverAdd = document.getElementById('receiverAdd').value;
	var deviceToSend = document.getElementById('deviceToSend').value;
	var sendDevice = myContractInstance.send(receiverAdd,deviceToSend,function(err,res){
		if(err){
			console.log(err);
		} else {
			console.log(res);
		}
	});
 var event = myContractInstance.Sent({},function(error, result) {
		  if (!error) {
			    var msg = "Device transfered to " +"buyer address "+ result.args.to;
			    document.getElementById('sentMsg').innerHTML = ""+msg;
			    console.log(msg);

		  }
		  else {
			  console.error(error);
		  } 
	});
}

function srchDevice(){
	var checkDevice = document.getElementById('checkDevice').value;
	var deviceCd = document.getElementById('deviceCd').value;
	var sendDevice = myContractInstance.ownerDeivceRef(checkDevice,deviceCd,function(err,res){
		if(err){
			console.log(err);
		} else {
			//document.getElementById('balanceCallback').innerHTML = ""+"Device Code::"+res[0]+" "+"Device Type::"+" "+res[1]+" "+"Device Description::"+" "+res[2];
			if(null == res)
			{
				document.getElementById('balanceCallback').innerHTML="No device details found!!!!";
			}
			document.getElementById('deviceAddId1').innerHTML=checkDevice;
			document.getElementById('deviceCodeId1').innerHTML=res[0];
			document.getElementById('deviceTypeId1').innerHTML=res[1];
			document.getElementById('deviceDescId1').innerHTML=res[2];
			document.getElementById('deviceCostId1').innerHTML=res[6];
			document.getElementById('deviceManuDatefId1').innerHTML=res[3];
			document.getElementById('deviceManuCompfId1').innerHTML=res[4];
			document.getElementById('deviceremarksId1').innerHTML=res[5];
		
			console.log(res);
		}
	});
}

function handleAllMintCoinEvent(){
	var AddForFetchinEvents = document.getElementById('AddForFetchinEvents').value;
	
	//var allEvents = myContractInstance.CoinMinted({to:AddForFetchinEvents},{fromBlock: 0, toBlock: 'latest'},function(error, result) {
	if(AddForFetchinEvents!=''){	
	console.log(AddForFetchinEvents);
	var allEvents = myContractInstance.Sent({from:"0xc4b8680d64C5B230279a2241A4Fe55350ED86749",to:AddForFetchinEvents,propCode:"90"},{fromBlock: 0, toBlock: 'latest'},function(error, result) {
			  if (!error) {
				  //var msg = result.args.to +" received " + (result.args.amount) + " fresh new coins " ;
				    document.getElementById('MintCoinEvents').innerHTML += "<hr/>"+result;
//				    op.push(msg)
				    console.log(result);
			  }
			  else {
				  console.error(error);
			  } 
		}); 
	} else {
		console.log("pulling all the events");
		var allEvents = myContractInstance.Sent({},{fromBlock: 0, toBlock: 'latest'},function(error, result) {
			  if (!error) {
				  //var msg = result.args.to +" received " + (result.args.amount) + " fresh new coins " ;
				    document.getElementById('MintCoinEvents').innerHTML += "<hr/>"+result;
//				    op.push(msg)
				    console.log(result);
			  }
			  else {
				  console.error(error);
			  } 
		}); 
	}
	allEvents.stopWatching();
	
}


 
 