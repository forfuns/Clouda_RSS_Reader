sumeru.router.add(

	{
		pattern: '/RSS',
		action: 'App.RSSReaderAction'
	}

);
//上面的配置，pattern 指定了一个路由的路径匹配，意思就是，访问你应用的/RSS/后面的位置，路由就被匹配到了。
//但匹配后做什么？别急，action 指定了一个控制器：App.RSSReaderAction,这个控制器就是用来执行相应的动作，如下。
App.RSSReaderAction = sumeru.controller.create(function(env, session) {
	//定义试图文件名
	var view = 'html';
	
	var processDoc = function(doc){
		//文档处理方法
		var html = '';
		var xml = $.parseXML(doc);
		var $doc = $(doc);

		var items = xml.getElementsByTagName('item');

		
		$.each(items,function(index,element){
			
			var title = this.getElementsByTagName('title')[0];

			var link = this.getElementsByTagName('link')[0];
			

			var h3 = '<h3 style="border-left:solid 3px #99CCFF;padding:10px 5px;"><a style="color:#333;" href="'+link.textContent+'" target="_blank">'+title.textContent+'</a></h3>';

			var description = '<div style="background:#EEE;padding:5px;" class="f-rrs-item-content">'+this.getElementsByTagName('description')[0].textContent+'</div>';

			html+='<li>'+h3+description+'</li>';
		});

		
		return '<ul style="list-style:none;">'+html+'</ul>';
	}

	var getData = function() {
		//这里负责获取并解释从路由器传递过来的参数（我们这里需要RSS网址）
		var argLength = env.arguments.length;

		var url = '';
		console.log('arg length -> '+argLength);
		for(var i=1;i<argLength;++i){
			var arg = env.arguments[i]
			if(arg=='http:'||arg=='https:')
				arg+='//';
			else if(i!=argLength-1)
				arg+='/';
			url+=arg;
		}

		console.log('url -> '+url);
		/*
		sumeru.external.get(url, function(result){
			console.log(result);
			session.bind('htmlBlock', {
                'htmlContent' : result
            });
        });
		*/
        //分析完之后我们要使用subscribe去做处理
        //每个subscribe都要对应一个publish
		env.subscribe('pubhtml', url , function(newsCollection){
			//console.log(ewsCollection.getData());
            var obj = newsCollection.getData()[0];
            //使用文档处理方法，返回一条压缩过的html代码
            var content = processDoc(obj['body']);
            //session与 block 进行数据绑定
            session.bind('htmlBlock', {
                'htmlContent' : content
            });
        });
		
	}
	env.onload = function(){
		//onload 事件是整个Controler生命周期中第一个事件，用于进行数据处理
		return [getData];
	}
	env.onready = function(){
		//onready 是 Controler生命周期的第三个事件，在这个环节代表View已经被渲染完成，可以做里面的DOM操作

	}
	env.onrender = function(doRender){
		//onrender 是 Controler生命周期的第二个事件，这个环节是开始渲染View
        doRender(view, ['rotate','left']);
    };
});