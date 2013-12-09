module.exports = function(fw){

    fw.publish('html','pubhtml',function(url,callback){

        var collection = this;
        collection.extfind('feedContent',url,callback);
    });

}