/**
 * Created by ASUS on 2015/11/17.
 */
//��ȡ�ղ��б�
function getSaveList(){
   var url='/usr/itemstar';
    $.ajax(
        {
            url:url,
            dataType: "json",
            type: 'POST',
            data:'',
            success:backFoodList,
            error: function () {
                alert("error");
            }
        }
    );
}
function backFoodList(data){
    document.getElementById("center_content").innerHTML="";
    var foodList='';
    for(var i=0;i<data.itemList.length;i++){
    	foodList+=' <div class="food_info">'+
        '<div class="food_info_left">'+
        '<img src="'+data.itemList[i].icon+'" style="width:10em;height:10em;margin-left:20px">'+
        '</div>'+
        '<div class="food_info_center">'+
        '<p style="color: #843534;font-size: 2em;margin-left: 10px">'+data.itemList[i].iname+'</p>'+
        '<p style="color: #843534;font-size: 2em;margin-left: 10px"></p>'+
        '<p style="color: #843534;font-size: 2em;margin-left: 10px">'+data.itemList[i].price+'￥</p>'+
        '</div>'+
        '<div class="food_info_right" style="text-align: right">'+
        '<p style="margin-top: 1em"><img src="/usr/image_mysave/close.png" style="width:3em;height: 3em;margin-right: 1em " onclick=cancelsave("'+data.itemList[i].iid+'")></p>'+
        '<p style="margin-top: 3em"><span onclick=addNum("'+data.itemList[i].iid+'","'+data.itemList[i].restNum+'")><img  src="/index/image_find/add.png" style="width: 3.5em;height: 3.5em;float: right;margin-right: 1em"></span>'+
        ' <span id="'+data.itemList[i].iid+'" class="kuankuan">0</span>'+
        '<span id="'+data.itemList[i].iid+'_span"><img id="'+data.itemList[i].iid+'_reduce" src="/index/images_shop/reduce_inl.png" style="width: 3.5em;height: 3.5em;margin-right: 1em;float: right "></span></p>'+
        '</div>'+
        '</div>'+
            '<HR style="float: left;width: 100%;height: 2px;color: #080808">';
    }
    $("#center_content").append(foodList);
    
    getFoodInfo();
}
function getFoodInfo(){
	var url='/shop/getCarts'
	 $.ajax(
		        {
		            url:url,
		            dataType: "json",
		            type: 'POST',
		            data:'',
		            success:backFoodListInfo,
		            error: function () {
		                alert("error");
		            }
		        }
		    );
}

function backFoodListInfo(json){
	for(var i=0;i<json.itemList.length;i++){
		var data=document.getElementById(json.itemList[i].iid);
		if(data!=null){
			data.innerHTML="";
			data.innerHTML=json.itemList[i].num;
			document.getElementById(json.itemList[i].iid+"_reduce").src="/index/image_find/reduce.png";
			document.getElementById(json.itemList[i].iid+'_span').onclick=function(){
				reduceNum(json.itemList[i].iid);
			};
		}
	}
	
}




//增加数量
function addNum(iid,restnum){
	var num=parseInt(document.getElementById(iid).innerHTML);
	if(num<restnum){
		num++;
		}
		else{
			alert("库存不足");
			return;
		}
	document.getElementById(iid).innerHTML="";
	document.getElementById(iid).innerHTML=num;
	if(num>0){	
		document.getElementById(iid+'_reduce').src='/index/images_shop/reduce.png';
//		var obj=document.getElementById(iid+'_span');
//		obj.onclick=reduceNum(iid);
		document.getElementById(iid+'_span').onclick=function(){
			reduceNum(iid);
		};
	}
	sendajax(iid,"0");
	document.getElementById("totalNum").innerHTML=parseInt(document.getElementById("totalNum").innerHTML)+1;
}
//减少数量
function reduceNum(iid){
	var num=parseInt(document.getElementById(iid).innerHTML);
	num--;
	document.getElementById(iid).innerHTML="";
	document.getElementById(iid).innerHTML=num;
	if(num<=0){
		document.getElementById(iid+'_reduce').src='/index/images_shop/reduce_inl.png';
		document.getElementById(iid+'_span').onclick='';
//		var obj=document.getElementById(iid+'_span');
//		obj.attachEvent("onclick", Foo); 
//		function Foo() 
//		{ 
//		reduceNum(iid);
//		} 
	}
	sendajax(iid,"1");
	document.getElementById("totalNum").innerHTML=parseInt(document.getElementById("totalNum").innerHTML)-1;
}

function gotoshop()
{
	var str=parseInt(document.getElementById("totalNum").innerHTML);
	if(str==0)
		alert("您尚未选择任何商品！");
	else
	    window.location='/shop';
}


function sendajax(iid,type){
	var url='/shop/incart';
	var dataInfo='iid='+iid+'&type='+type;
	$.ajax(
		      {
		          url:url,
		          dataType: "json",
		          type: 'POST',
		          data:dataInfo,
		          success:function reback(data){
		        	  console.log("success");
		          },
		          error: function () {
		              alert("error");
		          }
		      }
		  );
}

function backPerson(){
	window.location='/usr';
}
function cancelsave(iid){
	var dataInfo="iid="+iid;
	var url='/usr/removeItemStar';
  $.ajax(
      {
          url:url,
          dataType: "json",
          type: 'POST',
          data:dataInfo,
          success:function reback(data){
        	  if(data.Msg=="OK"){
        		  window.location.reload();
        	  }
        	  else{
        		  alert(data.Msg);
        	  }
          },
          error: function () {
              alert("error");
          }
      }
  );
}

