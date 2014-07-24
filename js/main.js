(function(){
    var pubnub = PUBNUB.init({
        publish_key   : 'pub-c-363ef8a2-0955-438e-abc9-0453c8b85812',
        subscribe_key : 'sub-c-736e65ba-ffe6-11e3-9768-02ee2ddab7fe'
    })

    pubnub.subscribe({
        channel : "viewer",
        message : function(m){console.log(m)}
    })

})();