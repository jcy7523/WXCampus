/**
 * Created by ASUS on 2015/11/11.
 */
function getGouwuChe(){
    var dataInfo=foodInfo;
    $.ajax(
        {
            url:url,
            dataType: "json",
            type: 'GET',
            data:dataInfo,
            success:backFoodList,
            error: function () {
                alert("error");
            }
        }
    );
}

function backFoodList(){
    document.getElementById("center").innerHTML="";
    var foodList='';
    for(var i=0;i<data.itemList.length;i++){
        foodList+=' <div class="food_info">'+
            '<div class="food_info_left">'+
            '<img src="'+data.itemList[i].icon+'" style="width:10em;height:10em;margin-left:20px">'+
            '</div>'+
            '<div class="food_info_center">'+
            '<p style="color: #843534;font-size: 2em;margin-left: 10px">'+data.itemList[i].iname+'</p>'+
            '<p style="color: #843534;font-size: 2em;margin-left: 10px">'+data.itemList[i].resNum+'</p>'+
            '<p style="color: #843534;font-size: 2em;margin-left: 10px">'+data.itemList[i].realPrice+'￥</p>'+
            '</div>'+
            '<div class="food_info_right" style="text-align: right">'+
            '<p style="margin-top: 1em"><img src="image_find/save.png" style="width:3em;height: 3em;margin-right: 1em "></p>'+
            '<p style="margin-top: 3em"><span><img src="image_find/add.png" style="width: 2.5em;height: 2.5em;float: right;margin-right: 1em"></span>'+
            ' <span id="kuankuan">2</span>'+
            '<span><img src="image_find/reduce.png" style="width: 2.5em;height: 2.5em;margin-right: 1em;float: right "></span></p>'+
            '</div>'+
            '</div>'+
            '<HR style="float: left;width: 100%;height: 2px;color: #080808">';
    }
    $("#center").append(foodList);
}
function backtoindex()
{
	window.location="/index?type=refresh";
}
//增加数量
function addNum(iid,restnum){
	var num=parseInt(document.getElementById(iid).innerHTML);
	if(num<restnum){
		num++;
		}
		else{
			alert("卖光啦");
			document.getElementById(iid+'_add').src="/index/image_find/add_old.png";
			document.getElementById(iid+'_addspan').onclick="";
			return;
		}
	document.getElementById(iid).innerHTML="";
	document.getElementById(iid).innerHTML=num;
	if(num>0){	
		document.getElementById(iid+'_reduce').src='/index/images_shop/reduce.png';
//		var obj=document.getElementById(iid+'_span');
//		obj.onclick=reduceNum(iid);
		document.getElementById(iid+'_span').onclick=function(){
			reduceNum(iid,restnum);
		};
	}
	getPrice();
	sendajax(iid,"0");
}
//减少数量
function reduceNum(iid,restNum){
	var num=parseInt(document.getElementById(iid).innerHTML);
	num--;
	if(num<restNum){
		document.getElementById(iid+'_add').src="/index/image_find/add.png";
		document.getElementById(iid+'_addspan').onclick=function(){
			addNum(iid,restNum);
		};
	}
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

	getPrice();
	sendajax(iid,"1");
}

//收藏
function save(iid){
	var dataInfo="iid="+iid;
	var url='/usr/addItemStar';
  $.ajax(
      {
          url:url,
          dataType: "json",
          type: 'POST',
          data:dataInfo,
          success:function reback(data){
        	  if(data.Msg=="OK"){
        		  alert("收藏成功");
        	  }
        	  else{
        		  alert(data.Msg);
        	  }
          },
          error: function () {
              alert("未登录用户不能收藏");
          }
      }
  );
}

var arr=[];
var i=0;
function getiid(iid){
	arr[i]=iid;
	i++;
}
//计算价格
var LimitPrice='';
function getPrice(limitPrice){
	LimitPrice=limitPrice;
	var price=0;
	for(var i=0;i<arr.length;i++){
		var data_price=document.getElementById(arr[i]+'_price').innerHTML;
		data_price=data_price.substring(1);
		price+=parseFloat(data_price)*
		parseInt(document.getElementById(arr[i]).innerHTML);
	}
	var all_Price=parseFloat((price).toFixed(2)); 
	document.getElementById("allPrice").innerHTML=all_Price;
}

//确认订单
function confoirmPage(){
	var price_1=parseFloat(LimitPrice);
	var price_2=parseFloat(document.getElementById("allPrice").innerHTML);

	if(price_2<price_1){
		alert("未满起送费");
		return 0;
	}
	
		window.location='/shop/confirm';
	
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