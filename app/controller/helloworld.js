sumeru.router.add(
    {
        pattern: '/helloworld',
        action: 'App.helloworld'
    }
);
App.helloworld = sumeru.controller.create(function(env,session){
    env.onrender = function(doRender){
        doRender("itworks",["push", "left"]);
    };
});