	var box = document.getElementById("box");
	var oNavlist = document.getElementById("nav").children;
	var slider = document.getElementById("slider");
	var left = document.getElementById("left");
	var right = document.getElementById("right");
	var scroll = document.getElementById("scroll");
	var l = document.getElementById("l");
	var index = 1;
	var isMoving = false;  //是否正在动


	//滚动条幅,定速运动
	setInterval(function(){
		if(parseInt(getStyle(l, "left")) < -260){
			l.style.left = 1000 + "px";
		}
		var now = parseInt(getStyle(l, "left"));
		l.style.left = now - 1 + "px";
	}, 20);



	//播放函数
	function next(){
		if(isMoving){
			return;
		}
		isMoving = true;
		index++;
		navChange();
		animate(slider, {left:-1200 * index}, function(){
			//如果下标为6，则切换到第一张
			if(index === 6){
				slider.style.left = "-1200px";
				index = 1;
			}
			isMoving = false;
		});
	}

	//向左移动函数
	function prev(){
		if(isMoving){
			return;
		}
		isMoving = true;
		index--;
		navChange();
		animate(slider, {left:-1200 * index}, function(){
			//如果下标为6，则切换到第一张
			if(index === 0){
				slider.style.left = "-6000px";
				index = 5;
			}
			isMoving = false;
		});
	}

	//自动轮播
	var timer = setInterval(next, 3000);

	//鼠标划上盒子取消轮播，左右箭头透明度设置为50%
	box.onmouseover = function(){
		animate(left, {opacity:50});
		animate(right, {opacity:50});
		clearInterval(timer);
	}
	//鼠标离开盒子继续轮播，左右箭头消失
	box.onmouseout = function(){
		animate(left, {opacity:0});
		animate(right, {opacity:0});
		timer = setInterval(next, 3000);
	}
	
	//点击右箭头，向右跳一张图
	right.onclick = function(){
		next();
	}

	//点击左箭头,向左跳一张图
	left.onclick = function(){
		prev();
	}

	//给每个小按钮绑定事件
	for(var i = 0; i < oNavlist.length; ++i){
		//给每个对象绑定一个idx属性确定其下标
		oNavlist[i].idx = i;
		oNavlist[i].onclick = function(){
			//index要配合全局移动
			index = this.idx + 1;
			navChange();
			animate(slider, {left:-1200*index});
		}
	}

	//导航栏背景色变化
	function navChange(){
		for(var i = 0; i < oNavlist.length; ++i){
			oNavlist[i].className = "";
		}
		if(index == 6){
			oNavlist[0].className = "active";
		}
		else if(index == 0){
			oNavlist[4].className = "active";
		}
		else{
		oNavlist[index-1].className = "active";
		}
	}