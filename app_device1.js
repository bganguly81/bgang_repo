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
			    var msg = "Device registered for owner address "+ result.args.from;
			    document.getElementById('deviceMsg').innerHTML = ""+msg;
				console.log(result.blockNumber);
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
	//isVisible = false;
	var AddForFetchinEvents = document.getElementById('AddForFetchinEvents').value;
	//AddForFetchinEvents = "0xB7F252F01D018b03fBd4a5dbec3FF46B6813Fd95";
	//var allEvents = myContractInstance.CoinMinted({to:AddForFetchinEvents},{fromBlock: 0, toBlock: 'latest'},function(error, result) {
	if(AddForFetchinEvents!=''){	
	console.log(AddForFetchinEvents);
	var allEvents = myContractInstance.Sent({deviceCode:AddForFetchinEvents},{fromBlock: 1602151, toBlock: 'latest'},function(error, result) {
			  if (!error) {
				  var msg = result.args.to +" received " + (result.args.amount) + " fresh new coins " ;
				    var mytbody = document.getElementById('displayMintCoinEventsTableBody');
					var row = document.createElement('tr');
                    
					var cell1 = document.createElement('td');
					var text1 = document.createTextNode(result.args.from);
					
					var cell2 = document.createElement('td');
					var text2 = document.createTextNode(result.args.to);
					
					var cell3 = document.createElement('td');
					var text3 = document.createTextNode(result.args.deviceCode);
	
                     cell1.appendChild(text1);
                     row.appendChild(cell1);
					 
					 cell2.appendChild(text2);
                     row.appendChild(cell2);
					 
					 cell3.appendChild(text3);
                     row.appendChild(cell3);
					 
					 mytbody.appendChild(row);
					 
				     console.log(result);
			  }
			  else {
				  console.error(error);
			  } 
		}); 
	} else {
		console.log("pulling all the events");
		var allEvents = myContractInstance.Sent({},{fromBlock: 1602151, toBlock: 'latest'},function(error, result) {
			  if (!error) {
				  //var msg = result.args.to +" received " + (result.args.amount) + " fresh new coins " ;
				    
					var msg = result.args.to +" received " + (result.args.amount) + " fresh new coins " ;
				    var mytbody = document.getElementById('displayMintCoinEventsTableBody');
					var row = document.createElement('tr');
                    
					var cell1 = document.createElement('td');
					var text1 = document.createTextNode(result.args.from);
					
					var cell2 = document.createElement('td');
					var text2 = document.createTextNode(result.args.to);
					
					var cell3 = document.createElement('td');
					var text3 = document.createTextNode(result.args.deviceCode);
					
					/* var cell4 = document.createElement('td');
					var text4 = document.createTextNode(result.args.deviceCode);
					
					var cell5 = document.createElement('td');
					var text5 = document.createTextNode(result.args.deviceCode);
					
					var cell6 = document.createElement('td');
					var text6 = document.createTextNode(result.args.deviceCode);
					
					var cell7 = document.createElement('td');
					var text7 = document.createTextNode(result.args.deviceCode);
					
					var cell8 = document.createElement('td');
					var text8 = document.createTextNode(result.args.deviceCode); */
	
                     cell1.appendChild(text1);
                     row.appendChild(cell1);
					 
					 cell2.appendChild(text2);
                     row.appendChild(cell2);
					 
					 cell3.appendChild(text3);
                     row.appendChild(cell3);
					 
					 /* cell4.appendChild(text4);
                     row.appendChild(cell4);
					 
					 cell5.appendChild(text5);
                     row.appendChild(cell5);
					 
					 cell6.appendChild(text6);
                     row.appendChild(cell6);
					 
					 cell7.appendChild(text7);
                     row.appendChild(cell7);
					 
					 cell8.appendChild(text8);
                     row.appendChild(cell8); */
					 
					 
					 mytbody.appendChild(row);
					 
					
					//document.getElementById('MintCoinEvents').innerHTML += "<hr/>"+"From::"+result.args.from+" "+"To::"+result.args.to+" "+"Device Code::"+result.args.deviceCode+" "+"Device Description::"+result.args.deviceDesc+" "+"Device Cost::"+result.args.deviceCost+" "+"Device Manufactured Date:"+result.args.devManDate+" "+"Device Manufactured Comp::"+result.args.devManCompany+" "+"Remarks::"+result.args.remarks;
//				    op.push(msg)
				    console.log(result);
					
			  }
			  else {
				  console.error(error);
			  } 
		}); 
	}
	allEvents.stopWatching();
	//isVisible =true;
	//return isVisible;
}


function handleAllMintCoinEvent1()
{

var AddForFetchinEvents = document.getElementById('AddForFetchinEvents').value;
var devEvent = myContractInstance.Sent({from: AddForFetchinEvents});
console.log("devEvent::::::::"+AddForFetchinEvents);
devEvent.get(function(err, result) {
	console.log(result);
  if (err) {
    console.log(err)
    return;
  }
  
   document.getElementById('MintCoinEvents').innerHTML += "<hr/>"+result;
  // append details of result.args to UI
})
	
	
}

function allEventTrigger(){
myContractInstance.Sent({from:"0xc4b8680d64C5B230279a2241A4Fe55350ED86749",to:"0xB7F252F01D018b03fBd4a5dbec3FF46B6813Fd95"}, { fromBlock: 0, toBlock: 'latest' }).get((error, eventResult) => {
  if (error)
    console.log('Error in myEvent event handler: ' + error);
  else
    console.log('myEvent: ' + JSON.stringify(eventResult.args));
 document.getElementById('MintCoinEvents').innerHTML += "<hr/>"+eventResult;
});
}


 
 