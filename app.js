var abi;
var myContractInstance;
var MyContract;
function startApp(abi2,MyContract2,myContractInstance2){
		console.error("startup");
	    abi=abi2;
	    MyContract=MyContract2;
	    myContractInstance=myContractInstance2;
}

function propRegistry(){ 
	var ownerAdd = document.getElementById('ownerAddress').value;
	var propCode = document.getElementById('propCode').value;
	var propType = document.getElementById('propType').value;
	var propVal = document.getElementById('propVal').value;
	var mintProp = myContractInstance.mint(ownerAdd,propCode,propType,propVal,function(err,res){
		if(err){
			console.log(err);
		} else {
			document.getElementById('propMsg').innerHTML = "Propery registered for owner address ::"+ " " +ownerAdd;
			console.log(res);
		}
	});
    //document.getElementById('propMsg').innerHTML = "Propery registered for address ::"+""+ownerAdd;
}

function sendProperty(){

	var receiverAdd = document.getElementById('receiverAdd').value;
	var propToSend = document.getElementById('propToSend').value;
	var sendProp = myContractInstance.send(receiverAdd,propToSend,function(err,res){
		if(err){
			console.log(err);
		} else {
			console.log(res);
		}
	});
 var event = myContractInstance.Sent({},function(error, result) {
		  if (!error) {
			    var msg = "Property transfered to " +"buyer address "+ result.args.to;
			    document.getElementById('sentMsg').innerHTML = ""+msg;
			    console.log(msg);

		  }
		  else {
			  console.error(error);
		  } 
	});
}

function checkPropertyBalance(){
	var checkProp = document.getElementById('checkProp').value;
	var propCd = document.getElementById('propCd').value;
	var sendProperty = myContractInstance.ownerProprtyRef(checkProp,propCd,function(err,res){
		if(err){
			console.log(err);
		} else {
			document.getElementById('balanceCallback').innerHTML = ""+"Property Code::"+res[0]+" "+"Property Type::"+" "+res[1]+" "+"Property Value::"+" "+res[2];
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


 
 